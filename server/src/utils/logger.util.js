import fs from "fs";
import path from "path";
import winston from "winston";
import morgan from "morgan";
import chalk from "chalk";

const { createLogger, format, transports } = winston;
const { combine, timestamp, printf, uncolorize } = format;

const logDir = path.resolve("logs");
if (!fs.existsSync(logDir)) {
    fs.mkdirSync(logDir);
}

const createUnifiedFormatter = (truncate, useColors = false) => {
    return printf(({ timestamp, level, message, stack, http }) => {
        if (http) {
            const msg = message;
            const parts = msg.trim().split(" ");
            const method = parts[0];
            const requestPath = parts.slice(1).join(" ");
            let domainAndPath = `localhost:3050${requestPath}`;

            if (truncate && domainAndPath.length > 45) {
                domainAndPath = `${domainAndPath.slice(0, 40)}...${domainAndPath.slice(-5)}`;
            }

            return `${timestamp} | ${method} ${domainAndPath}`;
        }

        const logMessage = stack || message;
        const levelUpper = level.toUpperCase();

        if (useColors) {
            let coloredTag;
            switch (levelUpper) {
                case "INFO":
                    coloredTag = chalk.green(`[${levelUpper}]`);
                    break;
                case "WARN":
                case "WARNING":
                    coloredTag = chalk.yellow(`[${levelUpper}]`);
                    break;
                case "ERROR":
                    coloredTag = chalk.red(`[${levelUpper}]`);
                    break;
                case "DEBUG":
                    coloredTag = chalk.blue(`[${levelUpper}]`);
                    break;
                default:
                    coloredTag = chalk.gray(`[${levelUpper}]`);
            }
            return `${timestamp} ${coloredTag} ${logMessage}`;
        }

        return `${timestamp} [${levelUpper}] ${logMessage}`;
    });
};

const logger = createLogger({
    level: process.env.NODE_ENV === "development" ? "debug" : "info",
    transports: [
        new transports.Console({
            format: combine(
                timestamp({ format: "DD-MMM-YYYY h:mm:ss A" }),
                createUnifiedFormatter(true, true)
            )
        }),
        new transports.File({
            filename: path.join(logDir, "combined.log"),
            format: combine(
                timestamp({ format: "DD-MMM-YYYY h:mm:ss A" }),
                uncolorize(),
                createUnifiedFormatter(false, false)
            )
        }),
        new transports.File({
            filename: path.join(logDir, "error.log"),
            level: "error",
            format: combine(
                timestamp({ format: "DD-MMM-YYYY h:mm:ss A" }),
                uncolorize(),
                format.errors({ stack: true }),
                createUnifiedFormatter(false, false)
            )
        })
    ],
    exceptionHandlers: [
        new transports.File({ filename: path.join(logDir, "exceptions.log") })
    ],
    rejectionHandlers: [
        new transports.File({ filename: path.join(logDir, "rejections.log") })
    ],
    exitOnError: false
});

morgan.token("full-url", req => req.originalUrl || req.url);

const morganLogFormat = ":method :full-url";

const morganStream = {
    write: message => {
        logger.info(message.trim(), { http: true });
    }
};

const morganMiddleware = morgan(morganLogFormat, {
    stream: morganStream
});

export { logger, morganMiddleware };
export default logger;