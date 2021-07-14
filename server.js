const dotenv = require('dotenv');
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');

const errorHandler = require("./middleware/error");
const con = require('./database');

// rutas 
const rutas = require('./rutas/ruta');

dotenv.config({ path: './config/config.env' });

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/*var corsOptions = {
    origin: 'http://market.com',
    optionsSuccessStatus: 200, // For legacy browser support
    methods: "GET, PUT"
}*/
app.use(cors()); // diferente aplicaciones,web desktop,android

if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
}



// connecting route to database
app.use(function(req, res, next) {

    req.con = con;
    next()
})

// para cada clase
app.use('/api', rutas);


app.use(errorHandler);

const PORT = process.env.PORT || 5000

app.listen(PORT, console.log('Servidor se esta ejecutando puerto 5000!', process.env.NODE_ENV));