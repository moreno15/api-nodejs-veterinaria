module.exports = class PutModel {



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


    putData(con, table, set, nameId, id, callback) {

        con.query("UPDATE " + table + " SET " + set + " WHERE " + nameId + "=" + id, callback,
            function(err, res, field) {
                if (err) {
                    return result(err, null);
                } else {
                    return result(null, res);
                }
            });

    }


};