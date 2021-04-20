const mysqlObj = require("../config.js");
const validateSchema = require("../utility/validationService");
const modelsObj = require("../models/model.js");

class Controller {
  //get all Data from DB
  getData = (req, res) => {
    mysqlObj.connection.query(modelsObj.getSql, (err, rows) => {
      if (!err) {
        res.send(rows);
      } else {
        res.send(err);
      }
    });
  };

  getDataWithID = (req, res) => {
    mysqlObj.connection.query(
      modelsObj.getWithId,
      [req.params.id],
      (err, rows) => {
        if (!err) {
            if(rows.length == 0){
                return res.status(404).send("Data Not Found")
            }else{
                res.send(rows);
            }
        } else {
          res.send(err);
        }
      }
    );
  };

  deleteData = (req, res) => {
    mysqlObj.connection.query(modelsObj.deleteSql, [req.params.id], (err) => {
      if (!err) {
        res.send("Delete Sucessfully..!");
      } else {
        res.send(err);
      }
    });
  };

  //Insert Data into DB
  createData = (req, res) => {
    let data = {
      name: req.body.name,
      message: req.body.message,
    };

    let result = validateSchema.schema.validate(req.body);

    if (result.error) {
      return res.status(400).send(result);
    }

    mysqlObj.connection.query(
      modelsObj.createSql,
      [0, data.name, data.message],
      (err, rows) => {
        if (!err) {
          rows.forEach((element) => {
            if (element.constructor == Array)
              res.send(`Inserted Data ID Is: ${element[0].id}`);
          });
        } else {
          res.send(err);
        }
      }
    );
  };

  //Update Data from DB
  updateData = (req, res) => {
    let data = {
      name: req.body.name,
      message: req.body.message,
    };

    let result = validateSchema.schema.validate(req.body);

    if (result.error) {
        return res.status(400).send(result.error.details[0].message);
    }

    mysqlObj.connection.query(
      modelsObj.updateSql,
      [req.params.id, data.name, data.message],
      (err, rows, filed) => {
        if (!err) {
          rows.forEach((element) => {
            if (element.constructor == Array)
              res.send("Updated Successfully...");
          });
        } else {
          res.send(err);
        }
      }
    );
  };
}

module.exports = new Controller();
