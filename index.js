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
  {
    name: "run laps",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Neque egestas congue quisque egestas. ",
  },
  {
    name: "finish CIS350",
    description:
      "Laoreet non curabitur gravida arcu ac tortor dignissim convallis aenean. Nunc congue nisi vitae suscipit tellus mauris a diam.",
  },
  { name: "play Zelda", description: "..." },
  {
    name: "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
    description: "",
  },
  { name: "sed do eiusmod tempor incididunt ut", description: "" },
  { name: "abore et dolore", description: "no description" },
];
//middleware to run in post request
var urlencodedParser = bodyParser.urlencoded({ extended: false });

app.get("/", function (req, res) {
  res.render("views/index", { tasks: tasks });
});

app.post("/", urlencodedParser, function (req, res) {
  tasks.push(req.body);
  res.render("views/index", { tasks: tasks });
});

app.delete("/:task", function (req, res) {
  res.render("views/index", { tasks: tasks });
  tasks = tasks.filter(function (todo) {
    return todo.item.replace(/ /g, "-") !== req.params.item;
  });
});

// This starts the web server on port 3000.
app.listen(3000, () => {
  console.log("Listening on port 3000");
});
