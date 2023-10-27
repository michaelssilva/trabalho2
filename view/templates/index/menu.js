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

window.addEventListener("scroll", function() {
  var menuHeader = document.getElementById("menu-header");
  var scrollPosition = window.scrollY;

  if (scrollPosition > 50) {
    menuHeader.classList.add("scroll-menu");
  } else {
    menuHeader.classList.remove("scroll-menu");
  }
});
