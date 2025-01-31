const winston = require('winston');

// Create a custom timestamp format for log statements
const logFormat = winston.format.printf(({ level, message, timestamp }) => {
    return `${timestamp} [${level.toUpperCase()}]: ${message}`;
});

// Configure the Winston logger
const logger = winston.createLogger({
    // Define the level of logs to capture. You can adjust this as needed for development or production environments.
    level: 'info', // Captures all levels of severity from 'info' and above
    format: winston.format.combine(
        winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }), // Define the timestamp format
        winston.format.errors({ stack: true }), // Capture stack trace if available
        winston.format.splat(), // Necessary to handle multiple variable interpolations
        winston.format.colorize(), // Add color to the output, which is helpful during development
        logFormat // Use the custom log format defined above
    ),
    transports: [
        // Console transport
        new winston.transports.Console(),
        // File transport
        new winston.transports.File({
            filename: './logfile/logfile.log', // Name of the log file
            level: 'info' // Define the level for the file transport, if different from the general level
        })
    ]
});

module.exports = logger;

