import jwt from 'jsonwebtoken'
import { v4 as uuidv4 } from 'uuid'
import { Request, Response, NextFunction } from 'express'
import { ValidationError, validationResult } from 'express-validator'
import { User } from '../model/data'
import { GeneralResponse, responseStatus } from '../model/response'
import { NotFoundError, RequestPayloadError, UnauthorizedError } from '../model/error'
import { db } from '../utils/database'
import { ACCESS_TOKEN_SECRET } from '../utils/env'
import { hashPassword, comparePassword } from '../utils/password'


export async function login(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
        const errors: ValidationError[] = validationResult(req).array()
        if (errors?.length) throw new RequestPayloadError(errors[0].msg)

        const user: User | undefined = await db<User>('user').select('*').where('email', req.body.email).first()
        if (!user) throw new NotFoundError('User is not registered')
        const isPasswordCorrect: boolean = await comparePassword(req.body.password, user.password)
        if (!isPasswordCorrect) throw new UnauthorizedError('Incorrect password')

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
        const errors: ValidationError[] = validationResult(req).array()
        if (errors?.length) throw new RequestPayloadError(errors[0].msg)
        const isAlreadyRegistered: boolean = (await db<User>('user').select('*').where('email', req.body.email)).length > 0
        if (isAlreadyRegistered) throw new UnauthorizedError('Email already used')

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