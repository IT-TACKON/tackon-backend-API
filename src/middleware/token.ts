import { Request, Response, NextFunction } from 'express'
import jwt, { JwtPayload, VerifyErrors } from 'jsonwebtoken'
import { GeneralResponse, responseStatus } from '../interface/response'
import { ACCESS_TOKEN_SECRET } from '../utils/env'

/** Middleware to verify jwt access token.
 * Request to endpoint with this middleware must provide jwt token in header with name `authorization`.
 * User must login to get jwt token*/
export function authenticateToken(req: Request, res: Response, next: NextFunction): void {
    try {
        const token: string = req.headers['authorization'] ?? ''
        if (token === '') {
            res.status(401).json(<GeneralResponse>{
                status: responseStatus.error,
                message: 'Cannot recieve or invalid token'
            })
            return
        }
        jwt.verify(token, ACCESS_TOKEN_SECRET, (err: VerifyErrors | null, user: JwtPayload | undefined) => {
            if (err || !user) {
                res.status(403).json(<GeneralResponse>{
                    status: responseStatus.error,
                    message: 'Invalid token'
                })
                return
            }
            res.locals.user = user
            next()
        })
    } catch (error) {
        next(error)
    }
}