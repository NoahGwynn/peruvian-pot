require('dotenv').config()
const express = require('express');
const dynamicStatic = require('express-dynamic-static')();
const bodyParser = require('body-parser');
const connectDB = require('./mongoose/config/db')
connectDB()

// Setup App
const app = express();
app.use(dynamicStatic);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


// app.use(function (req, res, next) {
//   console.log(req.url)
//   next()
// })


// Routes
require("./routes/recipeApi")(app)
require("./routes/ingredientsApi")(app)
require("./routes/sites")(app, dynamicStatic);



// Port & socket connections
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});