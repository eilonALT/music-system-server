import mysql from 'mysql2';
import dotenv from 'dotenv';
dotenv.config();

// const PASSWORD = process.env.PASSWORD;
// const USER_NAME = process.env.USER_NAME;
// const HOST = process.env.HOST;
// const DATABASE = process.env.DATABASE;
// const PORT = process.env.PORT;

const connection = mysql.createConnection({
    host: 'mysqldb',
    user: 'root',
    password: '123456',
    database: 'music-system',
    port: '3306'
});

export default connection;