const closeIconLightBox = document.getElementById("close-icon-lightbox");

// closeIconLightBox.addEventListener("click", function () {

// });

// Show lightbox
const lgImgBtn = document.getElementById("img-lg");
lgImgBtn.addEventListener("click", function () {
  const lightbox = document.getElementById("lightbox");
  lightbox.classList.add("open");

  // show lightbox overlay bg
  const overlayLightbox = document.getElementById("overlay-lightbox");
  overlayLightbox.classList.add("open");
});

// Close lightbox
const closeIconBtnLightBox = document.getElementById("close-icon-lightbox");
closeIconBtnLightBox.addEventListener("click", function () {
  const lightbox = document.getElementById("lightbox");
  lightbox.classList.remove("open");

  // Hide overlay lightbox bg
  const overlayLightbox = document.getElementById("overlay-lightbox");
  overlayLightbox.classList.remove("open");
});

// lightbox
// Load the product images when the page loads
document.addEventListener("DOMContentLoaded", function () {
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

  // show large image of lightbox
  const lightBoxLayout = document.getElementById("lightbox-img-wrapper");

  if (lightBoxLayout) {
    let lightboxLargeContent = products
      .map(
        product => `<img src="${product.mainImg}" alt="${product.mainImg}"      class="lightbox-main-img"
         id="lightbox-lg-img"
       />`
      )
      .join("");

    lightBoxLayout.innerHTML = lightboxLargeContent;
  }

  // Generate HTML code for product thumbnails
  // and add event listeners to each thumbnail button
  const thumbnailsContainer = document.getElementById("thumbnails");

  if (thumbnailsContainer) {
    let content = products
      .map(
        product =>
          `<button class="thumbnail-btn" data-id="${product.id}">
            <img src="${product.thumbnail}" alt="${product.thumbnail}"/>
          </button>`
      )
      .join("");

    thumbnailsContainer.innerHTML = content;
  }

  // slider setting
  let scrollPosition = 0;
  const slider = document.getElementById("lightbox-img-wrapper");

  const prevSliderBtn = document.getElementById("prev-slide-btn");
  const nextSliderBtn = document.getElementById("next-slide-btn");

  // if (scrollPosition < slider.offsetWidth) {
  //   prevSliderBtn.disabled = true;
  //   prevSliderBtn.style.cursor = "not-allowed";
  // }

  // for previous slider
  prevSliderBtn.addEventListener("click", function () {
    if (scrollPosition >= slider.offsetWidth) {
      scrollPosition -= slider.offsetWidth;
    }
    console.log("scrollposition: prev slider" + scrollPosition);

    if (scrollPosition < slider.offsetWidth) {
      prevSliderBtn.disabled = true;
      prevSliderBtn.style.cursor = "not-allowed";
    }

    if (scrollPosition <= slider.scrollWidth - slider.offsetWidth) {
      nextSliderBtn.disabled = false;
      nextSliderBtn.style.cursor = "pointer";
    }

    slider.scrollTo({
      top: "0",
      left: scrollPosition,
      behavior: "smooth",
    });
  });

  // for next slider

  nextSliderBtn.addEventListener("click", function () {
    scrollPosition += slider.offsetWidth;

    console.log("scroll position: Next slider " + scrollPosition);

    if (scrollPosition >= slider.scrollWidth - slider.offsetWidth) {
      nextSliderBtn.disabled = true;
      nextSliderBtn.style.cursor = "not-allowed";
    }

    if (scrollPosition >= slider.offsetWidth) {
      prevSliderBtn.disabled = false;
      prevSliderBtn.style.cursor = "pointer";
    }

    slider.scrollTo({
      top: "0",
      left: scrollPosition,
      behavior: "smooth",
    });
  });
});
