import bcrypt from 'bcrypt'
import { BCRYPT_SALT_ROUNDS } from '../utils/env'

export async function hashPassword(rawPassword: string): Promise<string> {
    const salt: string = await bcrypt.genSalt(BCRYPT_SALT_ROUNDS)
    return await bcrypt.hash(rawPassword, salt)
}

export async function isPasswordCorrent(rawPassword: string, hashedPassword: string): Promise<boolean> {
    return await bcrypt.compare(rawPassword, hashedPassword)
}