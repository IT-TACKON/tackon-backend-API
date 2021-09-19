import jwt from 'jsonwebtoken'
import { Request, Response, NextFunction } from 'express'
import { db } from '../utils/database'
import { ACCESS_TOKEN_SECRET } from '../utils/env'
import { hashPassword, comparePassword } from '../utils/password'
import { User } from '../model/data'
import { GeneralResponse, responseStatus } from '../model/response'
import { NotFoundError, RequestPayloadError, UnauthorizedError } from '../model/error'

/**
 * User information except password is already inside jwt token.
 * This function will send translated info as json from token
 * */
export function getMyProfile(_req: Request, res: Response, next: NextFunction): void {
    try {
        const user = res.locals.user
        if (!user) throw new UnauthorizedError('Author id not identified')
        res.status(200).json({
            status: responseStatus.success,
            user: user
        })
    } catch (error: unknown) {
        next(error)
    }
}

/**
 * Update user data by given new data from request body.
 * If request not given full data payload, the old data will be used.
 * Meaning, function will update only given new data
 */
export async function updateMyData(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
        const userInToken = res.locals.user
        if (!userInToken) throw new UnauthorizedError('Author id not identified')
        const userInDatabase: User | undefined = await db<User>('user').select('*').where('id', userInToken.id).first()
        if (!userInDatabase) throw new NotFoundError('User is not registered')
        if (!req.body.email && !req.body.username && !req.body.newPassword) throw new RequestPayloadError('Request payload not is fulfilled')
        const newEmail: string = req.body.email ?? userInDatabase.email
        const newUsername: string = req.body.username ?? userInDatabase.username
        let newPassword: string = req.body.newPassword ?? userInDatabase.password
        const currentPassword: string | undefined = req.body.currentPassword
        if (currentPassword) {
            const isPasswordCorrect: boolean = await comparePassword(currentPassword, userInDatabase.password)
            if (!isPasswordCorrect) throw new UnauthorizedError('Incorrect password')
            newPassword = await hashPassword(currentPassword)
        }
        const newUser: User = {
            id: userInDatabase.id,
            email: newEmail,
            username: newUsername,
            password: newPassword
        }
        await db<User>('user').where('id', userInDatabase.id).update(newUser)
        const accessToken: string = jwt.sign({
            id: newUser.id,
            email: newUser.email,
            username: newUser.username
        }, ACCESS_TOKEN_SECRET)
        res.status(200).json({
            status: responseStatus.success,
            accessToken: accessToken
        })
    } catch (error: unknown) {
        next(error)
    }
}

/** Delete account of token id. Need password for confirmation */
export async function deleteAccount(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
        const userInToken = res.locals.user
        if (!userInToken) throw new UnauthorizedError('Author id not identified')
        const userInDatabase: User | undefined = await db<User>('user').select('*').where('id', userInToken.id).first()
        if (!userInDatabase) throw new NotFoundError('User is not registered')
        const password: string | undefined = req.body.password
        if (!password) throw new RequestPayloadError('Request payload is not fulfilled')
        const isPasswordCorrect: boolean = await comparePassword(password, userInDatabase.password)
        if (!isPasswordCorrect) throw new UnauthorizedError('Incorrect password')
        await db<User>('user').where('id', userInDatabase.id).delete()
        res.status(200).json(<GeneralResponse>{
            status: responseStatus.success,
            message: 'Successfully deleted account'
        })
    } catch (error: unknown) {
        next(error)
    }
}