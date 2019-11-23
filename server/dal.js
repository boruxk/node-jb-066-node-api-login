const fs = require('fs');
let fileName = '';

function readAll(callback) {
    fs.readFile(fileName, (e, d) => {
        const data = d && d.length > 0 ? JSON.parse(d.toString()) : [];
        callback(null, data);
    });
}

function readOne(id, callback) {
    fs.readFile(fileName, (e, d) => {
        let data = d && d.length > 0 ? JSON.parse(d.toString()) : [];
        data = data.filter(phone => phone.id.toString() === id);
        let [dataOne] = data;
        callback(null, dataOne);
    });
}

function saveOne(oneToSave, callback) {
    fs.readFile(fileName, (e, d) => {
        const data = d && d.length > 0 ? JSON.parse(d.toString()) : [];
        data.push(oneToSave);
        fs.writeFile(fileName, JSON.stringify(data), (e) => {
            if (e) {
                callback('error');
            }
            else {
                callback(null, data);
            }
        });
    });
}

function updateOne(car, callback) {
    fs.readFile(fileName, (e, d) => {
        const data = d && d.length > 0 ? JSON.parse(d.toString()) : [];
        const index = data.findIndex(({ id }) => id.toString() === car.id);
        data[index] = car;
        fs.writeFile(fileName, JSON.stringify(data), (e) => {
            if (e) {
                console.log(e);
                callback('error');
            }
            else {
                callback(null);
            }
        });
    });
}

function deleteOne(idToDelete, callback) {
    fs.readFile(fileName, (e, d) => {
        const data = d && d.length > 0 ? JSON.parse(d.toString()) : [];
        const data2 = data.filter(({ id }) => id.toString() !== idToDelete);
        fs.writeFile(fileName, JSON.stringify(data2), (e) => {
            if (e) {
                console.log(e);
                callback('error');
            }
            else {
                callback(null);
            }
        });
    });
}

function compare(user, pass, callback) {
    fs.readFile(fileName, (e, d) => {
        const data = d && d.length > 0 ? JSON.parse(d.toString()) : [];
        const _user = data.filter(u => u.pass === pass && u.user === user);
        if (_user.length === 0) {
            callback(null, "error");
        } else {
            callback(null, _user);
        }
    });
}

function dalModule(_fileName) {
    fileName = _fileName;
    return {
        readAll: readAll,
        readOne: readOne,
        saveOne: saveOne,
        updateOne: updateOne,
        deleteOne: deleteOne,
        compare: compare
    }
}

module.exports = dalModule;