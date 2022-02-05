//import
const express = require("express")
const mysql = require("mysql2")
const router = express.Router()
const nodemailer = require("nodemailer");

/*
//create a database connection (deployed)
const pool = mysql.createPool({
    connectionLimit: 10,
    host: "us-cdbr-east-04.cleardb.com",
    user: "ba4ebefdbbaee2",
    password: "9d45ece4",
    database: "heroku_670d6f6d8482b89",
});
*/
const pool = mysql.createPool({
    connectionLimit: 10,
	host     : 'localhost',
	user     : 'root',
	database : 'streetwisegraphics'
});

//get connection from pool
pool.getConnection(function(err, connection) {
    console.log("connected");
    connection.release();
  });

//create table for users log in
router.get("/create-usertable",(req,res) => {
    let sql = "CREATE TABLE user (user_ID int AUTO_INCREMENT, user_Email varchar(50), user_Password varchar(50), first_Name varchar(50), last_Name varchar(50), PRIMARY KEY(user_ID))"
    pool.query(sql, (err, result) => {
        if(!err){
            res.send("successfully created user table");
        }else{
            res.send("failed to create appointments table");
        }
    })
});

//Inserting user information into database
router.post("/create-user", (req,res) => {
    const user_Email = req.body.user_Email
    const user_Password = req.body.user_Password
    const first_Name = req.body.First_Name
    const last_Name =req.body.Last_Name


    const queryString = "INSERT INTO user (user_Email, user_Password, First_Name, Last_Name) VALUES (?,?,?,?)"

    pool.query(queryString, [user_Email, user_Password, first_Name, last_Name],(err, results, fields)=>{
        if (err){
            console.log("Failed to insert")
        }
        res.res("Successfuly Registered");
    })
})

//login user
router.post('/login', function(request, response) {
	let email = request.body.email;
	let password = request.body.password;
	
	if (email && password) {
		
		pool.query('SELECT * FROM user WHERE user_Email = ? AND user_Password = ?', [email, password], function(error, results, fields) {
			
			if (error){
                console.log("User not found")};
			
			if (results.length > 0) {
				
				request.session.loggedin = true;
				request.session.email = email;
				
				response.redirect('/homepage.html');
			} else {
				response.send('Incorrect Email and/or Password!');
			}			
			response.end();
		});
	} else {
		response.send('Please enter Email and Password!');
		response.end();
	}
});
//post method when submitting a form
router.post("/create", (req,res) => {
    const firstname =  req.body.firstname //name from the html
    const lastname = req.body.lastname  
    const date = req.body.selectdate 
    const time = req.body.selecttime
    const phonenum = req.body.phonenum 
    const mail = req.body.mail
    const platform = req.body.platform 
    const message = req.body.message

//output html for Email
    const output = `
    <p><b>First Name: </b> ${firstname}</p>
    <p><b>Last Name: </b> ${lastname}</p>
    <p><b>Date: </b> ${date} </p>
    <p><b>Time: </b> ${time} </p>
    <p><b>Phone Number: </b> ${phonenum} </p>
    <p><b>Platform: </b> ${platform} </p>
    <p><b>Message: </b> ${message}</p>
    
    <p><b>Please wait for the response in the form of email or text messages from Jericho Robles, owner of Streetwise Graphics</b></p>
    <p><b>for the confirmation of the appointment as he might have other schedules or not available.</b></p>
    <p><b>Thank you for your patience and have a good day</b></p>
    <p><b>This is an auto generated email please do not reply.</b></p>`
//Transporter for Emails
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
        //(optional or put owner's email) cc: "jerichorobles@gmail.com",
        subject: "Confirmation of Appointment Details from Streetwise Graphics",
        text: "Appointment Details",
        html:output
    } 

    transporter.sendMail(mailOptions, function(err, success){
        if (err){
            console.log(err)
        }else
            console.log("email sent succesfully")
        
    })

//Inserting Data
    const queryString = "INSERT INTO appointment (Date,Time,Platform,Message,First_Name, Last_Name, Phone_Number, Customer_Email) VALUES (?,?,?,?,?,?,?,?)"

    pool.query(queryString, [date,time,platform,message,firstname,lastname,phonenum,mail],(err, results, fields)=>{
        if (err){
            console.log("Failed to insert")
        }
        res.send("Message sent successfully");
    })
})
//local testing
router.get("/create-SGdb", (req, res) =>{
    let sql = "CREATE DATABASE streetwisegraphics";
    pool.query(sql, (err, result) => {
        if(!err){
            res.send("successfully created SG database");
        }else{
            res.send("failed to created SG database");
        }
    })
})

router.get("/create-appointment",(req,res) => {
    let sql = "CREATE TABLE appointment (Appointment_ID int AUTO_INCREMENT, Date date, Time time, Platform varchar(50), Message varchar(50), First_Name varchar(50), Last_Name varchar(50), Phone_Number varchar(50), Customer_Email varchar(50), PRIMARY KEY(Appointment_ID))"
    pool.query(sql, (err, result) => {
        if(!err){
            res.send("successfully created appointment table");
        }else{
            res.send("failed to create appointments table");
        }
    })
});


module.exports = router;