require('dotenv').config()
const express = require('express');
const dynamicStatic = require('express-dynamic-static')();
const bodyParser = require('body-parser');
const path = require('path');
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
// require("./routes/sites")(app, dynamicStatic);


app.get(["/admin", "/admin/*"], function (_, res) {
  dynamicStatic.setPath(path.resolve(__dirname, "./admin/build/"));
  res.sendFile(path.resolve(__dirname, "./main/build/index.html"))
})

app.get(["/", "/*"], function (_, res) {
  dynamicStatic.setPath(path.resolve(__dirname, "./main/build/"));
  console.log(path.resolve(__dirname, "./main/build/index.html"));
  res.sendFile(path.resolve("./main/build/index.html"))
})

app.post("/reset-to-main", function (req, res) {
  dynamicStatic.setPath(path.resolve(__dirname, "../main/build/"));
  res.sendStatus(200)
})


// Port & socket connections
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});