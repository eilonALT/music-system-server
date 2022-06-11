import connection from '../db.js';


const getSongsByCollectioIdFromDB = async (collectionId, offset, limit) => {
    let result = {
        success: false,
        data: null,
        status: null
    }

    try {
        let res = await connection.promise().query(
            `SELECT * FROM Songs WHERE id IN (SELECT song_id FROM Song_Collection WHERE collection_id = ${collectionId}) LIMIT ${offset ? offset + ',' : ''}${limit};`
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

const getSongsByUserIdFromDB = async (userId, offset, limit) => {
    let result = {
        success: false,
        data: null,
        status: null
    }

    try {
        let res = await connection.promise().query(
            `SELECT * FROM Songs WHERE id IN (SELECT song_id FROM Song_Collection WHERE collection_id IN (SELECT id FROM Collections WHERE account_id = ${userId})) LIMIT ${offset ? offset + ',' : ''}${limit};`
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


const getSongsFieldFromDB = async (offset, limit) => {
    let result = {
        success: false,
        data: null,
        status: null
    }

    try {
        let res = await connection.promise().query(
            `SELECT Songs.name, Collections.title FROM Songs JOIN Song_Collection ON Songs.id = Song_Collection.song_id JOIN Collections ON Song_Collection.collection_id = Collections.id LIMIT ${offset ? offset + ',' : ''}${limit};`
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
    getSongsByCollectioIdFromDB,
    getSongsByUserIdFromDB,
    getSongsFieldFromDB
}