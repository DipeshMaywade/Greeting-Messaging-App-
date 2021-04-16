const express = require('express');
const bodyParser = require('body-parser');

const mysql = require('./services/db')
const greetingRoutes = require('./routes/greeting_routes')

const app = express();
const port = 3000;

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