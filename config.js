const mysql = require('mysql');
require('dotenv').config();
const env = process.env

const config = {
    db: { 
      host: env.HOST,
      user: env.USER,
      password: env.PASSWORD,
      database: env.DATABASE,
      multipleStatements: true
    }
  };
  
  const connection = mysql.createConnection(config.db);
  
  module.exports = {connection};