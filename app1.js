const express = require("express");

const PORT = process.env.PORT || 3000;
const app = express();

const router = require("./database/routes/customer.js")
/*
app.use(express.static('./'))
app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));
*/
app.use(router)


app.get("/",(req,res)=>{
  res.send("Streetwise Graphics");
});
app.listen(PORT, () =>{
    console.log("Listening to port " + PORT);
});
