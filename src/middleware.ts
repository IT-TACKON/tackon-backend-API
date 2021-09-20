import jwt, { JwtPayload, VerifyErrors } from 'jsonwebtoken'
import { Request, Response, NextFunction } from 'express'
import { User } from './model/data'
import { UnauthorizedError } from './model/error'
import { db } from './utils/database'
import { ACCESS_TOKEN_SECRET } from './utils/env'

/** Middleware to verify jwt access token.
 * Request to endpoint with this middleware must provide jwt token in header with name `authorization`.
 * User must login to get jwt token.
 * Also validate is user registered or not. Throw error if doesn't
 * */
export function authenticateToken(req: Request, res: Response, next: NextFunction): void {
    try {
        const token: string | undefined = req.headers['authorization']
        if (!token) throw new UnauthorizedError('Cannot recieve or invalid token')
        jwt.verify(token, ACCESS_TOKEN_SECRET, async (err: VerifyErrors | null, user: JwtPayload | undefined) => {
            try {
                if (err || !user) throw new UnauthorizedError('Invalid token')
                const userInDatabase: User | undefined = await db<User>('user').select('*').where('email', user.email).first()
                if (!userInDatabase || userInDatabase.username != user.username) throw new UnauthorizedError('Wrong token or user is not registered')
                res.locals.user = user
                next()
            } catch (error: unknown) {
                next(error)
            }
        })
    } catch (error: unknown) {
        next(error)
    }
}