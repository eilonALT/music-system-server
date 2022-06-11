import express from 'express';
import cors from 'cors';
import { accountsRouter } from './controllers/accounts-controller.js';
import { collectionsRouter } from './controllers/collections-controller.js';
import { songsRouter } from './controllers/songs-controller.js';

const app = express();
app.use(cors());
app.use(express.json());
app.use("/api/music-system/", accountsRouter);
app.use("/api/music-system/", collectionsRouter);
app.use("/api/music-system/", songsRouter);

app.listen(5000, () => {
    console.log('Server is running on port 5000');
})
