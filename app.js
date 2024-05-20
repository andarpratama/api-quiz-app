import express from 'express'
import dotenv from 'dotenv'
import logger from './middlewares/logger.js'
import errorHandler from './middlewares/errorHandler.js'
import { checkDatabaseConnection } from './models/connection.js'
import routes from './routes/index.js'
import cors from 'cors'


const app = express()
dotenv.config()
app.use(cors());
app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.use(logger)
app.use(routes)
app.use(errorHandler)

const PORT = process.env.PORT || 3000
app.listen(PORT, ()=> {
    console.log(`Server running on port http://localhost:${PORT}`)
    checkDatabaseConnection()
})

// Log connection status to MySQL
// connection.getConnection((err) => {
//     if (err) {
//         console.error('Error connecting to MySQL:', err);
//         server.close();
//     } else {
//         console.log('Connected to MySQL database successfully');
//     }
// });

 // Assuming your connection pool is exported from db.js

// Example query execution


export default app;