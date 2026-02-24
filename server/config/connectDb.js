import mongoose from "mongoose";

export const connectDb = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log("connected to db")
    } catch (err) {
        console.log(`database error ${err}`);
    }
}