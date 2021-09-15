import { User } from './user'

export interface Question {
    id: string
    title: string
    text: string
    author: User
}