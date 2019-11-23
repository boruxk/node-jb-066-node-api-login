const express = require('express');
const router = express.Router();
const bllogin = require('../bllogin');
const jwt = require('jsonwebtoken');
const SEKRET_KEY_JWT = "4rfu40rjf48urnf34u40fu8j04fj34fu9r4jnu94";

router.post("/", function (req, res) {
    const {user, pass} = req.body;
    bllogin.compareLogin(user, pass, function (e, _user) {
        if (e) {
            return res.status(500).send();
        } else {
            if (_user === "error") {
                return res.status(401).send();
            } else {
                const token = jwt.sign({
                    user: user,
                }, SEKRET_KEY_JWT,
                    {
                        expiresIn: 10000
                    });
                return res.send(token);
            }
        }
    })
})

module.exports = router;