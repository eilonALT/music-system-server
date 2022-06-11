import express from "express"
import { getSongs } from "../business-logic/songs-bl.js";

const songsRouter = express.Router();

songsRouter.get("/songs", async (req, res) => {
    const result = await getSongs(req.query)
    res.status(result.status)
    res.send(result);
})

export {songsRouter};