
const mongoose = require('mongoose');
var Schema = mongoose.Schema;

var todoSchema = new Schema({
  title: { type: String, required: true },
  desc: { type: String, default: "" },
  completed: { type: Boolean, default: false },
  deadline: { type: Date, default: null },
  creationDate: { type: Date, default: null },
});

var foodSchema = new Schema({
  name: { type: String, required: true },
  cost: { type: Number, required: true, min: 0 },
  function: { type: String, required: true },
  boosts: { type: Number, min: 0, required: true },
});

var userSchema = new Schema({
  name: { type: String, required: true, unique: true },

  password: {
    type: String,
    required: true,
    validator: [
      (val) => {
        return "/^(?=.*d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/".test(val);
      },
      "password must be between 6 to 20 characters which contain at least one numeric digit, one uppercase and one lowercase letter",
    ],
    unique: false,
  },
  // profilePictureUrl: String, (might implement in the future if got time)
  email: {
    type: String,
    required: true,
    unique: true,
    validate: [
      (val) => {
        return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(val);
      },
      "invalid email",
    ],
  },
  money: { type: Number, min: 0, default: 0 },
  currentTodos: { type: [todoSchema], default: [] },
  missedTodos: { type: [todoSchema], default: [] },
  completedTodos: { type: [todoSchema], default: [] },
  numCompleted: { type: Number, min: 0, default: 0 },
  //create a pet schema in-place
  pet: new Schema({
    name: { type: String, default: "Meow" },
    level: { type: Number, min: 0, default: 0 },
    health: { type: Number, default: 10 },
    appearance: { type: String, default: "" },
  }),
  petLevel: { type: Number, min: 0, default: 0 },
  myFoods: { type: [foodSchema], default: [] },
});

var Todo = mongoose.model('Todo', todoSchema);
var Food = mongoose.model('Food', foodSchema);
var User = mongoose.model('User', userSchema);

exports.getTodo = function() {
  return Todo;
}

exports.getUser = function() {
  return User;
}

exports.getFood = function() {
  return Food;
}



