delete require.cache[require.resolve('./dal')];
const dalFunc = require('./dal');
const dal = dalFunc('db/test.json');

function getCars(callback) {
    dal.readAll(function (err, phonesData) {
        if (err) {
            callback(err);
        } else {
            callback(null, phonesData);
        }
    })
}

function getCar(id, callback) {
    dal.readOne(id, function (err, runnerData) {
        if (err) {
            callback(err);
        } else {
            callback(null, runnerData);
        }
    })
}

function updateCar(car, callback) {
    dal.updateOne(car, function (err, data) {
        if (err) {
            callback(err);
        } else {
            callback(null, data);
        }
    })
}

function deleteCar(id, callback) {
    dal.deleteOne(id, function (err, data) {
        if (err) {
            callback(err);
        } else {
            callback(null, data);
        }
    })
}

module.exports.getCars = getCars;
module.exports.getCar = getCar;
module.exports.updateCar = updateCar;
module.exports.deleteCar = deleteCar;