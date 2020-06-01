const express = require("express");
// import bodyParser to parse the request body
const bodyParser = require("body-parser");

// Import the cors
const cors = require("cors");

// import routes
const mainRoutes = require("./routes");
const app = express();

// load env variables
const dotenv = require("dotenv");
dotenv.config();

// import helpers
const { notFoundResponse } = require("./helpers");

//middleware
app.use(bodyParser.json({ type: "application/*+json" }));
app.use(cors());
app.use("/", mainRoutes);

app.use((req, res) => {
  notFoundResponse(res);
});

const port = process.env.PORT || 3000;
app.listen(port, (err) => {
  console.log(`Listening port number: ${port}`);
});

module.exports = app;
