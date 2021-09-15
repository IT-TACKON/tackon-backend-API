import { config } from 'dotenv'
config()

export const ACCESS_TOKEN_SECRET: string = process.env.ACCESS_TOKEN_SECRET ?? ''
export const REFRESH_TOKEN_SECRET: string = process.env.REFRESH_TOKEN_SECRET ?? ''
export const DEPLOY_IP: string = process.env.DEPLOY_IP ?? 'localhost'
export const DEPLOY_PORT: number = parseInt(<string>process.env.DEPLOY_PORT ?? 3000, 10)
export const DB_HOST: string = process.env.DB_HOST ?? 'localhost'
export const DB_PORT: number = parseInt(<string>process.env.DB_PORT ?? 3306, 10)
export const DB_USER: string = process.env.DB_USER ?? 'root'
export const DB_PASSWORD: string = process.env.DB_PASSWORD ?? ''
export const DB_NAME: string = process.env.DB_NAME ?? ''