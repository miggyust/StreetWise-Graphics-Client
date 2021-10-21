const express = require("express");
const mysql = require("mysql2");

const PORT = process.env.PORT || 3000;
const app = express();

app.use(express.static('../'))
app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));

const con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "streetwisegraphics"
});


con.connect((err) => {
    if (!err){
       
       console.log("connected"); 
    }else{
        console.log("failed to connect");
    }
});

app.post("/create", (req,res) => {
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

app.get("/create-SGdb", (req, res) =>{
    let sql = "CREATE DATABASE streetwisegraphics";
    con.query(sql, (err, result) => {
        if(!err){
            res.send("successfully created SG database");
        }else{
            res.send("failed to created SG database");
        }
    })
})


app.listen(PORT, () =>{
    console.log("Listening to port " + PORT);
});
