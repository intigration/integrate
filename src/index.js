console.log(`'/**
 *
 * 786
 * @ALLAH THE MOST GRACIOUS AND MERCIFULL
 *
 * @namespace          redTooling
 * @_timetag           2020
 * @ask                intigration@gmail.com
 * @version            1.0
 * @dev                open
 * @written by @mfarhan
 */

 '`);

// init project
var express = require("express");
var bodyParser = require("body-parser");
const path = require("path");
var http = require("http");
var app = express();
var request = require("request");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//var express = require("express");
var RED = require("node-red");

// Create an Express app
// Add a simple route for static content served from 'public'
app.use("/", express.static("public"));

function getIp(_response) {
  var url = "https://api.ipify.org?format=json";
  var response = request.get(url);
  console.dir(response.data);
  console.log("My public IP address is: " + JSON.stringify(response));
}
console.log(process.env.ipkey);
getIp();
// Create a server
var server = http.createServer(app);

// Create the settings object - see default settings.js file for other options
var settings = {
  httpAdminRoot: "/red",
  httpNodeRoot: "/api",
  userDir: "./.nodered",
  functionGlobalContext: {} // enables global context
};

// Initialise the runtime with a server and settings
RED.init(server, settings);

// Set the front-end folder to serve public assets.
//app.use(express.static('JavaScriptSPA'))

// Set up a route for index.html.
// app.get('*', function (req, res) {
//     res.sendFile(path.join(__dirname + 'desktop.html'));
// });

app.get("/", function(req, res) {
  res.sendFile(path.join(__dirname + "/index.html"));
});

// Serve the editor UI from /red
app.use(settings.httpAdminRoot, RED.httpAdmin);

// Serve the http nodes UI from /api
app.use(settings.httpNodeRoot, RED.httpNode);

server.listen(8000);

// Start the runtime
RED.start();
