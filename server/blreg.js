delete require.cache[require.resolve('./dal')];
const dalFunc = require('./dal');
const dal = dalFunc('db/login.json');

function compareReg(mail, user, pass, callback) {
    dal.compare(mail, user, pass, function (err, _user) {
        if (err) {
            callback(err);
        } else {
            callback(null, _user);
        }
    })
}

module.exports.compareReg = compareReg;