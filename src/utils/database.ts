import knex from 'knex'
import { DB_HOST, DB_PORT, DB_USER, DB_PASSWORD, DB_NAME } from './env'
import { QuestionWithAuthor } from '../interface/question'

export const db = knex({
    client: 'mysql2',
    connection: {
        host: DB_HOST,
        port: DB_PORT,
        user: DB_USER,
        password: DB_PASSWORD,
        database: DB_NAME,
    }
})

export async function fetchQuestionWithAuthor(): Promise<QuestionWithAuthor[]> {
    return await db<QuestionWithAuthor>('question')
        .join('user', 'user.id', 'question.user_id')
        .select('question.id', 'user.id as user_id', 'user.username as author', 'question.title', 'question.text', 'question.upvote', 'question.created_at')
        .orderBy('created_at', 'desc')
}

export async function fetchQuestionWithAuthorById(questionId: string): Promise<QuestionWithAuthor> {
    return await db<QuestionWithAuthor>('question')
        .join('user', 'user.id', 'question.user_id')
        .select('question.id', 'user.id as user_id', 'user.username as author', 'question.title', 'question.text', 'question.upvote', 'question.created_at')
        .orderBy('created_at', 'desc')
        .where('question.id', questionId)
        .first()
}