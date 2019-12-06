models = require('../models/classes');
module.exports = function(app){
    // UI Endpoints
    app.get('/review/add',  function(req,res){
        res.send('TO BE IMPLEMENTED');
    });

    //Form processing endpoints
    app.post('/review/add', function(req, res) {

    });

    //API Endpoints
    app.post('/api/review/add', function(req, res) {
        res.send('TO BE IMPLEMENTED');
    });


    app.get('/api/review/remove/:review_id', function(req, res) {
        res.send('TO BE IMPLEMENTED');
    });

};