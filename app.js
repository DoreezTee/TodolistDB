const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const  render  = require("ejs");
const app = express();




const login ="";

// let posts = [];



app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({extended: true}));

app.use(express.static("public"));




mongoose.connect("mongodb+srv://doreez:doreez1996@cluster0.ytxezc9.mongodb.net/TodolistDB", { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log("CONNECTED TO MONGO!");
    })
    .catch((err) => {
        console.log("OH NO! MONGO CONNECTION ERROR!");
        console.log(err);
    })

    const tasksSchema = {
        name : String 
    };
    const Task = mongoose.model(
        "Task", tasksSchema
    );

    const task1 = new Task ({
      name : "Hit the + button to add a new Task."
    });
    
    const task2 = new Task ({
        name : "Click on the checkbox to crossout a Task."
      });
      
    const task3 = new Task ({
         name : "Click on the trashcan to delete a Task."
      });

      const defaultItem = [task1, task2, task3];






app.get("/list", function(req, res){

  let today = new Date();

 let day = today.toDateString();

 Task.find({}, function(err, foundTasks){
   
    if(foundTasks.length === 0){
     
      Task.insertMany (defaultItem, function(err){
        if(err){
            console.log(err);
        }else{
            console.log("Default items added successfully");
        }
      });
      res.render("/list");

    } else{
        res.render("list", {dayOfWeek: day, addNewTask: foundTasks});
    }
   
});
 });

 //login page
 

app.get("/", function(req, res){
    
  let today = new Date();

  let day = today.toDateString();

    res.render("login", {TODOLIST: day, login: login});
   
});

 
  

app.post("/", function(req, res){

    const taskName = req.body.newTask

    const task = new Task ({
        name : taskName
    });

     task.save();
     res.redirect("/list")
});


app.post("/delete", function(req, res){

   const checkedTaskId =  req.body.taskId
   
Task.findByIdAndDelete(checkedTaskId, function(err){
    if(err){
        console.log("Error deleting task:", err);
    } else{
        console.log("Task deletely successfully");
        res.redirect("/list");
    };
});

});


app.listen(3000, function(){
    console.log("Server is running in port 3000");
})

