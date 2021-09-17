import jwt from 'jsonwebtoken'
import { db } from '../utils/database'
import { User } from '../interface/user'
import { Request, Response, NextFunction } from 'express'
import { GeneralResponse, responseStatus } from '../interface/response'
import { ACCESS_TOKEN_SECRET } from '../utils/env'

/**
 * User information except password is already inside jwt token.
 * This function will send translated info as json from token
 * */
export function getMyProfile(_req: Request, res: Response, next: NextFunction): void {
    try {
        const user = res.locals.user
        if (!user) {
            res.status(400).json(<GeneralResponse>{
                status: responseStatus.error,
                message: 'Author id not identified'
            })
            return
        }
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
        if (!userInToken) {
            res.status(400).json(<GeneralResponse>{
                status: responseStatus.error,
                message: 'Author id not identified'
            })
            return
        }
        const userInDatabase: User | undefined = await db<User>('user').select('*').where('id', userInToken.id).first()
        if (!userInDatabase) {
            res.status(400).json(<GeneralResponse>{
                status: responseStatus.error,
                message: 'User is not registered'
            })
            return
        }
        if (!req.body.email && !req.body.username && !req.body.newPassword) {
            res.status(400).json(<GeneralResponse>{
                status: responseStatus.error,
                message: 'New information is not provided'
            })
            return
        }
        const newEmail: string = req.body.email ?? userInDatabase.email
        const newUsername: string = req.body.username ?? userInDatabase.username
        const newPassword: string = req.body.newPassword ?? userInDatabase.password
        const currentPassword: string | undefined = req.body.currentPassword
        if (currentPassword) {
            if (currentPassword != userInDatabase.password) {
                res.status(400).json(<GeneralResponse>{
                    status: responseStatus.error,
                    message: 'Incorrect password'
                })
                return
            }
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
        if (!userInToken) {
            res.status(400).json(<GeneralResponse>{
                status: responseStatus.error,
                message: 'Author id not identified'
            })
            return
        }
        const userInDatabase: User | undefined = await db<User>('user').select('*').where('id', userInToken.id).first()
        if (!userInDatabase) {
            res.status(400).json(<GeneralResponse>{
                status: responseStatus.error,
                message: 'User is not registered'
            })
            return
        }
        const password: string | undefined = req.body.password
        if (!password) {
            res.status(400).json(<GeneralResponse>{
                status: responseStatus.error,
                message: 'Request payload is not fulfilled'
            })
            return
        }
        if (password != userInDatabase.password) {
            res.status(400).json(<GeneralResponse>{
                status: responseStatus.error,
                message: 'Incorrect password'
            })
            return
        }
        await db<User>('user').where('id', userInDatabase.id).delete()
        res.status(200).json(<GeneralResponse>{
            status: responseStatus.success,
            message: 'Successfully deleted account'
        })
    } catch (error: unknown) {
        next(error)
    }
}