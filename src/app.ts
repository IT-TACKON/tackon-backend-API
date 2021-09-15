import * as env from './utils/env'
import express from 'express'
import router from './route'
import { notFound, internalServerError } from './controller/error'

const app = express()
app.use(express.json())

app.use(router)
app.use(notFound)
app.use(internalServerError)

const port = env.DEPLOY_PORT
const deploy = env.DEPLOY_IP
app.listen(port, () => {
    console.log(`Your app is listening on http://${deploy}:${port}`)
})