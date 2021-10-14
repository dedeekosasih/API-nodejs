const express = require("express");
const bodyParser = require("body-parser");

const app = express();


app.use(bodyParser.json());


app.use(bodyParser.urlencoded({ extended: true }));


app.get("/", (req, res) => {
  res.json({ message: "Welcome to Modal Rakyat." });
});

require("./app/routes/register.route.js")(app);


app.listen(7000, () => {
  console.log("Server is running on port 7000.");
});