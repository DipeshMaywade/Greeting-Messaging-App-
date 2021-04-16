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


  module.exports={
      "okTest": okTest,
      "getData": getData,
      "getDataWithID": getDataWithID,
      "deleteData": deleteData
  }