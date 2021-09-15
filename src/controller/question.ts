import { Request, Response } from 'express'
import { Question } from '../interface/question'
import { responseStatus } from '../interface/response'

export function getQuestions(_req: Request, res: Response): void {
    res.status(200).json({
        status: responseStatus.success,
        questions: dummyQuestions
    })
}

const dummyQuestions: Question[] = [
    <Question>{
        id: '99e125f5-17ba-4656-aa40-46b0b19bf98d',
        title: 'awda',
        text: 'ddawdas',
        upvote: 100,
        user_id: '872f5fce-1e1b-4e6e-ac55-f08636f0544a',
        created_at: Date.now()
    },
    <Question>{
        id: 'd506b6e8-6a56-429f-b5a5-c66d9833560f',
        title: 'awda',
        text: 'ddawdas',
        upvote: 100,
        user_id: '123f5fce-1e1b-4e6e-ac55-f08636f0544a',
        created_at: Date.now()
    }
]