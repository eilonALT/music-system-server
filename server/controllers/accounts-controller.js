import express from 'express';
import { getAccounts, validateQuery } from '../business-logic/accounts-bl.js';

const ERROR_STATUS_CODE = 400;


const accountsRouter = express.Router();


accountsRouter.get("/accounts", async (req, res) => {
    const query = req.query;
    try {
        await validateQuery(query); //validate the query imported from the business-logic
        const result = await getAccounts(query);
        res.status(result.status);
        res.send(result);
    }
    catch (error) {
        res.status(ERROR_STATUS_CODE).send(error);//send the error to the client
    }
    
})

export {
    accountsRouter
}

