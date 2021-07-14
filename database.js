//const { Client  } = require('pg')

const mysql = require('mysql');
const { promisify } = require('util');
const { database } = require('./keys'); 

//const client = new Client(database);
 

const pool = mysql.createPool(database);

pool.getConnection((err, connection) => {

    if (err) {
        if (err.code === 'PROTOCOL_CONNECTION_LOST') {
            console.log('la conexion a la base de datos fue cerrada');
        }
        if (err.code === 'ER_CON_COUNT_ERROR') {
            console.log('numero de conexion a la bbase de datos');
        }
        if (err.code === 'ECONNREFUSED') {
            console.log('la conexion a la base de datos fue rechazado');
        }
    }

    if (connection) connection.release();

    console.log('base de datos conectada');
    return;
}); 
pool.query = promisify(pool.query);
 
module.exports = pool;