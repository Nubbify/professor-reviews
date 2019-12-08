let express = require('express');
let bodyParser = require('body-parser');
let mongoose = require('mongoose');
let _ = require("underscore");
let dotenv = require('dotenv');
let models = require('./models/classes.js');
let logger = require('morgan');
let exphbs = require('express-handlebars');

dotenv.config();

mongoose.connect(process.env.MONGODB).then(function callback () {
    console.log("Connection to MongoDB successful.");
});
mongoose.connection.on('error', function(error) {
    console.log(error);
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

//Let's set up the routes with our routing modules.
require('./routing/routes.js')(app);

app.listen(process.env.PORT || 3000, function() {
    console.log('Listening!');
});