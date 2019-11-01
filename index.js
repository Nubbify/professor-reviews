
var express = require('express');
var bodyParser = require('body-parser');
var dataUtil = require("./data-util");
var _ = require("underscore");
var logger = require('morgan');
var exphbs = require('express-handlebars');

var app = express();

var _DATA = dataUtil.loadData().reviews;

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');
app.use('/public', express.static('public'));

/* Add whatever endpoints you need! Remember that your API endpoints must
 * have '/api' prepended to them. Please remember that you need at least 5
 * endpoints for the API, and 5 others.
 */

app.get('/',function(req,res){
  res.render('home',{
      data: _DATA
  });
});

app.get('/addReview', function(req, res) {
  res.render('addReview', {});
});

app.get('/addReview/:name/:department', function(req, res) {
    res.render('addReview', {
        name: req.params.name,
        department: req.params.department
    });
});

app.post('/addReview', function(req, res) {
    var currentReview = _.findWhere(_DATA, {name: req.body.name, department: req.body.department});
    if (req.body.rating > 10) req.body.rating = 10;
    if (req.body.rating < 1) req.body.rating = 1;
    if (req.body.name == "" || req.body.review == "" || req.body.classes == "") {
        res.statusCode = 400;
        res.redirect("/");
    }
    if (!currentReview) {
        // Save new review
        req.body.review = [req.body.review];
        req.body.classes = [req.body.classes];
        req.body.rating = parseInt(req.body.rating);
        _DATA.push(req.body);
        dataUtil.saveData(_DATA);
    } else {
        currentReview.rating = (currentReview.rating * currentReview.review.length) + parseInt(req.body.rating);
        currentReview.review.push(req.body.review);
        currentReview.rating = currentReview.rating / currentReview.review.length;
        if (!currentReview.classes.includes(req.body.classes)) {
            currentReview.classes.push(req.body.classes);
        }
        dataUtil.saveData(_DATA);
    }
    res.redirect("/");
})

app.get('/best', function(req, res) {
    var results = _.filter(_DATA, function(review) {return review.rating > 8.5;});
    res.render('best', {
        data: results
    });
});

app.get('/worst', function(req, res) {
    var results = _.filter(_DATA, function(review) {return review.rating < 2.5;});
    res.render('worst', {
        data: results
    });
});

app.get('/department/:department', function(req, res) {
    var results = _.filter(_DATA, {department: req.params.department});
    res.render('department', {
        data: results,
        department: req.params.department
    });
});

app.get('/class/:class', function(req, res) {
    var results = _.filter(_DATA, function (review) {
        return review.classes.includes(req.params.class);
    });
    res.render('class', {
        data: results,
        className: req.params.class
    });
});

app.get('/random', function(req, res) {
    var results = _DATA[Math.floor(Math.random()*_DATA.length)];
    res.render('random', {
        data: results
    });
});

app.post('/api/addReview', function(req, res) {
    var currentReview = _.findWhere(_DATA, {name: req.body.name, department: req.body.department});
    if (req.body.rating > 10) req.body.rating = 10;
    if (req.body.rating < 1) req.body.rating = 1;
    if (req.body.name == "" || req.body.review == "" || req.body.classes == "") {
        res.statusCode = 400;
        res.json({error: "Ensure all fields are properly filled out."});
    }
    if (!currentReview) {
        // Save new review
        req.body.review = [req.body.review];
        req.body.classes = [req.body.classes];
        req.body.rating = parseInt(req.body.rating);
        currentReview = req.body;
        _DATA.push(req.body);
        dataUtil.saveData(_DATA);
    } else {
        currentReview.rating = (currentReview.rating * currentReview.review.length) + parseInt(req.body.rating);
        currentReview.review.push(req.body.review);
        currentReview.rating = currentReview.rating / currentReview.review.length;
        if (!currentReview.classes.includes(req.body.classes)) {
            currentReview.classes.push(req.body.classes);
        }
        dataUtil.saveData(_DATA);
    }
    res.json(currentReview);
});

app.get('/api/getReviews', function(req, res) {
    res.json(_DATA);
});

app.get('/api/best', function(req, res) {
    var results = _.max(_DATA, function(review) {return review.rating;});
    res.json(results);
});

app.get('/api/worst', function(req, res) {
    var results = _.min(_DATA, function(review) {return review.rating;});
    res.json(results);
});

app.get('/api/department/:department', function(req, res) {
    var results = _.filter(_DATA, {department: req.params.department});
    res.json(results);
});

app.get('/api/class/:class', function(req, res) {
    var results = _.filter(_DATA, function (review) {
        return review.classes.includes(req.params.class);
    });
    res.json(results);
});

app.get('/api/random', function(req, res) {
    var results = _DATA[Math.floor(Math.random()*_DATA.length)];
    res.json(results);
});

app.listen(process.env.PORT || 3000, function() {
    console.log('Listening!');
});