'use strict'
const btnSaveSetting = document.getElementById('btn-submit');
const newPer=document.getElementById('input-page-size');
const newCategory = document.getElementById('input-category');

let inputProcess = true;
//taoj class có số tin trong 1 trang và thể loại
class setPage {
    constructor(newPer, newCategory){
    this.newPer=newPer;
    this.newCategory = newCategory
    }
}
//goji settingPage từ localStorage
var settingPage = getFromStorage("settingPage")
  ? JSON.parse(getFromStorage("settingPage"))
  : {};
  console.log(settingPage);
  //hàm validate dữ liệu
const validate = function () {
    let erArr = [];
      if (newPer.value == '') {
        erArr.push("Please enter the number of stories you want to display");
      }
    if (erArr.length != 0) {
      alert(`${erArr.join("\n")}`);
      return (inputProcess = false);
    } else {
      return (inputProcess = true);
    }
  };
//kiểm tra xem object settingPage có tồn tại ở localStorage kh? nếu có thì hiển thị các giá trị trong ob ra ngoài
  if(Object.keys(settingPage).length != 0){
    newPer.value = settingPage.newPer;
    newCategory.value=settingPage.newCategory;
    //object settingPage không có sẽ hiển hiện mặc định ở các ô
}else{
    newPer.value = '';
    newCategory.value='General';
}
//khi bấm nút save sẽ thay đổi các giá trị trong ob theo giá trị người dùng nhập vào sau đó lưu lại vào localStorage
btnSaveSetting.addEventListener('click', function(){
    validate();
    if(inputProcess==true){
        if(Object.keys(settingPage).length != 0){
            settingPage.newPer=newPer.value;
            settingPage.newCategory=newCategory.value;
            saveToStorage('settingPage', settingPage)
        }else{//khi bấm nút save nếu như trc đó kh có ob settingPage thì sẽ tạo ob mới dựa trên class setPage sau đó lưu vào localStorage
            settingPage = new setPage(newPer.value, newCategory.value);
            saveToStorage('settingPage', settingPage)
        }
    }
})