const mysql = require('mysql');

function readAll(query, callback) {
    const db = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: '',
        database: 'leasing'
    });
    db.connect((err) => {
        if (err) throw err;
        db.query(query, (err, result) => {
            if (err) { callback('error'); }
            else {
                const data = result;
                callback(null, data);
            }
            db.end();
        });
    });
}

function readOne(query, id, callback) {
    id = Number(id);
    const db = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: '',
        database: 'leasing'
    });
    db.connect((err) => {
        if (err) throw err;
        db.query(query, (err, result) => {
            if (err) { callback('error'); }
            else {
                let [dataOne] = result;
                callback(null, dataOne);
            }
            db.end();
        });
    });
}

function saveOne(query, callback) {
    const db = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: '',
        database: 'leasing'
    });
    db.connect((err) => {
        if (err) throw err;
        db.query(query, (err, result) => {
            if (err) { callback('error'); }
            else { callback(null, result); }
            db.end();
        });
    });
}

function updateOne(query, data, callback) {
    const db = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: '',
        database: 'leasing'
    });
    db.connect((err) => {
        if (err) throw err;
        id = Number(data.id);
        db.query(query, (err, result) => {
            if (err) { callback('error'); }
            else { callback(null); }
            db.end();
        });
    });
}

function deleteOne(query, idToDelete, callback) {
    const db = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: '',
        database: 'leasing'
    });
    db.connect((err) => {
        if (err) throw err;
        id = Number(idToDelete);
        db.query(query, (err, result) => {
            if (err) { callback('error'); }
            else { callback(null); }
            db.end();
        });
    });
}

function compare(query, mail, user, pass, callback) {
    if (mail !== null) {
        //reg check
        const db = mysql.createConnection({
            host: 'localhost',
            user: 'root',
            password: '',
            database: 'leasing'
        });
        db.connect((err) => {
            if (err) throw err;
            db.query(query, (err, result) => {
                if (err || result.length !== 0) { callback(null, "error"); }
                else {
                    let query = `INSERT INTO user (mail, user, pass) VALUES ('${mail}', '${user}', '${pass}')`
                    db.query(query, (err, result) => {
                        if (err) { callback('error'); }
                        else { callback(null, "0"); }
                    });
                }
                db.end();
            });
        });
    } else {
        //login check
        const db = mysql.createConnection({
            host: 'localhost',
            user: 'root',
            password: '',
            database: 'leasing'
        });
        db.connect((err) => {
            if (err) throw err;
            db.query(query, (err, result) => {
                if (err || result.length === 0) { callback(null, "error"); }
                else {
                    callback(null, result);
                }
                db.end();
            });
        });
    }
}

function dalModule() {
    return {
        readAll: readAll,
        readOne: readOne,
        saveOne: saveOne,
        updateOne: updateOne,
        deleteOne: deleteOne,
        compare: compare
    }
}

module.exports = dalModule;