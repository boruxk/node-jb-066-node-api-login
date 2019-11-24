const express = require('express');
const router = express.Router();
const bl = require('../blreg');
const atob = require('atob');

router.post("/", function (req, res) {
    let { mail, user, pass } = req.body;
    mail = atob(mail);
    user = atob(user);
    pass = atob(pass);
    bl.compareReg(mail, user, pass, function (e, _user) {
        if (e) {
            return res.status(500).send();
        } else {
            if (_user === "error") {
                return res.status(401).send();
            } else {
                return res.send(_user);
            }
        }
    })
})

module.exports = router;