/* const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const passportLocalMongoose = require('passport-local-mongoose');




const User_Schema = new Schema({

email:{

    required:true,
    type:String,
    unique:true,
    trim:true
}


});

User_Schema.plugin(passportLocalMongoose);
const User = mongoose.model('User',User_Schema);

module.exports = User; 

*/


const mongoose = require('mongoose');


mongoose.connect("mongodb://127.0.0.1:27017/st3_blogsite")
.then(function(){
    console.log(" this is running successfully");
})
.catch(function(error){
    console.log(error);

});

const user = new mongoose.Schema({
    title:{
    type:String
},
description:{
    type:String}
,
author:{
    type:String
}
})




const User = mongoose.model('Blogs', user);






module.exports=User;



