/**
 * Project: CIS 350 Group Project:
 * Introduction of this file:
 * This file is where the node express app is. This file creates a connection with the database,
 * creates the schema used for each class, and specifies the SchemaType and options for each property of each class.
 * It also implements functions to handle http requests sent by the Android and Web end.
 *
 * Major functions achieved:
 * 1. Creates, updates and removes documents from the MongoDB Cluster on requests.
 * 2. Returns a ordered list of top 10 users from the data base.
 *
 *  @author Yiwei (Estee) Chen <estee813@seas.upenn.edu>
 *  @author Qingyuan Peng <pqy@seas.upenn.edu>
 *  @author Vivian Chiang
 */

/**
 * Note to users:
 * 1. currently when creating accounts, two users can't have the same password.
 * 2. Deadline is not required for iter 1.
 *
 */

const express = require('express');
//const expressLayouts = require('express-ejs-layouts');
const mongoose = require('mongoose');
const passport = require('passport');
const flash = require('connect-flash');
const session = require('express-session');
const bcrypt = require('bcryptjs');
var bodyParser = require("body-parser");

const app = express();

// Passport Config
require('./config/passport')(passport);


/**
 * this is the account that Estee created on MongoDB Atlas, before you want to use it you should tell me and I will
 * white list your ip address. For now , just use my user name and password
 * username: estee
 * password: PSAMarketing
 */

var cloudUrl =
  "mongodb+srv://estee:PSAMarketing@cis350group33cluster-8lbyv.mongodb.net/test?retryWrites=true&w=majority";
var localUrl = "mongodb://localhost:27017";

/*
Estee's account didn't work for me so I created a new one below (in ./config/keys); this one should work for everyone --Vivian
 */
 
// DB Config
const db = require('./config/keys').mongoURI;

// Connect to MongoDB
mongoose.connect(db, { useNewUrlParser: true })
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));

// EJS
//app.use(expressLayouts);
app.set('view engine', 'ejs');

// Express body parser
app.use(express.urlencoded({ extended: true }));

// Express session
app.use(
  session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
  })
);

//Import Schemas
var schemas = require("./models/Schemas");
var User = schemas.getUser();
var Todo = schemas.getTodo();
var Food = schemas.getFood();

//var Todo = require("./models/User");
//var Food = require("./models/User");

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

// Connect flash
app.use(flash());

// Global variables
app.use(function(req, res, next) {
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  res.locals.error = req.flash('error');
  next();
});

/**
 * create some data for testing purpose
 *
 */

/**
 * remove all from db to restart the test
 * don't use normally
 */
// User.deleteMany( (err, c) => {
//     if (!err) {
//         console.log("all deleted? no error ");
//     } else {
//         console.log(err);
//     }
// });

//test todo data
var testtodolist = [
  {
    desc: "by tomorrow",
    title: "hw1",
    creationDate: new Date(),
  },
  {
    desc: "by monday",
    title: "hw2",
    creationDate: new Date(),
  },
  {
    desc: "by 4.9",
    title: "hw3",
    creationDate: new Date(),
  },
  {
    desc: "by 4.13",
    title: "hw4",
    creationDate: new Date(),
  },
  {
    desc: "by 5.1",
    title: "hw5",
    creationDate: new Date(),
  },
  {
    desc: "by 4.31",
    title: "hw6",
    creationDate: new Date(),
  },
  {
    desc: "by 5.2",
    title: "hw7",
    creationDate: new Date(),
  },
];

/**
 * add some users
 */

// var newperson1 = new User({
//     name: "ipadair",
//     password: "1239248Aa",
//     email: "a@gmail.com",
// });
/**
 * add one to-do to user1
 */

// testtodolist.map((element, i) => {newperson1.currentTodos.push(element)});
// newperson1.save((err, doc) => {
//     if (err) {
//         console.log("error in test");
//     } else {
//         console.log({'status': 'success'}, {'User': doc});
//     };
// });

//testing
var alldata;
User.find().exec((err, res) => {
  if (err) {
    console.log("error in outputting all" + err);
  } else {
    alldata = res;
    console.log("all docs in User: " + res);
  }
});

var newperson2 = new User({
    name: "ipadpro",
    password: "uopelrnmJ90",
    email: "b@gmail.com",
});

// var newperson3 = new User({
//     name: "macbook",
//     password: "87654321Ui",
//     email: "c@gmail.com",
// });

// var newperson4 = new User({
//     name: "pqy",
//     password: "233",
//     email: "pqy@seas.upenn.edu",
// });

// newperson2.save();
// newperson3.save();
// newperson4.save();

/**
 * some query functions that needs to be written:
 * 1. login authentication function
 * 2. create an account
 * 3. add a to-do to my to-do list
 * 4. buy food from the store, add to myFoods
 * 6. use a food to feed the cat, need to update myFoods and my pet status
 * 7. pull out a list of top 10 cat-RAISERS' usernames and their cat level
 * 8. pull out a list of top 10 task-doers
 */

/**
 *  Login, create account, authentication -> Android
 */

app.use("/loginandroid", (req, res) => {
  var username = req.query.username;
  var pw = req.query.password;
  var email = req.query.email;
  User.findOne({ name: username }, (err, person) => {
    if (err) {
      res.json({
        status: "error",
        message: "dbError",
      });
    } else if (!person) {
      res.json({
        status: "error",
        message: "username",
      });
    } else {
      if (person.password === pw) {
        res.json({
          status: "success",
          message: "",
        });
      } else {
        res.json({
          status: "error",
          message: "password",
        });
      }
    }
  });
});

app.use("/signupandroid", (req, res) => {
  var username = req.query.username;
  var pw = req.query.password;
  var email = req.query.email;
  var newUser = new User({
    name: username,
    password: pw,
    email: email,
  });
  newUser.save((err, product) => {
    if (err) {
      res.json({ status: "error", message: "" });
      console.log(err);
    } else {
      res.json({ status: "success", message: "" });
    }
  });
});

app.use("/changepasswordandroid", (req, res) => {
  var username = req.query.username;
  var oldpw = req.query.oldpassword;
  var newpw = req.query.newpassword;

  User.findOneAndUpdate(
    {
      name: username,
      password: oldpw,
    },
    { $set: { password: newpw } },
    (err, person) => {
      if (err) {
        res.json({
          status: "error",
          message: "dbError",
        });
      } else if (!person) {
        res.json({
          status: "error",
          message: "username/password",
        });
      } else {
        res.json({
          status: "success",
          message: "",
        });
      }
    }
  );
});

/**
 *  Iteration 1: Add task, edit task, delete task -> Android's
 * */

app.use("/gettask", (req, res) => {
  var username = req.query.username;

  User.findOne(
    {
      name: username,
    },
    (err, person) => {
      if (err) {
        res.json([
          {
            status: "error",
            message: "dbError",
          },
        ]);
        console.log("error in getting task");
      } else if (!person) {
        res.json([
          {
            status: "error",
            message: "no such person",
          },
        ]);
      } else {
        res.json(person.currentTodos);
      }
    }
  );
});

app.use("/addtask", (req, res) => {
  var username = req.query.username;
  var title = req.query.title;
  var description = req.query.desc;
  var ddl = req.query.deadline;
  var now = new Date();
  var newTask = new Todo({
    title: title,
    desc: description,
    deadline: ddl,
    currDate: now,
  });
  User.findOne(
    {
      name: username,
    },
    (err, person) => {
      if (err) {
        res.json({
          status: "error",
          message: "dbError",
        });
        console.log("error in adding task");
      } else if (!person) {
        res.json({
          status: "error",
          message: "no such person",
        });
      } else {
        person.currentTodos.push(newTask);
        person.save((err, product) => {
          if (err) {
            res.json({ status: "error in saving person" });
            console.log("error in saving task in add");
          } else {
            res.json({ status: "success" });
          }
        });
      }
    }
  );
});

app.use('/edittask', (req, res) => {
    var person = req.query.username;
    var title = req.query.orgtitle;
    var newdesc = req.query.desc;
    var newdeadline = req.query.desc;
    var newtitle = req.query.title;

    Todo.findOneAndUpdate( {
        name: person
    },
    {$set: [{desc: newdesc}, {deadline: newdeadline}, {title: newtitle}]},
    (err, person) => {
        if (err) {
            res.json( {
                'status' : 'error',
                'message': 'dbError'
            } );
        } else if (!person) {
            res.json( {
                'status' : 'error',
                'message': 'no such title'
            } );
        } else {
            res.json( {
                'status' : 'success',
                'message': ''
            } );
        }
    } );
});

app.use("/deletetask", (req, res) => {
  var username = req.query.username;
  var title = req.query.title;
  var newTask = new Todo({
    title: title,
  });
  User.findOneAndUpdate(
    {
      name: username,
    },
    {
      $and: [
        { $pull: { currentTodos: { title: title } } },
        { $inc: { numCompleted: 1 } },
        { $push: { completedTodos: newTask } },
      ],
    },
    (err, person) => {
      if (err) {
        res.json({
          status: "error",
          message: "dbError",
        });
        console.log("error in adding task");
      } else if (!person) {
        res.json({
          status: "error",
          message: "no such person",
        });
      } else {
        res.json({ status: "success" });
      }
    }
  );
});

/**
 *
 * Iteration 2: Android -> get the number of completed tasks
 */

app.use("/getnumcompleted", (req, res) => {
  var username = req.query.username;
  User.findOne(
    {
      name: username,
    },
    (err, person) => {
      if (err) {
        res.json({
          status: "error",
          message: "dbError",
        });
        console.log("error in adding task");
      } else if (!person) {
        res.json({
          status: "error",
          message: "no such person",
        });
      } else {
        res.json({
          status: "success",
          message: (person.numCompleted).toString(),
        });
      }
    }
  );
});

/**
 *
 * Iteration 1: Web App Login
 */

const { ensureAuthenticated, forwardAuthenticated } = require('./config/auth');

// Welcome Page
app.get('/', forwardAuthenticated, (req, res) => res.render('welcome'));

// Login Page
app.get('/users/login', forwardAuthenticated, (req, res) => res.render('login'));

// Register Page
app.get('/users/register', forwardAuthenticated, (req, res) => res.render('register'));

// Register
app.post('/users/register', (req, res) => {
  const { name, email, password, password2 } = req.body;
  let errors = [];

  if (!name || !email || !password || !password2) {
    errors.push({ msg: 'Please enter all fields' });
  }

  if (password != password2) {
    errors.push({ msg: 'Passwords do not match' });
  }

  if (password.length < 6) {
    errors.push({ msg: 'Password must be at least 6 characters' });
  }
  if (errors.length > 0) {
    res.render('register', {errors, name, email, password, password2});
  } else {
    User.findOne({ email: email }).then(user => {
      if (user) {
        errors.push({ msg: 'Email already exists' });
        res.render('register', {
          errors,
          name,
          email,
          password,
          password2
        });
      } else {
        const newUser = new User({
          name,
          email,
          password
        });

        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(newUser.password, salt, (err, hash) => {
            if (err) throw err;
            newUser.password = hash;
            newUser
              .save()
              .then(user => {
                req.flash(
                  'success_msg',
                  'You are now registered and can log in'
                );
                res.redirect('/users/login');
              })
              .catch(err => console.log(err));
          });
        });
      }
    });
  }
});

// Login
app.post('/users/login', (req, res, next) => {
  passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/users/login',
    failureFlash: true
  })(req, res, next);
});

// Logout
app.get('/users/logout', (req, res) => {
  req.logout();
  req.flash('success_msg', 'You are logged out');
  res.redirect('/users/login');
});

/**
 *
 * Iteration 1: Web App Handle Tasks
 */
 
// Dashboard
app.get('/dashboard', ensureAuthenticated, function (req, res) {
  /*
  res.render('dashboard', {
    user: req.user,
  })
  */
  
  
  var tasks = [];
  User.findOne( { 
        name: req.user.name
    }, 
    (err, person) => {
        if (err) {
            console.log("error in getting task");
            res.render("index", { tasks: tasks });
        } else if (!person) {
            console.log("error in getting the person");
            res.render("index", { tasks: tasks });
        } else {
            tasks = person.currentTodos;
            res.render("index", { tasks: tasks });
        }
    } );
    
});

app.get("/tasks", ensureAuthenticated, function (req, res) {
  // var username = req.query.username;
  //testing:
  var username = "pqy";

  //var tasks = [];

  User.findOne(
    {
      name: username,
    },
    (err, person) => {
      if (err) {
        console.log("error in getting task");
        res.render("index", { tasks: tasks });
      } else if (!person) {
        console.log("error in getting the person");
        res.render("index", { tasks: tasks });
      } else {
        tasks = person.currentTodos;
        res.render("index", { tasks: tasks });
      }
    }
  );
});

//middleware to run in post request
var urlencodedParser = bodyParser.urlencoded({ extended: false });

app.post("/dashboard", urlencodedParser, function (req, res) {
    // var username = req.query.username;
    //testing:
    var username = req.user.name;
    var deadline = req.body.deadline;
    var title = req.body.title;
    var description = req.body.desc;
    // var ddl = req.query.deadline;
    var now = new Date();
    var newTask = new Todo({
        title: title,
        desc: description,
        deadline: deadline,
        currDate: now,
    });
    User.findOne( { 
        name: username
    }, 
    (err, person) => {
        if (err) {

            console.log("error in adding task");
        } else if (!person) {
            console.log("no such person, error in getting user info");
        } else {
            person.currentTodos.push(newTask);
            person.save((err, product) => {
                if (err) {
                    res.render("index", { tasks: person.currentTodos });
                    console.log("error in saving task in add");
                } else {
                    console.log("succeeded in adding task and saving");
                };
            });
            res.render("index", { tasks: person.currentTodos });
        }
    } );
  
});

//edit task
app.get("/task", ensureAuthenticated, function (req, res) {
  var username = req.user.name;
  var title = req.query.title;
  var desc = req.query.desc;
  var ddl = req.query.deadline;
  //delete the unedited task
  var tasks = tasks;
  User.findOneAndUpdate(
    {
      name: username,
    },
    {
        $pull: { currentTodos:  {title: title , desc:desc } } 
    },
    (err, person) => {
      if (err) {
        res.redirect("/dashboard");
        console.log("error in  deleting task");
      } else if (!person) {
        res.redirect("/dashboard");
        console.log("no such person, error in getting user info");
      } else {
        console.log("succeeded in display the task");
        res.render("views/task", { title: title, desc: desc, ddl: ddl});
        }
      });
      
});

//get rankings: db + http request & response 
app.get("/rankings", ensureAuthenticated, function (req, res) {

  let rankings = [{name: "loading, prob some error occured", numCompleted: 0 }];

  User.find({}, (err, docs) => {
    if (err) {
        console.log("error occurred during getting ranks by tasks");
        res.render("rankings", { rankings: rankings });
    } else {
        console.log("success, users ranking is:" + docs);
        res.render("rankings", { rankings: docs });
    }}).sort([["numCompleted","desc"]]); 
  
});

//get rankings:(vivian in charge)
app.get("/catrankings", ensureAuthenticated, function (req, res) {

    let catrankings = [{name: "loading, prob some error occured", level: 0 }];
  
    User.find({}, (err, docs) => {
      if (err) {
          console.log("error occurred during getting ranks by cat level");
          res.render("catrankings", { catrankings: catrankings });
      } else {
          console.log("success, users ranking is:" + docs);
          res.render("catrankings", { catrankings: docs });
  
      }}).sort([['pet.level',"desc"]]); 
    
  });

app.get("/remove", ensureAuthenticated, function (req, res) {
  //var title = req.query.title;
  (err, person) => {
    if (err) {
      res.redirect("/dashboard");
      console.log("error in  deleting task");
    } else if (!person) {
      res.redirect("/dashboard");
      console.log("no such person, error in getting user info");
    } else {
      db.collection.remove({ title: "tweet1" });
      res.redirect("/dashboard");
      console.log("succeeded in deleting task and saving, redirects to index");
    }
  };
});

app.post("/delete/:username/:title", function (req, res) {
  var username = req.params.username;
  var title = req.params.title;
  console.log(username);
  console.log(title);
  var newTask = new Todo({
    title: title,
    desc: description,
    deadline: deadline,
    currDate: now,
  });
  User.findOneAndUpdate(
    {
      name: username,
    },
    {
      $and: [
        { $pull: { currentTodos: { title: title } } },
        { $inc: { numCompleted: 1 } },
        { $push: { completedTodos: newTask } },
      ],
    },
    (err, person) => {
      if (err) {
        res.redirect("/dashboard");
        console.log("error in  deleting task");
      } else if (!person) {
        res.redirect("/dashboard");
        console.log("no such person, error in getting user info");
      } else {
        res.redirect("/dashboard");
        console.log(
          "succeeded in deleting task and saving, redirects to index"
        );
      }
    }
  );
});


/**
 *
 * Iteration 2: web -> rank the users by the # of tasks completed
 */

app.use("/getrankbytasks", (req, res) => {
  var username = req.query.username;
  User.find({})
    .sort({ numCompleted: -1 })
    .exec()
    .addBack((err, docs) => {
      if (err) {
        console.log("error occurred during getting ranks by tasks");
      } else {
        res.json(docs);
      }
    });
});

/**
 * 
 * Iteration 2: web -> rank the users by the level of his cat
 */

app.use('/getrankbytasks', (req, res) => {
    var username = req.query.username;
    User.find({}).sort({ numCompleted: -1}).exec().addBack((err, docs) => {
        if (err) {
            console.log("error occurred during getting ranks by tasks");
        } else {
            res.json(docs);
        }
    });
})

const PORT = process.env.PORT || 3000;

app.listen(PORT, console.log(`Server started on port ${PORT}`));

//module.exports = User;
