const express = require('express');
const swaggerUI = require('swagger-ui-express');
const greetingRoutes = require('./routes/greeting_routes');
const logger = require('./utility/logger');
const swaggerOption = require ('./swagger.json')
require('dotenv').config();
<<<<<<< HEAD
const greetingRoutes = require('./routes/greeting_routes')
const logger = require('./logger');
=======
>>>>>>> DevlopmentBranch

const app = express();
const port = process.env.PORT;


app.use(express.json());
app.use(express.urlencoded({
    extended: true,
  })
);

<<<<<<< HEAD
=======
app.use('/swagger-api', swaggerUI.serve, swaggerUI.setup(swaggerOption));

>>>>>>> DevlopmentBranch
app.use(greetingRoutes);

app.listen(port, () => {
  logger.log('info',`Example app listening at http://localhost:${port}`)
});