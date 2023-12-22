const express=require('express');
const mysql=require('mysql2');
const bodyParser=require('body-parser');
const app=express();
const port=3000;
app.use(bodyParser.json());
const db=mysql.createConnection({
host:'localhost',
user:'root',
password:'root',
database:'new_db',
port:3306
});
db.connect((err)=>{
if(err){
console.error("error showing into db"+err.stack);
}
else{
console.log("db sucess"+db.threadId);
}
});
// add data for students table
app.post("/addStudents",(req,res)=>{
const {name,total_marks,school_name,std}=req.body;
db.query("insert into students (name,total_marks,school_name,std) values(?,?,?,?)",[name,total_marks,school_name,std],(error,results,fields)=>{
if(error){
console.error("error showing insert data",error.stack);
res.status(500).send("error statement");
}
else{
res.status(200).send("send successfully");
}
});
});
//Get all Students Data
app.get("/getStudents",(req,res)=>{
    db.query("select * from students",(error,results,fields)=>{
    if(error){
    console.error("error",error.stack);
    res.status(500).send("error statement");
    }
    else{
    res.status(200).send(results);
    }
    });
    });
    // Update Student by ID
app.put("/updateStudents/:id", (req, res) => {
    const id = req.params.id;
    const { name,total_marks,school_name,std } = req.body;
    db.query("UPDATE students SET name = ?, total_marks = ?, school_name = ? , std= ? WHERE id = ?", [name,total_marks,school_name,std, id], (error, results, fields) => {
    if (error) {
    console.error("Error updating data: " + error.stack);
    res.status(500).send("Error updating data");
    } else {
    res.status(200).send("Data updated successfully");
    }
    });
    });
    // Delete Student by ID
app.delete("/deleteStudents/:id", (req, res) => {
    const id = req.params.id;
    db.query("DELETE FROM students WHERE id = ?", [id], (error, results, fields) => {
    if (error) {
    console.error("Error deleting data: " + error.stack);
    res.status(500).send("Error deleting data");
    } else {
    res.status(200).send("Data deleted successfully");
    }
    });
    });

    app.get("/getStu",(req,res)=>{
        db.query("select * from students where total_marks=(select min(total_marks) from students)",(error,results,fields)=>{
        if(error){
        console.error("error",error.stack);
        res.status(500).send("error statement");
        }
        else{
        res.status(200).send(results);
        }
        });
        });


app.listen(port,()=>{
    console.log(`app connected ${port}`);
    });