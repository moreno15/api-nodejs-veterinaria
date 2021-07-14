module.exports = class DeleteModel {


    deleteData(con, table, nameId, id, callback) {

        con.query("DELETE FROM " + table + " WHERE " + nameId + "=" + id, callback,
            function(err, res, field) {
                if (err) {
                    return result(err, null);
                } else {
                    return result(null, res);
                }
            });

    }


};