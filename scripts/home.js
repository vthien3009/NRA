'use strict'
const loginModal = document.getElementById('login-modal');
const btnLogout = document.getElementById('btn-logout');


//hàm xóa current ở localStorage
const removeItem = function(keyinlocalStorage){
    localStorage.removeItem(keyinlocalStorage)
}
//lấy currentUser từ localSotore, nếu không có currentUser ở local thì sẽ trả về object rỗng
let currentUser = getFromStorage("currentUser")
  ? JSON.parse(getFromStorage("currentUser"))
  : {};
//kiểm tra key trong object currentUser nếu độ dài bằng 0 => object rỗng => currentUser không tồn tại trong localstorage
  if(Object.keys(currentUser).length != 0){
    loginModal.innerHTML = `<p>Wellcome ${currentUser.userName} </p>`;
  }
//click nút logout sẽ xóa currentUser ở localStorage đồng thời dẫn về trang login
  btnLogout.addEventListener('click', function(){
      removeItem('currentUser');
      window.location.href = '../pages/login.html';
  })

