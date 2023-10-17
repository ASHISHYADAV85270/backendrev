import express from 'express';
import { getHandlerCreateShortUrl, getHandlerGetUrl, getHandlerAnalyticUrl } from '../controllers/shorturl.js'
const router = express.Router();


router.post('/', getHandlerCreateShortUrl);
router.get('/:shortID', getHandlerGetUrl);
router.get('/analytics/:shortId', getHandlerAnalyticUrl);


export { router }