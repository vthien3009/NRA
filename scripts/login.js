"use strict";

const userNameInput = document.getElementById("input-username");
const passWordInput = document.getElementById("input-password");
const btnLogin = document.getElementById("btn-submit");

let inputProcess = true;

//lấy userArr từ localStorage
let userArr = getFromStorage("userArr")
  ? JSON.parse(getFromStorage("userArr"))
  : [];
// hàm kiểm tra dữ liệu nhập vào
const validateLogin = function () {
  let erArr = [];
  if (userNameInput.value == "") {
    erArr.push("Please input-username");
  }
  if (passWordInput.value == "") {
    erArr.push("Please input-password");
  }
  if (erArr.length != 0) {
    alert(`${erArr.join("\n")}`);
    return (inputProcess = false);
  } else {
    return (inputProcess = true);
  }
};
//ấn nút login
btnLogin.addEventListener("click", function () {
  validateLogin();
  if (inputProcess == true) {
    let userFilter = userArr
      .filter((user) => user.userName == userNameInput.value)
      .filter((user) => user.passWord == passWordInput.value);
       if(userFilter.length!=0){
           console.log(userFilter[0].firstName);
            window.location.href = '../index.html';
       }else{
           alert('Incorrect username or password');
       }
       let currentUser = new user(userFilter[0].firstName, userFilter[0].lastName, userFilter[0].userName, userFilter[0].passWord)
       saveToStorage('currentUser', currentUser);
  }
});
