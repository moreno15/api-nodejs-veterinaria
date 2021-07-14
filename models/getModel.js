module.exports = class GetModel {

    getdata(con, parametro, orderBy, orderMode, startAt, endAt, select, callback) {

        if (orderBy != null && orderMode != null && startAt == null && endAt == null) {
            con.query(`SELECT ${select} FROM ${parametro} ORDER BY ${orderBy}  ${orderMode}  `, callback,
                function(err, res, field) {
                    if (err) {
                        return result(err, null);
                    } else {
                        return result(null, res);
                    }
                });

        } else if (orderBy != null && orderMode != null && startAt != null && endAt != null) {

            con.query(`SELECT ${select} FROM ${parametro} ORDER BY ${orderBy}  ${orderMode} LIMIT ${startAt},${endAt} `, callback,
                function(err, res, field) {
                    if (err) {
                        return result(err, null);
                    } else {
                        return result(null, res);
                    }
                });
        } else {
            con.query(`SELECT ${select} FROM ${parametro} `, callback,
                function(err, res, field) {
                    if (err) {
                        return result(err, null);
                    } else {
                        return result(null, res);
                    }
                });

        }
    }
    getdataFilter(con, table, orderBy, orderMode, linkTo, equalTo, startAt, endAt, select, callback) {

        if (orderBy != null && orderMode != null && startAt == null && endAt == null) {

            let sql = 'SELECT ' + select + ' FROM ' + table + ' WHERE ' + linkTo + '=?' + ' ORDER BY ' + orderBy + ' ' + orderMode;
            con.query(sql, [equalTo], callback,
                function(err, res, field) {
                    if (err) {
                        return result(err, null);
                    } else {
                        return result(null, res);
                    }
                });
        } else if (orderBy == null && orderMode == null && startAt != null && endAt != null) {

            let sql = 'SELECT ' + select + ' FROM ' + table + ' WHERE ' + linkTo + '=?' + ' LIMIT ' + startAt + ',' + endAt;
            con.query(sql, [equalTo], callback,
                function(err, res, field) {
                    if (err) {
                        return result(err, null);
                    } else {
                        return result(null, res);
                    }
                });
        } else if (orderBy != null && orderMode != null && startAt != null && endAt != null) {

            let sql = 'SELECT ' + select + ' FROM ' + table + ' WHERE ' + linkTo + '=?' + ' ORDER BY ' + orderBy + ' ' + orderMode + ' LIMIT ' + startAt + ',' + endAt;
            con.query(sql, [equalTo], callback,
                function(err, res, field) {
                    if (err) {
                        return result(err, null);
                    } else {
                        return result(null, res);
                    }
                });
        } else {

            let sql = 'SELECT ' + select + ' FROM ' + table + ' WHERE ' + linkTo + '=?';
            con.query(sql, [equalTo], callback,
                function(err, res, field) {
                    if (err) {
                        return result(err, null);
                    } else {
                        return result(null, res);
                    }
                });
        }
    }

    getRelData(con, rel, type, orderBy, orderMode, startAt, endAt, select, callback) {

        let relArray = rel.split(",");
        let typeArray = type.split(",");


        /*=============================================
        Relacionar 2 tablas
        =============================================*/


        if (relArray.length == 2 && typeArray.length == 2) {

            let on1 = relArray[0] + ".id_" + typeArray[1] + "_" + typeArray[0];
            let on2 = relArray[1] + ".id_" + typeArray[1];

            if (orderBy != null && orderMode != null && startAt == null && endAt == null) {


                let sql = ' SELECT ' + select + ' FROM ' + relArray[0] + ' INNER JOIN ' + relArray[1] + ' ON ' + on1 + '=' + on2 + ' ORDER BY ' + orderBy + ' ' + orderMode;
                con.query(sql, callback,
                    function(err, res, field) {
                        if (err) {
                            return result(err, null);
                        } else {
                            return result(null, res);
                        }
                    });
            } else if (orderBy == null && orderMode == null && startAt != null && endAt != null) {
                let sql = 'SELECT ' + select + ' FROM ' + relArray[0] + ' INNER JOIN ' + relArray[1] + ' ON ' + on1 + '=' + on2 + ' LIMIT ' + startAt + ',' + endAt;
                con.query(sql, callback,
                    function(err, res, field) {
                        if (err) {
                            return result(err, null);
                        } else {
                            return result(null, res);
                        }
                    });

            } else if (orderBy != null && orderMode != null && startAt != null && endAt != null) {
                let sql = 'SELECT ' + select + ' FROM ' + relArray[0] + ' INNER JOIN ' + relArray[1] + ' ON ' + on1 + '=' + on2 + ' ORDER BY ' + orderBy + ' ' + orderMode + ' LIMIT ' + startAt + ',' + endAt;
                con.query(sql, callback,
                    function(err, res, field) {
                        if (err) {
                            return result(err, null);
                        } else {
                            return result(null, res);
                        }
                    });

            } else {
                let sql = 'SELECT ' + select + ' FROM ' + relArray[0] + ' INNER JOIN ' + relArray[1] + ' ON ' + on1 + '=' + on2;
                con.query(sql, callback,
                    function(err, res, field) {
                        if (err) {
                            return result(err, null);
                        } else {
                            return result(null, res);
                        }
                    });

            }


        }

        /*=============================================
                   Relacionar 3 tablas
                   =============================================*/

        if (relArray.length == 3 && typeArray.length == 3) {

            let on1a = relArray[0] + ".id_" + typeArray[1] + "_" + typeArray[0];
            let on1b = relArray[1] + ".id_" + typeArray[1];

            let on2a = relArray[0] + ".id_" + typeArray[2] + "_" + typeArray[0];
            let on2b = relArray[2] + ".id_" + typeArray[2];

            if (orderBy != null && orderMode != null && startAt == null && endAt == null) {

                let sql = 'SELECT ' + select + ' FROM ' + relArray[0] + ' INNER JOIN ' + relArray[1] + ' ON ' + on1a + '=' + on1b + ' INNER JOIN ' + relArray[2] + ' ON ' + on2a + '=' + on2b + ' ORDER BY ' + orderBy + ' ' + orderMode;
                con.query(sql, callback,
                    function(err, res, field) {
                        if (err) {
                            return result(err, null);
                        } else {
                            return result(null, res);
                        }
                    });
            } else if (orderBy == null && orderMode == null && startAt != null && endAt != null) {
                let sql = 'SELECT ' + select + ' FROM ' + relArray[0] + ' INNER JOIN ' + relArray[1] + ' ON ' + on1a + '=' + on1b + ' INNER JOIN ' + relArray[2] + ' ON ' + on2a + '=' + on2b + ' LIMIT ' + startAt + ',' + endAt;
                con.query(sql, callback,
                    function(err, res, field) {
                        if (err) {
                            return result(err, null);
                        } else {
                            return result(null, res);
                        }
                    });
            } else if (orderBy != null && orderMode != null && startAt != null && endAt != null) {
                let sql = 'SELECT ' + select + ' FROM ' + relArray[0] + ' INNER JOIN ' + relArray[1] + ' ON ' + on1a + '=' + on1b + ' INNER JOIN ' + relArray[2] + ' ON ' + on2a + '=' + on2b + ' ORDER BY ' + orderBy + ' ' + orderMode + ' LIMIT ' + startAt + ',' + endAt;
                con.query(sql, callback,
                    function(err, res, field) {
                        if (err) {
                            return result(err, null);
                        } else {
                            return result(null, res);
                        }
                    });
            } else {
                let sql = 'SELECT ' + select + ' FROM ' + relArray[0] + ' INNER JOIN ' + relArray[1] + ' ON ' + on1a + '=' + on1b + ' INNER JOIN ' + relArray[2] + ' ON ' + on2a + '=' + on2b;
                con.query(sql, callback,
                    function(err, res, field) {
                        if (err) {
                            return result(err, null);
                        } else {
                            return result(null, res);
                        }
                    });
            }

        } // fin 3

        /*=============================================
        Relacionar 4 tablas
        =============================================*/

        if (relArray.length == 4 && typeArray.length == 4) {

            let on1a = relArray[0] + ".id_" + typeArray[1] + "_" + typeArray[0];
            let on1b = relArray[1] + ".id_" + typeArray[1];

            let on2a = relArray[0] + ".id_" + typeArray[2] + "_" + typeArray[0];
            let on2b = relArray[2] + ".id_" + typeArray[2];

            let on3a = relArray[0] + ".id_" + typeArray[3] + "_" + typeArray[0];
            let on3b = relArray[3] + ".id_" + typeArray[3];

            if (orderBy != null && orderMode != null && startAt == null && endAt == null) {
                let sql = 'SELECT ' + select + ' FROM ' + relArray[0] + ' INNER JOIN ' + relArray[1] + ' ON ' + on1a + '=' + on1b + ' INNER JOIN ' + relArray[2] + ' ON ' + on2a + '=' + on2b + ' INNER JOIN ' + relArray[3] + ' ON ' + on3a + '=' + on3b + ' ORDER BY ' + orderBy + ' ' + orderMode;
                con.query(sql, callback,
                    function(err, res, field) {
                        if (err) {
                            return result(err, null);
                        } else {
                            return result(null, res);
                        }
                    });
            } else if (orderBy == null && orderMode == null && startAt != null && endAt != null) {
                let sql = 'SELECT ' + select + ' FROM ' + relArray[0] + ' INNER JOIN ' + relArray[1] + ' ON ' + on1a + '=' + on1b + ' INNER JOIN ' + relArray[2] + ' ON ' + on2a + '=' + on2b + ' INNER JOIN ' + relArray[3] + ' ON ' + on3a + '=' + on3b + ' LIMIT ' + startAt + ',' + endAt;
                con.query(sql, callback,
                    function(err, res, field) {
                        if (err) {
                            return result(err, null);
                        } else {
                            return result(null, res);
                        }
                    });
            } else if (orderBy != null && orderMode != null && startAt != null && endAt != null) {
                let sql = 'SELECT ' + select + ' FROM ' + relArray[0] + ' INNER JOIN ' + relArray[1] + ' ON ' + on1a + '=' + on1b + ' INNER JOIN ' + relArray[2] + ' ON ' + on2a + '=' + on2b + ' INNER JOIN ' + relArray[3] + ' ON ' + on3a + '=' + on3b + ' ORDER BY ' + orderBy + ' ' + orderMode + ' LIMIT ' + startAt + ',' + endAt;
                con.query(sql, callback,
                    function(err, res, field) {
                        if (err) {
                            return result(err, null);
                        } else {
                            return result(null, res);
                        }
                    });
            } else {
                let sql = 'SELECT ' + select + ' FROM ' + relArray[0] + ' INNER JOIN ' + relArray[1] + ' ON ' + on1a + '=' + on1b + ' INNER JOIN ' + relArray[2] + ' ON ' + on2a + '=' + on2b + ' INNER JOIN ' + relArray[3] + ' ON ' + on3a + '=' + on3b;
                con.query(sql, callback,
                    function(err, res, field) {
                        if (err) {
                            return result(err, null);
                        } else {
                            return result(null, res);
                        }
                    });
            }
        }

    }

    getRelFilterData(con, rel, type, orderBy, orderMode, linkTo, equalTo, startAt, endAt, select, callback) {

        let relArray = rel.split(",");
        let typeArray = type.split(",");


        /*=============================================
        Relacionar 2 tablas
        =============================================*/


        if (relArray.length == 2 && typeArray.length == 2) {

            let on1 = relArray[0] + ".id_" + typeArray[1] + "_" + typeArray[0];
            let on2 = relArray[1] + ".id_" + typeArray[1];

            if (orderBy != null && orderMode != null && startAt == null && endAt == null) {


                let sql = ' SELECT ' + select + ' FROM ' + relArray[0] + ' INNER JOIN ' + relArray[1] + ' ON ' + on1 + '=' + on2 + ' WHERE ' + linkTo + '=?' + '  ORDER BY ' + orderBy + ' ' + orderMode;
                con.query(sql, [equalTo], callback,
                    function(err, res, field) {
                        if (err) {
                            return result(err, null);
                        } else {
                            return result(null, res);
                        }
                    });
            } else if (orderBy == null && orderMode == null && startAt != null && endAt != null) {
                let sql = 'SELECT ' + select + ' FROM ' + relArray[0] + ' INNER JOIN ' + relArray[1] + ' ON ' + on1 + '=' + on2 + ' WHERE ' + linkTo + '=?' + ' LIMIT ' + startAt + ',' + endAt;
                con.query(sql, [equalTo], callback,
                    function(err, res, field) {
                        if (err) {
                            return result(err, null);
                        } else {
                            return result(null, res);
                        }
                    });

            } else if (orderBy != null && orderMode != null && startAt != null && endAt != null) {
                let sql = 'SELECT ' + select + ' FROM ' + relArray[0] + ' INNER JOIN ' + relArray[1] + ' ON ' + on1 + '=' + on2 + ' WHERE ' + linkTo + '=?' + ' ORDER BY ' + orderBy + ' ' + orderMode + ' LIMIT ' + startAt + ',' + endAt;
                con.query(sql, [equalTo], callback,
                    function(err, res, field) {
                        if (err) {
                            return result(err, null);
                        } else {
                            return result(null, res);
                        }
                    });

            } else {
                let sql = 'SELECT ' + select + ' FROM ' + relArray[0] + ' INNER JOIN ' + relArray[1] + ' ON ' + on1 + '=' + on2 + ' WHERE ' + linkTo + '=?';
                con.query(sql, [equalTo], callback,
                    function(err, res, field) {
                        if (err) {
                            return result(err, null);
                        } else {
                            return result(null, res);
                        }
                    });

            }


        }

        /*=============================================
                   Relacionar 3 tablas
                   =============================================*/

        if (relArray.length == 3 && typeArray.length == 3) {

            let on1a = relArray[0] + ".id_" + typeArray[1] + "_" + typeArray[0];
            let on1b = relArray[1] + ".id_" + typeArray[1];

            let on2a = relArray[0] + ".id_" + typeArray[2] + "_" + typeArray[0];
            let on2b = relArray[2] + ".id_" + typeArray[2];

            if (orderBy != null && orderMode != null && startAt == null && endAt == null) {

                let sql = 'SELECT ' + select + ' FROM ' + relArray[0] + ' INNER JOIN ' + relArray[1] + ' ON ' + on1a + '=' + on1b + ' INNER JOIN ' + relArray[2] + ' ON ' + on2a + '=' + on2b + ' WHERE ' + linkTo + '=?' + ' ORDER BY ' + orderBy + ' ' + orderMode;
                con.query(sql, [equalTo], callback,
                    function(err, res, field) {
                        if (err) {
                            return result(err, null);
                        } else {
                            return result(null, res);
                        }
                    });
            } else if (orderBy == null && orderMode == null && startAt != null && endAt != null) {
                let sql = 'SELECT ' + select + ' FROM ' + relArray[0] + ' INNER JOIN ' + relArray[1] + ' ON ' + on1a + '=' + on1b + ' INNER JOIN ' + relArray[2] + ' ON ' + on2a + '=' + on2b + ' WHERE ' + linkTo + '=?' + ' LIMIT ' + startAt + ',' + endAt;
                con.query(sql, [equalTo], callback,
                    function(err, res, field) {
                        if (err) {
                            return result(err, null);
                        } else {
                            return result(null, res);
                        }
                    });
            } else if (orderBy != null && orderMode != null && startAt != null && endAt != null) {
                let sql = 'SELECT ' + select + ' FROM ' + relArray[0] + ' INNER JOIN ' + relArray[1] + ' ON ' + on1a + '=' + on1b + ' INNER JOIN ' + relArray[2] + ' ON ' + on2a + '=' + on2b + ' WHERE ' + linkTo + '=?' + ' ORDER BY ' + orderBy + ' ' + orderMode + ' LIMIT ' + startAt + ',' + endAt;
                con.query(sql, [equalTo], callback,
                    function(err, res, field) {
                        if (err) {
                            return result(err, null);
                        } else {
                            return result(null, res);
                        }
                    });
            } else {
                let sql = 'SELECT ' + select + ' FROM ' + relArray[0] + ' INNER JOIN ' + relArray[1] + ' ON ' + on1a + '=' + on1b + ' INNER JOIN ' + relArray[2] + ' ON ' + on2a + '=' + on2b + ' WHERE ' + linkTo + '=?';
                con.query(sql, [equalTo], callback,
                    function(err, res, field) {
                        if (err) {
                            return result(err, null);
                        } else {
                            return result(null, res);
                        }
                    });
            }

        } // fin 3

        /*=============================================
        Relacionar 4 tablas
        =============================================*/

        if (relArray.length == 4 && typeArray.length == 4) {

            let on1a = relArray[0] + ".id_" + typeArray[1] + "_" + typeArray[0];
            let on1b = relArray[1] + ".id_" + typeArray[1];

            let on2a = relArray[0] + ".id_" + typeArray[2] + "_" + typeArray[0];
            let on2b = relArray[2] + ".id_" + typeArray[2];

            let on3a = relArray[0] + ".id_" + typeArray[3] + "_" + typeArray[0];
            let on3b = relArray[3] + ".id_" + typeArray[3];

            if (orderBy != null && orderMode != null && startAt == null && endAt == null) {
                let sql = 'SELECT ' + select + ' FROM ' + relArray[0] + ' INNER JOIN ' + relArray[1] + ' ON ' + on1a + '=' + on1b + ' INNER JOIN ' + relArray[2] + ' ON ' + on2a + '=' + on2b + ' INNER JOIN ' + relArray[3] + ' ON ' + on3a + '=' + on3b + ' WHERE ' + linkTo + '=?' + ' ORDER BY ' + orderBy + ' ' + orderMode;
                con.query(sql, [equalTo], callback,
                    function(err, res, field) {
                        if (err) {
                            return result(err, null);
                        } else {
                            return result(null, res);
                        }
                    });
            } else if (orderBy == null && orderMode == null && startAt != null && endAt != null) {
                let sql = 'SELECT ' + select + ' FROM ' + relArray[0] + ' INNER JOIN ' + relArray[1] + ' ON ' + on1a + '=' + on1b + ' INNER JOIN ' + relArray[2] + ' ON ' + on2a + '=' + on2b + ' INNER JOIN ' + relArray[3] + ' ON ' + on3a + '=' + on3b + ' WHERE ' + linkTo + '=?' + ' LIMIT ' + startAt + ',' + endAt;
                con.query(sql, [equalTo], callback,
                    function(err, res, field) {
                        if (err) {
                            return result(err, null);
                        } else {
                            return result(null, res);
                        }
                    });
            } else if (orderBy != null && orderMode != null && startAt != null && endAt != null) {
                let sql = 'SELECT ' + select + ' FROM ' + relArray[0] + ' INNER JOIN ' + relArray[1] + ' ON ' + on1a + '=' + on1b + ' INNER JOIN ' + relArray[2] + ' ON ' + on2a + '=' + on2b + ' INNER JOIN ' + relArray[3] + ' ON ' + on3a + '=' + on3b + ' WHERE ' + linkTo + '=?' + ' ORDER BY ' + orderBy + ' ' + orderMode + ' LIMIT ' + startAt + ',' + endAt;
                con.query(sql, [equalTo], callback,
                    function(err, res, field) {
                        if (err) {
                            return result(err, null);
                        } else {
                            return result(null, res);
                        }
                    });
            } else {
                let sql = 'SELECT ' + select + ' FROM ' + relArray[0] + ' INNER JOIN ' + relArray[1] + ' ON ' + on1a + '=' + on1b + ' INNER JOIN ' + relArray[2] + ' ON ' + on2a + '=' + on2b + ' INNER JOIN ' + relArray[3] + ' ON ' + on3a + '=' + on3b + ' WHERE ' + linkTo + '=?';
                con.query(sql, [equalTo], callback,
                    function(err, res, field) {
                        if (err) {
                            return result(err, null);
                        } else {
                            return result(null, res);
                        }
                    });
            }
        }

    }


    getSearchData(con, parametro, linkTo, search, orderBy, orderMode, startAt, endAt, select, callback) {
        let search2 = '%' + search + '%';
        if (orderBy != null && orderMode != null && startAt == null && endAt == null) {


            let sql = 'SELECT ' + select + ' FROM ' + parametro + ' WHERE ' + linkTo + ' LIKE ?' + ' ORDER BY ' + orderBy + ' ' + orderMode;
            con.query(sql, [search2], callback,
                function(err, res, field) {
                    if (err) {
                        return result(err, null);
                    } else {
                        return result(null, res);
                    }
                });
        } else if (orderBy == null && orderMode == null && startAt != null && endAt != null) {

            let sql = 'SELECT ' + select + ' FROM ' + parametro + ' WHERE ' + linkTo + ' LIKE ?' + ' LIMIT ' + startAt + ',' + endAt;
            con.query(sql, [search2], callback,
                function(err, res, field) {
                    if (err) {
                        return result(err, null);
                    } else {
                        return result(null, res);
                    }
                });
        } else if (orderBy != null && orderMode != null && startAt != null && endAt != null) {

            let sql = 'SELECT ' + select + ' FROM ' + parametro + ' WHERE ' + linkTo + ' LIKE ?' + ' ORDER BY ' + orderBy + ' ' + orderMode + ' LIMIT ' + startAt + ',' + endAt;
            con.query(sql, [search2], callback,
                function(err, res, field) {
                    if (err) {
                        return result(err, null);
                    } else {
                        return result(null, res);
                    }
                });
        } else {
            let sql = 'SELECT ' + select + ' FROM ' + parametro + ' WHERE ' + linkTo + ' LIKE ?';
            con.query(sql, [search2], callback,
                function(err, res, field) {
                    if (err) {
                        return result(err, null);
                    } else {
                        return result(null, res);
                    }
                });

        }
    }


    getRelSearchData(con, rel, type, orderBy, orderMode, linkTo, search, startAt, endAt, select, callback) {

        let relArray = rel.split(",");
        let typeArray = type.split(",");

        let search2 = '%' + search + '%';
        /*=============================================
        Relacionar 2 tablas
        =============================================*/


        if (relArray.length == 2 && typeArray.length == 2) {

            let on1 = relArray[0] + ".id_" + typeArray[1] + "_" + typeArray[0];
            let on2 = relArray[1] + ".id_" + typeArray[1];

            if (orderBy != null && orderMode != null && startAt == null && endAt == null) {


                let sql = ' SELECT ' + select + ' FROM ' + relArray[0] + ' INNER JOIN ' + relArray[1] + ' ON ' + on1 + '=' + on2 + ' WHERE ' + linkTo + ' LIKE ?' + '  ORDER BY ' + orderBy + ' ' + orderMode;
                con.query(sql, [search2], callback,
                    function(err, res, field) {
                        if (err) {
                            return result(err, null);
                        } else {
                            return result(null, res);
                        }
                    });
            } else if (orderBy == null && orderMode == null && startAt != null && endAt != null) {
                let sql = 'SELECT ' + select + ' FROM ' + relArray[0] + ' INNER JOIN ' + relArray[1] + ' ON ' + on1 + '=' + on2 + ' WHERE ' + linkTo + ' LIKE ?' + ' LIMIT ' + startAt + ',' + endAt;
                con.query(sql, [search2], callback,
                    function(err, res, field) {
                        if (err) {
                            return result(err, null);
                        } else {
                            return result(null, res);
                        }
                    });

            } else if (orderBy != null && orderMode != null && startAt != null && endAt != null) {
                let sql = 'SELECT ' + select + ' FROM ' + relArray[0] + ' INNER JOIN ' + relArray[1] + ' ON ' + on1 + '=' + on2 + ' WHERE ' + linkTo + ' LIKE ?' + ' ORDER BY ' + orderBy + ' ' + orderMode + ' LIMIT ' + startAt + ',' + endAt;
                con.query(sql, [search2], callback,
                    function(err, res, field) {
                        if (err) {
                            return result(err, null);
                        } else {
                            return result(null, res);
                        }
                    });

            } else {
                let sql = 'SELECT ' + select + ' FROM ' + relArray[0] + ' INNER JOIN ' + relArray[1] + ' ON ' + on1 + '=' + on2 + ' WHERE ' + linkTo + ' LIKE ?';
                con.query(sql, [search2], callback,
                    function(err, res, field) {
                        if (err) {
                            return result(err, null);
                        } else {
                            return result(null, res);
                        }
                    });

            }


        }

        /*=============================================
                   Relacionar 3 tablas
                   =============================================*/

        if (relArray.length == 3 && typeArray.length == 3) {

            let on1a = relArray[0] + ".id_" + typeArray[1] + "_" + typeArray[0];
            let on1b = relArray[1] + ".id_" + typeArray[1];

            let on2a = relArray[0] + ".id_" + typeArray[2] + "_" + typeArray[0];
            let on2b = relArray[2] + ".id_" + typeArray[2];

            if (orderBy != null && orderMode != null && startAt == null && endAt == null) {

                let sql = 'SELECT ' + select + ' FROM ' + relArray[0] + ' INNER JOIN ' + relArray[1] + ' ON ' + on1a + '=' + on1b + ' INNER JOIN ' + relArray[2] + ' ON ' + on2a + '=' + on2b + ' WHERE ' + linkTo + ' LIKE ?' + ' ORDER BY ' + orderBy + ' ' + orderMode;
                con.query(sql, [search2], callback,
                    function(err, res, field) {
                        if (err) {
                            return result(err, null);
                        } else {
                            return result(null, res);
                        }
                    });
            } else if (orderBy == null && orderMode == null && startAt != null && endAt != null) {
                let sql = 'SELECT ' + select + ' FROM ' + relArray[0] + ' INNER JOIN ' + relArray[1] + ' ON ' + on1a + '=' + on1b + ' INNER JOIN ' + relArray[2] + ' ON ' + on2a + '=' + on2b + ' WHERE ' + linkTo + ' LIKE ?' + ' LIMIT ' + startAt + ',' + endAt;
                con.query(sql, [search2], callback,
                    function(err, res, field) {
                        if (err) {
                            return result(err, null);
                        } else {
                            return result(null, res);
                        }
                    });
            } else if (orderBy != null && orderMode != null && startAt != null && endAt != null) {
                let sql = 'SELECT ' + select + ' FROM ' + relArray[0] + ' INNER JOIN ' + relArray[1] + ' ON ' + on1a + '=' + on1b + ' INNER JOIN ' + relArray[2] + ' ON ' + on2a + '=' + on2b + ' WHERE ' + linkTo + ' LIKE ?' + ' ORDER BY ' + orderBy + ' ' + orderMode + ' LIMIT ' + startAt + ',' + endAt;
                con.query(sql, [search2], callback,
                    function(err, res, field) {
                        if (err) {
                            return result(err, null);
                        } else {
                            return result(null, res);
                        }
                    });
            } else {
                let sql = 'SELECT ' + select + ' FROM ' + relArray[0] + ' INNER JOIN ' + relArray[1] + ' ON ' + on1a + '=' + on1b + ' INNER JOIN ' + relArray[2] + ' ON ' + on2a + '=' + on2b + ' WHERE ' + linkTo + ' LIKE ?';
                con.query(sql, [search2], callback,
                    function(err, res, field) {
                        if (err) {
                            return result(err, null);
                        } else {
                            return result(null, res);
                        }
                    });
            }

        } // fin 3

        /*=============================================
        Relacionar 4 tablas
        =============================================*/

        if (relArray.length == 4 && typeArray.length == 4) {

            let on1a = relArray[0] + ".id_" + typeArray[1] + "_" + typeArray[0];
            let on1b = relArray[1] + ".id_" + typeArray[1];

            let on2a = relArray[0] + ".id_" + typeArray[2] + "_" + typeArray[0];
            let on2b = relArray[2] + ".id_" + typeArray[2];

            let on3a = relArray[0] + ".id_" + typeArray[3] + "_" + typeArray[0];
            let on3b = relArray[3] + ".id_" + typeArray[3];

            if (orderBy != null && orderMode != null && startAt == null && endAt == null) {
                let sql = 'SELECT ' + select + ' FROM ' + relArray[0] + ' INNER JOIN ' + relArray[1] + ' ON ' + on1a + '=' + on1b + ' INNER JOIN ' + relArray[2] + ' ON ' + on2a + '=' + on2b + ' INNER JOIN ' + relArray[3] + ' ON ' + on3a + '=' + on3b + ' WHERE ' + linkTo + ' LIKE ?' + ' ORDER BY ' + orderBy + ' ' + orderMode;
                con.query(sql, [search2], callback,
                    function(err, res, field) {
                        if (err) {
                            return result(err, null);
                        } else {
                            return result(null, res);
                        }
                    });
            } else if (orderBy == null && orderMode == null && startAt != null && endAt != null) {
                let sql = 'SELECT ' + select + ' FROM ' + relArray[0] + ' INNER JOIN ' + relArray[1] + ' ON ' + on1a + '=' + on1b + ' INNER JOIN ' + relArray[2] + ' ON ' + on2a + '=' + on2b + ' INNER JOIN ' + relArray[3] + ' ON ' + on3a + '=' + on3b + ' WHERE ' + linkTo + ' LIKE ?' + ' LIMIT ' + startAt + ',' + endAt;
                con.query(sql, [search2], callback,
                    function(err, res, field) {
                        if (err) {
                            return result(err, null);
                        } else {
                            return result(null, res);
                        }
                    });
            } else if (orderBy != null && orderMode != null && startAt != null && endAt != null) {
                let sql = 'SELECT ' + select + ' FROM ' + relArray[0] + ' INNER JOIN ' + relArray[1] + ' ON ' + on1a + '=' + on1b + ' INNER JOIN ' + relArray[2] + ' ON ' + on2a + '=' + on2b + ' INNER JOIN ' + relArray[3] + ' ON ' + on3a + '=' + on3b + ' WHERE ' + linkTo + ' LIKE ?' + ' ORDER BY ' + orderBy + ' ' + orderMode + ' LIMIT ' + startAt + ',' + endAt;
                con.query(sql, [search2], callback,
                    function(err, res, field) {
                        if (err) {
                            return result(err, null);
                        } else {
                            return result(null, res);
                        }
                    });
            } else {
                let sql = 'SELECT ' + select + ' FROM ' + relArray[0] + ' INNER JOIN ' + relArray[1] + ' ON ' + on1a + '=' + on1b + ' INNER JOIN ' + relArray[2] + ' ON ' + on2a + '=' + on2b + ' INNER JOIN ' + relArray[3] + ' ON ' + on3a + '=' + on3b + ' WHERE ' + linkTo + ' LIKE ?';
                con.query(sql, [search2], callback,
                    function(err, res, field) {
                        if (err) {
                            return result(err, null);
                        } else {
                            return result(null, res);
                        }
                    });
            }
        }

    }

};