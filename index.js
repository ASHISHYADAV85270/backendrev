import express from 'express';
import { router } from './routes/shorturl.js'
const app = express();
const PORT = 8000;
const dblink = 'mongodb+srv://ashish_practice:qwer1234@mybackend.mhfbkfd.mongodb.net/?retryWrites=true&w=majority';
import { connectDB } from './connection.js';
app.use(express.json());
app.use('/url', router);
connectDB(dblink);


app.listen(PORT, () => console.log(`server listening at port ${PORT}`));