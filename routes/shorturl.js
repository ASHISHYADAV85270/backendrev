import express from 'express';
import { getAllShortIds, getHandlerCreateShortUrl, getHandlerGetUrl, getHandlerAnalyticUrl } from '../controllers/shorturl.js'
const urlrouter = express.Router();


urlrouter.get('/:shortId', getHandlerGetUrl);
urlrouter.get('/analytics/:shortId', getHandlerAnalyticUrl);
urlrouter.post('/', getHandlerCreateShortUrl);

export { urlrouter }