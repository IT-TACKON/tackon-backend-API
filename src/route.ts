import { Router } from 'express'
import { authenticateToken } from './middleware/token'
import { register, login } from './controller/authentication'
import { getQuestions, getQuestionByAuthorId, getQuestionByQuestionId, getQuestionByKeyword } from './controller/question'

const router: Router = Router()

// Authentication endpoint
router.post('/login', login)
router.post('/register', register)

// Question related endpoint
router.get('/questions', authenticateToken, getQuestions)
router.get('/questions/detail/:question_id', authenticateToken, getQuestionByQuestionId)
router.get('/questions/search/:keyword', authenticateToken, getQuestionByKeyword)

// User related endpoint
router.get('/user/questions/:user_id', authenticateToken, getQuestionByAuthorId)

export default router