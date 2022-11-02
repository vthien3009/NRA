"use strict";

const titleToDoList = document.getElementById("input-task");
const btnAdd = document.getElementById("btn-add");
const containerTodolist = document.getElementById("todo-list");

let inputProcess = true;
let todoArrWithUserName=[];
//tạo class chứa task, ower, isDone
class todoClass {
  constructor(task, owner, isDone) {
    this.task = task;
    this.owner = owner;
    this.isDone = isDone;
  }
}
//lấy dữ liệu currentUser và todoArr từ localStorage
let currentUser = getFromStorage("currentUser")
  ? JSON.parse(getFromStorage("currentUser"))
  : "";
let todoArr = getFromStorage("todoArr")
  ? JSON.parse(getFromStorage("todoArr"))
  : [];
// lọc todoArr.owner theo currentUser.userName để render todoList theo userName
// const selectUserOftodoArr = function () {
//   todoArrWithUserName = todoArr.filter((user) => user.owner == currentUser.userName);
//   console.log(todoArrWithUserName);
// };
// selectUserOftodoArr();
//hàm validate task không bị trùng
const validate = function () {
  let erArr = [];
  for (let i = 0; i < todoArr.length; i++) {
    // console.log(titleToDoList.value, todoArr[i].task);
    if (todoArr[i].task == titleToDoList.value&&currentUser.userName==todoArr[i].owner) {
      console.log(todoArr[i].task, titleToDoList.value);
      erArr.push("the task you entered already exists");
    }
  }
  if (erArr.length != 0) {
    alert(`${erArr.join("\n")}`);
    return (inputProcess = false);
  } else {
    return (inputProcess = true);
  }
};
//render todoArr
const renderTodolist = function (todoArr, userName) {
  containerTodolist.innerHTML = "";
  for (let i = 0; i < todoArr.length; i++) {
    if(todoArr[i].owner==userName){
      containerTodolist.insertAdjacentHTML(
        "beforeend", //hiển thị dòng mới thêm vào nằm dưới dòng trước đó
        `<li class="todolist ${
          todoArr[i].isDone === true ? "checked" : ""
        }"  ><div onclick="checkClass(${i})">${
          todoArr[i].task
        }</div><span class="close" onclick="delRow('${todoArr[i].task}', '${
          todoArr[i].owner
        }')">×</span></li>`
      );
    }
    // const div = document.createElement("div");
    // div.innerHTML = `<li id='todolist'>${todoArr[i].task}<span class="close" onclick="delRow('${todoArr[i].task}', '${todoArr[i].owner}')">×</span></li>`;
    // containerTodolist.appendChild(div);

  }
};
console.log(todoArr);
//hàm hiển thị khi load page

  
renderTodolist(todoArr,currentUser.userName);


//sau khi render thì mới có li với class là todolist

//hàm hiển thị checked, đồng thơi thay đổi todoArr.isDone của object thành true nếu isDone của là object là false và ngược lại
const checkClass = function (id) {
  const listTodo = document.querySelectorAll(".todolist");
  for (let i = 0; i < todoArr.length; i++) {
    if (i == id) {
      // listTodo[i].classList.toggle("checked");
      todoArr[i].isDone = todoArr[i].isDone == false ? true : false;
      saveToStorage("todoArr", todoArr);
      renderTodolist(todoArr, currentUser.userName);
    }
  }
};
//xóa todoList dựa vào task và userName của người tạo
function delRow(task, userName) {
  // const anwser = confirm("Are you sure!");
  // if (anwser) {
    for (let i = 0; i < todoArr.length; i++) {
      if (todoArr[i].task == task && todoArr[i].owner == userName) {
        todoArr.splice(i, 1);
        saveToStorage("todoArr", todoArr);
      }
      renderTodolist(todoArr, currentUser.userName);
    }
  // }
}
//nút add sử dụng class todoClass để tao object nhanh hơn và thêm ob đó vào todoArr, render và lưu vào localStorage
btnAdd.addEventListener("click", function () {
  validate();
  if (inputProcess == true) {
    const todoTask = new todoClass(
      titleToDoList.value,
      currentUser.userName,
      false
    );
    titleToDoList.value = "";
    todoArr.push(todoTask);
    saveToStorage("todoArr", todoArr);
  }
  renderTodolist(todoArr, currentUser.userName);
});
