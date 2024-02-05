const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/prathamdatabase"); //prathamdatabse is the name of database created

const userschema = mongoose.Schema({ //this is the data document
  name: String,
  username: String,
  age:Number,
})

module.exports = mongoose.model("user", userschema); //user will be the collections inside that databse and inside that will be data document. 
//And userschema will be the schema created
