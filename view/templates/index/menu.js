let search = document.querySelector('.search-box');

document.querySelector('#search-icon') . onclick = () => {
  search.classList.toggle('active');
}

window.addEventListener("scroll", function() {
  var header = document.querySelector(".header");
  var scrollPosition = window.scrollY;

  if (scrollPosition > 50) { 
    header.classList.add("scroll");
  } else {
    header.classList.remove("scroll");
  }
});


let user = document.querySelector('.user');

document.querySelector('#user-icon').onclick = () =>{
  user.classList.toggle('active');
  search.classList.remove('active');
  search.classList.remove('active');
}