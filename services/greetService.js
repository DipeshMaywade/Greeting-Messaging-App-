const modelObj = require("../models/model");

class greetService {
  getData = (req, res) => {
    modelObj.get(req, res);
  };

  getWithId = (req, res) => {
    modelObj.getWithId(req, res);
  };

  deleteWithId = (req, res) => {
    modelObj.deleteWithId(req, res);
  };

  createNewData = (req, res) => {
    modelObj.create(req, res);
  };

  updateDataWithId = (req, res) => {
    modelObj.update(req, res);
  };
}

module.exports = new greetService();
