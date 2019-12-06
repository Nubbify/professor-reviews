models = require('../models/classes');
module.exports = function(app){
    // UI Endpoints
    app.get('/department',function(req,res){
        res.send('TO BE IMPLEMENTED');
    });

    app.get('/department/:departmentName', function(req, res) {
        res.send('TO BE IMPLEMENTED');
    });

    //API Endpoints

    app.post('/api/department', function(req, res) {
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