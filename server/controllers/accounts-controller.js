import express from 'express';
import {getAccounts} from '../business-logic/accounts-bl.js';

const accountsRouter = express.Router();

accountsRouter.get("/accounts", async (req, res) => {
    const result = await getAccounts(req.query);
    res.status(result.status);
    res.send(result);
})

export{
    accountsRouter
}

