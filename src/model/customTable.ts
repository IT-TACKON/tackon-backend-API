import { User, Comment, Question } from './data'

declare module 'knex/types/tables' {
    interface Tables {
        user: User,
        question: Question,
        comment: Comment
    }
}