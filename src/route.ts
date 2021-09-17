import { Router } from 'express'
import { authenticateToken } from './middleware/token'
import { register, login } from './controller/authentication'
import { getMyProfile, updateMyData } from './controller/user'
import * as questionController from './controller/question'

const router: Router = Router()

// Authentication endpoint
router.post('/login', login)
router.post('/register', register)

// Question related endpoint
router.get('/questions', authenticateToken, questionController.getQuestions)
router.post('/questions', authenticateToken, questionController.createNewQuestion)
router.get('/questions/:question_id', authenticateToken, questionController.getQuestionByQuestionId)
router.patch('/questions/:question_id', authenticateToken, questionController.updateQuestion)
router.delete('/questions/:question_id', authenticateToken, questionController.deleteQuestion)
router.get('/questions/search/:keyword', authenticateToken, questionController.getQuestionByKeyword)

// User related endpoint
router.get('/user', authenticateToken, getMyProfile)
router.patch('/user', authenticateToken, updateMyData)
router.get('/user/questions', authenticateToken, questionController.getQuestionByAuthorId)

export default router