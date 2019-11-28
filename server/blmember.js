const dalFunc = require('./dal');
const dal = dalFunc('db/test.json');

function getCars(callback) {
    let query = "SELECT * FROM `car` ORDER BY id ASC";
    dal.readAll(query, function (err, data) {
        if (err) {
            callback(err);
        } else {
            callback(null, data);
        }
    })
}

function getCar(id, callback) {
    let query = `SELECT * FROM car WHERE id = ${id}`;
    dal.readOne(query, id, function (err, data) {
        if (err) {
            callback(err);
        } else {
            callback(null, data);
        }
    })
}

function createCar(newData, callback) {
    let query = `INSERT INTO car (id, name, price, monthly, currency, doors, seats, image) VALUES (${newData.id}, '${newData.name}', ${newData.price}, ${newData.monthly}, '${newData.currency}', ${newData.doors}, ${newData.seats}, '${newData.image}')`;
    dal.saveOne(query, function (err, data) {
        if (err) {
            callback(err);
        } else {
            callback(null, data);
        }
    })
}

function updateCar(car, callback) {
    let query = `UPDATE car SET id = ${car.id}, name = '${car.name}', price = ${car.price}, monthly = ${car.monthly}, currency = '${car.currency}', doors = ${car.doors}, seats = ${car.seats}, image = '${car.image}' WHERE  id = ${car.id}`;
    dal.updateOne(query, car, function (err, data) {
        if (err) {
            callback(err);
        } else {
            callback(null, data);
        }
    })
}

function deleteCar(id, callback) {
    let query = `DELETE FROM car WHERE id = ${id}`;
    dal.deleteOne(query, id, function (err, data) {
        if (err) {
            callback(err);
        } else {
            callback(null, data);
        }
    })
}

module.exports.getCars = getCars;
module.exports.getCar = getCar;
module.exports.createCar = createCar;
module.exports.updateCar = updateCar;
module.exports.deleteCar = deleteCar;
