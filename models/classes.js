let mongoose = require('mongoose');
mongoose.Promise = global.Promise;

reviewSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    rating: {
        type: Number,
        min: 0.0,
        max: 10.0,
        required: true
    },
    review: {
        type: String
    },
    class: {type: mongoose.Schema.ObjectId, ref: 'Class'},
    teacher: {type: mongoose.Schema.ObjectId, ref: 'Teacher'}
});

teacherSchema = new mongoose.Schema({
    name: {
        type: String,
        unique: true,
        required: true
    },
    department: {
        type: String,
        required: true
    },
    office: {
        type: String
    },
    reviews: [ {type: mongoose.Schema.ObjectId, ref: 'Review'} ],
    classes: [ {type: mongoose.Schema.ObjectId, ref: 'Class'} ]
});

classSchema = new mongoose.Schema({
    name: {
        type: String,
        unique: true,
        required: true
    },
    department: {
        type: String,
        required: true
    },
    teachers: [ {type: mongoose.Schema.ObjectId, ref: 'Teacher'} ]
});

reviewSchema.post("remove", document => {
    console.log("Review has been removed: " + document);
    let reviewID = document._id;
    let teacherID = document.teacher;
    Teacher.updateOne({_id: teacherID},
        { $pull: {reviews: { $in: [reviewID] }}}, function (error) {
        console.log('Deleting review from teacher');
        if (error) throw error;
    });
});

teacherSchema.post("remove", document => {
    console.log("Teacher has been removed");
    let teacherID = document._id;
    let classIDs = document.classes;
    Class.updateMany({_id: {$in: classIDs}},
        { $pull: {teachers: { $in: [teacherID]}}}, function (error) {
            console.log("Deleting teacher from class");
            if (error) throw error;
        });
    Review.delete({_id: { $in: document.reviews }});
});

classSchema.post("remove", document => {
    console.log("Class has been removed");
    let classID = document._id;
    let teacherIDs = document.teachers;
    Teacher.updateMany ({_id: { $in: teacherIDs}},
        { $pull: {classes: { $in: [classID] }}}, function (error) {
        console.log("Deleting class from teacher");
    });
    Review.find({class: classID}, function (err, results) {
        if (err) return err;
        results.forEach((item) => item.delete());
    });
});

let Review = mongoose.model('Review', reviewSchema);
let Teacher = mongoose.model('Teacher', teacherSchema);
let Class = mongoose.model('Class', classSchema);
module.exports.Review = Review;
module.exports.Teacher = Teacher;
module.exports.Class = Class;