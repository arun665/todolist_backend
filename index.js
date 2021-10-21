const express = require("express");
const app=express();
var flash = require('connect-flash');
var bodyParser = require('body-parser');
const cookieParser=require('cookie-parser'); 
app.use(cookieParser());
app.set('view engine', 'ejs');
app.set('views','./views');
const User = require('./conn');
const mongoose=require('mongoose');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

 var session = require('express-session')


const passport =require('passport');
const LocalStrategy=require("passport-local");

var msg="";

app.get("/",async function(req,res){
    try{
    var data= await User.find();
res.render('home',{"msg":"" , "blogs":data});

    }
    catch(err){
res.send(err);
    }
})

app.get("/add",function(req,res){
    res.render('add');
    })
    



app.post("/add", async function(req,res){
   

    try{
var title=req.body.title;
var description=req.body.description;
var author=req.body.author;

const blog=new User({
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
    



    app.get("/delete/:id", async function(req,res){
   

        try{
    
    var id=req.params.id;
    
    var data=await User.findByIdAndDelete(id);
    
    data.save();

    data=await User.find();
    
console.log("Deleted")
    
res.redirect("/");

    
    
    
    
    
    
    
    
        }
        catch(err){
            res.send(err);
        }
    
        })






    
app.get("/edit/:id", async function(req,res){
   

    try{

var id=req.params.id;

var data=await User.findById(id);


res.render("edit",{"title":data.title,"description":data.description,"author":data.author,"id":id});









    }
    catch(err){
        res.send(err);
    }

    })
    


        
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
    


app.listen(3000,()=>{
    console.log("sever running on port");
});
