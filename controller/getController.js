const errorResponse = require('../helper/errorResponse');
const GetModel = require('../models/getModel');


exports.getData = (req, res, next) => {

    const getModel = new GetModel();

    let { rel, type, linkTo, equalTo, orderBy, orderMode, startAt, endAt, search, select } = req.query;

    let parametro = req.params.parametro;

    // peticion get   con filtro

    if (typeof linkTo !== 'undefined' && typeof equalTo !== 'undefined' && typeof rel == 'undefined' &&
        typeof type == 'undefined') {

        if (typeof orderBy == 'undefined' && typeof orderMode == 'undefined') {
            orderBy = null;
            orderMode = null;
        }

        if (typeof startAt == 'undefined' && typeof endAt == 'undefined') {
            startAt = null;
            endAt = null;
        }


        getModel.getdataFilter(req.con, parametro, orderBy, orderMode, linkTo, equalTo, startAt, endAt, select, function(err, rows) {
            if (err) {
                return next(new errorResponse(err, 403));
            } else {
                if (rows.length > 0) {
                    res.status(200).json({
                        status: 200,
                        total: rows.length,
                        results: rows,

                    });
                } else {

                    res.status(404).json({
                        status: 404,
                        results: "Not Found",
                        method: "getdataFilter ",

                    });
                } //response
            }
        });

        // peticion GET para tablas relacionadas sin filtro

    } else if (typeof linkTo == 'undefined' && typeof equalTo == 'undefined' && typeof rel !== 'undefined' &&
        typeof type !== 'undefined' && parametro == 'relations') {

        if (typeof orderBy == 'undefined' && typeof orderMode == 'undefined') {
            orderBy = null;
            orderMode = null;
        }

        if (typeof startAt == 'undefined' && typeof endAt == 'undefined') {
            startAt = null;
            endAt = null;
        }

        getModel.getRelData(req.con, rel, type, orderBy, orderMode, startAt, endAt, select, function(err, rows) {
            if (err) {
                return next(new errorResponse(err, 403));
            } else {
                if (rows.length > 0) {
                    res.status(200).json({
                        status: 200,
                        total: rows.length,
                        results: rows,

                    });
                } else {
                    res.status(404).json({
                        status: 404,
                        results: "Not Found",
                        method: "getRelData",

                    });
                } //response
            }
        });

        //peticiones GET para tablas relacionadas con filtro
    } else if (typeof linkTo !== 'undefined' && typeof equalTo !== 'undefined' && typeof rel !== 'undefined' &&
        typeof type !== 'undefined' && parametro == 'relations') {

        if (typeof orderBy == 'undefined' && typeof orderMode == 'undefined') {
            orderBy = null;
            orderMode = null;
        }

        if (typeof startAt == 'undefined' && typeof endAt == 'undefined') {
            startAt = null;
            endAt = null;
        }

        getModel.getRelFilterData(req.con, rel, type, orderBy, orderMode, linkTo, equalTo, startAt, endAt, select, function(err, rows) {
            if (err) {
                return next(new errorResponse(err, 403));
            } else {

                if (rows.length > 0) {
                    res.status(200).json({
                        status: 200,
                        total: rows.length,
                        results: rows,

                    });

                } else {

                    res.status(404).json({
                        status: 404,
                        results: "Not Found",
                        method: "getRelFilterData",

                    });
                } //response

            }
        });

    } else if (typeof linkTo !== 'undefined' && typeof search !== 'undefined') {

        // buscador para tablas relacionadas
        if (typeof rel !== 'undefined' && typeof type !== 'undefined' && parametro == 'relations') {

            if (typeof orderBy == 'undefined' && typeof orderMode == 'undefined') {
                orderBy = null;
                orderMode = null;
            }

            if (typeof startAt == 'undefined' && typeof endAt == 'undefined') {
                startAt = null;
                endAt = null;
            }

            getModel.getRelSearchData(con, rel, type, orderBy, orderMode, linkTo, equalTo, search, startAt, endAt, select, function(err, rows) {
                if (err) {
                    return next(new errorResponse(err, 403));
                } else {
                    if (rows.length > 0) {
                        res.status(200).json({
                            status: 200,
                            total: rows.length,
                            results: rows,

                        });
                    } else {
                        res.status(404).json({
                            status: 404,
                            results: "Not Found",
                            method: "getRelSearchData",

                        });
                    } //response
                }
            });

            //buscador para una tabla
        } else {

            if (typeof orderBy == 'undefined' && typeof orderMode == 'undefined') {
                orderBy = null;
                orderMode = null;
            }

            if (typeof startAt == 'undefined' && typeof endAt == 'undefined') {
                startAt = null;
                endAt = null;
            }
        

            getModel.getSearchData(req.con, parametro, linkTo, search, orderBy, orderMode, startAt, endAt, select, function(err, rows) {
                if (err) {
                    return next(new errorResponse(err, 403));
                } else {
                    if (rows.length > 0) {
                        res.status(200).json({
                            status: 200,
                            total: rows.length,
                            results: rows,

                        });
                    } else {
                        res.status(404).json({
                            status: 404,
                            results: "Not Found",
                            method: "getSearchData",

                        });
                    } //response
                }
            });
        }

        // peticion GET si filtro
    } else {
        if (typeof orderBy == 'undefined' && typeof orderMode == 'undefined') {
            orderBy = null;
            orderMode = null;
        }

        if (typeof startAt == 'undefined' && typeof endAt == 'undefined') {
            startAt = null;
            endAt = null;
        }

        getModel.getdata(req.con, parametro, orderBy, orderMode, startAt, endAt, select, function(err, rows) {
            if (err) {
                return next(new errorResponse(err, 403));
            } else {
                if (rows.length > 0) {
                    res.status(200).json({
                        status: 200,
                        total: rows.length,
                        results: rows,

                    });
                } else {
                    res.status(404).json({
                        status: 404,
                        results: "Not Found",
                        method: "getdata",

                    });
                } //response
            }
        });

    }
    /* getmodel.getdata(req.con, function(err, rows) {

     })*/


}