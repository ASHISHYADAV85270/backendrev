import express from 'express';
import { getAllShortIds } from '../controllers/shorturl.js'

const staticrouter = express.Router();    // Create a new router
staticrouter.get('/', (req, res) => {
    res.render('index.ejs');
});
staticrouter.get('/getallId', getAllShortIds);
export { staticrouter };