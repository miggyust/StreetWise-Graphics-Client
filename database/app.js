const express = require("express");

const PORT = process.env.PORT || 3000;
const app = express();

const router = require("./routes/customer.js")

app.use(express.static('../'))
app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));

app.use(router)

app.listen(PORT, () =>{
    console.log("Listening to port " + PORT);
});
