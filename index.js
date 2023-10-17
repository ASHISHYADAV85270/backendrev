const express = require('express');
const app = express();
const PORT = 8000;
const userRouter = require('./routes/user.js');
const { connectMongoDB } = require('./connection.js');
const { logReqRes } = require('./middlewares/index.js');


connectMongoDB();
app.use(express.urlencoded({ urlencoded: false }));
app.use(express.json());
app.use(logReqRes("log.text"));


//routes
app.use("/user", userRouter);

app.listen(PORT, () => { console.log(`server running on port ${PORT} `) });