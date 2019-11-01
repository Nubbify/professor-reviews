https://midterm-389.herokuapp.com/
# How's My Professor

---

Name: Oscar Bautista

Date: October 26th, 2019

Project Topic: Professor reviews

URL: http://:3000/
 ---

### 1. Data Format and Storage

Data point fields:
- `Field 1`: Name               `Type: String`
- `Field 2`: Department         `Type: String`
- `Field 3`: Rating             `Type: Number`
- `Field 4`: Review             `Type: [String]`
- `Field 5`: Classes            `Type: [String]`

Schema: 
```javascript
{
    name: String,
    department: String,
    rating: Number, 
    review: [String],
    classes: [String]
}
```

### 2. Add New Data

HTML form route: `/addReview`

POST endpoint route: `/api/addReview`

Example Node.js POST request to endpoint: 
```javascript
var request = require("request");

var options = { 
    method: 'POST',
    url: 'http://localhost:3000/api/addReview',
    headers: { 
        'content-type': 'application/x-www-form-urlencoded' 
    },
    form: { 
        name: 'Michael Marsh', 
        department: 'Computer Science',
        rating: 5,
        review: 'Nice man, but he could definitely use some work on being a better teacher',
        classes: 'CMSC414'
    } 
};

request(options, function (error, response, body) {
  if (error) throw new Error(error);

  console.log(body);
});
```

### 3. View Data

GET endpoint route: `/api/getReviews` 

To get API endpoints for navigation page information, 
just prepend it with /api/ (for example - /app/department/:department_name)

### 4. Search Data

Search Field: `name`

### 5. Navigation Pages

Navigation Filters
1. Best Reviews -> `/best`
2. Worst Reviews -> `/worst`
3. Look in a Department -> `/department/:department_name`
4. Look for a class -> `/class/:class_name`
5. Random review -> `/random`
