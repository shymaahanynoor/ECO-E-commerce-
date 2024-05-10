//  --------------------start header
let header = document.querySelector(".header");
let headerArray = header.querySelectorAll(".head-content");
let nextHeader = header.querySelector(".next");
let pervHeader = header.querySelector(".perv");

let a = 0;
window.onload = headerArray[a].classList.add("active");
nextHeader.addEventListener("click", function () {
  for (let i = 0; i < headerArray.length; i++) {
    headerArray[i].classList.remove("active");
  }
  if (a < headerArray.length - 1) {
    a++;
  } else {
    a = 0;
  }
  window.onload = headerArray[a].classList.add("active");
});

pervHeader.addEventListener("click", function () {
  for (let i = 0; i < headerArray.length; i++) {
    headerArray[i].classList.remove("active");
  }
  if (a > 0) {
    a--;
  } else {
    a = headerArray.length - 1;
  }
  headerArray[a].classList.add("active");
});
//  --------------------end header
