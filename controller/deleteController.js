const errorResponse = require('../helper/errorResponse');
const { seguridad } = require('../middleware/seguridad');
const DeleteModel = require('../models/deleteModel');


exports.deleteData = (req, res, next) => {
    const deleteModel = new DeleteModel();
    let db = "albizaa";

    let { nameId, id, token } = req.query;
    let parametro = req.params.parametro;

    if (token == "no") {



    } else {
        deleteModel.deleteData(req.con, parametro, nameId, id, function(err, rows) {
            if (err) {
                return next(new errorResponse(err, 403));
            } else {

                res.status(200).json({
                    status: 200,
                    results: "Eliminación exitoza ",


                });

            }
        });

    }





}