// import mysql from 'mysql'
import dbConfig from '../configs/db.config.js'
import dotenv from 'dotenv'
dotenv.config()

// console.log(dbConfig)

// const connection = mysql.createPool({
//     host: dbConfig.HOST,
//     user: dbConfig.USER,
//     password: dbConfig.PASSWORD,
//     database: dbConfig.DB
// })



// export default connection

import { createPool } from 'mysql2/promise';

// Create a connection pool
// const pool = mysql.createPool({
//   host: dbConfig.HOST,
//   user: dbConfig.USER,
//   password: dbConfig.PASSWORD,
//   database: dbConfig.DB,
//   waitForConnections: true,
//   connectionLimit: 10, // Adjust according to your needs
//   queueLimit: 0,
//   connectTimeout: 10000
// });

const pool = createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    waitForConnections: true,
    connectionLimit: 10, // Adjust according to your needs
    queueLimit: 0,
  });
// const pool = createPool({
//     host: process.env.MYSQL_HOST,
//     port: process.env.MYSQL_PORT,
//     user: process.env.MYSQL_USER,
//     password: process.env.MYSQL_PASSWORD,
//     database: process.env.MYSQL_DB,
//     waitForConnections: true,
//     connectionLimit: 10, // Adjust according to your needs
//     queueLimit: 0,
//   });

 export async function checkDatabaseConnection() {
    try {
      // Get a connection from the pool
      const connection = await pool.getConnection();
  
      // If connection is successful, log the success message
      console.log('Connected to MySQL database successfully');
  
      // Release the connection back to the pool
      connection.release();
    } catch (error) {
      // Log and handle connection errors
      console.error('Error connecting to MySQL:', error);
    }
  }

export default pool