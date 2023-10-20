import { URL } from '../models/shorturl.js';
import { nanoid } from 'nanoid';
async function getHandlerCreateShortUrl(req, res) {
    const redirectedUrl = req.body.url;
    if (!redirectedUrl) {
        return res.status(400).json({ error: 'url is required' });
    }
    const shortId = nanoid(8);
    const result = await URL.create({ shortId: shortId, redirectedUrl: redirectedUrl, visitHistory: [] })
    return res.status(201).json({ msg: 'success', shortId });
}

async function getHandlerGetUrl(req, res) {
    const shortId = req.params.shortId;
    const result = await URL.findOneAndUpdate({ shortId }, { $push: { visitHistory: { timestamp: Date.now() } } });
    return res.redirect(result.redirectedUrl);
}
async function getHandlerAnalyticUrl(req, res) {
    const shortId = req.params.shortId;
    const result = await URL.findOne({ shortId });
    if (!result) {
        return res.status(401).json({ err: 'enter a valid shortID' })
    }
    return res.json({ totalClick: result.visitHistory.length, analytics: result.visitHistory });
}

// for static url
async function getAllShortIds(req, res) {
    const allUrls = await URL.find({});
    return res.render("geturls.ejs", { url: allUrls });
}
export { getAllShortIds, getHandlerCreateShortUrl, getHandlerGetUrl, getHandlerAnalyticUrl };
