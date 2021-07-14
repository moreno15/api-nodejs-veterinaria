const errorHandler = (err, req, res, next) => {
    // console.log("errores en mi controller", err);

    res.status(err.status).json({
        status: err.status,
        mensaje: err.message
    })
}

module.exports = errorHandler;