import songsDal from "../data-access-layer/songs-dal.js";
import Joi from "joi";

// page size creates a limit of 50 songs per page and helps to improve the performance of the application in case of large number of songs
const PAGE_SIZE = 50;

//schema for validating the query
const shcema = Joi.object({
    page: Joi.number().integer().min(1).default(1),
    collectionId: Joi.number().integer(),
    accountId: Joi.number().integer(),
    filed: Joi.string().valid("collectionTitle"),
}).or('collectionId', 'accountId', 'filed');

// validate the query (exported as a function to be used in the controller)
const validateQuery = async (query) => {
    const { error } = shcema.validate(query)
    if (error) {
        throw error
    }
}

//get songs with pagination and query
const getSongs = async (query) => {

    //set the page from the query (or the default page 1 from shcema)
    //all queries validate before they are sent to the bl so we don't have to worry about it
    const page = shcema.validate(query).value.page;
    
    //implementing offset and limit to help to paginate the songs
    const offset = (page - 1) * PAGE_SIZE;
    const limit = PAGE_SIZE;

    //get the songs that belong to a specific collection
    if (query.collectionId) {
        return await songsDal.getSongsByCollectioIdFromDB(query.collectionId, offset, limit);
    }

    //get the songs that belong to a specific account
    else if (query.accountId) {
        return await songsDal.getSongsByAccountIdFromDB(query.accountId, offset, limit);
    }

    //get all songs and display their collection title
    else if (query.filed === 'collectionTitle') {
        return await songsDal.getSongsFieldFromDB(offset, limit);
    }
}

export {
    getSongs,
    validateQuery,
}