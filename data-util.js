var fs = require('fs');

function loadData() {
    return JSON.parse(fs.readFileSync('data.json'));
}

function saveData(data) {
    var obj = {
        reviews: data
    };

    fs.writeFileSync('data.json', JSON.stringify(obj));
}

function getAllClasses(data) {
    var allClasses = [];
    for(var i = 0; i < data.length; i++) {
        var classList = data[i].classes;
        for(var j = 0; j < classList.length; j++) {
            if(!~allClasses.indexOf(classList[j])) allClasses.push(classList[j]);
        }
    }
    return allClasses;
}

function getAllDepartments(data) {
    var allDepartments = [];
    for(var i = 0; i < data.length; i++) {
        var classList = data[i].classes;
        for(var j = 0; j < classList.length; j++) {
            if(!~allDepartments.indexOf(classList[j])) allDepartments.push(classList[j]);
        }
    }
    return allDepartments;
}

module.exports = {
    loadData: loadData,
    saveData: saveData,
    getAllClasses: getAllClasses,
    getAllDepartments: getAllDepartments
}