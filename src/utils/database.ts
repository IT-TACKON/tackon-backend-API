import knex from 'knex'
import { DB_HOST, DB_PORT, DB_USER, DB_PASSWORD, DB_NAME } from './env'
import { Question } from '../model/data'

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

/** Fetch data question berserta dengan username author.
 * Jika parameter `questionId` kosong maka return list semua question 
 * Jika parameter terisi maka filter dengan `id` tersebut. 
 * @param filterBy
 * @param compareWith
 * @returns Promise<Question[]>
 */
export async function fetchQuestion(filterBy?: string | undefined, compareWith?: string | undefined): Promise<Question[]> {
    if (filterBy && compareWith) {
        return await db<Question>('question')
            .join('user', 'user.id', 'question.user_id')
            .select('question.id', 'user.id as user_id', 'user.username as author', 'question.title', 'question.text', 'question.upvote', 'question.solving_comment_id', 'question.created_at')
            .orderBy('created_at', 'desc')
            .where<Question[]>(filterBy, compareWith)
    }
    return await db<Question>('question')
        .join('user', 'user.id', 'question.user_id')
        .select('question.id', 'user.id as user_id', 'user.username as author', 'question.title', 'question.text', 'question.upvote', 'question.solving_comment_id', 'question.created_at')
        .orderBy('created_at', 'desc')
}