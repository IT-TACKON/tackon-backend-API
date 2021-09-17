import * as env from './utils/env'
import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import router from './route'
import { notFoundRoute, errorHandlingRoute } from './controller/error'

// Middleware and security
const app: express.Express = express()
app.use(helmet())
app.use(cors())
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

// Routing
app.use(router)
app.use(notFoundRoute)
app.use(errorHandlingRoute)

// Deploy server
const port: number = env.DEPLOY_PORT
const deploy: string = env.DEPLOY_IP
app.listen(port, () => {
    console.log(`Your app is listening on http://${deploy}:${port}`)
})