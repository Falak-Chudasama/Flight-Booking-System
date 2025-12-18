import dotenv from "dotenv";
dotenv.config({ quiet: true });

import app from "./src/app/app.js";
import connectDB from "./src/config/mongodb.js";
import logger from "./src/utils/logger.util.js";

const HOST = process.env.HOST;
const PORT = Number(process.env.PORT);

app.listen(PORT, HOST, async () => {
    await connectDB();
    logger.info(`LISTENING ON ${HOST}:${PORT}`);
});