module.exports = class Categoria {


    getdata(con, callback) {
        con.query("SELECT *FROM categories", callback,
            function(err, res, field) {
                if (err) {
                    return result(err, null);
                } else {
                    return result(null, res);
                }
            });
    }
    getdataById(con, id, callback) {
        con.query(`SELECT *FROM categories WHERE id_category = ${id}`, callback,
            function(err, res, field) {
                if (err) {
                    return result(err, null);
                } else {
                    return result(null, res);
                }
            });
    }

    postData(con, categoria, callback) {

        con.query("INSERT into categories SET  ?", categoria,
            callback,
            function(err, res, field) {
                if (err) {
                    return result(err, null);
                } else {
                    return result(null, res);
                }
            });

    }
    putData(con, categoria, id, callback) {
        con.query(`UPDATE categories SET  ? WHERE id_category = ${id}`, categoria,
            callback,
            function(err, res, field) {
                if (err) {
                    return result(err, null);
                } else {
                    return result(null, res);
                }
            });
    }
    deleteData(con, id, callback) {
        con.query(`DELETE FROM categories WHERE id_category = ${id}`, callback,
            function(err, res, field) {
                if (err) {
                    return result(err, null);
                } else {
                    return result(null, res);
                }
            });
    }

};