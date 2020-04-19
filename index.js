var bodyParser = require("body-parser");
var express = require("express");
var app = express();

if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const bcrypt = require("bcrypt");
const passport = require("passport");
const flash = require("express-flash");
const session = require("express-session");
const methodOverride = require("method-override");

const initializePassport = require("./passport-config");
initializePassport(
  passport,
  (email) => users.find((user) => user.email === email),
  (id) => users.find((user) => user.id === id)
);

const users = [];

app.use(express.static(__dirname + "/views"));
app.use(express.static(__dirname + "/public"));
app.set("view engine", "ejs");
app.set("views", __dirname);
app.use(express.urlencoded({ extended: false }));
app.use(flash());
// console.log(process.env.SESSION_SECRET);
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: true,
    saveUninitialized: true,
  })
);
app.use(passport.initialize());
app.use(passport.session());
app.use(methodOverride("_method"));

var currid = 0;
//definition of the Task class -- DO NOT CHANGE IT!
var tasks = [
  {
    title: "run laps",
    desc:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Neque egestas congue quisque egestas. ",
  },
  {
    title: "finish CIS350",
    desc:
      "Laoreet non curabitur gravida arcu ac tortor dignissim convallis aenean. Nunc congue nisi vitae suscipit tellus mauris a diam.",
  },
  { title: "play Zelda", desc: "..." },
  {
    title: "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
    desc: "",
  },
  { title: "sed do eiusmod tempor incididunt ut", desc: "" },
  { title: "abore et dolore", desc: "no desc" },
];

var rankings = [
  {
    name: "Chris",
    numTasks: 300,
  },
  {
    name: "Estee",
    numTasks: 350,
  },
  {
    name: "Kitty",
    numTasks: 2,
  },
  {
    name: "Piggy",
    numTasks: 8,
  },
];

//sort tasks by numTasks
rankings = rankings.sort(function (a, b) {
  return b.numTasks - a.numTasks;
});
//middleware to run in post request
var urlencodedParser = bodyParser.urlencoded({ extended: false });

app.get("/", checkNotAuthenticated, function (req, res) {
  res.render("views/index", { tasks: tasks });
});

app.get("/tasks", checkNotAuthenticated, function (req, res) {
  res.render("views/index", { tasks: tasks });
});

app.get(
  "/task",
  checkNotAuthenticated,
  function (req, res) {
    var title = req.query.title;
    var desc = req.query.desc;
    //delete the unedited task
    var tasks = tasks;
  },
  (cleaner = function (object, title) {
    Object.keys(object).forEach(function (k) {
      var temp = object[k].filter(function (a) {
        return a.title !== title;
      });
      if (object[k].length !== temp.length) {
        object[k] = temp;
      }
    });

    cleaner(users, title);
    res.render("views/task", { title: title, desc: desc });
  })
);

app.get("/rankings", checkNotAuthenticated, function (req, res) {
  res.render("views/rankings", { rankings: rankings });
});

app.get("/login", checkNotAuthenticated, function (req, res) {
  res.render("views/login");
});

app.post(
  "/login",
  checkNotAuthenticated,
  passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/login",
    failureFlash: true,
  })
);

app.get("/register", checkNotAuthenticated, function (req, res) {
  res.render("views/register");
});

app.post("/register", checkNotAuthenticated, async function (req, res) {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    users.push({
      id: Date.now().toString(),
      name: req.body.name,
      email: req.body.email,
      password: hashedPassword,
    });
    res.redirect("/login");
  } catch {
    res.redirect("/register");
  }
  console.log(users);
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

app.delete("/logout", function (req, res) {
  req.logOut();
  res.redirect("/login");
});

function checkAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect("/login");
}

function checkNotAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return res.redirect("/");
  }
  next();
}

// This starts the web server on port 3000.
app.listen(3000, () => {
  console.log("Listening on port 3000");
});
