import { v4 as uuidv4 } from 'uuid'
import { Request, Response, NextFunction } from 'express'
import { Question } from '../model/data'
import { GeneralResponse, responseStatus } from '../model/response'
import { NotFoundError, RequestPayloadError, UnauthorizedError } from '../model/error'
import getCurrentDateTime from '../utils/date'
import { db, fetchQuestion } from '../utils/database'


/** Create new question. Require title and text from request body */
export async function createNewQuestion(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
        // Validate required request payload
        const userId: string = res.locals.user.id
        const title: string = req.body.title
        const text: string = req.body.text
        if (!userId) throw new RequestPayloadError('Author id not identified')
        if (!title || !text) throw new RequestPayloadError('Request body is not fulfilled')

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
        // Validate request payload
        const userId: string = res.locals.user.id
        const questionId: string = req.params.question_id
        const newTitle: string = req.body.title
        const newText: string = req.body.text
        if (!userId) throw new RequestPayloadError('Author id not identified')
        if (!newTitle || !newText || !questionId) throw new RequestPayloadError('Request body or parameter is not fulfilled')

        // Only allow user to update his/her own question
        const question: Question | undefined = await db<Question>('question').select('*').where('id', questionId).first()
        if (!question) throw new NotFoundError('Cannot find question')
        if (userId != question.user_id) throw new UnauthorizedError('Cannot edit someone else\'s questions')

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
        // Validate request payload
        const userId: string = res.locals.user.id
        const questionId: string = req.params.question_id
        if (!userId) throw new RequestPayloadError('Author id not identified')
        if (!questionId) throw new RequestPayloadError('Question id is not provided')

        const question: Question | undefined = await db<Question>('question')
            .select('*')
            .where('id', questionId)
            .first()
        if (!question) throw new NotFoundError('Cannot find question')
        if (userId != question.user_id) throw new UnauthorizedError('User not authorized to delete someone else\'s questions')

        await db<Question>('question').where('id', questionId).delete()
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
        const questions: Question[] = await fetchQuestion()
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
        if (!keyword) throw new RequestPayloadError('Request body is not fulfilled')
        const questions: Question[] = await fetchQuestion('question.title', keyword)
        res.status(200).json({
            status: responseStatus.success,
            questions: questions
        })
    } catch (error: unknown) {
        next(error)
    }
}

/** Get questions asked by specific user */
export async function getQuestionByAuthorId(_req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
        const userId: string = res.locals.user.id
        if (!userId) throw new RequestPayloadError('Author id not identified')
        const questions: Question[] = await fetchQuestion('question.user_id', userId)
        res.status(200).json({
            status: responseStatus.success,
            questions: questions
        })
    } catch (error: unknown) {
        next(error)
    }
}

/** Get single specific question by it's id */
export async function getQuestionById(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
        const questionId: string = req.params.question_id
        const question: Question = (await fetchQuestion('question.id', questionId))[0]
        if (!question) throw new NotFoundError('Question does not exist')
        res.status(200).json({
            status: responseStatus.success,
            question: question
        })
    } catch (error: unknown) {
        next(error)
    }
}

export async function upvoteQuestion(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
        const questionId: string = req.params.question_id
        await db<Question>('question').where('id', questionId).increment('upvote', 1)
        res.status(200).json(<GeneralResponse>{
            status: responseStatus.success,
            message: 'Successfully vote up question'
        })
    } catch (error: unknown) {
        next(error)
    }
}

export async function downvoteQuestion(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
        const questionId: string = req.params.question_id
        await db<Question>('question').where('id', questionId).decrement('upvote', 1)
        res.status(200).json(<GeneralResponse>{
            status: responseStatus.success,
            message: 'Successfully vote down question'
        })
    } catch (error: unknown) {
        next(error)
    }
}