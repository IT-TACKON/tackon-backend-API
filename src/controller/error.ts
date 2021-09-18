import { Request, Response, NextFunction, ErrorRequestHandler } from 'express'
import { NotFoundError, RequestPayloadError, UnauthorizedError } from '../interface/customError'
import { GeneralResponse, responseStatus } from '../interface/response'

/** Handle request for not registered endpoint (404 Not Found error) */
export function notFoundRoute(_req: Request, res: Response): void {
    res.status(404).json(<GeneralResponse>{
        status: responseStatus.error,
        message: 'Request endpoint not found'
    })
}

/** Handle internal server error (500 error) */
// eslint-disable-next-line @typescript-eslint/no-unused-vars, no-unused-vars
export function errorHandlingController(error: ErrorRequestHandler, _req: Request, res: Response, _next: NextFunction): void {
    let errorCode: number
    if (error instanceof RequestPayloadError) {
        errorCode = 400
    } else if (error instanceof UnauthorizedError) {
        errorCode = 401
    } else if (error instanceof NotFoundError) {
        errorCode = 404
    } else {
        errorCode = 500
    }
    res.status(errorCode).json(<GeneralResponse>{
        status: responseStatus.error,
        message: error.toString()
    })
}