const {createLogger, transports, format} = require('winston');
const winston_mysql = require('winston-mysql');
require('dotenv').config();


const logger = createLogger({
    transports: [
        new transports.File({
            filename: './log/info.log',
            level: 'info',
            format: format.combine(format.timestamp(),format.json()) 
        }),
        new transports.Console({
            level: 'info',
            format: format.combine(format.timestamp(),format.json()) 
        }),
    ]
})

module.exports = logger;