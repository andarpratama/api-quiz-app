import express from 'express'
import dotenv from 'dotenv'
import studentRoute from './routes/student.route.js'
import authRoute from './routes/auth.route.js'
import connection from './models/connection.js'
import logger from './middlewares/logger.js'
import userRoute from './routes/user.route.js'
const app = express()
dotenv.config()

app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.use(logger)
app.get('/', (req, res) => res.json({msg: "Hello Sanber"}))
app.use('/auth', authRoute)
app.use('/student', studentRoute)
app.use('/user', userRoute)

const PORT = process.env.PORT || 3000
app.listen(PORT, ()=> {
    console.log(`Server running on port http://localhost:${PORT}`)
})

// Log connection status to MySQL
connection.getConnection((err) => {
    if (err) {
        console.error('Error connecting to MySQL:', err);
        server.close();
    } else {
        console.log('Connected to MySQL database successfully');
    }
});