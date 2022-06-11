import connection from './db.js';
import { StatusCodes } from 'http-status-codes';


const getSongsByCollectioIdFromDB = async (collectionId, offset, limit) => {
    let result = {
        success: false,
        data: null,
        status: StatusCodes.INTERNAL_SERVER_ERROR
    }

    try {
        let res = await connection.promise().query(
            `SELECT * FROM Songs JOIN Song_Collection ON Songs.id = Song_Collection.song_id WHERE Song_Collection.collection_id = ${collectionId} LIMIT ${offset ? offset + ',' : ''}${limit};`
        )
        result.success = true
        result.data = res[0]
        result.status = StatusCodes.OK
        return result

    } catch (err) {
        result.success = false
        result.data = err
        result.status = StatusCodes.INTERNAL_SERVER_ERROR

        return result
    }
}

const getSongsByAccountIdFromDB = async (accountId, offset, limit) => {
    let result = {
        success: false,
        data: null,
        status: StatusCodes.INTERNAL_SERVER_ERROR
    }

    try {
        let res = await connection.promise().query(
            `SELECT Songs.name,Songs.duration,Songs.rate FROM Songs JOIN Song_Collection ON songs.id = Song_Collection.song_id JOIN Collections ON Song_Collection.collection_id = Collections.id WHERE Collections.account_id = ${accountId} LIMIT ${offset ? offset + ',' : ''}${limit};`
        )
        result.success = true
        result.data = res[0]
        result.status = StatusCodes.OK
        return result

    } catch (err) {
        result.success = false
        result.data = err
        result.status = StatusCodes.INTERNAL_SERVER_ERROR

        return result
    }
}


const getSongsFieldFromDB = async (offset, limit) => {
    let result = {
        success: false,
        data: null,
        status: StatusCodes.INTERNAL_SERVER_ERROR
    }

    try {
        let res = await connection.promise().query(
            `SELECT Songs.name, Collections.title FROM Songs JOIN Song_Collection ON Songs.id = Song_Collection.song_id JOIN Collections ON Song_Collection.collection_id = Collections.id LIMIT ${offset ? offset + ',' : ''}${limit};`
        )
        result.success = true
        result.data = res[0]
        result.status = StatusCodes.OK
        return result

    } catch (err) {
        result.success = false
        result.data = err
        result.status = StatusCodes.INTERNAL_SERVER_ERROR

        return result
    }
}

export default {
    getSongsByCollectioIdFromDB,
    getSongsByAccountIdFromDB,
    getSongsFieldFromDB
}