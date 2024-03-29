import connection from './db.js';
import { StatusCodes } from 'http-status-codes';// nice library to help with error status codes


const getSongsByCollectioIdFromDB = async (collectionId, offset, limit) => {
    let result = {
        success: false,
        data: null,
        status: StatusCodes.INTERNAL_SERVER_ERROR
    }

    try {
        // get the songs that belong to the collection
        let res = await connection.promise().query(
            `SELECT * FROM songs JOIN song_collection ON songs.id = song_collection.song_id WHERE song_collection.collection_id = ${collectionId} LIMIT ${offset ? offset + ',' : ''}${limit};`
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

const getSongsByAccountIdFromDB = async (accountId, offset, limit) => {
    let result = {
        success: false,
        data: null,
        status: StatusCodes.INTERNAL_SERVER_ERROR
    }

    try {
        // get the songs that belong to the account
        let res = await connection.promise().query(
            `SELECT songs.name,songs.duration,songs.rate FROM songs JOIN song_collection ON songs.id = song_collection.song_id JOIN collections ON song_collection.collection_id = collections.id WHERE collections.account_id = ${accountId} LIMIT ${offset ? offset + ',' : ''}${limit};`
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


const getSongsFieldFromDB = async (offset, limit) => {
    let result = {
        success: false,
        data: null,
        status: StatusCodes.INTERNAL_SERVER_ERROR
    }

    try {
        // get the songs that belong to the account
        let res = await connection.promise().query(
            `SELECT songs.name, collections.title FROM songs JOIN song_collection ON songs.id = song_collection.song_id JOIN collections ON song_collection.collection_id = collections.id LIMIT ${offset ? offset + ',' : ''}${limit};`
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
    getSongsByCollectioIdFromDB,
    getSongsByAccountIdFromDB,
    getSongsFieldFromDB
}