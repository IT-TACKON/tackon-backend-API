import { Router } from 'express'
import { authenticateToken, login } from './controller/authentication'
import { errorTest } from './controller/error'
import { getQuestions } from './controller/question'

const router: Router = Router()

router.get('/error', errorTest)
router.post('/error', errorTest)
router.get('/questions', authenticateToken, getQuestions)
router.post('/login', login)

export default router