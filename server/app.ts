import express = require("express");

// Create a new express application instance
const app: express.Application = express();

app.get("/", function(req, res) {
  res.send("Hello World!");
});

const server = app.listen(8080, function() {
  console.log("Example app listening on port 8080!");
});

export default server;
