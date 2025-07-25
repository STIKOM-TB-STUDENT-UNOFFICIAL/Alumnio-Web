import { prisma } from "@/libs/db/index.ts";
import { Access } from "@/middleware/authorization.ts";
import type { TAuthUser } from "@/types/auth-type.ts";
import type { TUser, TUserWithInformation, TUserWithInformationUpdateable } from "@/types/user-type.ts";
import { passwordHash } from "@/utils/bcrypt.ts";

export async function findAllUser(
    q: string | undefined,
    take: number,
    skip: number
){
    return await prisma.user.findMany({
        include: {
            UserInformation: {
                include:{
                    major: true
                }
            },
            WorkHistory: {
                orderBy: {
                    endDate: "desc"
                }
            }
        },
        where: {
            role: Access.ALUMNI,
            OR: [
                {
                    username: {
                        contains: q ? q : ""
                    }
                },
                {
                    UserInformation: {
                        OR: [
                            {
                                fullname: {
                                    contains: q ? q : "",
                                    mode: "insensitive"
                                }
                            },
                            {
                                graduateOf: {
                                    contains: q ? q : "",
                                    mode: "insensitive"
                                }
                            },
                            {
                                major: {
                                    majorName: {
                                        contains: q ? q : "",
                                        mode: "insensitive"
                                    }
                                }
                            },
                        ]
                    }
                },
                {
                    WorkHistory: {
                        some: {
                            OR: [
                                {
                                    title: {
                                        contains: q ? q : "",
                                        mode: "insensitive"
                                    }
                                },
                                {
                                    company: {
                                        contains: q ? q : "",
                                        mode: "insensitive"
                                    }
                                }
                            ]
                        }
                    }
                }
            ]
        },
        take,
        skip
    })
}

export async function findAllUserForPrint(
    major: string,
    q: string | undefined,
    take: number,
    skip: number
){
    return await prisma.user.findMany({
        include: {
            UserInformation: {
                include:{
                    major: true
                }
            },
            WorkHistory: {
                orderBy: {
                    endDate: "desc"
                }
            }
        },
        where: {
            role: Access.ALUMNI,
            UserInformation: {
                major: {
                    majorName: major
                }
            },
            OR: [
                {
                    username: {
                        contains: q ? q : ""
                    }
                },
                {
                    UserInformation: {
                        OR: [
                            {
                                fullname: {
                                    contains: q ? q : "",
                                    mode: "insensitive"
                                }
                            },
                            {
                                graduateOf: {
                                    contains: q ? q : "",
                                    mode: "insensitive"
                                }
                            },
                        ],
                    }
                },
                {
                    WorkHistory: {
                        some: {
                            OR: [
                                {
                                    title: {
                                        contains: q ? q : "",
                                        mode: "insensitive"
                                    }
                                },
                                {
                                    company: {
                                        contains: q ? q : "",
                                        mode: "insensitive"
                                    }
                                }
                            ]
                        }
                    }
                }
            ]
        },
        take,
        skip
    })
}


export async function findUserById(id: number){
    return await prisma.user.findFirst({
        where: {
            id
        },
        include: {
            UserInformation: true
        }
    })
}

export async function findUserByIdWithWorkExperience(id: number){
    return await prisma.user.findFirst({
        where: {
            id
        },
        include: {
            UserInformation: {
                include: {
                    major: true
                }
            },
            WorkHistory: true
        }
    })
}

export async function findUserForAuth(
    user: TAuthUser
){
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
    })
}

export async function insertNewUser(user: TUser){
    return await prisma.user.create({
        data: {
            username: user.username,
            password: passwordHash(user.password ?? ""),
            role: user.role,
            UserInformation: {
                create: {
                    fullname: (user.UserInformation as TUserWithInformation).fullname,
                    email: (user.UserInformation as TUserWithInformation).email,
                    phone: (user.UserInformation as TUserWithInformation).phone,
                    address: (user.UserInformation as TUserWithInformation).address,
                    gender: (user.UserInformation as TUserWithInformation).gender,
                    bio: (user.UserInformation as TUserWithInformation).bio,
                    graduateOf: (user.UserInformation as TUserWithInformation).graduateOf,
                    majorId: (user.UserInformation as TUserWithInformation).majorId,
                }
            }
        }
    })
}

export async function upsertNewUser(user: TUser){
    return await prisma.user.upsert({
        where: {
            username: user.username
        },
        create: {
            username: user.username,
            password: passwordHash(user.password ?? ""),
            role: user.role,
            UserInformation: {
                create: {
                    fullname: (user.UserInformation as TUserWithInformation).fullname,
                    email: (user.UserInformation as TUserWithInformation).email,
                    phone: (user.UserInformation as TUserWithInformation).phone,
                    address: (user.UserInformation as TUserWithInformation).address,
                    gender: (user.UserInformation as TUserWithInformation).gender,
                    bio: (user.UserInformation as TUserWithInformation).bio,
                    graduateOf: (user.UserInformation as TUserWithInformation).graduateOf,
                    majorId: (user.UserInformation as TUserWithInformation).majorId,
                }
            }
        },
        update: {
            username: user.username,
            password: passwordHash(user.password ?? ""),
            role: user.role,
            UserInformation: {
                update: {
                    fullname: (user.UserInformation as TUserWithInformation).fullname,
                    email: (user.UserInformation as TUserWithInformation).email,
                    phone: (user.UserInformation as TUserWithInformation).phone,
                    address: (user.UserInformation as TUserWithInformation).address,
                    gender: (user.UserInformation as TUserWithInformation).gender,
                    bio: (user.UserInformation as TUserWithInformation).bio,
                    graduateOf: (user.UserInformation as TUserWithInformation).graduateOf,
                    majorId: (user.UserInformation as TUserWithInformation).majorId,
                }
            }
        }
    })
}

export async function patchUserInformation(userId: number, userInformation: TUserWithInformationUpdateable){
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
    })
}

export async function patchUser(userId: number, data: {
    id?: number,
    username?: string,
    password?: string,
    role?: number
}){
    return await prisma.user.update({
        where: {
            id: userId
        },
        data
    })
}

export async function hasProfilePict(userId: number){
    const user = await prisma.userInformation.findFirst({
        where: {
            userId
        }
    })
    if(user?.profilePict != ""){
        return user?.profilePict
    }
    return false
}

export async function updateProfilePict(userId: number, fileName: string){
    return await prisma.userInformation.update({
        where: {
            userId
        },
        data: {
            profilePict: fileName
        }
    })
}

export async function updateCv(userId: number, fileName: string){
    return await prisma.userInformation.update({
        where: {
            userId
        },
        data: {
            curriculumVitae: fileName
        }
    })
}

export async function setupAdmin(){
    return await prisma.user.upsert({
        where: {
            username: "admin"
        },
        create: {
            username: "admin",
            password: passwordHash("admin1234"),
            role: 0
        },
        update: {
            username: "admin",
            password: passwordHash("admin1234"),
            role: 0
        },
    })
}

export async function getAdministrator(){
    return await prisma.user.findMany({
        where: {
            role: Access.ADMINISTRATOR
        }
    })
}

export async function newAdministrator(username: string, password: string){
    return await prisma.user.create({
        data: {
            role: Access.ADMINISTRATOR,
            username,
            password: passwordHash(password ?? `abc${username}`)
        }
    })
}

export async function patchAdministrator(userId: number, username: string, password: string){
    return await prisma.user.update({
        where: {
            id: userId
        },
        data: {
            role: Access.ADMINISTRATOR,
            username,
            ...(password ? { password: passwordHash(password ?? `abc${username}`) } : {})
        }
    })
}

export async function deleteAdministrator(userId: number){
    return await prisma.user.delete({
        where: {
            id: userId
        }
    })
}