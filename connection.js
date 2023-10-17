const mongoose = require('mongoose');
// connection


async function connectMongoDB() {
    try {
        mongoose.connect('mongodb+srv://ashish_practice:qwer1234@mybackend.mhfbkfd.mongodb.net/?retryWrites=true&w=majority', { dbName: "PracticePiyush" });
        console.log("connected to mongoDB");
    } catch (error) {
        console.log("some error")
    }

}

module.exports = { connectMongoDB };