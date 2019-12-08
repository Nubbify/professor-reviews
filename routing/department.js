models = require('../models/classes');
module.exports = function(app){
    // UI Endpoints
    app.get('/department',function(req,res){
        models.Class.distinct('department', function (error, departments) {
            if (error) throw error;
            res.render('departmentList', {departments: departments.sort()});
        })
    });

    app.get('/department/:departmentName', function(req, res) {
        models.Class.find({department: { $regex : new RegExp(req.params.departmentName, "i")}},
            function(error, classes) {
                models.Teacher.find({department: { $regex : new RegExp(req.params.teacherName, "i")}},
                    function(error2, teachers) {
                        res.render('department', {
                            name: req.params.departmentName,
                            teachers: teachers,
                            classes: classes
                        })
                    });
            });
    });

    //API Endpoints

    app.get('/api/department', function(req, res) {
        models.Class.distinct('department', function (error, departments) {
            if (error) throw error;
            res.send(departments.sort());
        })
    });


    app.get('/api/department/:departmentName', function(req, res) {
        models.Class.find({department: { $regex : new RegExp(req.params.departmentName, "i") }}, function (err, classInfo) {
            if (err) throw err;
            res.send(classInfo)
        });
    });

};