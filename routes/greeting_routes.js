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

//Create Data into the DB
router.post('/greeting', control.createData) 
  
//Update Data into the DB
router.put('/greeting', control.updateData) 
  

module.exports = router;