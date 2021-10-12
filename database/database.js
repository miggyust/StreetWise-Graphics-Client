const express = require("express");
const mysql = require("mysql2");

const PORT = process.env.PORT || 3000;
const app = express();

const con = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "password",
    database: "streetwisegraphics"
});


app.get("/create-SGdb", (req, res) =>{
    let sql = "CREATE DATABASE streetwisegraphics";
    con.query(sql, (err, result) => {
        if(!err){
            res.send("successfully created SG database");
        }else{
            res.send("failed to create SG database")
        }
    })
})

con.connect((err) => {
    if (!err){
       console.log("connected"); 
    }
});

app.listen(PORT, () =>{
    console.log("Listening to port " + PORT);
});