import songsDal from "../data-access-layer/songs-dal.js";
const PAGE_SIZE = 50;

const getSongs = async (query) => {
    if (!query.page) {
        query.page = 1;
    }
    const page = Number(query.page);
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

    // else return err collectionId or userId or filed=collectionTitle is required
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