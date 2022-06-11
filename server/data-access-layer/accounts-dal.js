import connection from './db.js';
import { StatusCodes } from 'http-status-codes'; //nice laibrary to help with error status codes


const getActiveAccountsFromDB = async (offset, limit) => {
    let result = {
        success: false,
        data: null,
        status: null,
    }

    try {
        // i created a query to get the accounts that are active with the isActive index to improve the performance of the application
        let res = await connection.promise().query(
            `SELECT * FROM accounts WHERE is_active = 1 LIMIT ${offset ? offset + ',' : ''}${limit};`
        )
        // if the query is successful, we return the following object
        result.success = true
        result.data = res[0]
        result.status = StatusCodes.OK
        return result

    } catch (err) {
        // if the query fails, we return the following object
        result.success = false
        result.data = err
        result.status = StatusCodes.INTERNAL_SERVER_ERROR

        return result
    }
}

export default {
    getActiveAccountsFromDB,
}