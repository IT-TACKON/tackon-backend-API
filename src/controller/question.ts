import { db, fetchQuestionWithAuthor, fetchQuestionWithAuthorById } from '../utils/database'
import getCurrentDateTime from '../utils/date'
import { v4 as uuidv4 } from 'uuid'
import { Request, Response, NextFunction } from 'express'
import { Question, QuestionWithAuthor } from '../interface/question'
import { GeneralResponse, responseStatus } from '../interface/response'


export async function createNewQuestion(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
        const userId: string = res.locals.user.id
        const title: string = req.body.title
        const text: string = req.body.text
        if (!userId) {
            res.status(400).json(<GeneralResponse>{
                status: responseStatus.error,
                message: 'Author id not identified'
            })
            return
        }
        if (!title || !text) {
            res.status(400).json(<GeneralResponse>{
                status: responseStatus.error,
                message: 'Request body is not fulfilled'
            })
            return
        }
        const question: Question = {
            id: uuidv4(),
            created_at: getCurrentDateTime(),
            user_id: userId,
            title: title,
            text: text,
            upvote: 0,
        }
        await db<Question>('question').insert(question)
        res.status(200).json(<GeneralResponse>{
            status: responseStatus.success,
            message: 'Successfully create new question'
        })
    } catch (error: unknown) {
        next(error)
    }
}

/** Update existing title and text question */
export async function updateQuestion(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
        const userId: string = res.locals.user.id
        const questionId: string = req.params.question_id
        const newTitle: string = req.body.title
        const newText: string = req.body.text
        if (!userId) {
            res.status(400).json(<GeneralResponse>{
                status: responseStatus.error,
                message: 'Author id not identified'
            })
            return
        }
        if (!newTitle || !newText || !questionId) {
            res.status(400).json(<GeneralResponse>{
                status: responseStatus.error,
                message: 'Request body or parameter is not fulfilled'
            })
            return
        }
        const question: Question | undefined = await db<Question>('question').select('*').where('id', questionId).first()
        if (!question) {
            res.status(400).json(<GeneralResponse>{
                status: responseStatus.error,
                message: 'Cannot find question'
            })
            return
        }
        if (userId != question.user_id) {
            res.status(400).json(<GeneralResponse>{
                status: responseStatus.error,
                message: 'User not authorized to edit someone else\'s questions'
            })
            return
        }
        await db<Question>('question')
            .where('id', questionId)
            .update({ 'title': newTitle, 'text': newText })
        res.status(200).json(<GeneralResponse>{
            status: responseStatus.success,
            message: 'Successfully updated question'
        })
    } catch (error: unknown) {
        next(error)
    }
}

export async function deleteQuestion(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
        const userId: string = res.locals.user.id
        const questionId: string = req.params.question_id
        if (!userId) {
            res.status(400).json(<GeneralResponse>{
                status: responseStatus.error,
                message: 'Author id not identified'
            })
            return
        }
        if (!questionId) {
            res.status(400).json(<GeneralResponse>{
                status: responseStatus.error,
                message: 'Question id is not provided'
            })
            return
        }
        const question: Question | undefined = await db<Question>('question').select('*').where('id', questionId).first()
        if (!question) {
            res.status(400).json(<GeneralResponse>{
                status: responseStatus.error,
                message: 'Cannot find question'
            })
            return
        }
        if (userId != question.user_id) {
            res.status(400).json(<GeneralResponse>{
                status: responseStatus.error,
                message: 'User not authorized to delete someone else\'s questions'
            })
            return
        }
        await db<Question>('question')
            .where('id', questionId)
            .delete()
        res.status(200).json(<GeneralResponse>{
            status: responseStatus.success,
            message: 'Successfully deleted question'
        })
    } catch (error: unknown) {
        next(error)
    }
}

/** Fetch all questions data */
export async function getQuestions(_req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
        const questions: QuestionWithAuthor[] = await fetchQuestionWithAuthor()
        res.status(200).json({
            status: responseStatus.success,
            questions: questions
        })
    } catch (error: unknown) {
        next(error)
    }
}

/** Search questions by title as keyword */
export async function getQuestionByKeyword(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
        const keyword: string = req.params.keyword
        if (!keyword) {
            res.status(400).json(<GeneralResponse>{
                status: responseStatus.error,
                message: 'Cannot identify author id'
            })
            return
        }
        const questions: QuestionWithAuthor[] = await fetchQuestionWithAuthor()
        res.status(200).json({
            status: responseStatus.success,
            questions: questions.filter((question: QuestionWithAuthor) => question.title.toLowerCase().includes(keyword.toLowerCase()))
        })
    } catch (error: unknown) {
        next(error)
    }
}

/** Get questions asked by specific user */
export async function getQuestionByAuthorId(_req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
        const userId: string = res.locals.user.id
        if (!userId) {
            res.status(400).json(<GeneralResponse>{
                status: responseStatus.error,
                message: 'Author id not identified'
            })
            return
        }
        const questions: QuestionWithAuthor[] = await fetchQuestionWithAuthor()
        res.status(200).json({
            status: responseStatus.success,
            questions: questions.filter((question: QuestionWithAuthor) => question.user_id == userId)
        })
    } catch (error: unknown) {
        next(error)
    }
}

/** Get single specific question by it's id */
export async function getQuestionByQuestionId(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
        const question_id: string = req.params.question_id
        if (!question_id) {
            res.status(400).json(<GeneralResponse>{
                status: responseStatus.error,
                message: 'Question id is not provided'
            })
            return
        }
        const question: QuestionWithAuthor = await fetchQuestionWithAuthorById(question_id)
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