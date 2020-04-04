var bodyParser = require("body-parser");
var express = require("express");
var app = express();

app.use(express.static(__dirname + "/views"));
app.use(express.static(__dirname + "/public"));
app.set("view engine", "ejs");
app.set("views", __dirname);

var currid = 0;
//definition of the Task class -- DO NOT CHANGE IT!
var tasks = [
  { task: "run laps" },
  { task: "finish CIS350" },
  { task: "play Zelda" },
  { task: "Lorem ipsum dolor sit amet, consectetur adipiscing elit" },
  { task: "sed do eiusmod tempor incididunt ut" },
  { task: "abore et dolore" }
];
//middleware to run in post request
var urlencodedParser = bodyParser.urlencoded({ extended: false });

app.get("/", function(req, res) {
  res.render("views/index", { tasks: tasks });
});

app.post("/", urlencodedParser, function(req, res) {
  tasks.push(req.body);
  //   res.json(tasks);
  res.render("views/index", { tasks: tasks });
});

app.delete("/:task", function(req, res) {
  res.render("views/index", { tasks: tasks });
  tasks = tasks.filter(function(todo) {
    return todo.item.replace(/ /g, "-") !== req.params.item;
  });
});

// This starts the web server on port 3000.
app.listen(3000, () => {
  console.log("Listening on port 3000");
});
