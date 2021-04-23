const mysqlObj = require("../config/config.js");

/** To pass the request and response to the databse
 * @class Query
 * @param {httpRequest} req
 * @param {httpresponse} res
 * @description Query method is used for perform oprtaion in databse.
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
    mysqlObj.connection.query(
      "update greetings set name=?, message=? where id=?",
      [data.name, data.message, data.id],
      (err, result) => {
        if (result.affectedRows == 0) {
          callback(err);
        } else {
          let newData = {
            response: "updated success",
            affectedRow: result.affectedRows,
            updatedName: data.name,
            updatedmessage: data.message,
          };
          callback(newData);
        }
      }
    );
  };

  //For creat new data into the database.
  create = (data, callback) => {
    mysqlObj.connection.query(
      "insert into greetings (name, message) values(?, ?);",
      [data.name, data.message],
      (err, result) => {
        if (result.affectedRows == 0) {
          callback(err);
        } else {
          let newData = {
            response: "success",
            insertedRow: result.affectedRows,
            newName: data.name,
            newMessage: data.message,
          };
          callback(newData);
        }
      }
    );
  };
}

module.exports = new Query();
