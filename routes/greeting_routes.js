const express = require("express");
const router = express.Router();
const controllObj = require("../controllers/greeting_controller");

//routes to GetData controller with path /greeting
router.get("/greeting", controllObj.getData);

//routes to getData with Id controller with path /greeting/{id}
router.get("/greeting/:id", controllObj.getDataWithID);

//routes to deleteData with Id controller with path /greeting/{id}
router.delete("/greeting/:id", controllObj.deleteData);

//routes to post data controller with path /greeting
router.post("/greeting", controllObj.createData);

//routes to edit with Id controller with path /greeting/{id}
router.put("/greeting/:id", controllObj.updateData);

module.exports = router;
