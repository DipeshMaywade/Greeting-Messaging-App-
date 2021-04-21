const validateSchema = require("../utility/helper");
const serviceObj = require("../services/greetService");
const logger = require("../utility/logger");

/**controller to past request to greetService
 * @class Controller
 * @param {httpRequest} req
 * @param {httpresponse} res
 */

class Controller {

  //get all Data from DB
  getData = (req, res) => {
    serviceObj.getData(req, res);
  };

  //get all Data from DB Using ID
  getDataWithID = (req, res) => {
    serviceObj.getWithId(req, res);
  };

  //delete all Data from DB Using ID
  deleteData = (req, res) => {
    serviceObj.deleteWithId(req, res);
  };

  //Insert Data into DB
  createData = (req, res) => {
    let result = validateSchema.schema.validate(req.body);

    if (result.error) {
      logger.log("error", `${result.error.details[0].message}`);
      return res.status(400).send(result);
    }
    serviceObj.createNewData(req, res);
  };

  //Update Data from DB
  updateData = (req, res) => {
    let result = validateSchema.schema.validate(req.body);

    if (result.error) {
      return res.status(400).send(result.error.details[0].message);
    }
    serviceObj.updateDataWithId(req, res);
  };
}

module.exports = new Controller();
