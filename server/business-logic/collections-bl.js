import collectionsDal from "../data-access-layer/collections-dal.js";
import Joi from 'joi';

// page size creates a limit of 50 collections per page and helps to improve the performance of the application in case of large number of collections
const PAGE_SIZE = 50;

const shcema = Joi.object({
    page: Joi.number().integer().min(1).default(1),
    number_of_songs: Joi.number().integer().valid(0, "0"),
    accountId: Joi.number().integer(),
    songId: Joi.number().integer(),
}).or('accountId', 'songId', 'number_of_songs');


const validateQuery = async (query) => {
    const { error } = shcema.validate(query)
    if (error) {
        throw error
    }
}


const getCollections = async (query) => {

    const page = shcema.validate(query).value.page;
    //implementing offset and limit to help to paginate the collections
    const offset = (page - 1) * PAGE_SIZE;
    const limit = PAGE_SIZE;

    if (query.number_of_songs) {
        const collections = await collectionsDal.getEmptyCollectionsFromDB(offset, limit);
        return collections;
    }
    else if (query.accountId) {
        return await collectionsDal.getCollectionsByAccountIdFromDB(query.accountId, offset, limit);
    }
    else if (query.songId) {
        return await collectionsDal.getCollectionsBySongIdFromDB(query.songId, offset, limit);
    }
}


export {
    getCollections,
    validateQuery,
}