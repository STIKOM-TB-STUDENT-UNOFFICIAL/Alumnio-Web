import {
    checkOTPValidity,
    createOTP,
    deleteAllOTP,
    findUserByUsernameAndEmail,
    findValidOTPByUserId,
    updatePassword,
    validateOTP,
} from "@/repositories/otp-repository.ts";
import { passwordHash } from "@/utils/bcrypt.ts";
import { sendOTP } from "@/utils/mail.ts";
import { randomInt } from "crypto";

export async function requestOTP(
    username: string,
    email: string
): Promise<string> {
    const user = await findUserByUsernameAndEmail(username, email);
    if (!user)
        throw new Error("User dengan username dan email tidak ditemukan.");

    const existingOtp = await findValidOTPByUserId(user.id);
    if (existingOtp) throw new Error("OTP masih aktif. Coba lagi nanti.");

    const otp = randomInt(100000, 999999).toString();
    await createOTP(user.id, otp, 60);

    //console.log(`OTP untuk ${email}: ${otp}`);
    sendOTP(email, otp).catch((e) => console.log(e))

    return "OTP telah dikirim ke email Anda.";
}

export async function resetPassword(
    username: string,
    email: string,
    otp: string,
    newPassword: string
): Promise<string> {
    const user = await findUserByUsernameAndEmail(username, email);
    if (!user) throw new Error("User tidak ditemukan.");

    const validOtp = await validateOTP(user.id, otp);
    if (!validOtp) throw new Error("OTP tidak valid atau sudah kadaluarsa.");

    const hashed = passwordHash(newPassword);
    await updatePassword(user.id, hashed);

    await deleteAllOTP(user.id);

    return "Password berhasil direset.";
}

export async function checkOTP(
    username: string,
    email: string,
    otp: string
): Promise<{ valid: boolean; reason?: string }> {
    const user = await findUserByUsernameAndEmail(
        username,
        email
    );
    if (!user) {
        return { valid: false, reason: "User tidak ditemukan." };
    }

    const result = await checkOTPValidity(user.id, otp);
    return result;
}
