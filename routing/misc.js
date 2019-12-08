models = require('../models/classes');
module.exports = function(app){
    // UI Endpoints
    app.get('/',function(req,res){
        let data = {};
        models.Class.find({}, function (err, classes) {
            if (err) throw err;
            data = classes;
        });
        res.render('home',{
            data: data
        });
    });

    app.get('/about', function(req, res) {
        res.render('about');
    });


};