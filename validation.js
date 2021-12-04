/* DATE VALIDATION SCRIPT 
    TO VALIDATE PRESENT DATE AND AVOID INPUTTING 
    PAST DATES.
*/

// const { text } = require("body-parser");

var date = new Date();
var presentMonth = date.getMonth() + 1;
    if(presentMonth < 10) {
    presentMonth = "0" + presentMonth;
    }

    var presentDay = date.getDate()
    if(presentDay < 10) {
       presentDay = "0" + presentDay;   
    }

var year = date.getUTCFullYear();
var currentDate = year + "-" + presentMonth + "-" + presentDay;
document.getElementById("selectdate").setAttribute("min", currentDate);


function validate() {
    let firstName = document.getElementById("firstname").value;
    let lastName = document.getElementById("lastname").value;
    let email = document.getElementById("mail").value; 

    if(firstName.length <= 2 || lastName.length <= 1) {
        alert("Please enter a valid name...");
    } 

    if(email.indexOf("@") == -1 || email.length < 6) {
        alert("Please enter a valid e-mail...");
    }
}

// module.exports = validate;