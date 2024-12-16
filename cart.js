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

// Add to cart functionality
const addToCartBtn = document.getElementById("add-to-cart-btn");
addToCartBtn.addEventListener("click", function () {
  const inputCart = document.getElementById("input-cart");
  const numbOfCartItems = inputCart.value;
  const title = "Fall Limited Edition Sneakers";
  const productImg = "./images/image-product-1-thumbnail.jpg";
  const price = 125;

  const product = {
    title,
    price,
    productImg,
    id: Date.now(),
    quantity: numbOfCartItems,
  };

  // Insert cart items into browser local storage
  // Check in local storage the cart items exist or not
  const cartInLocalStg = localStorage.getItem("cartList");
  const cartItemsFromLocalStg = cartInLocalStg
    ? JSON.parse(cartInLocalStg)
    : [];

  cartItemsFromLocalStg.push(product);

  localStorage.setItem("cartList", JSON.stringify(cartItemsFromLocalStg));

  location.reload();
});

document.addEventListener("DOMContentLoaded", function () {
  const cartItemsFromLocalStg = localStorage.getItem("cartList");

  const cartItems = cartItemsFromLocalStg
    ? JSON.parse(cartItemsFromLocalStg)
    : [];

  // insert number of cart items into cart badge
  const cartBadge = document.getElementById("cart-badge");
  cartBadge.innerHTML = cartItems.length;

  if (cartItems.length > 0) {
    const hiddenCartMenu = document.getElementById("hidden-cart-menu");

    const content = cartItems
      .map(
        cartItem => `
       <div class="cart-item">
        <img src="${cartItem.productImg}" alt="" />
        <div class="cart-item-details">
          <p class="hidden-cart-title">${cartItem.title}</p>
          <p class="hidden-cart-price">
            $${cartItem.price} X ${cartItem.quantity} =
            <strong>$${cartItem.price * cartItem.quantity}</strong>
          </p>
        </div>
        <div class="remove-btn">
          <button class="cart-remove-btns" data-id="${cartItem.id}">
            <img src="./images/icon-delete.svg" alt="delete icon" />
          </button>
        </div>
      </div>;
      `
      )
      .join("");

    hiddenCartMenu.innerHTML = `
      <h4>Cart</h4>
        ${content}
      <div class="checkout-btn">
          <button>Checkout</button>
      </div>
    `;

    const cartRemovebuttons =
      document.getElementsByClassName("cart-remove-btns");

    const buttons = Array.from(cartRemovebuttons);

    buttons.forEach(button => {
      button.addEventListener("click", function () {
        const cartId = parseInt(button.getAttribute("data-id"), 10);
        handleCartItemRemove(cartId);
      });
    });

    function handleCartItemRemove(cartId) {
      const getCartItemFromLocalStg = localStorage.getItem("cartList");

      const cartItems = getCartItemFromLocalStg
        ? JSON.parse(getCartItemFromLocalStg)
        : [];

      if (cartItems.length > 0) {
        const filteredCartItems = cartItems.filter(
          cartItem => cartItem.id !== cartId
        );

        // Update the local storage
        localStorage.setItem("cartList", JSON.stringify(filteredCartItems));

        // reload the web page
        location.reload();
      }
    }
  }
});
