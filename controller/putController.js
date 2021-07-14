const errorResponse = require('../helper/errorResponse');
const { seguridad } = require('../middleware/seguridad');
const PutModel = require('../models/putModel');

exports.putData = (req, res, next) => {
    const putModel = new PutModel();
    let db = "albizaa";

    let { nameId, id, token } = req.query;
    let parametro = req.params.parametro;

    if (token == "no") {
        // actualizar datos que no requieran permiso 
        let set = "";

        for (let i = 0; i < Object.keys(req.body).length; i++) {

            set = set + Object.keys(req.body)[i] + "='" + Object.values(req.body)[i] + "',";

        }

        set = set.slice(0, -1);

        putModel.putData(req.con, parametro, set, nameId, id, function(err, rows) {
            if (err) {
                return next(new errorResponse(err, 403));
            } else {

                res.status(200).json({
                    status: 200,
                    results: "Actualizacion exitoza",


                });

            }
        });


    } else {
        putModel.getColums(req.con, parametro, db, function(err, table) {
            if (err) {
                res.status(403).json({
                    status: 403,
                    results: "la tabla no se encuentra en la base de datos"
                });
                //return next(new errorResponse("el correo y/o contraseña incorrecto", 403)); //+"el correo y/o contraseña incorrecto"

            } else {

                // actualizar datos que  requieran permiso 
                let set = "";

                for (let i = 0; i < Object.keys(req.body).length; i++) {

                    set = set + Object.keys(req.body)[i] + "='" + Object.values(req.body)[i] + "',";

                }

                set = set.slice(0, -1);


                putModel.putData(req.con, parametro, set, nameId, id, function(err, rows) {
                    if (err) {
                        return next(new errorResponse(err, 403));
                    } else {

                        res.status(200).json({
                            status: 200,
                            results: "Actualizacion exitoza ",


                        });

                    }
                });
            }
        });


    }





}