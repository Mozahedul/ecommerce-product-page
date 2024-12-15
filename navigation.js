const showMenuBtn = document.getElementById("show-menu-btn");

showMenuBtn.addEventListener("click", function () {
  const menu = document.getElementById("menu");
  menu.classList.add("open");

  // Make all body background color opaque when mobile menu shows
  const overlayMenu = document.getElementById("overlay-menu");
  overlayMenu.classList.add("show");
});

const btnClose = document.getElementById("btn-close");

btnClose.addEventListener("click", function () {
  const menu = document.getElementById("menu");
  menu.classList.remove("open");

  // Make all body background color opaque when mobile menu shows
  const overlayMenu = document.getElementById("overlay-menu");
  overlayMenu.classList.remove("show");
});

// Remove navigation menu by clicking outside of navigation menu
document.addEventListener("click", function (event) {
  const menu = document.getElementById("menu");
  const overlay = document.getElementById("overlay-menu");
  const menuShowBtn = document.getElementById("show-menu-btn");

  // hide mobile nav menu when cick outside of the menu
  if (!menu.contains(event.target) && !menuShowBtn.contains(event.target)) {
    menu.classList.remove("open");
    overlay.classList.remove("show");
  }
});
