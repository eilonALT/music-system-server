import mysql from 'mysql2';
import dotenv from 'dotenv';
dotenv.config();

// const PASSWORD = MYSQL_ROOT_PASSWORD;
// const USER_NAME = MYSQL_USER;
// const HOST = MYSQL_HOST;
// const DATABASE = MYSQL_DATABASE;
// const PORT = MYSQL_PORT;

const connection = mysql.createConnection({
    host: 'mysqldb',
    user: 'root',
    password: '123456',
    database: 'music-system',
    port: "3306"
});

export default connection;