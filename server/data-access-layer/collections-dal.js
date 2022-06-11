import connection from './db.js';
import { StatusCodes } from 'http-status-codes'; // nice library to help with error status codes

const getEmptyCollectionsFromDB = async (offset, limit) => {
    let result = {
        success: false,
        data: null,
        status: null
    }

    try {
        // get the collections that have no songs
        let res = await connection.promise().query(
            `SELECT * FROM collections WHERE number_of_songs = 0 LIMIT ${offset ? offset + ',' : ''}${limit};`
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


const getCollectionsByAccountIdFromDB = async (accountId, offset, limit) => {
    let result = {
        success: false,
        data: null,
        status: null
    }

    try {
        // get the collections that belong to the account
        let res = await connection.promise().query(
            `SELECT * FROM collections WHERE account_id = ${accountId} LIMIT ${offset ? offset + ',' : ''}${limit};`
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

const getCollectionsBySongIdFromDB = async (songId, offset, limit) => {
    let result = {
        success: false,
        data: null,
        status: null
    }

    try {
        // get the collections that have the song
        let res = await connection.promise().query(
            `SELECT * FROM collections JOIN song_collection ON collections.id = song_collection.collection_id WHERE song_collection.song_id = ${songId} LIMIT ${offset ? offset + ',' : ''}${limit};`
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
    getCollectionsByAccountIdFromDB,
    getCollectionsBySongIdFromDB,
    getEmptyCollectionsFromDB
}