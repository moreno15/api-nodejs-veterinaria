const errorResponse = require('../helper/errorResponse');
const jwt = require('jsonwebtoken');
const { seguridad } = require('../middleware/seguridad');

const PostModel = require('../models/postModel');
const Users = require('../models/users');

exports.postData = (req, res, next) => {
    const postModel = new PostModel();
    const users = new Users();
    let db = "albizaa";

    let { register, login, token } = req.query;
    let parametro = req.params.parametro;

    if (token == "no") {
        // registrar usuario no necesita validar token
        if (parametro == 'users' && register == "true") {
            let colums = "(";
            let param = "(";

            for (let i = 0; i < Object.keys(req.body).length; i++) {

                colums = colums + Object.keys(req.body)[i] + ",";
                param = param + "'" + Object.values(req.body)[i] + "',";

            }

            colums = colums.slice(0, -1);
            param = param.slice(0, -1);

            colums = colums + ")";
            param = param + ")";


            postModel.postData(req.con, parametro, colums, param, function(err, rows) {
                if (err) {
                    return next(new errorResponse(err, 403));
                } else {

                    res.status(200).json({
                        status: 200,
                        results: "success",


                    });

                }
            });


            //login usuario no nesesita verificar token
        } else if (parametro == 'users' && login == "true") {

            users.getUser(req.con, req.body.email_user, req.body.password_user, function(err, us) {
                if (err) {
                    res.status(403).json({
                        status: 403,
                        results: "el correo y/o contraseña incorrecto"
                    });
                    //return next(new errorResponse("el correo y/o contraseña incorrecto", 403)); //+"el correo y/o contraseña incorrecto"

                } else {


                    if (us.length === 0) {
                        res.status(403).json({
                            status: 403,
                            results: "la cuenta no existe"
                        });
                        //return next(new errorResponse("el correo y/o contraseña incorrecto v", 403));
                    } else {
                        const user = {
                            id: us[0]['id_user'],
                            username: us[0]['username_user'],
                            email: us[0]["email_user"]
                        }
                        var date = new Date();
                        var time = date.getTime();
                        var expiresIn = time + 60 * 60 * 24;
                        var token = jwt.sign(user, 'tkalbza_KJDHKKseretKeyksjMPmhraffsbblhd', { expiresIn: expiresIn })

                        users.putDataToken(req.con, us[0]['id_user'], token, expiresIn, function(err) {
                            if (err) {
                                return next(new errorResponse("error en actualizar el token", 403));
                            } else {

                                us[0]['token_user'] = token;
                                us[0]['token_exp_user'] = expiresIn;

                                res.status(200).json({
                                    status: 200,
                                    token: token,
                                    results: us
                                });

                            }
                        });

                    }


                }
            })
        }
    } else {
        postModel.getColums(req.con, parametro, db, function(err, table) {
            if (err) {
                res.status(403).json({
                    status: 403,
                    results: "la tabla no se encuentra en la base de datos"
                });
                //return next(new errorResponse("el correo y/o contraseña incorrecto", 403)); //+"el correo y/o contraseña incorrecto"

            } else {

                let colums = "(";
                let param = "(";

                for (let i = 0; i < Object.keys(req.body).length; i++) {

                    colums = colums + Object.keys(req.body)[i] + ",";
                    param = param + "'" + Object.values(req.body)[i] + "',";

                }

                colums = colums.slice(0, -1);
                param = param.slice(0, -1);

                colums = colums + ")";
                param = param + ")";

                postModel.postData(req.con, parametro, colums, param, function(err, rows) {
                    if (err) {
                        return next(new errorResponse(err, 403));
                    } else {

                        res.status(200).json({
                            status: 200,
                            results: "Los datos se registraron exitozamente",
                            id: rows["insertId"], //id ultimoregistro

                        });

                    }
                });


            }
        });


    }





}