import bcrypt from "bcrypt"

const saltRound: number = (parseInt(process.env.SALT_OR_ROUNDS ?? "1") ?? 1) 

export function passwordHash(password: string){
    return bcrypt.hashSync(password, saltRound);
}

export function passwordCompare(password: string, hashPassword: string){
    return bcrypt.compareSync(password, hashPassword);
}