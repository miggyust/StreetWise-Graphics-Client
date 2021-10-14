/* DATE VALIDATION SCRIPT 
    TO VALIDATE PRESENT DATE AND AVOID INPUTTING 
    PAST DATES.
*/

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