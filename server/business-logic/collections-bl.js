import collectionsDal from "../data-access-layer/collections-dal.js";
const PAGE_SIZE = 50;

const getCollections = async (query) => {
    if (!query.page) {
        query.page = 1;
    }
    const page = Number(query.page);
    const offset = (page - 1) * PAGE_SIZE;
    const limit = PAGE_SIZE;

    if (Number(query.number_of_songs) === 0) {
        const collections = await collectionsDal.getEmptyCollectionsFromDB(offset, limit);
        return collections;
    }
    if (query.accountId) {
        return await collectionsDal.getCollectionsByAccountIdFromDB(query.accountId, offset, limit);
    }
    if (query.songId) {
        return await collectionsDal.getCollectionsBySongIdFromDB(query.songId, offset, limit);
    }

    //return erorr if number_of_songs is not 0 or accountId is not provided or songId is not provided
    if (Number(query.number_of_songs) !== 0 || !query.accountId || !query.songId) {
        return {
            success: false,
            data: null,
            message: "number_of_songs query must be 0 or accountId and songId must be provided",
            status: 400,
        };
    }
}


export {
    getCollections,
}