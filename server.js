var express = require("express");
var bodyParser = require("body-parser");
var app = express();
var http = require("http").Server(app);
var io = require("socket.io")(http);
//var mongoose = require("mongoose");

app.use(express.static(__dirname));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

var messages = [
  //{ name: "Deep", message: "Wie Geht's" },
  //{ name: "Max", message: "Sehr Gut" },
];

app.get("/messages", (req, res) => {
  res.send(messages);
});

app.post("/messages", (req, res) => {
  messages.push(req.body);
  io.emit("message", req.body);
  res.sendStatus(200);
});

//mongoose.connect(dbUrl, (err) => {
//  console.log("mongodb connection");
//});

io.on("connection", (socket) => {
  console.log("user connected");
});

var server = http.listen(3000, () => {
  console.log("Listening..... on port 3000", server.address().port);
});
