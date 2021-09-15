import { Request, Response, NextFunction, ErrorRequestHandler } from 'express'
import { GeneralResponse, responseStatus } from '../interface/response'

/** Handle request for not registered endpoint (404 Not Found error) */
export function notFound(_req: Request, res: Response): void {
    res.status(404).json(<GeneralResponse>{
        status: responseStatus.error,
        message: 'Request endpoint not found'
    })
}

/** Handle internal server error (500 error) */
// eslint-disable-next-line @typescript-eslint/no-unused-vars, no-unused-vars
export function internalServerError(error: ErrorRequestHandler, _req: Request, res: Response, _next: NextFunction): void {
    res.status(500).json(<GeneralResponse>{
        status: responseStatus.error,
        message: error.toString()
    })
}

/** Simulate error handling middleware with dummy Error */
export function errorTest(_req: Request, _res: Response, next: NextFunction): void {
    next(new Error('Internal server error'))
}