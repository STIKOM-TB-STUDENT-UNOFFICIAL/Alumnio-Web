import { serve } from '@hono/node-server';
import { serveStatic } from '@hono/node-server/serve-static';
import { Hono } from 'hono';
import { swaggerUI } from '@hono/swagger-ui';
import { PrismaClient } from '@prisma/client';
import { sign, verify, decode } from 'hono/jwt';
import { HTTPException } from 'hono/http-exception';
import bcrypt from 'bcrypt';
import { z } from 'zod';
import { describeRoute, openAPISpecs } from 'hono-openapi';
import { resolver, validator } from 'hono-openapi/zod';
import * as uuid from 'uuid';
import { existsSync, mkdirSync, rmSync, writeFileSync } from 'fs';
import { cors } from 'hono/cors';
import dotenv from 'dotenv';

// src/index.ts
var prisma = new PrismaClient();
async function jwtSign(payload) {
  return await sign({
    ...payload,
    exp: Math.floor(Date.now() / 1e3) + 60 * 60 * 72
  }, process.env.JWT_KEY ?? "nakano", "HS256");
}
async function jwtVerify(token) {
  return await verify(token, process.env.JWT_KEY ?? "nakano", "HS256");
}
function jwtDecode(token) {
  return decode(token).payload;
}
var Access = {
  ADMINISTRATOR: 0,
  ALUMNI: 1
};
function Authorization(access) {
  return async (c, next) => {
    if (!c.req.header("Authorization")) {
      throw new HTTPException(403, { message: "Access Forbidden" });
    }
    try {
      const token = c.req.header("Authorization")?.split(" ")[1];
      const v = await jwtVerify(token);
      if (!access.includes(v.role)) {
        throw new HTTPException(403, { message: "Access Forbidden" });
      }
      await next();
    } catch {
      throw new HTTPException(403, { message: "Access Forbidden" });
    }
  };
}
var saltRound = parseInt(process.env.SALT_OR_ROUNDS ?? "1") ?? 1;
function passwordHash(password) {
  return bcrypt.hashSync(password, saltRound);
}
function passwordCompare(password, hashPassword) {
  return bcrypt.compareSync(password, hashPassword);
}

// src/repositories/user-repository.ts
async function findAllUser() {
  return await prisma.user.findMany({
    include: {
      UserInformation: {
        include: {
          major: true
        }
      }
    },
    where: {
      role: Access.ALUMNI
    }
  });
}
async function findUserById(id) {
  return await prisma.user.findFirst({
    where: {
      id
    },
    include: {
      UserInformation: true
    }
  });
}
async function findUserForAuth(user) {
  return await prisma.user.findFirst({
    where: {
      ...user
    },
    include: {
      UserInformation: {
        select: {
          fullname: true
        }
      }
    }
  });
}
async function insertNewUser(user) {
  return await prisma.user.create({
    data: {
      username: user.username,
      password: passwordHash(user.password ?? ""),
      role: user.role,
      UserInformation: {
        create: {
          fullname: user.UserInformation.fullname,
          email: user.UserInformation.email,
          phone: user.UserInformation.phone,
          address: user.UserInformation.address,
          bio: user.UserInformation.bio,
          classOf: user.UserInformation.classOf,
          majorId: user.UserInformation.majorId
        }
      }
    }
  });
}
async function patchUserInformation(userId, userInformation) {
  return await prisma.user.update({
    where: {
      id: userId
    },
    data: {
      UserInformation: {
        update: {
          ...userInformation
        }
      }
    }
  });
}
async function patchUser(userId, data) {
  return await prisma.user.update({
    where: {
      id: userId
    },
    data
  });
}
async function hasProfilePict(userId) {
  const user = await prisma.userInformation.findFirst({
    where: {
      userId
    }
  });
  if (user?.profilePict != "") {
    return user?.profilePict;
  }
  return false;
}
async function updateProfilePict(userId, fileName) {
  return await prisma.userInformation.update({
    where: {
      userId
    },
    data: {
      profilePict: fileName
    }
  });
}
async function AuthService(userData) {
  const user = await findUserForAuth({
    ...userData,
    password: void 0
  });
  if (!user) {
    throw new HTTPException(404, { message: "User not found" });
  }
  if (!passwordCompare(userData.password ?? "", user.password)) {
    throw new HTTPException(403, { message: "Username or password is wrong" });
  }
  return user;
}
async function AuthGetSessionService(token) {
  const information = await jwtVerify(token);
  return information;
}

// src/services/change-password-service.ts
async function changePasswordService(userId, newPassword) {
  return await patchUser(userId, {
    password: passwordHash(newPassword)
  });
}

// src/utils/generate-meta.ts
function generateMeta(status, code, message) {
  return {
    status,
    code,
    message
  };
}

// src/handlers/auth-handler.ts
async function postAuthHandler(c) {
  const user = await AuthService(await c.req.json());
  const response = {
    meta: generateMeta("SUCCESS", 200, "Auth successfully"),
    data: {
      token: await jwtSign({
        username: user.username,
        role: user.role,
        fullName: user.UserInformation?.fullname ?? "",
        userId: user.id
      })
    }
  };
  return c.json(response);
}
async function getAuthSession(c) {
  const information = await AuthGetSessionService(c.req.header("Authorization")?.split(" ")[1] ?? "");
  const response = {
    meta: generateMeta("SUCCESS", 200, "Success get user information"),
    data: information
  };
  return c.json(response);
}
async function changePasswordHandler(c) {
  const information = await AuthGetSessionService(c.req.header("Authorization")?.split(" ")[1] ?? "");
  const { password } = await c.req.json();
  await changePasswordService(information.userId, password);
  const response = {
    meta: generateMeta("SUCCESS", 200, "Success change user password"),
    data: []
  };
  return c.json(response);
}
var MetaSchema = z.object({
  status: z.enum(["SUCCESS", "FAILED"]),
  message: z.string(),
  code: z.number()
});

// src/schemas/auth-schema.ts
var AuthSchema = z.object({
  role: z.number({
    required_error: "Required role for authentication"
  }),
  username: z.string({
    required_error: "Required username for authentication"
  }),
  password: z.string({
    required_error: "Required password for authentication"
  }).min(8, "Password length not valid")
});
var AuthSessionSchema = AuthSchema.extend({
  password: z.undefined()
});
var AuthResponseSchema = z.object({
  meta: MetaSchema,
  data: z.union([
    z.object({
      token: z.string()
    }),
    z.array(z.any())
  ])
});
var NewPasswordResponseSchema = z.object({
  meta: MetaSchema,
  data: z.array(z.any())
});
var NewPasswordSchema = z.object({
  password: z.string({ required_error: "Required new password" }).min(8, "Password length not valid")
});
var authRoute = new Hono();
authRoute.post(
  "/",
  describeRoute({
    description: "Say hello to auth",
    tags: ["Auth"],
    responses: {
      200: {
        description: "Successfully authentication",
        content: {
          "application/json": {
            schema: resolver(AuthResponseSchema)
          }
        }
      }
    }
  }),
  validator("json", AuthSchema),
  postAuthHandler
).get(
  "/",
  describeRoute({
    description: "Get session information",
    tags: ["Auth"],
    responses: {
      200: {
        description: "Successfully get session information",
        content: {
          "application/json": {
            schema: resolver(AuthSessionSchema)
          }
        }
      }
    }
  }),
  getAuthSession
).patch(
  "/",
  Authorization([Access.ALUMNI, Access.ADMINISTRATOR]),
  describeRoute({
    description: "Change password",
    tags: ["Auth"],
    responses: {
      200: {
        description: "Successfully change password",
        content: {
          "application/json": {
            schema: resolver(NewPasswordResponseSchema)
          }
        }
      }
    }
  }),
  validator("json", NewPasswordSchema),
  changePasswordHandler
);

// src/utils/get-extension.ts
function getExtension(fileName) {
  const splitting = fileName.split(".");
  const extension = splitting[splitting.length - 1];
  return extension;
}
function generateUuid() {
  return uuid.v4();
}
async function findAllUserService() {
  return await findAllUser();
}
async function newUserService(user) {
  return await insertNewUser(user);
}
async function uploadProfilePictService(userId, image) {
  const previousProfilePict = await hasProfilePict(userId);
  if (previousProfilePict) {
    rmSync(`./uploads/images/${previousProfilePict}`);
  }
  const extension = getExtension(image.name);
  const newName = generateUuid();
  const path = `./uploads/images/${newName}.${extension}`;
  writeFileSync(path, new Uint8Array(await image.arrayBuffer()));
  await updateProfilePict(userId, `${newName}.${extension}`);
}
async function getUsers(c) {
  try {
    const sessionData = jwtDecode(c.req.header("Authorization")?.split(" ")[1]);
    const users = sessionData.role == Access.ADMINISTRATOR ? await findAllUserService() : await findUserById(sessionData.userId);
    const response = {
      meta: generateMeta("SUCCESS", 200, "Successfuly get all users"),
      data: users
    };
    return c.json(response);
  } catch (e) {
    throw new HTTPException(400, { message: e.message, cause: e });
  }
}
async function postUsers(c) {
  try {
    const formData = await c.req.json();
    const response = {
      meta: generateMeta("SUCCESS", 200, "Successfuly register new user"),
      data: []
    };
    await newUserService(formData);
    return c.json(response);
  } catch (e) {
    throw new HTTPException(400, { message: e.message, cause: e });
  }
}
async function patchUser2(c) {
  try {
    const formData = await c.req.json();
    const sessionData = jwtDecode(c.req.header("Authorization")?.split(" ")[1]);
    await patchUserInformation(sessionData.userId, formData);
    return c.json({
      meta: generateMeta("SUCCESS", 200, "Successfully modify user information"),
      data: []
    });
  } catch (e) {
    throw new HTTPException(400, { message: e.message, cause: e });
  }
}
async function uploadProfilePict(c) {
  try {
    const { image } = await c.req.parseBody();
    const sessionData = jwtDecode(c.req.header("Authorization")?.split(" ")[1]);
    if (!(image instanceof globalThis.File)) {
      throw new HTTPException(400, { message: "Bad request, should file" });
    }
    await uploadProfilePictService(sessionData.userId, image);
    const response = {
      meta: generateMeta("SUCCESS", 200, "Successfuly upload profile image"),
      data: []
    };
    return c.json(response);
  } catch (e) {
    throw new HTTPException(400, { message: e.message, cause: e });
  }
}
var UserWithInformationSchema = z.object({
  id: z.optional(z.number()),
  userId: z.optional(z.number()),
  fullname: z.string(),
  email: z.string(),
  phone: z.string(),
  address: z.string(),
  bio: z.string(),
  classOf: z.string(),
  majorId: z.number(),
  linkedinUrl: z.union([
    z.string(),
    z.null()
  ]),
  curriculumVitae: z.string()
});
var UserSchema = z.object({
  id: z.optional(z.string()),
  username: z.string(),
  password: z.optional(z.string()),
  role: z.number(),
  UserInformation: z.union([
    UserWithInformationSchema,
    z.array(z.any())
  ])
});
var UserRegisterSchema = UserSchema.extend({
  id: z.undefined(),
  password: z.string().min(8, "Required password length 8 characters minimum"),
  UserInformation: UserWithInformationSchema.extend({
    id: z.undefined(),
    userId: z.undefined(),
    curriculumVitae: z.undefined(),
    linkedinUrl: z.undefined()
  })
});
var UserInformationModifySchema = UserWithInformationSchema.extend({
  id: z.undefined(),
  userId: z.undefined(),
  classOf: z.undefined(),
  majorId: z.undefined(),
  curriculumVitae: z.undefined()
});
var UserResponseSchema = z.object({
  meta: MetaSchema,
  data: z.array(UserSchema)
});
var CreateUserSchema = z.object({
  meta: MetaSchema,
  data: z.array(z.unknown())
});
var FileUploadSchema = z.object({
  image: z.instanceof(File)
});
var userRoute = new Hono();
userRoute.get(
  "/",
  Authorization([Access.ADMINISTRATOR, Access.ALUMNI]),
  describeRoute({
    description: "Get all users information",
    tags: ["Users"],
    responses: {
      200: {
        description: "Successfully get all users information",
        content: {
          "application/json": {
            schema: resolver(UserResponseSchema)
          }
        }
      }
    }
  }),
  getUsers
).post(
  describeRoute({
    description: "Create new users",
    tags: ["Users"],
    responses: {
      200: {
        description: "Successfuly create new users",
        content: {
          "application/json": {
            schema: resolver(CreateUserSchema)
          }
        }
      }
    }
  }),
  validator("json", UserRegisterSchema),
  postUsers
).patch(
  Authorization([Access.ALUMNI, Access.ADMINISTRATOR]),
  describeRoute({
    description: "Modify user information",
    tags: ["Users"],
    responses: {
      200: {
        description: "Successfuly modify user information",
        content: {
          "application/json": {
            schema: resolver(CreateUserSchema)
          }
        }
      }
    }
  }),
  validator("json", UserInformationModifySchema),
  patchUser2
).post(
  "/upload",
  Authorization([Access.ALUMNI, Access.ADMINISTRATOR]),
  describeRoute({
    description: "Modify user information",
    tags: ["Users"],
    responses: {
      200: {
        description: "Successfuly upload image profile",
        content: {
          "application/json": {
            schema: resolver(CreateUserSchema)
          }
        }
      }
    }
  }),
  validator("form", FileUploadSchema),
  uploadProfilePict
);

// src/repositories/majors-repository.ts
async function findMajor() {
  return await prisma.major.findMany();
}

// src/services/major-service.ts
async function getAllMajorService() {
  return await findMajor();
}
async function getAllMajor(c) {
  try {
    const majors = await getAllMajorService();
    const response = {
      meta: generateMeta("SUCCESS", 200, "Successfuly get all users"),
      data: majors
    };
    return c.json(response);
  } catch (e) {
    throw new HTTPException(400, { message: e.message, cause: e });
  }
}
var MajorSchema = z.object({
  id: z.number().optional(),
  majorName: z.string()
});
var MajorResponseSchema = z.object({
  meta: MetaSchema,
  data: z.union([
    z.array(MajorSchema),
    z.array(z.unknown())
  ])
});
var majorRoute = new Hono();
majorRoute.get(
  "/",
  describeRoute({
    description: "Get all majors list",
    tags: ["Majors"],
    responses: {
      200: {
        description: "Success get all majors",
        content: {
          "application/json": {
            schema: resolver(MajorResponseSchema)
          }
        }
      }
    }
  }),
  getAllMajor
);
function setupUploadsDir() {
  if (!existsSync("./uploads")) {
    mkdirSync("./uploads");
  }
  if (!existsSync("./uploads/images")) {
    mkdirSync("./uploads/images");
  }
  if (!existsSync("./uploads/documents")) {
    mkdirSync("./uploads/documents");
  }
}

// src/index.ts
dotenv.config();
var port = process.env.PORT || 4e3;
var app = new Hono();
setupUploadsDir();
app.use("*", cors());
app.get("/", (c) => {
  return c.json({
    message: "Alumnio API, see /ui for documentation"
  });
});
app.use("/uploads/*", serveStatic({
  root: "./"
}));
app.route("/auth", authRoute);
app.route("/users", userRoute);
app.route("/majors", majorRoute);
app.use("/ui", swaggerUI({ url: "/docs" }));
app.get(
  "/docs",
  openAPISpecs(app, {
    documentation: {
      info: {
        title: "Hono API",
        version: "1.0.0",
        description: "Greeting API"
      },
      servers: [
        { url: `http://localhost:${port}`, description: "Local Server" }
      ]
    }
  })
);
app.onError((err, c) => {
  c.status(err instanceof HTTPException ? err.getResponse().status : 500);
  return c.json({
    meta: generateMeta(
      "FAILED",
      err instanceof HTTPException ? err.getResponse().status : 500,
      err.message
    ),
    data: []
  });
});
serve({
  fetch: app.fetch,
  port,
  hostname: "0.0.0.0"
}, (info) => {
  console.log(`Server is running on http://localhost:${info.port}`);
});
//# sourceMappingURL=index.js.map
//# sourceMappingURL=index.js.map