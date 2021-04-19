const express = require('express');
require('dotenv').config();
const greetingRoutes = require('./routes/greeting_routes')
const logger = require('./logger');

const app = express();
const port = process.env.PORT;

app.use(express.json());
app.use(express.urlencoded({
    extended: true,
  })
);

app.use(greetingRoutes);

app.listen(port, () => {
  logger.log('info',`Example app listening at http://localhost:${port}`)
});