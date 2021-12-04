const express = require("express")
const mysql = require("mysql2")
const router = express.Router()
const nodemailer = require("nodemailer");

const con = mysql.createConnection({
    host: "us-cdbr-east-04.cleardb.com",
    user: "ba4ebefdbbaee2",
    password: "9d45ece4",
    database: "heroku_670d6f6d8482b89",
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

    const output = `
    <p><b>First Name: </b> ${firstname}</p>
    <p><b>Last Name: </b> ${lastname}</p>
    <p><b>Date: </b> ${date} </p>
    <p><b>Time: </b> ${time} </p>
    <p><b>Phone Number: </b> ${phonenum} </p>
    <p><b>Platform: </b> ${platform} </p>
    <p><b>Message: </b> ${message}</p>`

    let transporter = nodemailer.createTransport({
        service: "gmail",
        auth:{
            user:"streetwisegraphicsofficial@gmail.com", 
            pass:"streetwisegraphics"
        },
        tls: {
            rejectUnauthorized: false
        }
    })

    let mailOptions = {
        from:"streetwisegraphicsofficial@gmail.com", 
        to: mail,
        //secondary(optional or put owner's email) cc: "alversadel@gmail.com",
        subject: "Appointment Details from Streetwise Graphics",
        text: "Appointment Details",
        html:output
    } 

    transporter.sendMail(mailOptions, function(err, success){
        if (err){
            console.log(err)
        }else
            console.log("email sent succesfuly")
        
    })
    
    const queryString = "INSERT INTO appointment (Date,Time,Platform,Message,First_Name, Last_Name, Phone_Number, Customer_Email) VALUES (?,?,?,?,?,?,?,?)"

    con.query(queryString, [date,time,platform,message,firstname,lastname,phonenum,mail],(err, results, fields)=>{
        if (err){
            console.log("Failed to insert" + err)
        }
        res.send("Message Sent Succesfully");
    })
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

router.get("/create-appointment",(req,res) => {
    let sql = "CREATE TABLE appointment (Appointment_ID int AUTO_INCREMENT, Date date, Time time, Platform varchar(50), Message varchar(50), First_Name varchar(50), Last_Name varchar(50), Phone_Number varchar(50), Customer_Email varchar(50), PRIMARY KEY(Appointment_ID))"
    con.query(sql, (err, result) => {
        if(!err){
            res.send("successfully created appointment table");
        }else{
            res.send("failed to appointment table");
        }
    })
});

module.exports = router;