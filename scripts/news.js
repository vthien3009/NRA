"use strict";

const newsContainer = document.getElementById("news-container");
const btnPre = document.getElementById('btn-prev');
const btnNext = document.getElementById('btn-next');
const pageNum = document.getElementById('page-num');

let dataNews={};
// gọi object từ localStorage
var settingPage = getFromStorage("settingPage")
  ? JSON.parse(getFromStorage("settingPage"))
  : {newPer: '5', newCategory: 'Business'};//hiển thị tin với pagesize=5 khi setting chưa được chọn

//hàm render api sau khi đc trả kết quả
const rendernew = function (dataNews ) {
  //xóa đoạn html có sẵn sau đó thêm vào đoạn mới
  newsContainer.innerHTML='';
  for (let i = 0; i <dataNews.articles.length; i++) {
    const div = document.createElement("div");
    div.innerHTML = `
      <div class="row" style="border: 1px solid black; margin-bottom: 30px" >
      <div class="col10 col-sm-4 col-md-8 col-xl-4 col-lg-4">
          <img src="${dataNews.articles[i].urlToImage}" style="width: 110%; margin-left: -15px; " alt="">
      </div>
      <div class="col12 col-sm-6 col-md-8 col-xl-8 col-lg-8" style="margin-top: 2%;padding-left: 5% " >
          <h4 class="page-item">${dataNews.articles[i].title}<h4>
          <p class="page-item" style="font-size: 60%;"> ${dataNews.articles[i].description}</p>
          <button class="btn btn-primary"> <a href="${dataNews.articles[i].url}" style="color: white;">View</a>  </button>
      </div>  `;
      newsContainer.appendChild(div);
  }
};
//hàm lấy dữ liệu từ API
const newsapi = async function (country, category, pageSize, page) {
  try {
    const response = await fetch(
      `https://newsapi.org/v2/top-headlines?country=${country}&category=${category}&pageSize=${pageSize}&page=${page}&apiKey=31b67f1465f24b3481d5c14f71c146e6`
    );
    //nếu response bị lỗi sẽ ném ra lỗi với dạng 'Problem with' + error
    if (!response.ok) {
      throw new Error(`Problem with ${response.status}`);
    }
    dataNews = await response.json();
    console.log(dataNews);
  //bắt lỗi nào khi các dòng lệnh trong try xảy ra lỗi 
  } catch (err) {
    console.error(err.message);
  }
  rendernew(dataNews)
//mặc định khi hiển thị tin pagenumber=1 => xóa nút previous
  if(pageNum.textContent==1){
    btnPre.style.display='none';
  }
};
newsapi('us',settingPage.newCategory,settingPage.newPer,1);

//khi bấm nút next hiển thị 5 tin cho mỗi trang đồng thời số page sẽ tăng tới totalResult/5
btnNext.addEventListener('click', function(){
  //tạo numberOfPage với tổng số bài viết với newsapi('us','business')/5 bài cho mỗi trang
  let numberOfPage = ((dataNews.totalResults)/settingPage.newPer).toFixed(0);//tạo biến numberOfPage (số trang có thể đạt được dựa trên totalResulut) và lấy phần nguyên
  for(let i=1; i<numberOfPage;i++){
    if(pageNum.textContent==i){
      pageNum.textContent=++i;
      console.log(i);
      newsapi('us',settingPage.newCategory,settingPage.newPer,i);
    }
    //khi i = numberOfPage lúc đó không load tin đc nửa => ẩn nút next
    if(i==numberOfPage){
      btnNext.style.display='none';
    //hiển thị lại nút btnPre sau khi nút btnPre bị ẩn  
    }else{
      btnPre.style.display='block';
    }
}})
//khi bấm nút previous hiển thị 5 tin cho mỗi trang đồng thời số page sẽ giảm dần tới 1
btnPre.addEventListener('click', function(){
  let numberOfPage = ((dataNews.totalResults)/settingPage.newPer).toFixed(0);//tạo biến numberOfPage (số trang có thể đạt được dựa trên totalResulut) và lấy phần nguyên
  console.log(numberOfPage);
  for(let i=numberOfPage; i>1;i--){
    if(pageNum.textContent==i){
      pageNum.textContent=--i;
      console.log(i);
      newsapi('us',settingPage.newCategory,settingPage.newPer,i);
    }
    //khi i = 1 lúc đó không load tin đc nửa => ẩn nút btnPre
    if(i==1){
      btnPre.style.display='none';
      //hiển thị lại nút btnNext sau khi nút btnPre bị ẩn 
    }else{
      btnNext.style.display='block';
    }
  }
})
