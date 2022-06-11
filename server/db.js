import mysql from 'mysql2';
import dotenv from 'dotenv';
dotenv.config();

const PASSWORD = process.env.PASSWORD;

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: PASSWORD,
    database: 'music-system',
    port: 3306
});

export default connection;