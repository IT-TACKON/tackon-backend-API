export interface GeneralResponse {
    status: string,
    message: string
}

export interface ResponseStatus {
    error: string,
    success: string
}

export const responseStatus: ResponseStatus = {
    error: 'error',
    success: 'success'
}