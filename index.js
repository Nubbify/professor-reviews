let express = require('express');
let bodyParser = require('body-parser');
let mongoose = require('mongoose');
let _ = require("underscore");
let dotenv = require('dotenv');
let models = require('./models/classes.js');
let logger = require('morgan');
let exphbs = require('express-handlebars');

dotenv.config();

console.log(process.env.MONGODB);
mongoose.connect(process.env.MONGODB).then(function callback () {
    console.log("Connection to MongoDB successful.");
});
mongoose.connection.on('error', function() {
    console.log("MongoDB Connection Error. Make sure that MongoDB is running.");
    process.exit(1);
});

let app = express();
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');
app.use('/public', express.static('public'));

//Let's pass app into the route files.
require('./routing/misc.js')(app);
require('./routing/classes.js')(app);
require('./routing/reviews.js')(app);
require('./routing/teachers.js')(app);
require('./routing/department.js')(app);



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
    let currentReview = _.findWhere(_DATA, {name: req.body.name, department: req.body.department});
    if (req.body.rating > 10) req.body.rating = 10;
    if (req.body.rating < 1) req.body.rating = 1;
    if (req.body.name.empty || req.body.review.empty || req.body.classes.empty) {
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
});

app.get('/best', function(req, res) {
    let results = _.filter(_DATA, function(review) {return review.rating > 8.5;});
    res.render('best', {
        data: results
    });
});

app.get('/worst', function(req, res) {
    let results = _.filter(_DATA, function(review) {return review.rating < 2.5;});
    res.render('worst', {
        data: results
    });
});


app.get('/random', function(req, res) {
    let results = _DATA[Math.floor(Math.random()*_DATA.length)];
    res.render('random', {
        data: results
    });
});

app.post('/api/addReview', function(req, res) {
    let currentReview = _.findWhere(_DATA, {name: req.body.name, department: req.body.department});
    if (req.body.rating > 10) req.body.rating = 10;
    if (req.body.rating < 1) req.body.rating = 1;
    if (!req.body.name || !req.body.review || !req.body.classes) {
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



app.listen(process.env.PORT || 3000, function() {
    console.log('Listening!');
});