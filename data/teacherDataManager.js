let models = require('../models/classes');

exports.getTeacherByName = function(name) {
    models.Teacher.find({name: { $regex : new RegExp(name, "i") }}, function (err, teacherInfo) {
        if (err) throw err;
        return teacherInfo;
    });
};

exports.getAllTeachers = function() {
    models.Teacher.find({}, function (err, teacherInfo) {
        if (err) throw err;
        return teacherInfo;
    });
};
exports.addTeacher = function(teacherJSON) {
    let newTeacher = new models.Teacher({
        name: teacherJSON.name,
        office: teacherJSON.office,
        department: teacherJSON.department,
        reviews: [],
        classes: []
    });

    newTeacher.save().then(function (retVal) {
        return 'Teacher Added'
    }).catch(function (err) {
        return null;
    });
};