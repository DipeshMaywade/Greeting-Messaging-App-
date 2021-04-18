const express = require('express');
const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUI = require('swagger-ui-express');
const mysql = require('./config');
const greetingRoutes = require('./routes/greeting_routes');
const logger = require('./logger');
require('dotenv').config();

const swaggerOption = {
  defination: {
    openapi: '3.0.0',
    info: {
      title: 'GreetingApp',
      description: 'Greetinng app UI',
      contect:{
        name: "Deep"
      },
      version: '1.0.0',
      servers:["http://localhost:3000"]
    } 
  },
  apis: ['server.js']
}

const swaggerDocs = swaggerJSDoc(swaggerOption);
app.use('/swagger-api', swaggerUI.serve, swaggerUI.setup(swaggerDocs));

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