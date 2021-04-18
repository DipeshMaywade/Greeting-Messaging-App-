const winston = require('winston');
const winston_mysql = require('winston-mysql');
require('dotenv').config();
const env = process.env

// const db = { 
//     host: env.HOST,
//     user: env.USER,
//     password: env.PASSWORD,
//     database: 'logdetails',
//     table: 'sys_logs_default',
//     fields   : { level: 'mylevel', meta: 'metadata', message: 'source', timestamp: 'addDate'}
//   }

const {createLogger, transports, format} = require('winston');


const logger = createLogger({
    transports: [
        new transports.File({
            filename: 'info.log',
            level: 'info',
            format: format.combine(format.timestamp(),format.json()) 
        }),
        new transports.Console({
            level: 'info',
            format: format.combine(format.timestamp(),format.json()) 
        }),
    ]
})

// var logger = new (winston.Logger)({
//     transports: [
//       new winston_mysql(db)
//     ]
//     });

module.exports = logger;