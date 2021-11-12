const url = require('url');
const fs = require('fs');


const express = require('express');
const app = express();

app.use(express.static(__dirname + "../"))
app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));



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

module.exports ={
    handleRequest: function (request, response){
        response.writeHead(200,{'Content-Type': 'text/html'});
        
        const path = url.parse(request.url).pathname;
        switch (path){
            case'/homepage':
                renderHTML('./homepage.html',response);
                break;
            case'/contact':
            renderHTML('./contact.html',response);
        
            break;
        m
            default:
                response.writeHead(404);
                response.write('Route not defined');
                response.end();
        }
        }
}