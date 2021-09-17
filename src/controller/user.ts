import jwt from 'jsonwebtoken'
import { db } from '../utils/database'
import { User } from '../interface/user'
import { Request, Response, NextFunction } from 'express'
import { GeneralResponse, responseStatus } from '../interface/response'
import { ACCESS_TOKEN_SECRET } from '../utils/env'

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
                    message: 'Wrong user password'
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