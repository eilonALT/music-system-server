import songsDal from "../data-access-layer/songs-dal.js";
const PAGE_SIZE = 50;
// page size creates a limit of 50 songs per page and helps to improve the performance of the application in case of large number of songs


const getSongs = async (query) => {
    
    if (!query.page) {
        query.page = 1;
    }
    const page = Number(query.page);
    //implementing offset and limit to help to paginate the songs
    const offset = (page - 1) * PAGE_SIZE;
    const limit = PAGE_SIZE;

    if (query.collectionId) {
        return await songsDal.getSongsByCollectioIdFromDB(query.collectionId, offset, limit);
    }

    else if (query.userId) {
        return await songsDal.getSongsByUserIdFromDB(query.userId, offset, limit);
    }

    else if (query.filed === 'collectionTitle') {
        return await songsDal.getSongsFieldFromDB(offset, limit);
    }

    // else return err - collectionId or userId or filed=collectionTitle is required
    else {
        return {
            success: false,
            data: null,
            status: 400,
            message: "collectionId or userId or filed='collectionTitle' is required",
        };
    }

}

export {
    getSongs,
}