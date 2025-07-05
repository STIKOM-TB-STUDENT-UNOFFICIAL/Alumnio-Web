import { prisma } from "@/libs/db/index";
import { Access } from "@/middleware/authorization";
import type { TAuthUser } from "@/types/auth-type";
import type { TUser, TUserWithInformation, TUserWithInformationUpdateable } from "@/types/user-type";
import { passwordHash } from "@/utils/bcrypt";

export async function findAllUser(){
    return await prisma.user.findMany({
        include: {
            UserInformation: {
                include:{
                    major: true
                }
            }
        },
        where: {
            role: Access.ALUMNI
        }
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
                    bio: (user.UserInformation as TUserWithInformation).bio,
                    classOf: (user.UserInformation as TUserWithInformation).classOf,
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