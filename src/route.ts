import { Router } from 'express'
import { authenticateToken } from './middleware'
import { register, login } from './controller/authentication'
import { deleteAccount, getMyProfile, updateMyData } from './controller/user'
import * as commentController from './controller/comment'
import * as questionController from './controller/question'

const router: Router = Router()

// Authentication endpoint
router.post('/login', login)
router.post('/register', register)

// Question related endpoint
router.get('/questions', authenticateToken, questionController.getQuestions)
router.post('/questions', authenticateToken, questionController.createNewQuestion)
router.get('/questions/:question_id', authenticateToken, questionController.getQuestionById)
router.patch('/questions/:question_id/solving/:comment_id', authenticateToken, questionController.updateSolvingComment)
router.delete('/questions/:question_id/solving/', authenticateToken, questionController.deleteSolvingComment)
router.patch('/questions/:question_id', authenticateToken, questionController.updateQuestion)
router.delete('/questions/:question_id', authenticateToken, questionController.deleteQuestion)
router.post('/questions/upvote/:question_id', authenticateToken, questionController.upvoteQuestion)
router.post('/questions/downvote/:question_id', authenticateToken, questionController.downvoteQuestion)
router.get('/questions/search/:keyword', authenticateToken, questionController.getQuestionByKeyword)

// Comments related
router.get('/questions/:question_id/comments', authenticateToken, commentController.getCommentsByQuestionId)
router.post('/questions/:question_id/comments', authenticateToken, commentController.postNewComment)
router.patch('/comments/:comment_id', authenticateToken, commentController.updateComment)
router.delete('/comments/:comment_id', authenticateToken, commentController.deleteComment)

// User related endpoint
router.get('/user', authenticateToken, getMyProfile)
router.get('/user/questions', authenticateToken, questionController.getQuestionByAuthorId)
router.patch('/user', authenticateToken, updateMyData)
router.delete('/user', authenticateToken, deleteAccount)

export default router