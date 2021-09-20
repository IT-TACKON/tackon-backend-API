import { v4 as uuidv4 } from 'uuid'
import { Request, Response, NextFunction } from 'express'
import { db } from '../utils/database'
import getCurrentDateTime from '../utils/date'
import { Comment, Question } from '../model/data'
import { GeneralResponse, responseStatus } from '../model/response'
import { NotFoundError, RequestPayloadError, UnauthorizedError } from '../model/error'

/** Fetch list of comments has by specific question */
export async function getCommentsByQuestionId(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
        const questionId: string = req.params.question_id
        const isQuestionExist = await db<Question>('question').select('*').where('id', questionId).first()
        if (!isQuestionExist) throw new NotFoundError('Question does not exist')

        const comments: Comment[] = await db<Comment>('comment')
            .join('user', 'user.id', 'comment.user_id')
            .where('comment.question_id', questionId)
            .select(
                'comment.id',
                'user.id as user_id',
                'comment.question_id',
                'user.username as author',
                'comment.text',
                'comment.created_at'
            )
            .orderBy('created_at', 'desc')
        res.status(200).json({
            status: responseStatus.success,
            comments: comments
        })
    } catch (error: unknown) {
        next(error)
    }
}

/** Post a new comment to a specific question */
export async function postNewComment(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
        const userId: string | undefined = res.locals.user.id
        const text: string | undefined = req.body.text
        if (!userId || !text) throw new RequestPayloadError('Request payload is not fulfilled')
        const questionId: string = req.params.question_id
        const isQuestionExist = await db<Question>('question').select('*').where('id', questionId).first()
        if (!isQuestionExist) throw new NotFoundError('Question does not exist')

        const commment: Comment = <Comment>{
            id: uuidv4(),
            user_id: userId,
            question_id: questionId,
            text: text,
            created_at: getCurrentDateTime()
        }

        await db<Comment>('comment').insert(commment)
        res.status(200).json(<GeneralResponse>{
            status: responseStatus.success,
            message: 'Successfully posted new comment'
        })
    } catch (error: unknown) {
        next(error)
    }
}

/** Update the text of existing comment. Only the owner can update owned comment */
export async function updateComment(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
        // Perform validation
        const userId: string = res.locals.user.id
        const text: string | undefined = req.body.text
        if (!userId || !text) throw new RequestPayloadError('Request payload is not fulfilled')
        const commentId: string = req.params.comment_id
        const comment = await db<Comment>('comment').select('*').where('id', commentId).first()
        if (!comment) throw new NotFoundError('Comment does not exist')
        if (comment.user_id != userId) throw new UnauthorizedError('Cannot edit someone else\'s comment')

        await db<Comment>('comment').where('id', commentId).update('text', text)
        res.status(200).json(<GeneralResponse>{
            status: responseStatus.success,
            message: 'Successfully updated comment'
        })
    } catch (error: unknown) {
        next(error)
    }
}

export async function deleteComment(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
        // Perform validation
        const userId: string = res.locals.user.id
        if (!userId) throw new RequestPayloadError('Author id not identified')
        const commentId: string = req.params.comment_id
        const comment = await db<Comment>('comment').select('*').where('id', commentId).first()
        if (!comment) throw new NotFoundError('Comment does not exist')
        if (comment.user_id != userId) throw new UnauthorizedError('Cannot delete someone else\'s comment')

        await db<Comment>('comment').where('id', commentId).delete()
        res.status(200).json(<GeneralResponse>{
            status: responseStatus.success,
            message: 'Successfully deleted comment'
        })
    } catch (error: unknown) {
        next(error)
    }
}