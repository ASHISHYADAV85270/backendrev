import express from 'express';
import { getAllShortIds } from '../controllers/shorturl.js'

const staticrouter = express.Router();    // Create a new router

staticrouter.get('/', (req, res) => res.render("index.ejs"));
staticrouter.get('/getallid', getAllShortIds);
staticrouter.get('/signup', (req, res) => res.render("signup.ejs"));
staticrouter.get('/login', (req, res) => res.render("login.ejs"));


export { staticrouter };