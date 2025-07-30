 import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import userRoute from './routes/user.routes.js'

const app = express()
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true, limit: '16kb' }))
app.use(cookieParser())

app.use('/api/user', userRoute)

export { app }
