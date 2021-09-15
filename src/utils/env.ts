import { config } from 'dotenv'
config()

export const DEPLOY_IP: string = process.env.DEPLOY_IP ?? 'localhost'
export const DEPLOY_PORT: number = parseInt(<string>process.env.DEPLOY_PORT ?? 3000, 10)