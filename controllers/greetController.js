const validateSchema = require("../utility/helper");
const serviceObj = require("../services/greetServices");
const logger = require("../utility/logger");

/**controller to past request to greetService
 * @class Controller
 * @param {httpRequest} req
 * @param {httpresponse} res
 * @description class method
 */

class Controller {
  /**geetting all the data
   * @method getData is service level method
   * @var responseResult object for store response.
   * @param result callback parameter
   */
  getData = (req, res) => {
    var responseResult = {};
    serviceObj.getData((result) => {
      responseResult.success = true;
      responseResult.result = result;
      res.status(200).send(responseResult);
    });
  };

  /**geetting the data with ID
   * @method getWithId is service level method
   * @var responseResult object for store response.
   */
  getDataWithID = (req, res) => {
    var responseResult = {};
    serviceObj.getWithId(req, (result) => {
      if (result == null ) {
        responseResult.success= false;
        responseResult.message = "Data Not Found"
        res.status(404).send(responseResult)
      } else {
        responseResult.success = true;
        responseResult.result = result;
        res.status(200).send(responseResult);
      }
    });
  };

  /**deleting the data with ID
   * @method deleteWithId is service level method
   */
  deleteData = (req, res) => {
    let responseResult = {};
    serviceObj.deleteWithId(req, (result) => {
      if (result == null ) {
        responseResult.success= false;
        responseResult.message = "Data Not Found"
        res.status(404).send(responseResult)
      } else {
        responseResult.success = true;
        responseResult.result = result;
        res.status(200).send(responseResult);
      }
    });
  };

  /**creating new data
   * @method createNewData is service level method
   */
  createData = (req, res) => {
    let responseResult = {};
    let result = validateSchema.schema.validate(req.body);
    if (result.error) {
      responseResult.success= false;
      responseResult.message = "Bad Request"
      responseResult.result = result.error.details[0].message
      logger.log("error", `${result.error.details[0].message}`);
      return res.status(422).send(responseResult)
    }
    serviceObj.createNewData(req, (result) => {
      if(result == null){
        responseResult.success= false;
        responseResult.message = "failed"
        res.status(422).send(responseResult)
      } else {
        responseResult.success = true;
        responseResult.result = result;
        res.status(200).send(responseResult);
      }
    });
  };

  /**updating the data with ID
   * @method updateDataWithId is service level method
   */
  updateData = (req, res) => {
    let responseResult = {};
    let result = validateSchema.schema.validate(req.body);
    if (result.error) {
      responseResult.success= false;
      responseResult.message = "Bad Request"
      responseResult.result = result.error.details[0].message
      logger.log("error", `${result.error.details[0].message}`);
      return res.status(422).send(responseResult)
    }
    serviceObj.updateDataWithId(req, (result) => {
      if(result == null){
        responseResult.success= false;
        responseResult.message = "Data not found"
        res.status(404).send(responseResult)
      } else {
        responseResult.success = true;
        responseResult.result = result;
        res.status(200).send(responseResult);
      }
    });
  }
}

module.exports = new Controller();
