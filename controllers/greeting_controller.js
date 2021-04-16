const mysql = require('../services/db')

//success message
const okTest = (req, res) => {
    res.json({'message': 'ok'});
  };


//get all Data from DB
const getData = (req, res)=>{
    mysql.connection.query('select * from greetings',(err, rows)=>{
        if (!err) {
            res.send(rows)
        }else{
            res.send(err);
        }
    })
};

const getDataWithID = (req, res)=>{
    mysql.connection.query('select * from greetings where id = ?',[req.params.id],(err, rows)=>{
        if (!err) {
            res.send(rows)
        }else{
            res.send(err);
        }
    })
};

const deleteData = (req, res)=>{
    mysql.connection.query('delete from greetings where id = ?',[req.params.id],(err, rows, filed)=>{
        if (!err) {
            res.send("Delete Sucessfully..!")
        }else{
            res.send(err);
        }
    })
};

//Insert Data into DB
const createData = (req, res)=>{
    let greet = req.body;
    var sql = "SET @id=?; SET @name=?; Set @message=?; Call greetingAddOrEdit(@id, @name, @message);" ;

    mysql.connection.query(sql,[greet.id, greet.name, greet.message],(err, rows, filed)=>{
        if (!err) {
            rows.forEach(element => {
                if (element.constructor == Array)
                res.send(`Inserted ID: ${element[0].id}`)
            });
        }else{
            res.send(err);
        }
    })
};

//Update Data from DB
const updateData = (req, res)=>{
    let greet = req.body;
    var sql = "SET @id=?; SET @name=?; Set @message=?; Call greetingAddOrEdit(@id, @name, @message);" ;

    mysql.connection.query(sql,[greet.id, greet.name, greet.message],(err, rows, filed)=>{
        if (!err) {
            rows.forEach(element => {
                if (element.constructor == Array)
                res.send("Updated Successfully...")
            });
        }else{
            res.send(err);
        }
    })
};


  module.exports={
      "okTest": okTest,
      "getData": getData,
      "getDataWithID": getDataWithID,
      "deleteData": deleteData,
      "createData": createData,
      "updateData": updateData
  }