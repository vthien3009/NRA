'use strict'

const lastNameInput = document.getElementById('input-lastname');
const firstNameInput = document.getElementById('input-firstname');
const userNameInput = document.getElementById('input-username');
const passWordInput = document.getElementById('input-password');
const confirmPassWordInput = document.getElementById('input-password-confirm');
const btnResiter = document.getElementById('btn-submit');

let inputProcess=true;//tao biến kiểm tra dữ liệu đầu vào
//function reaload data
function reload(){
    lastNameInput.value='';
    firstNameInput.value='';
    userNameInput.value='';
    passWordInput.value='';
    confirmPassWordInput.value='';
}
//lấy userArr từ localStorage
let userArr = getFromStorage("userArr") ? JSON.parse(getFromStorage("userArr")) : [];
//hàm kiểm tra dữ liệu nhập vào
const validate = function(){
    let erArr =[];
    for (let i = 0; i < userArr.length; i++) {
        if (userNameInput.value === userArr[i].userName) {
        erArr.push("user name is already in use!");
        }
    }
    if(firstNameInput.value===''){
        erArr.push('Please input-firstname');
    }
    if(lastNameInput.value===''){
        erArr.push('Please input-lastname');
    }
    if(userNameInput.value===''){
        erArr.push('Please input-username');
    }
    if(passWordInput.value===''){
        erArr.push('Please input-password');
    }else if(passWordInput.value.length<8){
        erArr.push('please enter password more char');
    }
    if(confirmPassWordInput.value===''){
        erArr.push('Please input-comfirmpassword');
    }
    if(passWordInput.value!= confirmPassWordInput.value){
        erArr.push('Confirm Password does not match');
    } 
    if(erArr.length!=0){
        alert(`${erArr.join('\n')}`);
        return (inputProcess = false);
    }else{
        return (inputProcess = true);
    }
}
//nhấn nút resiter sẽ kiểm tra dữ liệu đầu vào có đủ đk hay kh, sau đó tạo oobject dựa trên class user đã tạo sẵn => lưu vào localStorage sau đó chuyển đến trang login
btnResiter.addEventListener('click', function(){
    validate();
    console.log(inputProcess);
    if(inputProcess==true){    
        let users = new user(firstNameInput.value, lastNameInput.value, userNameInput.value, passWordInput.value)
        userArr.push(users);
        saveToStorage('userArr', userArr);
        reload();
        window.location.href = '../pages/login.html';
        
    }    
})
