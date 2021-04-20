const mysqlObj = require("../config.js");

class Query {
  get = (req, res) => {
    mysqlObj.connection.query("select * from greetings", (err, rows) => {
      if (!err) {
        res.send(rows);
      } else {
        res.send(err);
      }
    });
  };

  getWithId = (req, res) => {
    mysqlObj.connection.query(
      "select * from greetings where id = ?",
      [req.params.id],
      (err, rows) => {
        if (!err) {
          if (rows.length == 0) {
            return res.status(404).send("Data Not Found");
          } else {
            res.send(rows);
          }
        } else {
          res.send(err);
        }
      }
    );
  };

  deleteWithId = (req, res) => {
    mysqlObj.connection.query(
      "delete from greetings where id = ?",
      [req.params.id],
      (err) => {
        if (!err) {
          res.send("Delete Sucessfully..!");
        } else {
          res.send(err);
        }
      }
    );
  };

  update = (req, res) => {
    let data = {
      name: req.body.name,
      message: req.body.message,
    };

    mysqlObj.connection.query(
      "update greetings set name=?, message=? where id=?",
      [data.name, data.message, req.params.id],
      (err) => {
        if (!err) {
          res.status(200).send("Updated Successfully...");
        } else {
          res.status(404).send(err);
        }
      }
    );
  };

  create = (req, res) => {
    let data = {
      name: req.body.name,
      message: req.body.message,
    };

    mysqlObj.connection.query(
      "insert into greetings (name, message) values(?, ?);",
      [data.name, data.message],
      (err, rows) => {
        if (!err) {
          res.status(200).send("New Data Inserted");
        } else {
          res.status(400).send(err);
        }
      }
    );
  };
}

module.exports = new Query();
