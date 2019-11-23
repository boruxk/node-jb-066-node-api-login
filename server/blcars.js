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

module.exports.getCars = getCars;