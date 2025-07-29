import z from "zod";

export const otpRequestSchema = z.object({
  username: z.string().min(1, "Username wajib diisi"),
  email: z.string().email("Email tidak valid"),
});

export const otpValidateSchema = z.object({
  username: z.string(),
  email: z.string().email(),
  otp: z.string().length(6, "OTP harus 6 digit"),
});

export const setPasswordSchema = z.object({
  username: z.string(),
  email: z.string().email(),
  otp: z.string().length(6),
  newPassword: z.string().min(6, "Password minimal 6 karakter"),
});