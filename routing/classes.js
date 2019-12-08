let validator = require('validator');
models = require('../models/classes');
module.exports = function(app){

    //UI Endpoints
    app.get('/class', function (req, res) {
        models.Class.find({})
            .exec(function (error, classes) {
                if (error) throw error;
                res.render('classList', {classes: classes})
            });
    });

    app.get('/class/:className', function (req, res) {
        models.Class.find({name: { $regex : new RegExp(req.params.className, "i") }})
            .populate({
                path: 'teachers',
                populate: { path: 'reviews',
                            populate: {path: 'class'}}
            })
            .exec(function (error, classes) {
                if (error) throw error;
                res.render('reviews', {classes: classes})
            });
    });

    //API Endpoints (ordered POST, DELETE, PUT, GET)
    app.post('/api/class/add', function (req, res) {
        if (!req.body.name || !req.body.department) {
            res.statusCode = 400;
            res.json({error: "Ensure all fields are properly filled out."});
        }  else {
            req.body.name = validator.trim(req.body.name);
            req.body.department = validator.trim(req.body.department);
            let newClass = new models.Class({
                name: req.body.name.toUpperCase(),
                department: req.body.department,
                teachers: []
            });

            newClass.save().then(function (retVal) {
                console.log(retVal);
                return res.send('Class added.');
            }).catch( function(err) {
                console.log(err);
                res.statusCode = 400;
                res.json({error: "Error encountered. Either the class already exists" +
                        " or the connection to the DB has been lost"});
            })
        }
    });

    app.delete('/api/class/remove/:className', function (req, res) {
        models.Class.findOne({name: { $regex : new RegExp(req.params.className, "i") }}, function (error, result) {
            if (error) res.json({error: "Error encountered. Something went wrong, try again?"});
            if (result.n === 0) {
                return res.status(404).json({error: "Class not found in the database."})
            }
            console.log(result);
            result.delete();
            res.send("Class Deleted");
        });
    });

    app.get('/api/class', function (req, res) {
        models.Class.find({}, function (err, classInfo) {
            if (err) throw err;
            res.send(classInfo);
        });
    });

    app.get('/api/class/:className', function (req, res) {
        models.Class.find({name: { $regex : new RegExp(req.params.className, "i") }}, function (err, classInfo) {
            if (err) throw err;
            res.send(classInfo);
        });
    });

};