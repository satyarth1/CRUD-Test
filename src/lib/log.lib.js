const path = require('path');

const winston = require('winston');
require('winston-daily-rotate-file');

const transport = new (winston.transports.DailyRotateFile)({
  filename: 'application-%DATE%.log',
  datePattern: 'YYYY_MM_DD_HH_mm_ss',
  zippedArchive: true,
  dirname: path.join(process.cwd(), 'storage/logs'),
  maxSize: '20m',
  maxFiles: '14d',
  utc: true,
});

const logger = winston.createLogger({
  level: process.env.LOG_LEVEL || 'info',
  format: winston.format.json(),
  transports: [
    transport,
  ],
});


if (process.env.NODE_ENV !== 'production') {
  logger.add(new winston.transports.Console({
    format: winston.format.simple(),
  }));
}


module.exports = logger;
