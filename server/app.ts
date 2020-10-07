import express = require("express");
import path from "path";

// Create a new express application instance
const app: express.Application = express();

const clientIndexPath = path.join(__dirname, "../client_build", "index.html");

let port = process.env.PORT;
if (port == null || port == "") {
  port = "8080";
}

const server = app.listen(port, function() {
  console.log(`Example app listening on port ${port}!`);
  console.log("client app index.html path: ", clientIndexPath);
});

// next lines are used to serve the built client app
// (special care is needed since we use client side routing)
// https://create-react-app.dev/docs/deployment#serving-apps-with-client-side-routing

app.use(express.static(path.join(__dirname, "../client_build")));

app.get("/*", function(_req, res) {
  res.sendFile(clientIndexPath);
});

export default server;
