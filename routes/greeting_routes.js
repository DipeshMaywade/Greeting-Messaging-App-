const express = require("express");
const router = express.Router();
const controllObj = require("../controllers/greeting_controller");

//Get all Data
router.get("/greeting", controllObj.getData);

//Get data using ID
router.get("/greeting/:id", controllObj.getDataWithID);

//Delete Data from DB using ID
router.delete("/greeting/:id", controllObj.deleteData);

//Create Data into the DB
router.post("/greeting", controllObj.createData);

//Update Data into the DB
router.put("/greeting/:id", controllObj.updateData);

module.exports = router;
