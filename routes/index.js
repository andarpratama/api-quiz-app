import express from 'express'
import studentRoute from './student.route.js'
import authRoute from './auth.route.js'
import userRoute from './user.route.js'

const routes = express()

routes.get('/', (req, res) => res.json({msg: "Hello Sanber"}))
routes.use('/auth', authRoute)
routes.use('/student', studentRoute)
routes.use('/user', userRoute)


export default routes

