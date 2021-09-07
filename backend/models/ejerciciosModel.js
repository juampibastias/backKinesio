var pool = require('./bd');


async function getEjercicios() {
    
        var query = "select  * from ejercicios order by id desc";
        var rows = await pool.query(query);
        return rows;
}

async function insertEjercicios(obj) {
    try {
        var query = "insert into ejercicios set ?";
        var rows = await pool.query(query, [obj]);
        return rows
    } catch (error) {
        console.log(error);
        throw error;
    }
}

async function deleteEjerciciosById(id) {
    var query = 'delete from ejercicios where id= ?'
    var rows = await pool.query(query, [id]);
    return rows;
}

async function getEjerciciosById(id) {
var query ='select * from ejercicios where id = ? ';
var rows = await pool.query(query, [id]);
return rows[0];
}

async function modificarEjerciciosById(obj, id) {
    try {
        var query = 'update ejercicios set ? where id = ?';
        var rows = await pool.query(query, [obj, id]);
        return rows;
    } catch (error) {
        console.log(error);
         throw (error);
    }
}

module.exports = { getEjercicios, insertEjercicios, deleteEjerciciosById, getEjerciciosById, modificarEjerciciosById }