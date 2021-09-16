import { Request, Response, NextFunction } from 'express'
import { Question } from '../interface/question'
import { GeneralResponse, responseStatus } from '../interface/response'

/** Fetch all questions data */
export function getQuestions(_req: Request, res: Response, next: NextFunction): void {
    try {
        res.status(200).json({
            status: responseStatus.success,
            questions: dummyQuestions
        })
    } catch (error: unknown) {
        next(error)
    }
}

/** Search questions by title as keyword */
export function getQuestionByKeyword(req: Request, res: Response, next: NextFunction): void {
    try {
        const keyword: string = req.params.keyword
        if (!keyword) {
            res.status(400).json(<GeneralResponse>{
                status: responseStatus.error,
                message: 'Author id not identified'
            })
            return
        }
        res.status(200).json({
            status: responseStatus.success,
            questions: dummyQuestions.filter((question: Question) => question.title.includes(keyword))
        })
    } catch (error: unknown) {
        next(error)
    }
}

/** Get questions asked by specific user */
export function getQuestionByAuthorId(req: Request, res: Response, next: NextFunction): void {
    try {
        const param_id: string = req.params.user_id
        if (!param_id) {
            res.status(400).json(<GeneralResponse>{
                status: responseStatus.error,
                message: 'Author id not identified'
            })
            return
        }
        res.status(200).json({
            status: responseStatus.success,
            questions: dummyQuestions.filter((question: Question) => question.user_id == param_id)
        })
    } catch (error: unknown) {
        next(error)
    }
}

/** Get single specific question by it's id */
export function getQuestionByQuestionId(req: Request, res: Response, next: NextFunction): void {
    try {
        const question_id: string = req.params.question_id
        if (!question_id) {
            res.status(400).json(<GeneralResponse>{
                status: responseStatus.error,
                message: 'Question id is not provided'
            })
            return
        }
        const question: Question | undefined = dummyQuestions.find((question: Question) => question.id == question_id)
        if (!question) {
            res.status(400).json(<GeneralResponse>{
                status: responseStatus.error,
                message: 'Question not found'
            })
            return
        }
        res.status(200).json({
            status: responseStatus.success,
            question: question
        })
    } catch (error: unknown) {
        next(error)
    }
}

const dummyQuestions: Question[] = [
    <Question>{
        id: '99e125f5-17ba-4656-aa40-46b0b19bf98d',
        title: 'kenapa perlu itu',
        text: 'ddawdas',
        upvote: 100,
        user_id: '872f5fce-1e1b-4e6e-ac55-f08636f0544a',
        created_at: Date.now()
    },
    <Question>{
        id: 'd506b6e8-6a56-429f-b5a5-c66d9833560f',
        title: 'apa yang dimaksud',
        text: 'dasd',
        upvote: 100,
        user_id: '123f5fce-1e1b-4e6e-ac55-f08636f0544a',
        created_at: Date.now()
    }
]