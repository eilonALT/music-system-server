import connection from './db.js';
import { StatusCodes } from 'http-status-codes';

const getEmptyCollectionsFromDB = async (offset, limit) => {
    let result = {
        success: false,
        data: null,
        status: null
    }

    try {
        let res = await connection.promise().query(
            `SELECT * FROM Collections WHERE number_of_songs = 0 LIMIT ${offset ? offset + ',' : ''}${limit};`
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


const getCollectionsByAccountIdFromDB = async (accountId, offset, limit) => {
    let result = {
        success: false,
        data: null,
        status: null
    }

    try {
        let res = await connection.promise().query(
            `SELECT * FROM Collections WHERE account_id = ${accountId} LIMIT ${offset ? offset + ',' : ''}${limit};`
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

const getCollectionsBySongIdFromDB = async (songId, offset, limit) => {
    let result = {
        success: false,
        data: null,
        status: null
    }

    try {
        let res = await connection.promise().query(
            `SELECT * FROM Collections JOIN Song_Collection ON Collections.id = Song_Collection.collection_id WHERE Song_Collection.song_id = ${songId} LIMIT ${offset ? offset + ',' : ''}${limit};`
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
    getCollectionsByAccountIdFromDB,
    getCollectionsBySongIdFromDB,
    getEmptyCollectionsFromDB
}