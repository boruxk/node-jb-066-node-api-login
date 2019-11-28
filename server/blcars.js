const dalFunc = require('./dal');
const dal = dalFunc('db/test.json');

function getCars(callback) {
    let query = "SELECT * FROM `car` ORDER BY id ASC";
    dal.readAll(query, function (err, phonesData) {
        if (err) {
            callback(err);
        } else {
            callback(null, phonesData);
        }
    })
}

module.exports.getCars = getCars;