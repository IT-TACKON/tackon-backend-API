import { Router } from 'express'
import { authenticateToken } from './middleware/token'
import { register, login } from './controller/authentication'
import { errorTest } from './controller/error'
import { getQuestions } from './controller/question'

const router: Router = Router()

router.get('/error', errorTest)
router.post('/error', errorTest)
router.post('/login', login)
router.post('/register', register)
router.get('/questions', authenticateToken, getQuestions)

export default router