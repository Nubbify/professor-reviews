models = require('../models/classes');
let validator = require('validator');
module.exports = function(app){
    // UI Endpoints
    app.get('/teacher',function(req,res){
        models.Teacher.find({})
            .exec(function (error, teachers) {
                if (error) throw error;
                res.render('teacherList', {teachers: teachers})
            });
    });

    app.get('/teacher/add', function(req, res) {
        res.render('addTeacher');
    });

    app.get('/teacher/:teacherName', function(req, res) {
        models.Teacher.find({name: { $regex : new RegExp(req.params.teacherName, "i")}})
            .populate({
                path: 'reviews',
                populate: { path: 'class'}
            })
            .exec( function (error, teachers) {
            if (error) throw error;
            res.render('reviews', {teachers: teachers})
        });
    });

    //Form processing endpoints
    app.post('/teacher/add', function(req, res) {
        if (!req.body.name || !req.body.office || !req.body.department) {
            res.render('addTeacher', {error: "Please make sure all fields are filled"});
        } else {
            req.body.name = validator.trim(req.body.name);
            req.body.office = validator.trim(req.body.office);
            req.body.department = validator.trim(req.body.department);

            let newTeacher = new models.Teacher({
                name: req.body.name,
                office: req.body.office,
                department: req.body.department,
                reviews: [],
                classes: []
            });

            newTeacher.save().then(function (retVal) {
                console.log(retVal);
                res.redirect('/teacher/' + newTeacher.name);
            }).catch(function (err) {
                console.log(err);
                res.render('addTeacher', {error: "This teacher already exists or your input was malformed."});
            });
        }

    });

    //API Endpoints
    app.post('/api/teacher/add', function(req, res) {
        if (!req.body.name || !req.body.office || !req.body.department) {
            res.statusCode = 400;
            res.json({error: "Ensure all fields are properly filled out."});
        } else {
            req.body.name = validator.trim(req.body.name);
            req.body.office = validator.trim(req.body.name);
            req.body.department = validator.trim(req.body.office);

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