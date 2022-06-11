import express from 'express';
import {getCollections,validateQuery} from '../business-logic/collections-bl.js';

const ERROR_STATUS_CODE = 400;

const collectionsRouter = express.Router();

collectionsRouter.get('/collections', async (req, res) => {
    
    try {
        const query = req.query;
        await validateQuery(query); //validate the query imported from the business-logic
        const result = await getCollections(req.query);
        res.status(result.status);
        res.send(result);
    }
    catch (error) {
        res.status(ERROR_STATUS_CODE).send(error); //send the error to the client
    }
})

export {collectionsRouter};