const express = require('express');
const router = express.Router();
const mysql = require('../services/db')

router.get('/', (req, res) => {
    res.json({'message': 'ok'});
  });


router.get('/greeting', (req, res)=>{
    mysql.connection.query('select * from greetings',(err, rows)=>{
        if (!err) {
            res.send(rows)
        }else{
            res.send(err);
        }
    })
});

//Get using ID
router.get('/greeting/:id', (req, res)=>{
    mysql.connection.query('select * from greetings where id = ?',[req.params.id],(err, rows)=>{
        if (!err) {
            res.send(rows)
        }else{
            res.send(err);
        }
    })
});

  module.exports = router;