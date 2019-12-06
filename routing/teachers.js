models = require('../models/classes');
module.exports = function(app){
    // UI Endpoints
    app.get('/teacher',function(req,res){
        res.send('TO BE IMPLEMENTED');
    });

    app.get('/teacher/:teacher_name', function(req, res) {
        res.send('TO BE IMPLEMENTED');
    });

    app.get('/teacher/add', function(req, res) {
        res.send('TO BE IMPLEMENTED');
    });

    //Form processing endpoints
    app.post('/teacher/add', function(req, res) {

    });

    //API Endpoints
    app.post('/api/teacher/add', function(req, res) {
        if (!req.body.name || !req.body.office || !req.body.department) {
            res.statusCode = 400;
            res.json({error: "Ensure all fields are properly filled out."});
        } else {
            let newTeacher = new models.Teacher({
                name: req.body.name,
                office: req.body.office,
                department: req.body.department,
                reviews: [],
                classes: []
            });

            newTeacher.save().then(function (retVal) {
                console.log(retVal);
                return res.send('Teacher added.');
            }).catch(function (err) {
                console.log(err);
                res.statusCode = 400;
                res.json({
                    error: "Error encountered. Either the teacher already exists" +
                        " or the connection to the DB has been lost"
                });
            });
        }
    });

    app.get('/api/teacher', function(req, res) {
        models.Teacher.find({}, function (error, teachers) {
            if (error) throw error;
            res.send(teachers.sort());
        });
    });

    app.get('/api/teacher/:teacherName', function(req, res) {
        models.Teacher.find({name: { $regex : new RegExp(req.params.teacherName, "i")}}, function (error, teachers) {
            if (error) throw error;
            res.send(teachers.sort);
        });
    });


};