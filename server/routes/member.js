const express = require('express');
const router = express.Router();
const bl = require('../blmember');
const multer = require('multer');
const upload = multer({ dest: 'public/uploads/' });
const fs = require("fs");
const uuidv4 = require('uuid/v4');

router.get('/', (req, res) => {
    bl.getCars(function (e, data) {
        if (e) {
            return res.status(500).send();
        } else {
            return res.send(data);
        }
    })
});

router.get('/:id', (req, res) => {
    let id = req.params.id;
    bl.getCar(id, function (e, data) {
        if (e) {
            return res.status(500).send();
        } else {
            return res.send(data);
        }
    })
});

router.post('/', upload.single('image'), (req, res) => {
    let fileName = uuidv4() + ".jpg";
    fs.rename('./public/uploads/' + req.file.filename, './public/uploads/' + fileName, function (err) {
        if (err) console.log('ERROR: ' + err);
        let newData = req.body;
        newData.image = fileName;
        bl.createCar(newData, function (e, data) {
            if (e) {
                return res.status(500).send();
            } else {
                return res.send(data);
            }
        })
    });

});

router.put('/:id', (req, res) => {
    let car = req.body;
    bl.updateCar(car, function (e, data) {
        if (e) {
            return res.status(500).send();
        } else {
            return res.send(data);
        }
    })
});

router.delete('/:id', (req, res) => {
    let id = req.params.id;
    bl.deleteCar(id, function (e, data) {
        if (e) {
            return res.status(500).send();
        } else {
            return res.send(data);
        }
    })
});

module.exports = router;