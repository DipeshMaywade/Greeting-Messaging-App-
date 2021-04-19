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

  connection.connect((error)=>{
    if (!error) {
        console.log("DB Conection SucessFull");
    }else{
        console.log("DB Connection Failed: "+JSON.stringify(error, undefined,2));
    }
})
  
  connection.connect((error)=>{
    if (!error) {
        console.log("DB Conection SucessFull");
    }else{
        console.log("DB Connection Failed: "+JSON.stringify(error, undefined,2));
    }
})
  
  module.exports = {connection};