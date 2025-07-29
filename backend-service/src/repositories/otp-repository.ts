import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export async function findUserByUsernameAndEmail(
    username: string,
    email: string
) {
    return prisma.user.findFirst({
        where: {
            username,
            UserInformation: {
                email,
            },
        },
        include: {
            UserInformation: true,
        },
    });
}

export async function findValidOTPByUserId(userId: number) {
    return prisma.oTP.findFirst({
        where: {
            userId,
            expiredAt: {
                gt: new Date(),
            },
        },
        orderBy: {
            expiredAt: "desc",
        },
    });
}

export async function createOTP(
    userId: number,
    otp: string,
    expiresInMinutes: number
) {
    const expiredAt = new Date(Date.now() + expiresInMinutes * 60 * 1000);
    return prisma.oTP.create({
        data: {
            otp,
            userId,
            expiredAt,
        },
    });
}

export async function validateOTP(userId: number, otp: string) {
    return prisma.oTP.findFirst({
        where: {
            userId,
            otp,
            expiredAt: {
                gt: new Date(),
            },
        },
    });
}

export async function checkOTPValidity(userId: number, otp: string) {
    const otpRecord = await prisma.oTP.findFirst({
        where: {
            userId,
            otp,
        },
    });

    if (!otpRecord) return { valid: false, reason: "OTP tidak ditemukan" };
    if (otpRecord.expiredAt < new Date())
        return { valid: false, reason: "OTP sudah kadaluarsa" };
    return { valid: true };
}

export async function updatePassword(userId: number, hashedPassword: string) {
    return prisma.user.update({
        where: { id: userId },
        data: { password: hashedPassword },
    });
}

export async function deleteAllOTP(userId: number) {
    return prisma.oTP.deleteMany({ where: { userId } });
}
