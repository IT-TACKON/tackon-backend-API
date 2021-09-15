import { config } from 'dotenv'
config()

export const ACCESS_TOKEN_SECRET: string = process.env.ACCESS_TOKEN_SECRET ?? ''
export const REFRESH_TOKEN_SECRET: string = process.env.REFRESH_TOKEN_SECRET ?? ''
export const DEPLOY_IP: string = process.env.DEPLOY_IP ?? 'localhost'
export const DEPLOY_PORT: number = parseInt(<string>process.env.DEPLOY_PORT ?? 3000, 10)