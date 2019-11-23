const express = require('express');
const router = express.Router();
const bl = require('../blmember');

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

router.post('/', (req, res) => {
    let newData = req.body;
    bl.createCar(newData, function (e, data) {
        if (e) {
            return res.status(500).send();
        } else {
            return res.send(data);
        }
    })
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