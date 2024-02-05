var express = require('express');
var router = express.Router();
const userModel = require("./users");

/* GET home page. */
// router.get("/", function(req, res){
//   res.render("index");
// })

router.get('/create', async function(req, res) { //wherever await is used it is necessary to add "async" to its parent function
  const userCreated = await userModel.create({ //awaits helps in execution of data in a synchronus manner
    name: "Pratham",
    username: "Pratham",
    age: 22,
  });
  res.send("userCreated"); 
});

router.get('/allusers', async function(req, res){
  let allusers = await userModel.find(); //used to find the user
  res.send(allusers);
});

router.get('/allusers', async function(req, res){
  let allusers = await userModel.findOne({username:"pratham"}); //used to find a specific user
  res.send(allusers);
});

router.get('/delete', async function(req, res){
  let deleteduser = await userModel.findOneAndDelete({ //used to delete the user reuqired
    username:"pratham"});
  res.send(deleteduser);
});

// router.get("/", function(req, res){
//   req.session.banned = true; // the word banned can be anything, just a random word
//   res.render("index");
// })

router.get("/checkban", function(req, res){
  if(req.session.banned === true){
    res.send("You are banned");
  }
})

router.get("/removeban", function(req, res){
  req.session.destroy((err)=>{
    console.log(err);
    res.send("ban removed")
  })
});

router.get("/", function(req, res){
    res.cookie("age", 25);
    res.render("index");
  });

router.get("/read", function(req, res){
    console.log(req.cookies.age)
    res.send("Check");
  });

router.get("/delete", function(req, res){
    res.clearCookie("age");
    res.send("IT has been cleared");
  });

module.exports = router;