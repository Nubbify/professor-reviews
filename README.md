https://nubbify-professor.herokuapp.com/
# How's My Professor

---

Name: Oscar Bautista

Date: December 6th, 2019

Project Topic: Professor reviews

URL: https://final-389.herokuapp.com/
 ---

### 1. Data Format and Storage

Schemas: 
```javascript
{
    reviewSchema = new mongoose.Schema({
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
        }
    });
    
    teacherSchema = new mongoose.Schema({
        name: {
            type: String,
            required: true
        },
        department: {
            type: String
        },
        reviews: [reviewSchema]
    });
    
    classSchema = new mongoose.Schema({
        name: {
            type: String,
            required: true
        },
        department: {
            type: String,
            required: true
        },
        teachers: [teacherSchema]
    });
}
```

### 2. Socket usage:

Sockets are used to listen for updates to the database and they push a small notification popup when a new review appears.

### 3. View Data: 

Navigation pages for viewing data are:
1. See list of departments -> `/department`
2. See list of classes in a departments -> `/department/:department_name`
3. See list of classes -> `/class`
4. See reviews for a class -> `/class/:class_name`
5. See list of teachers -> `/teacher`
6. See reviews for a teacher -> `/teacher/:teacher_name`
7. See all reviews -> `/`
8. About -> `/about`

Navigation pages for inserting data include:
1. Add a review -> `/review/add`
2. Add a teacher -> `/teacher/add`

Adding classes is done through the API at `/api/addClass`


### 4. API endpoints

1. POST endpoint route: `/api/review/add`
2. POST endpoint route: `/api/teacher/add`
3. POST endpoint route: `/api/class/add`
4. DELETE endpoint route: `/api/class/remove/:className`
5. DELETE endpoint route: `/api/review/remove/:review_id`
6. GET endpoint route: `/api/department`
7. GET endpoint route: `/api/department/:department_name`
8. GET endpoint route: `/api/class`
9. GET endpoint route: `/api/class/:className`
10. GET endpoint route: `/api/teacher`
11. GET endpoint route: `/api/teacher/:teacher_name`


Example Node.js POST request to endpoint 3: 
```javascript
var request = require("request");

var options = { 
    method: 'POST',
    url: 'https://nubbify-professor.herokuapp.com/api/class/add',
    headers: { 
        'content-type': 'application/json' 
    },
    body: {
        "name": "BMGT101",
        "department": "Business"
    }
};

request(options, function (error, response, body) {
  if (error) throw new Error(error);

  console.log(body);
});
```

### 5. Modules

index.js should only deal with setting up the application and database connections.

The files in routing deal with all of the express app routes. 

The files in controller deal with getting information from the database related to the name of it (i.e teacher.js gets information for teachers).


### 6. npm packages

Three foreign libraries include a pop-up library called  and a form validation library called and an input validation library called 

### 7. User Interface

Bootstrap and jquery are cool, right? Handlebars is also nice.

### 8. Deployment

This should be deployed at https://nubbify-professor.herokuapp.com/

### 9. README

You're reading it! Yay! \o/