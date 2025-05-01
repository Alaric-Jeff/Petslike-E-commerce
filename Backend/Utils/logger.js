import winston from "winston";

// Define custom log levels and colors
const customLevels = {
    levels: {
        error: 0,
        warn: 1,
        info: 2,
        http: 3,
        verbose: 4,
        debug: 5,
        silly: 6,
    },
    colors: {
        error: "red",
        warn: "yellow",
        info: "green",
        http: "magenta",
        verbose: "cyan",
        debug: "blue",
        silly: "gray",
    },
};

winston.addColors(customLevels.colors);

// Create the logger
const logger = winston.createLogger({
    levels: customLevels.levels,
    level: process.env.NODE_ENV === 'production' ? 'warn' : 'debug',  // Adjust log level based on environment
    format: winston.format.combine(
        winston.format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
        winston.format.printf(({ timestamp, level, message, stack }) => {
            // Include stack trace if the level is 'error' or 'warn'
            return stack
                ? `${timestamp} [${level.toUpperCase()}]: ${message}\nStack: ${stack}`
                : `${timestamp} [${level.toUpperCase()}]: ${message}`;
        })
    ),
    transports: [
        // Console transport with colorize
        new winston.transports.Console({
            format: winston.format.combine(
                winston.format.colorize(),
                winston.format.simple()
            ),
        }),
        
        // File transport for error-level logs
        new winston.transports.File({
            filename: "logs/error.log",
            level: "error",
            format: winston.format.json(),
        }),

        // File transport for all logs
        new winston.transports.File({
            filename: "logs/combined.log",
            format: winston.format.json(),
        }),
    ],
    exceptionHandlers: [
        new winston.transports.File({ filename: "logs/exceptions.log" }),
    ],
    rejectionHandlers: [
        new winston.transports.File({ filename: "logs/rejections.log" }),
    ],
});

// Enhance stream to handle HTTP logging in express (optional)
logger.stream = {
    write: (message) => logger.http(message.trim()),
};

// Custom logging function that adds extra context (like request ID, user ID, etc.)
logger.logWithContext = (level, message, context = {}) => {
    const logMessage = {
        message,
        ...context,
    };

    logger.log(level, JSON.stringify(logMessage));
};

export default logger;
