const express = require('express');
require('dotenv').config();
const mysql = require('./config')
const greetingRoutes = require('./routes/greeting_routes')
const logger = require('./logger');

const app = express();
const port = process.env.PORT;

app.use(express.json());
app.use(express.urlencoded({
    extended: true,
  })
);

mysql.connection.connect((error)=>{
    if (!error) {
        console.log("DB Conection SucessFull");
    }else{
        console.log("DB Connection Failed: "+JSON.stringify(error, undefined,2));
    }
})

app.use(greetingRoutes);

app.listen(port, () => {
  logger.log('info',`Example app listening at http://localhost:${port}`)
});