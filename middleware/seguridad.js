const errorResponse = require('../helper/errorResponse');
const jwt = require('jsonwebtoken');


exports.seguridad = (req, res, next) => {
    req.expired = "false"
    req.required = "false";
    const bearerHeader = req.headers['authorization'];
    if (typeof bearerHeader !== 'undefined') {
        const bearer = bearerHeader.split(' ');
        const bearerToken = bearer[1];
        req.token = bearerToken;
        jwt.verify(req.token, 'rmh_KJDHKKseretKeyksjMPmhra', (err, authData) => {
            if (err) {
                return next(new errorResponse("error token ha expirado", 403));
            }
        });
        // Next middleware
        next();
    } else {
        return next(new errorResponse("error token es requerido", 403));
    }
}