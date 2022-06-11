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
            `SELECT * FROM collections WHERE number_of_songs = 0 LIMIT ${offset ? offset + ',' : ''}${limit};`
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
            `SELECT * FROM collections WHERE account_id = ${accountId} LIMIT ${offset ? offset + ',' : ''}${limit};`
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
            `SELECT * FROM collections JOIN song_collection ON collections.id = song_collection.collection_id WHERE song_collection.song_id = ${songId} LIMIT ${offset ? offset + ',' : ''}${limit};`
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