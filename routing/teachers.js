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
        }  else {
            let newTeacher = new models.Teacher({
                name: req.body.name,
                office: req.body.office,
                reviews: []
            });

            models.Class.findOne({name: { $regex : new RegExp(req.body.class, "i") }}, function (error, cls) {
                if (error) throw error;
                if (!cls) return res.status(404).send('No class with that name found.');
                cls.teachers.push(newTeacher);
                cls.save();
                return res.send('Teacher added to ' + req.body.class);
            });
        }
    });


    app.get('/api/teacher', function(req, res) {
        models.Class.distinct('teachers.name', function (error, departments) {
            if (error) throw error;
            res.send(departments.sort());
        })
    });

    app.get('/api/teacher/:teacher_name', function(req, res) {
        res.send('TO BE IMPLEMENTED');
    });


};