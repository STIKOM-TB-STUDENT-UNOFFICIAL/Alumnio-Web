import { deleteAdmin, getAdmin, getUsers, patchAdmin, patchUser, postAdmin, postUsers, uploadProfilePict, xlsUpload } from "@/handlers/user-handler.ts"
import { Access, Authorization } from "@/middleware/authorization.ts"
import { CreateUserSchema, FileUploadSchema, UserInformationModifySchema, UserRegisterSchema, UserResponseSchema } from "@/schemas/user-schema.ts"
import { Hono } from "hono"
import { describeRoute } from "hono-openapi"
import {
  resolver,
  validator,
} from 'hono-openapi/zod'

export const userRoute = new Hono()

userRoute
.get('/',
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
            },
        }
    }),
    getUsers
)
.post(
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
)
.patch(
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
    patchUser
)
.post(
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
)
.post(
    "/create",
    Authorization([Access.ADMINISTRATOR]),
    xlsUpload
)
.get(
    "/admin",
    Authorization([Access.ADMINISTRATOR]),
    getAdmin
)
.post(
    "/admin",
    Authorization([Access.ADMINISTRATOR]),
    postAdmin
)
.patch(
    "/admin",
    Authorization([Access.ADMINISTRATOR]),
    patchAdmin
)
.delete(
    "/admin",
    Authorization([Access.ADMINISTRATOR]),
    deleteAdmin
)