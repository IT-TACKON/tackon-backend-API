import jwt from 'jsonwebtoken'
import { v4 as uuidv4 } from 'uuid'
import { db } from '../utils/database'
import { ACCESS_TOKEN_SECRET } from '../utils/env'
import { hashPassword, isPasswordCorrent } from '../utils/password'
import { Request, Response, NextFunction } from 'express'
import { User } from '../interface/user'
import { GeneralResponse, responseStatus } from '../interface/response'
import { NotFoundError, RequestPayloadError, UnauthorizedError } from '../interface/customError'


export async function login(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
        // Validate request payload
        if (ACCESS_TOKEN_SECRET === '') throw Error('Missing ACCESS_TOKEN_SECRET')
        if (!req.body.email || !req.body.password) throw new RequestPayloadError('Request payload is not fulfilled')
        const requestUser = {
            email: req.body.email,
            password: req.body.password
        }

        // User data validation
        const user: User | undefined = await db<User>('user')
            .select('*')
            .where('email', requestUser.email)
            .first()

        if (!user) throw new NotFoundError('User is not registered')
        if (!isPasswordCorrent(requestUser.password, user.password)) throw new UnauthorizedError('Incorrect password')

        const accessToken: string = jwt.sign({
            id: user.id,
            email: user.email,
            username: user.username
        }, ACCESS_TOKEN_SECRET)

        res.status(200).json({
            status: responseStatus.success,
            accessToken: accessToken
        })
    } catch (error) {
        next(error)
    }
}

export async function register(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
        // Perform validation
        if (!req.body.email || !req.body.username || !req.body.password) throw new RequestPayloadError('Request payload is not fulfilled')
        const isAlreadyRegistered: boolean = (await db<User>('user').select('*').where('email', req.body.email)).length > 0
        if (isAlreadyRegistered) throw new UnauthorizedError('User already registered')
        const password: string = await hashPassword(req.body.password)
        const user: User = {
            id: uuidv4(),
            email: req.body.email,
            username: req.body.username,
            password: password
        }
        await db<User>('user').insert(user)
        res.json(<GeneralResponse>{
            status: responseStatus.success,
            message: 'Successfully created new user, please log in'
        })
    } catch (error: unknown) {
        next(error)
    }
}