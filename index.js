import express from 'express';
import { urlrouter } from './routes/shorturl.js';
import { staticrouter } from './routes/staticroute.js';
import { userRouter } from './routes/user.js'
import { connectDB } from './connection.js';
import path from 'path';
import cookieParser from 'cookie-parser';
import { restrictToLoggedInUserOnly, checkAuth } from './middleware/auth.js'
const app = express();
const PORT = 8000;
const dblink = 'mongodb+srv://ashish_practice:qwer1234@mybackend.mhfbkfd.mongodb.net/?retryWrites=true&w=majority';
app.set("view engine", "ejs");
app.set('views', path.resolve('./views'));
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));


app.use('/url', restrictToLoggedInUserOnly, urlrouter);
app.use('/user', userRouter);
app.use('/', checkAuth, staticrouter);
connectDB(dblink);


app.listen(PORT, () => console.log(`server listening at port ${PORT}`));