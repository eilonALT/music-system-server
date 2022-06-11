import collectionsDal from "../data-access-layer/collections-dal.js";
import Joi from 'joi';

// page size creates a limit of 50 collections per page and helps to improve the performance of the application in case of large number of collections
const PAGE_SIZE = 50;


//schema for validating the query
const shcema = Joi.object({
    page: Joi.number().integer().min(1).default(1),
    number_of_songs: Joi.number().integer().valid(0, "0"),
    accountId: Joi.number().integer(),
    songId: Joi.number().integer(),
}).or('accountId', 'songId', 'number_of_songs');


// validate the query (exported as a function to be used in the controller)
const validateQuery = async (query) => {
    const { error } = shcema.validate(query)
    if (error) {
        throw error
    }
}


//get collections with pagination and query
const getCollections = async (query) => {

    //set the page from the query (or the default page 1 from shcema)
    //all queries validate before they are sent to the bl so we don't have to worry about it

    const page = shcema.validate(query).value.page;

    //implementing offset and limit to help to paginate the collections
    const offset = (page - 1) * PAGE_SIZE;
    const limit = PAGE_SIZE;

    //get the collections that have no songs
    if (query.number_of_songs) {
        const collections = await collectionsDal.getEmptyCollectionsFromDB(offset, limit);
        return collections;
    }
    //get the collections that belong to a specific account
    else if (query.accountId) {
        return await collectionsDal.getCollectionsByAccountIdFromDB(query.accountId, offset, limit);
    }
    //get the collections that have a specific song
    else if (query.songId) {
        return await collectionsDal.getCollectionsBySongIdFromDB(query.songId, offset, limit);
    }
}


export {
    getCollections,
    validateQuery,
}