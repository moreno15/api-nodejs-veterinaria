module.exports = class PostModel {


    getColums(con, table, db, callback) {

        con.query(`SELECT COLUMN_NAME AS item FROM information_schema.columns WHERE table_schema = '${db}' AND table_name = '${table}'`, callback,
            function(err, res, field) {
                if (err) {
                    return result(err, null);
                } else {
                    return result(null, res);
                }
            });

    }


    postData(con, table, colums, param, callback) {

        con.query("INSERT INTO " + table + " " + colums + " VALUES" + param, callback,
            function(err, res, field) {
                if (err) {
                    return result(err, null);
                } else {
                    return result(null, res);
                }
            });

    }


};