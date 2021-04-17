const express = require('express');
const bodyParser = require('body-parser');
require('dotenv').config();
const mysql = require('./config')
const greetingRoutes = require('./routes/greeting_routes')

const app = express();
const port = process.env.PORT;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
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
  console.log(`Example app listening at http://localhost:${port}`)
});