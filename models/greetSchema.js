const mysqlObj = require("../config/config.js");

/** To pass the request and response to the databse
 * @class Query
 * @param {httpRequest} req
 * @param {httpresponse} res
 * @description class method is used for perform oprtaion in databse.
 */

class Query {
  //For Getting all value from database
  get = (callback) => {
    mysqlObj.connection.query("select * from greetings", (err, result) => {
      if (err) {
        callback(err);
      } else {
        callback(result);
      }
    });
  };

  //For Getting value by from database.
  getWithId = (data, callback) => {
    mysqlObj.connection.query(
      "select * from greetings where id = ?",
      [data.params.id],
      (err, result) => {
        if (!err) {
          if (result.length == 0) {
            callback(null);
          } else {
            callback(result);
          }
        } else {
          callback(err);
        }
      }
    );
  };

  //For delete specific value from database.
  deleteWithId = (data, callback) => {
    mysqlObj.connection.query(
      "delete from greetings where id = ?",
      [data.params.id],
      (err, result) => {
        if (result.affectedRows == 0) {
          callback(null);
        } else {
          callback("Sucessfully Deleted");
        }
      }
    );
  };

  //For updtae specific value from database.
  update = (data, callback) => {
    let bodyData = {
      name: data.body.name,
      message: data.body.message,
    };

    mysqlObj.connection.query(
      "update greetings set name=?, message=? where id=?",
      [bodyData.name, bodyData.message, data.params.id],
      (err, result) => {
        if (result.affectedRows == 0) {
          callback(err);
        } else {
          let newData = {
            response: "updated success",
            affectedRow: result.affectedRows,
            updatedName: data.body.name,
            updatedmessage: data.body.message,
          };
          callback(newData);
        }
      }
    );
  };

  //For creat new data into the database.
  create = (data, callback) => {
    let bodyData = {
      name: data.body.name,
      message: data.body.message,
    };

    mysqlObj.connection.query(
      "insert into greetings (name, message) values(?, ?);",
      [bodyData.name, bodyData.message],
      (err, result) => {
        if (result.affectedRows == 0) {
          callback(err);
        } else {
          let newData = {
            response: "success",
            insertedRow: result.affectedRows,
            newName: data.body.name,
            newMessage: data.body.message,
          };
          callback(newData);
        }
      }
    );
  };
}

module.exports = new Query();
