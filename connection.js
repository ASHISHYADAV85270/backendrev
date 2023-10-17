import mongoose from 'mongoose';
async function connectDB(dblink) {
    await mongoose.connect(dblink, { dbName: 'shorturl' }).then(() => console.log('MongoDB connected Successfully'));
}
export { connectDB };