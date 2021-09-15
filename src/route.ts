import { Router, Request, Response } from 'express'
import { errorTest } from './controller/error'

const router: Router = Router()

router.get('/error', errorTest)
router.post('/error', errorTest)
router.get('/', (_req: Request, res: Response) => {
    res.json({
        'status': 'success',
        'message': 'index page'
    })
})

export default router