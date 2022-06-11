import mysql from 'mysql2';
import dotenv from 'dotenv';
dotenv.config();

// im not using secrets or env variables for now
const connection = mysql.createConnection({
    host: 'mysqldb',
    user: 'root',
    password: '123456',
    database: 'music-system',
    port: '3306'
});

export default connection;