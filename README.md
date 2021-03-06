https://nubbify-reviews.herokuapp.com/
# How's My Professor

---

Name: Oscar Bautista

URL: https://nubbify-reviews.herokuapp.com/
 ---

### 1. Data Format and Storage

Schemas are saved in the models folder under classes.js. Here's the base models:
```javascript
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
```

### 2. View Data: 

Navigation pages for viewing data are:
1. See list of departments -> `/department`
2. See list of classes/teachers in a departments -> `/department/:department_name`
3. See list of classes -> `/class`
4. See reviews for teachers that have taught a class -> `/class/:class_name`
5. See list of teachers -> `/teacher`
6. See reviews for a teacher -> `/teacher/:teacher_name`
7. See buttons to insert data -> `/`
8. About -> `/about`

Navigation pages for inserting data include:
1. Add a review -> `/review/add`
2. Add a teacher -> `/teacher/add`

Adding classes is done through the API at `/api/addClass`


### 3. API endpoints

1. POST endpoint route: `/api/review/add`
2. POST endpoint route: `/api/teacher/add`
3. POST endpoint route: `/api/class/add`
4. DELETE endpoint route: `/api/class/remove/:className`
5. DELETE endpoint route: `/api/review/remove/:reviewID`
6. GET endpoint route: `/api/department`
7. GET endpoint route: `/api/department/:departmentName`
8. GET endpoint route: `/api/class`
9. GET endpoint route: `/api/class/:className`
10. GET endpoint route: `/api/teacher`
11. GET endpoint route: `/api/teacher/:teacherName`

Example Node.js POST request to endpoint 1: 
```javascript
var request = require("request");

var options = { 
    method: 'POST',
    url: 'https://nubbify-reviews.herokuapp.com/api/review/add',
    headers: { 
        'content-type': 'application/json' 
    },
    body: {
        "rating": 5,
        "review": "You rock!",
        "name": "Cody",
        "class": "CMSC351",
        "teacher": "John Doe"
    }
};

request(options, function (error, response, body) {
  if (error) throw new Error(error);

  console.log(body);
});
```

Example Node.js POST request to endpoint 2
```javascript
var request = require("request");

var options = { 
    method: 'POST',
    url: 'https://nubbify-reviews.herokuapp.com/api/teacher/add',
    headers: { 
        'content-type': 'application/json' 
    },
    body: {
	"name": "John Dee",
	"department": "History",
	"office": "HIST1010"
    }
};

request(options, function (error, response, body) {
  if (error) throw new Error(error);

  console.log(body);
});
```


Example Node.js POST request to endpoint 3: 
```javascript
var request = require("request");

var options = { 
    method: 'POST',
    url: 'https://nubbify-reviews.herokuapp.com/api/class/add',
    headers: { 
        'content-type': 'application/json' 
    },
    body: {
        "name": "BMGT201",
        "department": "Business"
    }
};

request(options, function (error, response, body) {
  if (error) throw new Error(error);

  console.log(body);
});
```

### 4. Modules

index.js should only deal with setting up the application and database connections.

The files in routing deal with all of the express app routes (and data logic for each kind of route). 

### 5. npm packages

One library includes a form validation library called validator. Another is eslint for checking for formatting and other JS problems.

### 6. User Interface

Bootstrap and jquery are cool, right? Handlebars is also nice. 

The css and javascript files used throughout the site are found in public. In views, we have the handlebar files that
create the pages (should be named in a manner similar to routing: you can figure out what is what).

### 7. Deployment

This should be deployed at https://nubbify-reviews.herokuapp.com/