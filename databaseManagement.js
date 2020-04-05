/**
 * Project: CIS 350 Group Project: 
 * Introduction of this file: This file is where the node express app is. This file creates a connection with the database, 
 * creates the schema used for each class, and specifies the SchemaType and options for each property of each class.
 * It also implements functions to handle http requests sent by the Android and Web end.  
 * Major functions achieved: 
 * 1. Creates, updates and removes documents from the MongoDB Cluster on requests.
 * 2. Returns a ordered list of top 10 users from the data base. 
 *
 *  @author Yiwei (Estee) Chen <estee813@seas.upenn.edu>
 */

 /**
  * Note to users:
  * 1. currently when creating accounts, two users can't have the same password.
  * 
  */

var express = require('express');
var app = express();
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

/**
 * this is the account that Estee created on MongoDB Atlas, before you want to use it you should tell me and I will
 * white list your ip address. For now , just use my user name and password
 * username: estee
 * password: PSAMarketing
 */

var cloudUrl = 'mongodb+srv://estee:PSAMarketing@cis350group33cluster-8lbyv.mongodb.net/test?retryWrites=true&w=majority';
var localUrl = 'mongodb://localhost:27017';

mongoose.connect(localUrl, 
{ useNewUrlParser: true }).
  catch(error => handleError(error));

var handleError = (err) => {
    console.log("error occured trying to connect to Mongo"  + err);
};

mongoose.connection.on('error', err => {
    console.log("error during connection" + err);
  });


//building Schemas

var todoSchema = new Schema({
    title: {type: String, required: true},
    desc: {type: String, required: true},
    completed: {type: Boolean, default: false},
    deadline: {type: String, default: ""},
    creationDate: {type: Date, default: null},
});

var foodSchema = new Schema({
    name: {type: String, required: true},
    cost: {type: Number, required: true, min: 0},
    function: {type: String, required: true},
    boosts: {type: Number, min: 0, required: true},
});


var userSchema = new Schema(
    {
        name: {type: String, required: true, unique: true},
        
        password: {type: String, 
            required: true,
            validator: [(val) => { return ("/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/".test(val)); }, 
                         "password must be between 6 to 20 characters which contain at least one numeric digit, one uppercase and one lowercase letter"],
            unique: false,
        },
        // profilePictureUrl: String, (might implement in the future if got time)
        email: {
            type: String, 
            required: true, 
            unique: true, 
            validate: [(val) => { return (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(val)); }, 
                        "invalid email"],
        },
        money: {type: Number, min: 0, default: 0},
        currentTodos: {type: [todoSchema], default: []},
        missedTodos: {type: [todoSchema], default: []},
        completedTodos: {type: [todoSchema], default: []},
        todosCompleted: {type: Number, min: 0, default: 0},
        //create a pet schema in-place
        pet: new Schema({
            name: {type: String, default: "Meow"},
            level: {type: Number, min: 0, default: 0},
            health: {type: Number, default: 10},
            appearance: {type: String, default: ""},
        }),
        myFoods: {type: [foodSchema], default: []},
    }
);

/**
 * create some data for testing purpose
 * 
 */

 var Todo = mongoose.model('Todo', todoSchema);
 var Food = mongoose.model('Food', foodSchema);
 var User = mongoose.model('User', userSchema);

 //test todo data
 var testtodolist = [{
    desc: "by tomorrow",
    title: "hw1",
    creationDate: new Date()
}, 
{
    desc: "by monday",
    title: "hw2",
    creationDate: new Date()
}, 
{
    desc: "by 4.9",
    title: "hw3",
    creationDate: new Date()
},{
    desc: "by 4.13",
    title: "hw4",
    creationDate: new Date()
},{
    desc: "by 5.1",
    title: "hw5",
    creationDate: new Date()
}, 
{
    desc: "by 4.31",
    title: "hw6",
    creationDate: new Date()
},{
    desc: "by 5.2",
    title: "hw7",
    creationDate: new Date()
}]

/**
 * add some users
 */

var newperson1 = new User({
    name: "ipadair",   
    password: "1239248Aa",
    email: "a@gmail.com",
});
/**
 * add one to-do to user1
 */

testtodolist.map((element, i) => {newperson1.currentTodos.push(element)});
newperson1.save((err, doc) => {
    if (err) {
        console.log("error in test");
    } else {
        res.json({'status': 'success'}, {'User': product})
    };
});

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

var newperson3 = new User({
    name: "macbook",   
    password: "87654321Ui",
    email: "c@gmail.com",
});
var newperson4 = new User({
    name: "applewatch",   
    password: "87654321diff",
    email: "d@gmail.com",
});

newperson2.save();
newperson3.save();
newperson4.save();

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


 //iteration 1: Login, create account, authentication -> Android

app.use('/login', (req, res) => {
    var username = req.query.username;
    var pw = req.query.password;
    var email = req.query.email;
    User.findOne( { name: username }, (err, person) => {
        if (err) {
            res.json( { 
                'status' : 'error',
                'message': 'dbError'
            } );
        } else if (!person) {
            res.json( { 
                'status' : 'error',
                'message': 'username'
            } );
        } else {
            if (person.password === pw) {
                res.json( { 
                    'status' : 'success',
                    'message': ''
                } );         
            } else {
                res.json( { 
                    'status' : 'error',
                    'message': 'password'
                } );     
            }
        }
    });
});

 app.use('/signup', (req, res) => {
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
            res.json({'status': 'error'});
            console.log(err);
        } else {
            res.json([{'status': 'success'}, product]);

        };
    });

 });

app.use('/changepassword', (req, res) => {
    var username = req.query.username;
    var oldpw = req.query.oldpassword;
    var newpw = req.query.newpassword;

    User.findOneAndUpdate( { 
        name: username, 
        password: oldpw,
    }, 
    {$set: {password: newpw}}, 
    (err, person) => {
        if (err) {
            res.json( { 
                'status' : 'error',
                'message': 'dbError'
            } );
        } else if (!person) {
            res.json( { 
                'status' : 'error',
                'message': 'username/password'
            } );
        } else {
            res.json( { 
                'status' : 'success',
                'message': ''
            } );     
        }
    } );
 });


 /**
  *  Iteration 1: Add task, edit task, delete task -> Android 
  * */ 

app.use('/gettask', (req, res) => {
    var username = req.query.username;

    User.findOne( { 
        name: username
    }, 
    (err, person) => {
        if (err) {
            res.json( [{ 
                'status' : 'error',
                'message': 'dbError'
            }] );
            console.log("error in getting task");
        } else if (!person) {
            res.json( [{ 
                'status' : 'error',
                'message': 'no such person'
            }]);

        } else {
            res.json(person.currentTodos);
        }
    } );
});

app.use('/addtask', (req, res) => {
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
    User.findOne( { 
        name: username
    }, 
    (err, person) => {
        if (err) {
            res.json( { 
                'status' : 'error',
                'message': 'dbError'
            } );
            console.log("error in adding task");
        } else if (!person) {
            res.json( { 
                'status' : 'error',
                'message': 'no such person'
            });

        } else {
            person.currentTodos.push(newTask);
            person.save((err, product) => {
                if (err) {
                    res.json({'status': 'error in saving person'});
                    console.log("error in saving task in add");
                } else {
                    res.json({'status': 'success'});
                };
            });
        }
    } );

});

// app.use('/edittask', (req, res) => {
//     var title = req.query.title;
//     var desc = req.query.desc;

//     Todo.findOneAndUpdate( { 
//         title: title
//     }, 
//     {$set: {password: newpw}}, 
//     (err, person) => {
//         if (err) {
//             res.json( { 
//                 'status' : 'error',
//                 'message': 'dbError'
//             } );
//         } else if (!person) {
//             res.json( { 
//                 'status' : 'error',
//                 'message': 'username/password'
//             } );
//         } else {
//             res.json( { 
//                 'status' : 'success',
//                 'message': ''
//             } );     
//         }
//     } );
// });


app.use('/deletetask', (req, res) => {
    var username = req.query.username;
    var title = req.query.title;
    User.findOneAndUpdate( { 
        name: username
    }, 
    {$pull: {currentTodos: {title: title}}},
    (err, person) => {
        if (err) {
            res.json( { 
                'status': 'error',
                'message': 'dbError'
            } );
            console.log("error in adding task");
        } else if (!person) {
            res.json( { 
                'status': 'error',
                'message': 'no such person'
            } );

        } else {
            res.json({'status': 'success'});
        }
    } );
});
 

// This is the '/test' endpoint that you can use to check that this works
// Do not change this, as you will want to use it to check the test code in Part 2

// This just sends back a message for any URL path not covered above
app.use('/', (req, res) => {
    res.json(alldata);
});

// This starts the web server on port 3000. 
app.listen(3000, () => {
    console.log('Listening on port 3000');
});

