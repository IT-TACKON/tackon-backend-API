import { Request, Response, NextFunction, ErrorRequestHandler } from 'express'

export function notFound(_req: Request, res: Response): void {
    res.status(404).json({
        'status': 'error',
        'message': 'Endpoint not found'
    })
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars, no-unused-vars
export function internalServerError(error: ErrorRequestHandler, _req: Request, res: Response, _next: NextFunction): void {
    res.json({
        'status': 'error',
        'message': error.toString()
    })
}

export function errorTest(_req: Request, _res: Response, next: NextFunction): void {
    next(new Error('Internal server error'))
}