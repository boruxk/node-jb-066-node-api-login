const express = require('express');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const SEKRET_KEY_JWT = "4rfu40rjf48urnf34u40fu8j04fj34fu9r4jnu94";
const cors = require("cors");
const app = express();
app.use(cors());
const PORT = 3201;
app.use(bodyParser.json());

//check token before render
app.use(function (req, res, next) {
    if (req.method === 'POST' && req.path === '/login' || req.method === 'GET' && req.path === '/car') {
        next();
    } else {
        if (req.headers.authorization) {
            const token = req.headers.authorization.split(" ")[1];
            try {
                const a = jwt.verify(token, SEKRET_KEY_JWT);
                next();
            } catch (ex) {
                res.status(401).send();
            }
        } else {
            res.status(401).send();
        }
    }
})

const car = require('./routes/cars');
const login = require('./routes/login');
const member = require('./routes/member');
app.use('/car', car);
app.use('/login', login);
app.use('/member', member);

app.post("/register", function (req, res) {

})

app.listen(process.env.PORT || PORT, () =>
    console.log(`App listening on port ${PORT}!`),
);