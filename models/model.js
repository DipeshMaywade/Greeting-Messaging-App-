class Query{
    getSql = "select * from greetings"
    getWithId = "select * from greetings where id = ?"
    deleteSql = "delete from greetings where id = ?"
    updateSql = "SET @id=?; SET @name=?; Set @message=?; Call greetingAddOrEdit(@id, @name, @message);" ;
    createSql = "SET @id=?; SET @name=?; Set @message=?; Call greetingAddOrEdit(@id, @name, @message);" ;
}

module.exports = new Query();