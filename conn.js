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

mongoose.connect("mongodb+srv://mongodb:Arun1117@cluster0.spwl1.mongodb.net/mongodbtodolist?retryWrites=true&w=majority",{useNewUrlParser:true , useUnifiedTopology:true})
.then(function(){
    console.log(" this is running successfully");
})
.catch(function(error){
    console.log(error);

});

const user = new mongoose.Schema({
    username:{
    type:String,unique:true
},
quote:{
    type:String}
,

})




const User = mongoose.model('Quotes', user);






module.exports=User;



