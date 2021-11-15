const url = require('url');
const fs = require('fs');


const express = require('express');
const app = express();

app.use(express.static(__dirname));
app.get("/contact", function(req,res){
    res.sendFile(__dirname + "/contact.html");
})

function renderHTML(path,response){

    fs.readFile(path,null,function(error,data){
if (error){
    response.writeHead(404);
    response.write('file not found!');
}else{
    response.write(data);
}
response.end();
    });
}

app.listen(3000,(err)=>{
    if(!err){
        console.log("application connected to port 3000...");
    }else{
        console.log("failed to connect to port 3000");
    }
})

