import { Router } from 'express'
import { authenticateToken, validateRequestPayload } from './middleware'
import { register, login } from './controller/authentication'
import { deleteAccount, getMyProfile, updateMyData } from './controller/user'
import * as commentController from './controller/comment'
import * as questionController from './controller/question'
import * as validationRules from './utils/validator'


const router: Router = Router()

// User Authentication
router.post('/login', validationRules.loginRules, validateRequestPayload, login)
router.post('/register', validationRules.registerRules, validateRequestPayload, register)

// Question related endpoint
router.get('/questions', authenticateToken, questionController.getQuestions)
router.get('/questions/:question_id', authenticateToken, questionController.getQuestionById)
router.get('/questions/search/:keyword', authenticateToken, questionController.getQuestionByKeyword)
router.post('/questions',
    authenticateToken,
    validationRules.questionRules,
    validateRequestPayload,
    questionController.createNewQuestion
)
router.patch(
    '/questions/:question_id',
    authenticateToken,
    validationRules.questionRules,
    validateRequestPayload,
    questionController.updateQuestion
)
router.delete('/questions/:question_id', authenticateToken, questionController.deleteQuestion)
router.patch('/questions/:question_id/solving/:comment_id', authenticateToken, questionController.updateSolvingComment)
router.delete('/questions/:question_id/solving/', authenticateToken, questionController.deleteSolvingComment)
router.post('/questions/upvote/:question_id', authenticateToken, questionController.upvoteQuestion)
router.post('/questions/downvote/:question_id', authenticateToken, questionController.downvoteQuestion)

// Comments related
router.get('/questions/:question_id/comments', authenticateToken, commentController.getCommentsByQuestionId)
router.delete('/comments/:comment_id', authenticateToken, commentController.deleteComment)
router.post(
    '/questions/:question_id/comments',
    authenticateToken,
    validationRules.commentRules,
    validateRequestPayload,
    commentController.postNewComment
)
router.patch(
    '/comments/:comment_id',
    authenticateToken,
    validationRules.commentRules,
    validateRequestPayload,
    commentController.updateComment
)

// User related endpoint
router.get('/user', authenticateToken, getMyProfile)
router.get('/user/questions', authenticateToken, questionController.getQuestionByAuthorId)
router.patch(
    '/user',
    authenticateToken,
    validationRules.updateUserRules,
    validateRequestPayload,
    updateMyData
)
router.delete(
    '/user',
    authenticateToken,
    validationRules.deleteUserRules,
    validateRequestPayload,
    deleteAccount
)

export default router