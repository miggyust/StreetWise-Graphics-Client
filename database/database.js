const express = require("express");
const mysql = require("mysql2");

const PORT = process.env.PORT || 3000;
const app = express();

app.use(express.static('./public'))
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
    const selectdate = req.body.selectdate 
    const selecttime = req.body.selecttime
    const phonenum = req.body.phonenum 
    const mail = req.body.mail
    const platform = req.body.platform 
    const message = req.body.message

    const queryString = "INSERT INTO test (firstname, lastname, selectdate, selecttime, phonenum, mail, platform, message) VALUES(?, ?, ?, ?, ?, ?, ?, ?)"
    con.query(queryString, [firstname,lastname,selectdate,selecttime,phonenum,mail,platform,message],(err, results, fields)=>{
        if (err){
            console.log("Failed to insert" + err)
            res.sendStatus(500)
            return
        }
        res.end("Data Saved Succesfully");
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
