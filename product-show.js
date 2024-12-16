const products = [
  {
    id: 1,
    mainImg: "./images/image-product-1.jpg",
    thumbnail: "./images/image-product-1-thumbnail.jpg",
  },
  {
    id: 2,
    mainImg: "./images/image-product-2.jpg",
    thumbnail: "./images/image-product-2-thumbnail.jpg",
  },
  {
    id: 3,
    mainImg: "./images/image-product-3.jpg",
    thumbnail: "./images/image-product-3-thumbnail.jpg",
  },
  {
    id: 4,
    mainImg: "./images/image-product-4.jpg",
    thumbnail: "./images/image-product-4-thumbnail.jpg",
  },
];

// Load the product images when the page loads
document.addEventListener("DOMContentLoaded", function () {
  // Generate HTML code for product thumbnails
  // and add event listeners to each thumbnail button
  let content = products
    .map(
      product => `
    <button class="thumbnail-btn" data-id="${product.id}">
        <img
          src="${product.thumbnail}"
          alt="${product.thumbnail}"
        />
    </button>
    `
    )
    .join("");
  document.getElementById("imgList").innerHTML = content;

  // Return a live HTMLColection that is really an iterable object
  // Get all thumbnails btns with image
  const buttons = document.getElementsByClassName("thumbnail-btn");

  // Now Change the iterable object to an iterable array
  const btnArray = Array.from(buttons);
  btnArray.forEach(button => {
    button.addEventListener("click", () => {
      // Removing border from all thumbnails
      btnArray.forEach(btn => {
        btn.querySelector("img").classList.remove("thumbnail-active");
      });
      // Set border for active thumbnail
      button.querySelector("img").classList.add("thumbnail-active");
      // Change the string value to number
      const productId = parseInt(button.getAttribute("data-id"), 10);
      handleCartImg(productId);
    });
  });

  // Function for showing large image by clicking on thumbnail button
  function handleCartImg(id) {
    // match the product that was clicked
    const selectProduct = products.find(product => product.id === id);

    console.log("selected => ", selectProduct);

    // Change the large image source
    if (selectProduct) {
      const largeImg = document.getElementById("large-img");
      largeImg.src = selectProduct.mainImg;
    }

    // Now set the selected thumbnail image active with border
  }
});
