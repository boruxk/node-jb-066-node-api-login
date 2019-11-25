const fs = require('fs');
let fileName = '';
const mysql = require('mysql');
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'leasing'
});
db.connect((err) => {
    if (err) throw err;
    console.log('Connected to database');
});

function readAll(callback) {
    let query = "SELECT * FROM `car` ORDER BY id ASC";
    db.query(query, (err, result) => {
        if (err) { callback('error'); }
        else {
            const data = result;
            callback(null, data);
        }
    });
}

function readOne(id, callback) {
    id = Number(id);
    let query = `SELECT * FROM car WHERE id = ${id}`;
    db.query(query, (err, result) => {
        if (err) { callback('error'); }
        else {
            let [dataOne] = result;
            callback(null, dataOne);
        }
    });
}

function saveOne(oneToSave, callback) {
    let query = `INSERT INTO car (id, name, price, monthly, currency, doors, seats, image) VALUES (${oneToSave.id}, '${oneToSave.name}', ${oneToSave.price}, ${oneToSave.monthly}, '${oneToSave.currency}', ${oneToSave.doors}, ${oneToSave.seats}, '${oneToSave.image}')`
    db.query(query, (err, result) => {
        if (err) { callback('error'); }
        else { callback(null, result); }
    });
}

function updateOne(car, callback) {
    id = Number(car.id);
    let query = `UPDATE car SET id = ${car.id}, name = '${car.name}', price = ${car.price}, monthly = ${car.monthly}, currency = '${car.currency}', doors = ${car.doors}, seats = ${car.seats}, image = '${car.image}' WHERE  id = ${id}`;
    db.query(query, (err, result) => {
        if (err) { callback('error'); }
        else { callback(null); }
    });
}

function deleteOne(idToDelete, callback) {
    id = Number(idToDelete);
    let query = `DELETE FROM car WHERE id = ${id}`;
    db.query(query, (err, result) => {
        if (err) { callback('error'); }
        else { callback(null); }
    });
}

function compare(mail, user, pass, callback) {
    if (mail !== null) {
        //reg check
        let query = `SELECT * FROM user WHERE mail LIKE '${mail}' OR user LIKE '${user}'`;
        db.query(query, (err, result) => {
            if (err || result.length !== 0) {callback(null, "error");}
            else { 
                let query = `INSERT INTO user (mail, user, pass) VALUES ('${mail}', '${user}', '${pass}')`
                db.query(query, (err, result) => {
                    if (err) { callback('error'); }
                    else { callback(null, "0");  }
                });
            }
        });
    } else {
        //login check
        let query = `SELECT * FROM user WHERE user LIKE '${user}' AND pass LIKE '${pass}'`;
        db.query(query, (err, result) => {
            if (err || result.length === 0) { callback(null, "error"); }
            else { 
                callback(null, result); 
            }
        });
    }
}

function dalModule(_fileName) {
    fileName = _fileName;
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