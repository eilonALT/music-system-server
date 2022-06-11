import express from 'express';
import { getAccounts, validateQuery } from '../business-logic/accounts-bl.js';

const ERROR_STATUS_CODE = 400;


const accountsRouter = express.Router();

accountsRouter.get("/accounts", async (req, res) => {
    const query = req.query;
    try {
        await validateQuery(query);
        const result = await getAccounts(query);
        res.status(result.status);
        res.send(result);
    }
    catch (error) {
        res.status(ERROR_STATUS_CODE).send(error);
    }
    
})

export {
    accountsRouter
}

