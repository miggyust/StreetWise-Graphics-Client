var check = function() {
    let match = false;
    if (document.getElementById('password').value ==
      document.getElementById('confirm_Password').value) {
      document.getElementById('message').style.color = 'green';
      document.getElementById('message').innerHTML = 'matching';
      match=true;
    } else {
      document.getElementById('message').style.color = 'red';
      document.getElementById('message').innerHTML = 'not matching';
    }
    if (match==false){
        alert("Passwords do not match");
    }
  }