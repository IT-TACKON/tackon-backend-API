import { Request, Response } from 'express'
import { Question } from '../interface/question'
import { User } from '../interface/user'
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
        author: <User>{
            id: '872f5fce-1e1b-4e6e-ac55-f08636f0544a',
            username: 'string',
            email: 'string',
            password: 'string',
            created_at: 'string'
        }
    },
    <Question>{
        id: 'd506b6e8-6a56-429f-b5a5-c66d9833560f',
        title: 'dasd',
        text: 'ddawasdasdas',
        author: <User>{
            id: '33c7f933-7312-4fab-a616-f2141fb84d46',
            username: 'sdatring',
            email: 'striasng',
            password: 'staring',
            created_at: 'strasding'
        }
    }
]