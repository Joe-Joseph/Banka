/*open*/
const menuBar=document.querySelector(".menu");
const openMenu=document.querySelector(".navbar");
const closeMenu=document.querySelector(".close");
menuBar.addEventListener("click",()=>{
  openMenu.style="transform:translateX(0%)";
})
/*close*/
closeMenu.addEventListener("click",()=>{
  openMenu.style="transform:translateX(100%)";
})