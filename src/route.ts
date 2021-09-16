import { Router } from 'express'
import { authenticateToken } from './middleware/token'
import { register, login } from './controller/authentication'
import * as questionController from './controller/question'

const router: Router = Router()

// Authentication endpoint
router.post('/login', login)
router.post('/register', register)

// Question related endpoint
router.get('/questions', authenticateToken, questionController.getQuestions)
router.get('/questions/detail/:question_id', authenticateToken, questionController.getQuestionByQuestionId)
router.get('/questions/search/:keyword', authenticateToken, questionController.getQuestionByKeyword)
router.post('/questions', authenticateToken, questionController.createNewQuestion)

// User related endpoint
router.get('/user/questions', authenticateToken, questionController.getQuestionByAuthorId)

export default router