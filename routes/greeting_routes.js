const express = require('express');
const router = express.Router();
const controlObj = require('../controllers/greeting_controller');

router.get('/', controlObj.okTest)

//Get all Data
router.get('/greeting', controlObj.getData)

//Get data using ID
router.get('/greeting/:id',controlObj.getDataWithID)

//Delete Data from DB using ID
router.delete('/greeting/:id', controlObj.deleteData)

//Create Data into the DB
router.post('/greeting', controlObj.createData) 
  
//Update Data into the DB
router.put('/greeting', controlObj.updateData) 
  

module.exports = router;