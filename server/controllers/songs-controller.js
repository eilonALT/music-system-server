import express from "express"
import { getSongs,validateQuery } from "../business-logic/songs-bl.js";

const ERROR_STATUS_CODE = 400;

const songsRouter = express.Router();

songsRouter.get("/songs", async (req, res) => {
    
    try {
        await validateQuery(req.query);
        const result = await getSongs(req.query)
        res.status(result.status)
        res.send(result);
        
    } catch (error) {
        res.status(ERROR_STATUS_CODE)
        res.send(error);    
    }
    
})

export {songsRouter};