module.exports = class Categoria {

    getUser(con, email_user, password_user, callback) {
        con.query(`SELECT id_user,rol_user,picture_user,displayname_user,username_user,email_user,department_user,province_user,district_user,phone_user,address_user,token_user,token_exp_user,method_user,verification_user,wishlist_user,date_created_user,date_updated_user FROM users WHERE email_user = '${email_user}' AND password_user = '${password_user}'`, callback,
            function(err, res, field) {
                if (err) {
                    return result(err, null);
                } else {
                    return result(null, res);
                }
            });
    }
    getUserToken(con, token, callback) {
        con.query(`SELECT id_user,rol_user,picture_user,displayname_user,username_user,email_user,department_user,province_user,district_user,phone_user,address_user,token_user,token_exp_user,method_user,verification_user,wishlist_user,date_created_user,date_updated_user FROM users WHERE token_user = '${token}' `, callback,
            function(err, res, field) {
                if (err) {
                    return result(err, null);
                } else {
                    return result(null, res);
                }
            });
    }

    putDataToken(con, id, token, expiresIn, callback) {

        con.query(`UPDATE users SET  token_user='${token}'  , token_exp_user='${expiresIn}' WHERE id_user = ${id}`,
            callback,
            function(err, res, field) {
                if (err) {
                    return result(err, null);
                } else {
                    return result(null, res);
                }
            });
    }


};