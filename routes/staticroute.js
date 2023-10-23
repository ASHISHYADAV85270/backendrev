import express from 'express';
import { getAllShortIds, printAlldata } from '../controllers/shorturl.js'
import { restricTo } from '../middleware/auth.js';

const staticrouter = express.Router();    // Create a new router

staticrouter.get('/admin/urls', restricTo(['ADMIN']), printAlldata);
staticrouter.get('/', (req, res) => res.render("index.ejs"));
staticrouter.get('/getallid', getAllShortIds);
staticrouter.get('/signup', (req, res) => res.render("signup.ejs"));
staticrouter.get('/login', (req, res) => res.render("login.ejs"));


export { staticrouter };