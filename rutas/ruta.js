const express = require('express');

const ruta = express.Router();


const { getData } = require('../controller/getController');
const { postData } = require('../controller/postController');
const { putData } = require('../controller/putController');
const { deleteData } = require('../controller/deleteController');

ruta
    .route('/:parametro')
    .get(getData)
    .put(putData)
    .post(postData)
    .delete(deleteData)




module.exports = ruta;