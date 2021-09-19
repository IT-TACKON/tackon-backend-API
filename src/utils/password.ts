import bcrypt from 'bcrypt'
import { BCRYPT_SALT_ROUNDS } from '../utils/env'

/** Encrypt plain text password into hash (60 characters long) one way encryption */
export async function hashPassword(rawPassword: string): Promise<string> {
    const salt: string = await bcrypt.genSalt(BCRYPT_SALT_ROUNDS)
    return await bcrypt.hash(rawPassword, salt)
}

/** Perform password checking. Returns true if password is match, and vice versa */
export async function comparePassword(rawPassword: string, hashedPassword: string): Promise<boolean> {
    return await bcrypt.compare(rawPassword, hashedPassword)
}