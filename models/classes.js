let mongoose = require('mongoose');
mongoose.Promise = global.Promise;

reviewSchema = new mongoose.Schema({
    id: mongoose.ObjectId,
    name: {
        type: String,
        required: true
    },
    rating: {
        type: Number,
        min: 0.0,
        max: 5.0,
        required: true
    },
    review: {
        type: String
    },
    class: {type: mongoose.Schema.ObjectId, ref: 'class'}
});

teacherSchema = new mongoose.Schema({
    id: mongoose.ObjectId,
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
    reviews: [reviewSchema],
    classes: [ {type: mongoose.Schema.ObjectId, ref: 'class'} ]
});

classSchema = new mongoose.Schema({
    id: mongoose.ObjectId,
    name: {
        type: String,
        unique: true,
        required: true
    },
    department: {
        type: String,
        required: true
    },
    teachers: [ {type: mongoose.Schema.ObjectId, ref: 'teacher'} ]
});

let Review = mongoose.model('Review', reviewSchema);
let Teacher = mongoose.model('Teacher', teacherSchema);
let Class = mongoose.model('Class', classSchema);
module.exports.Review = Review;
module.exports.Teacher = Teacher;
module.exports.Class = Class;
