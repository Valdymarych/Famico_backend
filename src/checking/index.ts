import Result from "../models/Result";
import User from "../models/User";
import Task from "../models/Task";
import * as fs from 'fs';
import mongoose from "mongoose"

const db_url=process.env.DB_URL || "mongodb+srv://famicoofficial24:famicoofficial24@famico.6sq5hwz.mongodb.net/data?retryWrites=true&w=majority&appName=Famico"




let extractResults = async () => {
    let results = await Result.find({},{_id:0,__v:0,data:{_id:0}})
    let users = await User.find({},{_id:1,firstname:1, lastname:1, started:1, category:1})
    let tasks = await Task.find({},{answer:1,_id:1,group:1,mark:1})
    

    let summary = {
        results: results,
        users: users,
        tasks: tasks
    }

    console.log(JSON.stringify(summary).length);
    let path="C:\\Users\\vovao\\OneDrive\\Documents\\Lyceum\\FAMiCO\\contest_lucky_shapes\\website\\backend\\src\\checking\\summary.txt"
    try {
        fs.writeFile(path, JSON.stringify(summary), (err)=>{
            if (err) {
                console.log(err);
            } else {
                console.log("fine");
                
            }
        })
    } catch (err) {
        console.log(err);
        
    }
    
}

const db = mongoose
 .connect(db_url)
 .then(()=>console.log("mongo db OK"))
 .then(()=>extractResults())
 .catch((err)=>console.log("mongo db  FATAL ERROR !!!!!           !!!!!!!             !!!!!!!!"+err))

 let x = `
 
 let i=0;
 type taskMapping = {
     [id: string]: number,
 }
 type result = {
     taskId: number,
     answer: string,
 }
 type data = {
     data: result[],
     userId: mongoose.Types.ObjectId
 }
 type user = {
     _id: mongoose.Types.ObjectId,
     firstname: string,
     lastname: string,
     email: string,
 }
 type task = {
     _id: number,
     answer: string,
 }
 type summary = {
     results: data[],
     users: user[],
     tasks: task[]
 }

 let taskMapping : taskMapping = {

 }
 tasks.forEach(task => {
     taskMapping[task._id.toString()]=i;
     i+=1;
 });


 let users2:user[] = users.map((user)=>({
     _id:user._id,
     firstname: user.firstname,
     lastname: user.lastname,
     email:user.email
 }))

 let tasks2:task[] = tasks.map((task)=>({
     _id:taskMapping[task._id.toString()],
     answer:task.answer
 }))

 let results2:data[] = results.map((result)=>{
     let data2: result[] = result.data.map((answer)=>(
         {
         taskId: taskMapping[answer.taskId.toString()],
         answer: answer.answer
     }))
     let data3: data = {
         data:data2,
         userId: result.userId
     }
     return data3
 })


 `