export class RequestPayloadError extends Error {
    constructor(msg: string) {
        super(msg)
        Object.setPrototypeOf(this, RequestPayloadError.prototype)
    }
}

export class UnauthorizedError extends Error {
    constructor(msg: string) {
        super(msg)
        Object.setPrototypeOf(this, RequestPayloadError.prototype)
    }
}

export class NotFoundError extends Error {
    constructor(msg: string) {
        super(msg)
        Object.setPrototypeOf(this, RequestPayloadError.prototype)
    }
}