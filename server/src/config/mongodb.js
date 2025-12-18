import mongoose from "mongoose";
import dotenv from "dotenv";
import logger from "../utils/logger.util.js";

dotenv.config({ quiet: true });

const MONGODB_URI = process.env.MONGODB_URI;

async function connectDB() {
    try {
        if (!MONGODB_URI) {
            throw Error('No MONGODB_URI found in environment file');
        }
        await mongoose.connect(MONGODB_URI, {
            serverSelectionTimeoutMS: 5000
        });
        logger.info('MongoDB Connection Successful!');
    } catch (err) {
        throw err;
    }
}

export default connectDB