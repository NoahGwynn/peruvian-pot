require('dotenv').config()
const express = require('express');
const bodyParser = require('body-parser');
const connectDB = require('./mongoose/config/db')
// Connect to db
connectDB()

// Setup App
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


const buildPath = "./main/build";
app.use(express.static(buildPath));

// app.use(function (req, res, next) {
//   console.log(req.url)
//   next()
// })


// Routes
require("./routes/recipeApi")(app)
require("./routes/ingredientsApi")(app)
require("./routes/site")(app, dynamicStatic);


// Port & socket connections
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});