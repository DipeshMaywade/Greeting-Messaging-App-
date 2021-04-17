const mysqlObj = require('../config.js');
const joi = require('joi');

const schema = joi.object({
    id: joi.number().required(),
    name : joi.string().min(3).max(10).pattern(new RegExp("^[A-Z]{1}[a-z]{2,}$")).required(),
    message : joi.string().required()
})

//success message
const okTest = (req, res) => {
    res.json({'message': 'ok'});
  };


//get all Data from DB
const getData = (req, res)=>{
    mysqlObj.connection.query('select * from greetings',(err, rows)=>{
        if (!err) {
            res.send(rows)
        }else{
            res.send(err);
        }
    })
};

const getDataWithID = (req, res)=>{
    mysqlObj.connection.query('select * from greetings where id = ?',[req.params.id],(err, rows)=>{
        if (!err) {
            res.send(rows)
        }else{
            res.send(err);
        }
    })
};

const deleteData = (req, res)=>{
    mysqlObj.connection.query('delete from greetings where id = ?',[req.params.id],(err, rows, filed)=>{
        if (!err) {
            res.send("Delete Sucessfully..!")
        }else{
            res.send(err);
        }
    })
};

//Insert Data into DB
const createData = (req, res)=>{
    let name = req.body.name;
    let message = req.body.message;
    let id = req.body.id;

    let result = schema.validate(req.body)

    if (result.error){
        res.status(400).send(result.error.details[0].message)
        return;
    }
   
    var sql = "SET @id=?; SET @name=?; Set @message=?; Call greetingAddOrEdit(@id, @name, @message);" ;
    mysqlObj.connection.query(sql,[id, name, message],(err, rows)=>{
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
    let name = req.body.name;
    let message = req.body.message;
    let id = req.body.id;

    let result = schema.validate(req.body)

    if (result.error){
        res.status(400).send(result.error.details[0].message)
        return;
    }

    var sql = "SET @id=?; SET @name=?; Set @message=?; Call greetingAddOrEdit(@id, @name, @message);" ;

    mysqlObj.connection.query(sql,[id, name, message],(err, rows, filed)=>{
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