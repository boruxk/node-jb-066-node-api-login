const dalFunc = require('./dal');
const dal = dalFunc('db/login.json');

function compareLogin(mail, user, pass, callback) {
    let query = `SELECT * FROM user WHERE user LIKE '${user}' AND pass LIKE '${pass}'`;
    dal.compare(query, mail, user, pass, function (err, _user) {
        if (err) {
            callback(err);
        } else {
            callback(null, _user);
        }
    })
}

module.exports.compareLogin = compareLogin;