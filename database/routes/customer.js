const express = require("express")
const mysql = require("mysql2")
const router = express.Router()

const con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "streetwisegraphics"
});

router.post("/create", (req,res) => {
    const firstname =  req.body.firstname //name from the html
    const lastname = req.body.lastname  
    const date = req.body.selectdate 
    const time = req.body.selecttime
    const phonenum = req.body.phonenum 
    const mail = req.body.mail
    const platform = req.body.platform 
    const message = req.body.message

    
    const queryString1 = "INSERT INTO customers (First_Name, Last_Name, Phone_Number, Customer_Email) VALUES (?,?,?,?)"
    const queryString2 = "INSERT INTO appointment (Date,Time,Platform,Message,Customer_ID) VALUES (?,?,?,?,?)"
    
    con.query(queryString1, [firstname,lastname,phonenum,mail],(err, results, fields)=>{
        if (err){
            console.log("Failed to insert" + err)
        }
        console.log("User added");
    })

    con.query(queryString2, [date,time,platform,message,null],(err, results, fields)=>{
        if (err){
            console.log("Failed to insert" + err)
        }
        res.end("Message Sent Succesfully");
    })

    con.end();
})

router.get("/create-SGdb", (req, res) =>{
    let sql = "CREATE DATABASE streetwisegraphics";
    con.query(sql, (err, result) => {
        if(!err){
            res.send("successfully created SG database");
        }else{
            res.send("failed to created SG database");
        }
    })
})

module.exports = router;