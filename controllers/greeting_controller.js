const mysqlObj = require('../config.js');
const validateSchema = require('../services/validationService')

class Controller{
    //success message
    okTest = (req, res) => {
        res.json({'message': 'ok'});
    };


    //get all Data from DB
    getData = (req, res)=>{
        mysqlObj.connection.query('select * from greetings',(err, rows)=>{
            if (!err) {
                res.send(rows)
            }else{
                res.send(err);
            }
        })
    };

    getDataWithID = (req, res)=>{
        mysqlObj.connection.query('select * from greetings where id = ?',[req.params.id],(err, rows)=>{
            if (!err) {
                res.send(rows)
            }else{
                res.send(err);
            }
        })
    };

    deleteData = (req, res)=>{
        mysqlObj.connection.query('delete from greetings where id = ?',[req.params.id],(err)=>{
            if (!err) {
                res.send("Delete Sucessfully..!")
            }else{
                res.send(err);
            }
        })
    };

    //Insert Data into DB
    createData = (req, res)=>{
        let name = req.body.name;
        let message = req.body.message;
        let id = req.body.id;

        let result = validateSchema.schema.validate(req.body)

        if (result.error){
            return res.status(400).send(result)
            
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
    updateData = (req, res)=>{
        let name = req.body.name;
        let message = req.body.message;
        let id = req.body.id;

        let result = validateSchema.schema.validate(req.body)

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
}

module.exports= new Controller();