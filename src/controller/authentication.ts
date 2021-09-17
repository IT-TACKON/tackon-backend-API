import jwt from 'jsonwebtoken'
import { db } from '../utils/database'
import { v4 as uuidv4 } from 'uuid'
import { Request, Response, NextFunction } from 'express'
import { User } from '../interface/user'
import { GeneralResponse, responseStatus } from '../interface/response'
import { ACCESS_TOKEN_SECRET } from '../utils/env'


export async function login(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
        // Validate request payload
        if (!req.body.email || !req.body.password) {
            res.status(400).json(<GeneralResponse>{
                status: responseStatus.error,
                message: 'Request payload is not fulfilled'
            })
            return
        }

        const requestUser = {
            email: req.body.email,
            password: req.body.password
        }

        if (ACCESS_TOKEN_SECRET === '') {
            throw Error('Missing ACCESS_TOKEN_SECRET')
        }

        // User data validation
        const user: User | undefined = await db<User>('user')
            .select('*')
            .where('email', requestUser.email)
            .first()

        if (!user) {
            res.status(400).json(<GeneralResponse>{
                status: responseStatus.error,
                message: 'User is not registered'
            })
            return
        }
        if (requestUser.password != user.password) {
            res.status(400).json(<GeneralResponse>{
                status: responseStatus.error,
                message: 'Incorrect password'
            })
            return
        }

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
        // Validate request payload
        if (!req.body.email || !req.body.username || !req.body.password) {
            res.status(400).json(<GeneralResponse>{
                status: responseStatus.error,
                message: 'Request payload is not fulfilled'
            })
            return
        }

        const user: User = {
            id: uuidv4(),
            email: req.body.email,
            username: req.body.username,
            password: req.body.password
        }

        await db('user').insert(user).catch((err: Error) => {
            const sqlError: string = err.message.split(' - ')[1]
            if (sqlError.split(' ')[0] === 'Duplicate') {
                res.status(400).json(<GeneralResponse>{
                    status: responseStatus.error,
                    message: 'User already registered'
                })
                return
            }
            throw Error(sqlError)
        })

        res.json(<GeneralResponse>{
            status: responseStatus.success,
            message: 'Successfully created new user, please log in'
        })
    } catch (error: unknown) {
        next(error)
    }
}