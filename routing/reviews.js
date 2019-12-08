let validator = require('validator');
models = require('../models/classes');
module.exports = function(app){
    // UI Endpoints
    app.get('/review/add',  function(req,res){
        let error = req.app.locals.reviewFormError;
        req.app.locals.reviewFormError = null;
        models.Teacher.find({}, null, {sort: {name: 1}},function (err, teacherInfo) {
            if (err) throw err;
            models.Class.find({}, null, {sort: {name: 1}}, function (err, classInfo) {
                if (err) throw err;
                res.render('addReview', {
                    classes: classInfo.sort(),
                    teachers: teacherInfo.sort(),
                    error: error
                });
            })
        });
    });

    //Form processing endpoints
    app.post('/review/add', function(req, res) {
        if (!req.body.class || !req.body.review || !req.body.rating || !req.body.name || !req.body.teacher) {
            req.app.locals.reviewFormError = "Teacher not found. It's possible they were deleted while you were on this form.";
            res.redirect('/review/add');
        } else {
            req.body.class = validator.trim(req.body.class);
            req.body.review = validator.trim(req.body.review);
            req.body.rating = validator.trim(req.body.rating);
            req.body.name = validator.trim(req.body.name);
            req.body.teacher = validator.trim(req.body.teacher);
            models.Teacher.findOne({name: { $regex : new RegExp(req.body.teacher, "i")}}, function (error, reviewTeacher) {
                if (error) throw error;
                if (!reviewTeacher || reviewTeacher.n === 0) {
                    req.app.locals.reviewFormError = "Teacher not found. It's possible they were deleted while you were on this form.";
                    res.redirect('/review/add');
                }
                models.Class.findOne({name: { $regex : new RegExp(req.body.class, "i") }}, function (error, reviewClass) {
                    if (error) throw error;
                    if(!reviewClass || reviewClass.n === 0) {
                        req.app.locals.reviewFormError = "Class not found. It's possible it was deleted while you were on this form.";
                        res.redirect('/review/add');
                    }
                    let newReview = new models.Review({
                        rating: req.body.rating,
                        review: req.body.review,
                        name: req.body.name,
                        class: reviewClass,
                        teacher: reviewTeacher
                    });
                    newReview.save().then(function() {
                        reviewTeacher.reviews.push(newReview._id);
                        if (reviewTeacher.classes.indexOf(reviewClass._id) === -1)
                            reviewTeacher.classes.push(reviewClass._id);
                        reviewTeacher.save();
                        if (reviewClass.teachers.indexOf(reviewTeacher._id) === -1) {
                            reviewClass.teachers.push(reviewTeacher._id);
                            reviewClass.save();
                        }
                        res.redirect('/teacher/'+reviewTeacher.name)
                    }).catch(function(err) {
                        console.log(err);
                        req.app.locals.reviewFormError = "Unknown Error. Try again later.";
                        res.redirect('/review/add');
                    });
                });
            });
        }
    });

    //API Endpoints
    app.post('/api/review/add', function(req, res) {
        if (!req.body.class || !req.body.review || !req.body.rating || !req.body.name || !req.body.teacher) {
            res.statusCode = 400;
            res.json({error: "Ensure all fields are properly filled out."});
        } else {
            req.body.class = validator.trim(req.body.class);
            req.body.review = validator.trim(req.body.review);
            req.body.rating = validator.trim(req.body.rating);
            req.body.name = validator.trim(req.body.name);
            req.body.teacher = validator.trim(req.body.teacher);
            models.Teacher.findOne({name: { $regex : new RegExp(req.body.teacher, "i")}}, function (error, reviewTeacher) {
                if (error) throw error;
                if (!reviewTeacher || reviewTeacher.n === 0)
                    return res.status(404).json({error: "Teacher not found. Try adding the teacher first?"});
                models.Class.findOne({name: { $regex : new RegExp(req.body.class, "i") }}, function (error, reviewClass) {
                    if (error) throw error;
                    if(!reviewClass || reviewClass.n === 0)
                        return res.status(404).json({error: "Class not found. Try adding the teacher first?"});
                    let newReview = new models.Review({
                        rating: req.body.rating,
                        review: req.body.review,
                        name: req.body.name,
                        class: reviewClass,
                        teacher: reviewTeacher
                    });
                    newReview.save().then(function() {
                            reviewTeacher.reviews.push(newReview._id);
                            if (reviewTeacher.classes.indexOf(reviewClass._id) === -1)
                                reviewTeacher.classes.push(reviewClass._id);
                            reviewTeacher.save();
                            if (reviewClass.teachers.indexOf(reviewTeacher._id) === -1) {
                                reviewClass.teachers.push(reviewTeacher._id);
                                reviewClass.save();
                            }
                            res.send("Review saved");
                        }).catch(function(err) {
                            console.log(err);
                            return res.status(500).send("There was an error saving the review");
                        });
                    });
                });
            }
        });


    app.delete('/api/review/remove/:reviewID', function(req, res) {
        models.Review.findOne({_id: req.params.reviewID}, function (err, result) {
            if (err) return err;
            result.delete();
            res.send('Review Deleted');
        });
    });

    app.get('/api/review', function (req, res) {
        models.Review
            .find({})
            .populate('teacher class', 'name')
            .exec(function (err, reviewInfo) {
                if (err) throw err;
                res.send(reviewInfo);
        });
    })
};