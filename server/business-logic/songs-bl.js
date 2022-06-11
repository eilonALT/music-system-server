import songsDal from "../data-access-layer/songs-dal.js";
import Joi from "joi";

// page size creates a limit of 50 songs per page and helps to improve the performance of the application in case of large number of songs
const PAGE_SIZE = 50;

const shcema = Joi.object({
    page: Joi.number().integer().min(1).default(1),
    collectionId: Joi.number().integer(),
    accountId: Joi.number().integer(),
    filed: Joi.string().valid("collectionTitle"),
}).or('collectionId', 'accountId', 'filed');


const validateQuery = async (query) => {
    const { error } = shcema.validate(query)
    if (error) {
        throw error
    }
}

const getSongs = async (query) => {
    
    
    const page = shcema.validate(query).value.page;
    //implementing offset and limit to help to paginate the songs
    const offset = (page - 1) * PAGE_SIZE;
    const limit = PAGE_SIZE;

    if (query.collectionId) {
        return await songsDal.getSongsByCollectioIdFromDB(query.collectionId, offset, limit);
    }

    else if (query.accountId) {
        return await songsDal.getSongsByAccountIdFromDB(query.accountId, offset, limit);
    }

    else if (query.filed === 'collectionTitle') {
        return await songsDal.getSongsFieldFromDB(offset, limit);
    }

}

export {
    getSongs,
    validateQuery,
}