var pool = require('./bd');

async function getAthome() {
    var query = "select * from ejercicios order by id desc";
    var rows = await pool.query(query);
    return rows;
}

async function insertAthome (obj) {
    try {
        var query = "insert into ejercicios set ? ";
        var rows = await pool.query(query, [obj]);
        return rows;
    } catch (error) {
        console.log(error);
       throw error;
    }
}
module.exports = { getAthome, insertAthome }