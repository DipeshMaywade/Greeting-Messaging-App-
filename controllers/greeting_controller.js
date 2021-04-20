const validateSchema = require("../utility/helper");
const modelsObj = require("../models/model.js");
const logger = require("../utility/logger");


class Controller {
  //get all Data from DB
  getData = (req, res) => {
    modelsObj.get(req, res)
  };

  getDataWithID = (req, res) => {
    modelsObj.getWithId(req, res);
  };

  deleteData = (req, res) => {
    modelsObj.deleteWithId(req, res)
  };

  //Insert Data into DB
  createData = (req, res) => {
    let result = validateSchema.schema.validate(req.body);

    if (result.error) {
      logger.log("error", `${result.error.details[0].message}`)
      return res.status(400).send(result); 
    }
    modelsObj.create(req,res)
  };

  //Update Data from DB
  updateData = (req, res) => {
    let result = validateSchema.schema.validate(req.body);
    
    if (result.error) {
        return res.status(400).send(result.error.details[0].message);
    }
    modelsObj.update(req,res)
  };
}

module.exports = new Controller();
