import connection from '../db.js';

const getEmptyCollectionsFromDB = async (offset, limit) => {
    let result = {
        success: false,
        data: null,
        status:null
    }

    try {
        let res = await connection.promise().query(
            `SELECT * FROM Collections WHERE number_of_songs = 0 LIMIT ${offset ? offset + ',' : ''}${limit};`
        )
        result.success = true
        result.data = res[0]
        result.status = 200
        return result

    } catch (err) {
        result.success = false
        result.data = err
        result.status = err.status
        return result
    }
}


const getCollectionsByAccountIdFromDB = async (accountId, offset, limit) => {
    let result = {
        success: false,
        data: null,
        status:null
    }

    try {
        let res = await connection.promise().query(
            `SELECT * FROM Collections WHERE account_id = ${accountId} LIMIT ${offset ? offset + ',' : ''}${limit};`
        )
        result.success = true
        result.data = res[0]
        result.status = 200
        return result

    } catch (err) {
        result.success = false
        result.data = err
        result.status = err.status
        return result
    }
}

const getCollectionsBySongIdFromDB = async (songId, offset, limit) => {
    let result = {
        success: false,
        data: null,
        status:null
    }

    try {
        let res = await connection.promise().query(
            `SELECT * FROM Collections WHERE id IN (SELECT collection_id FROM Song_Collection WHERE song_id = ${songId}) LIMIT ${offset ? offset + ',' : ''}${limit};`
        )
        result.success = true
        result.data = res[0]
        result.status = 200
        return result

    } catch (err) {
        result.success = false
        result.data = err
        result.status = err.status
        return result
    }
}


export default {
    getCollectionsByAccountIdFromDB,
    getCollectionsBySongIdFromDB,
    getEmptyCollectionsFromDB
}