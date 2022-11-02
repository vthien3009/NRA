"use strict";
//hàm save dữ liệu vào localStorage với tham chiếu 'key' và value 
function saveToStorage(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}
//hàm lấy dữ liệu từ localStorage
function getFromStorage(key) {
  return localStorage.getItem(key);
}
