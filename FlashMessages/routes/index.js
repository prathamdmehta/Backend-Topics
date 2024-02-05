var express = require('express');
var router = express.Router();

const userModel = require("./users");

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index');
});

router.get('/failed', function(req, res) {
  req.flash("age",  18); // set the age flash message to be displayed on the login form 
  res.send("done!");
});
router.get('/check', function(req, res) {
  console.log(req.flash("age"));
  res.send("chck in terminal");
});

router.get('/create', async function(req, res) {
  let userdata = await userModel.create({
    username: "pratham",
    nickname: "async",
    description: "practicesession",
    categories:['js',  'node'],
  });
  res.send(userdata);
});

//*Intermediate Mongoose*
/*-----------------------------------------*/

//How can i performe case sensitive search in Mongoose?
router.get('/find', async function(req, res){
  // var regex = new RegExp("^Pratham$", 'i'); ^  denotes start of string and $ denotes end of string i denotes case insensitive search
  var regex = new RegExp("Pratham", 'i'); // case insensitive search for Pratham
  var users = await userModel.find({username :regex}) ;// find all users with a username containing "Pratham"
  res.send(user);
})

//How can i find documents with an array field contains all of a set of values?
router.get('/findarray', async function(req, res){
  let user = await userModel.find({categories: {$all: ["fashion"]}}); 
  res.send(user);
});

//How can i search for the documents with a specific date range in Mongoose?
router.get('/finddaterange', async function(req, res){
  var date1 = new Date('2024-01-06');
  var date2 = new Date('2024-02-06');
  let user = await userModel.find({datecreated: {$greaterthanequalto: date1, $lessthanequalto: date2}});
  res.send(user);
});

//How can i Filter documents based on the existance of a field in Mongooose?
router.get('/filterexistance', async function(req, res){
  let user = await userModel.find({categories: {$exists: true}}); 
  res.send(user);
});
  
//How can i filter documents based on a specific fields length in Mongoose?
router.get('/filterfields', async function(req, res){
  let user = await userModel.find({
    $expr: {
      $and: [
        {$gte: [{$strLenCP: '$nickname'}, 0]}, //stringLengthCompare($strLenCP)
        {$lte: [{$strLenCP: '$nickname'}, 12]},
      ]
    }
  }); 
  res.send(user);
});

module.exports = router;