import express from 'express';
import { urlrouter } from './routes/shorturl.js';
import { staticrouter } from './routes/staticroute.js';
import { connectDB } from './connection.js';
import path from 'path';
const app = express();
const PORT = 8000;
const dblink = 'mongodb+srv://ashish_practice:qwer1234@mybackend.mhfbkfd.mongodb.net/?retryWrites=true&w=majority';
app.set("view engine", "ejs");
app.set('views', path.resolve('./views'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use('/url', urlrouter);
app.use('/', staticrouter);
connectDB(dblink);


app.listen(PORT, () => console.log(`server listening at port ${PORT}`));