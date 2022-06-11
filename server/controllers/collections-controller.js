import express from 'express';
import {getCollections} from '../business-logic/collections-bl.js';

const collectionsRouter = express.Router();

collectionsRouter.get('/collections', async (req, res) => {
    const result = await getCollections(req.query);
    res.status(result.status);
    res.send(result);
})

export {collectionsRouter};