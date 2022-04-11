const express = require("express");
const app=express();
var flash = require('connect-flash');
var bodyParser = require('body-parser');
const cookieParser=require('cookie-parser'); 
//app.use(cookieParser());
//app.set('view engine', 'ejs');
//app.set('views','./views');
//aruns hamr amis best
const User = require('./conn');
const mongoose=require('mongoose');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json())
const cors = require('cors')


app.use(cors())

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept,Authorization"
    );
    res.header('Access-Control-Allow-Methods', 'GET,PUT,PATCH,POST,DELETE,OPTIONS');
    next();
  });
 var session = require('express-session')


//const passport =require('passport');
//const LocalStrategy=require("passport-local");

var msg="";

app.get("/",async function(req,res){
    try{
    var data= await User.find();
res.send({"blogs":data});

    }
    catch(err){
res.send(err);
    }
})

app.get("/add",function(req,res){
    res.send('add');
    })
    



app.post("/add", async function(req,res){
   

    try{
console.log("called");
var quote=req.body.quote;
var username=req.body.username;

const blog=new User({
 quote:quote,
 username:username
}
);

await blog.save();

console.log("Data saved");
var data=await User.find();

console.log(data);

res.json({"status":true});



    }
    catch(err){
        res.send(err);
    }

    })
    



    app.get("/delete/:id", async function(req,res){
   

        try{
    
    var id=req.params.id;
    
    var data=await User.findByIdAndDelete(id);
    
    data.save();

    data=await User.find();
    
console.log("Deleted")
    
res.json({"status":true});

    
    
    
    
    
    
    
    
        }
        catch(err){
            res.send(err);
        }
    
        })




    
app.post("/edit_task/:id", async function(req,res){
   

    try{

var id=req.params.id;


var quote=req.body.quote;
var username=req.body.username;
  User.findByIdAndUpdate(id, { 
     quote:quote ,
    username:username }, function (err, docs) {
    if (err){
        console.log(err);
    //   res.json({"status":false});

    }
    else{
        console.log("Updated task : ", docs);
        
res.json({"status":true});
    }
});


    }
    catch(err){
        res.send(err);
    }

    })

    
app.get("/edit/:id", async function(req,res){
   

    try{

var id=req.params.id;

var data=await User.findById(id);


res.send({"username":data.username,"quote":data.quote});









    }
    catch(err){
        res.send(err);
    }

    })
    


        /*
app.post("/edit/:id", async function(req,res){
   

    try{

var id=req.params.id;
var title=req.body.title;
var description=req.body.description;
var author=req.body.author;

const blog=await User.findByIdAndUpdate(id,{
    title:title,
    description:description,
    author:author
}
);

await blog.save();

console.log("Data saved");
var data=await User.find();

console.log(data);

res.redirect("/");








    }
    catch(err){
        res.send(err);
    }

    })
    
*/

app.listen(process.env.PORT || 3000,()=>{
    console.log("sever running on port");
});
