import connection from '../db.js';

const getActiveAccountsFromDB = async (offset, limit) => {
    let result = {
        success: false,
        data: null,
        status: null,
    }

    try {
        let res = await connection.promise().query(
            `SELECT * FROM accounts WHERE is_active = 1 LIMIT ${offset ? offset + ',' : ''}${limit};`
        )
        result.success = true
        result.data = res[0]
        result.status = 200 // 200 is the status code for success
        return result

    } catch (err) {
        result.success = false
        result.data = err

        return result
    }
}

export default {
    getActiveAccountsFromDB,
}