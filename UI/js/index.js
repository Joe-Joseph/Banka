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

let popup = document.getElementById('triggerPopup');

let deleteIcon = document.getElementsByClassName("del");

let span = document.getElementsByClassName("closePopup")[0];

let showPopup = () => {
  popup.style.display = "block";
}

for (let i = 0; i < deleteIcon.length; i++) {
  deleteIcon[i].addEventListener('click', showPopup, false);
}

span.onclick = () => {
  popup.style.display = "none";
}

popupBtn.onclick = () => {
  popup.style.display = "none";
}

window.onclick = (event) => {
  if (event.target == popup) {
    popup.style.display = "none";
  }
}