const dalFunc = require('./dal');
const dal = dalFunc('db/login.json');

function compareReg(mail, user, pass, callback) {
    let query = `SELECT * FROM user WHERE mail LIKE '${mail}' OR user LIKE '${user}'`;
    dal.compare(query, mail, user, pass, function (err, _user) {
        if (err) {
            callback(err);
        } else {
            callback(null, _user);
        }
    })
}

module.exports.compareReg = compareReg;