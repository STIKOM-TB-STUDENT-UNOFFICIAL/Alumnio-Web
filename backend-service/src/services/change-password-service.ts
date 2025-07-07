import { patchUser } from "@/repositories/user-repository.ts";
import { passwordHash } from "@/utils/bcrypt.ts";

export async function changePasswordService(userId: number, newPassword: string){
    return await patchUser(userId, {
        password: passwordHash(newPassword)
    })
}