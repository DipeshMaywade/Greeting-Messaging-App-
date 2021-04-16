const express = require('express');
const router = express.Router();
const control = require('../controllers/greeting_controller');

router.get('/', control.okTest)

//Get all Data
router.get('/greeting', control.getData)

//Get data using ID
router.get('/greeting/:id',control.getDataWithID)

//Delete Data from DB using ID
router.delete('/greeting/:id', control.deleteData)

  
module.exports = router;