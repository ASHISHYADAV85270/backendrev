import { render } from 'ejs';
import { URL } from '../models/shorturl.js';
import { nanoid } from 'nanoid';
async function getHandlerCreateShortUrl(req, res) {
    const redirectedUrl = req.body.url;
    if (!redirectedUrl) {
        return res.status(400).json({ error: 'url is required' });
    }
    const urlcheck = await URL.find({ redirectedUrl: redirectedUrl });

    const shortId = nanoid(8);
    const result = await URL.create({ shortId: shortId, redirectedUrl: redirectedUrl, visitHistory: [], createdBy: req.user._id });

    return res.render("index.ejs", { id: shortId });
}

async function getHandlerGetUrl(req, res) {
    const shortId = req.params.shortId;
    console.log(shortId);
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
    if (!req.user) {
        return res.redirect('/login');
    }
    const allUrls = await URL.find({ createdBy: req.user?._id });
    return res.render("geturls.ejs", { url: allUrls });
}


async function printAlldata(req, res) {
    const allUrls = await URL.find({});
    return res.render("geturls.ejs", { url: allUrls });
}

export { getAllShortIds, printAlldata, getHandlerCreateShortUrl, getHandlerGetUrl, getHandlerAnalyticUrl };
