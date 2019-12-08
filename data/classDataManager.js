let models = require('../models/classes');

exports.getClassByName = function(name) {
    models.Class.find({name: { $regex : new RegExp(name, "i") }}, function (err, classInfo) {
        if (err) throw err;
        return classInfo;
    });
};

exports.getAllClasses = function() {
    models.Class.find({}, function (err, classInfo) {
        if (err) throw err;
        return classInfo;
    });
};

exports.deleteClassByName = function(name) {
    models.Class.delete({name: { $regex : new RegExp(name, "i") }}, function (error, result) {
        if (error) return {error: "Error encountered. Something went wrong, try again?"};
        if (result.n === 0) {
            return null;
        }
        return "Class Deleted";
    });
};

exports.addClass = function(classJSON) {
    let newClass = new models.Class({
        name: classJSON.name.toUpperCase(),
        department: classJSON.department,
        teachers: []
    });

    newClass.save().then(function (retVal) {
        console.log(retVal);
        return "Class added"
    }).catch( function(err) {
        console.log(err);
        res.statusCode = 400;
        res.json({error: "Error encountered. Either the class already exists" +
                " or the connection to the DB has been lost"});
    })
};