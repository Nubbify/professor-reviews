module.exports = function(app){
    require('./misc.js')(app);
    require('./classes.js')(app);
    require('./reviews.js')(app);
    require('./teachers.js')(app);
    require('./department.js')(app);
};

