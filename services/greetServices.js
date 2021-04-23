const modelObj = require("../models/greetSchema");

class GreetService {

  getData = (callback) => {
    modelObj.get((err, result) => {
      err ? callback(err) : callback(null, result)
    });
  };

  getWithId = (data, callback) => {
    modelObj.getWithId(data, (err, result) => {
      err ? callback(err) : callback(null, result)
    });
  };

  deleteWithId = (data, callback) => {
    modelObj.deleteWithId(data, (err, result) => {
      err ? callback(err) : callback(null, result)
    });
  };

  createNewData = (data, callback) => {
    modelObj.create(data, (err, result) => {
      err ? callback(err) : callback(null, result)
    });
  };

  updateDataWithId = (data, callback) => {
    modelObj.update(data, (err, result) => {
      err ? callback(err) : callback(null, result)
    });
  };
}

module.exports = new GreetService();
