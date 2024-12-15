
// Show hidden cart by clicking on the cart button
const cartBtn = document.getElementById("cart-btn");

cartBtn.addEventListener("click", function (event) {
  const hiddenCartMenu = document.getElementById("hidden-cart-menu");

  hiddenCartMenu.classList.toggle("open");
});

// Increment and decrement the cart items
const increment = document.getElementById("increment");
const decrement = document.getElementById("decrement");
let val = 1;

// INCREMENT cart items
increment.addEventListener("click", function () {
  val++;
  const inputCart = document.getElementById("input-cart");
  inputCart.value = val;
});

// DECREMENT cart items
decrement.addEventListener("click", function () {
  if (val > 1) {
    val--;
    const inputCart = document.getElementById("input-cart");
    inputCart.value = val;
  }
});
