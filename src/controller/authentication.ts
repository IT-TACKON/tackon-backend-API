import jwt, { JwtPayload, VerifyErrors } from 'jsonwebtoken'
import { Request, Response, NextFunction } from 'express'
import { User } from '../interface/user'
import { ErrorResponse, responseStatus } from '../interface/response'
import { ACCESS_TOKEN_SECRET } from '../utils/env'

export function authenticateToken(req: Request, res: Response, next: NextFunction): void {
    try {
        const token: string = req.headers['authorization'] ?? ''
        if (token === '') {
            res.status(401).json(<ErrorResponse>{
                status: responseStatus.error,
                message: 'Cannot recieve or invalid token'
            })
            return
        }
        jwt.verify(token, ACCESS_TOKEN_SECRET, (err: VerifyErrors | null, user: JwtPayload | undefined) => {
            if (err) {
                res.status(403).json(<ErrorResponse>{
                    status: responseStatus.error,
                    message: 'Failed to verify token'
                })
                return
            }
            console.log(user)
            next()
        })

    } catch (error) {
        next(error)
    }
}

export function login(req: Request, res: Response, next: NextFunction): void {
    try {
        const user: User = {
            id: req.body.id,
            email: req.body.email,
            username: req.body.username,
            password: req.body.password,
            created_at: req.body.created_at
        }

        if (ACCESS_TOKEN_SECRET === '') {
            throw new Error('Missing ACCESS_TOKEN_SECRET')
        }
        const accessToken: string = jwt.sign(user, ACCESS_TOKEN_SECRET)
        res.status(200).json({
            status: responseStatus.success,
            user: { ...user, accessToken: accessToken }
        })
    } catch (error) {
        next(error)
    }
}