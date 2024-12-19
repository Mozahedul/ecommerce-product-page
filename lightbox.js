const closeIconLightBox = document.getElementById("close-icon-lightbox");

// Show lightbox
const lgImgBtn = document.getElementById("img-lg");
lgImgBtn.addEventListener("click", function () {
  const lightbox = document.getElementById("lightbox");
  lightbox.classList.add("open");

  // show lightbox overlay bg
  const overlayLightbox = document.getElementById("overlay-lightbox");
  overlayLightbox.classList.add("open");

  // Set the active thumbnail with border for lightbox
  // const thumbnailsCollection = document.getElementById("thumbnail-btn");
  // const thumbnailBtns = Array.from(thumbnailsCollection);
  // if (thumbnailBtns) {
  //   thumbnailBtns[0].style.border = "2px solid red";
  // }
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
  const lightImgWrapper = document.getElementById("lightbox-img-wrapper");

  if (lightImgWrapper) {
    let lightboxLargeContent = products
      .map(
        product => `<img src="${product.mainImg}" alt="${product.mainImg}"      class="lightbox-main-img"
         id="lightbox-lg-img"
       />`
      )
      .join("");

    lightImgWrapper.innerHTML = lightboxLargeContent;
  }

  // Generate HTML code for product thumbnails
  // and add event listeners to each thumbnail button
  const thumbnailsContainer = document.getElementById("thumbnails");

  if (thumbnailsContainer) {
    let content = products
      .map(
        product =>
          `<button class="thumbnail-btn thumb-btn" data-id="${product.id}">
            <img src="${product.thumbnail}" alt="${product.thumbnail}"/>
          </button>`
      )
      .join("");

    thumbnailsContainer.innerHTML = content;
  }

  let scrollPosition = 0;

  // slider setting
  const slider = document.getElementById("lightbox-img-wrapper");

  const prevSliderBtn = document.getElementById("prev-slide-btn");
  const nextSliderBtn = document.getElementById("next-slide-btn");

  // SLIDES THE LARGE IMAGE OF LIGHTBOX WITH BY CLICKING THE THUMBNAIL

  const thumbnailBtnsCollection = document.getElementsByClassName("thumb-btn");
  const thumbBtnsArray = Array.from(thumbnailBtnsCollection);

  // When lightbox is opened, then the first thumbnail will
  // remain selected with border
  if (scrollPosition === 0) {
    thumbBtnsArray[0].querySelector("img").style.border =
      "2px solid hsl(26, 100%, 55%)";
    prevSliderBtn.style.cursor = "not-allowed";
    prevSliderBtn.disabled = true;
  }
  thumbBtnsArray.map(btn => {
    btn.addEventListener("click", function () {
      // Remove border from all thumbnails images
      thumbBtnsArray.forEach(thumbBtn => {
        thumbBtn.querySelector("img").style.border = "none";
      });

      // Add border to the selected thumbnail image
      this.querySelector("img").style.border = "2px solid hsl(26, 100%, 55%)";
      const lightboxSlider = document.getElementById("lightbox-img-wrapper");

      scrollPosition = lightboxSlider.offsetWidth * (this.dataset.id - 1);

      console.log("scrollPosition: " + scrollPosition);
      console.log("scrollPosition id: " + this.dataset.id);

      // Enable or disable the next slider and prev slider button
      // if (scrollPosition >= slider.scrollWidth - slider.offsetWidth) {
      //   nextSliderBtn.disabled = true;
      //   nextSliderBtn.style.cursor = "not-allowed";
      // }

      // if (scrollPosition >= slider.offsetWidth) {
      //   prevSliderBtn.disabled = false;
      //   prevSliderBtn.style.cursor = "pointer";
      // }

      // if (scrollPosition <= slider.scrollWidth - slider.offsetWidth) {
      //   nextSliderBtn.disabled = false;
      //   nextSliderBtn.style.cursor = "pointer";
      // }

      // if (scrollPosition < slider.offsetWidth) {
      //   prevSliderBtn.disabled = true;
      //   prevSliderBtn.style.cursor = "not-allowed";
      // }

      if (
        scrollPosition >= slider.offsetWidth &&
        scrollPosition <= slider.scrollWidth - slider.offsetWidth
      ) {
        prevSliderBtn.disabled = false;
        prevSliderBtn.style.cursor = "pointer";
        nextSliderBtn.disabled = false;
        nextSliderBtn.style.cursor = "pointer";
      }

      if (scrollPosition < slider.offsetWidth) {
        prevSliderBtn.disabled = true;
        prevSliderBtn.style.cursor = "not-allowed";
      }

      if (scrollPosition >= slider.scrollWidth - slider.offsetWidth) {
        nextSliderBtn.disabled = true;
        nextSliderBtn.style.cursor = "not-allowed";
      }

      lightboxSlider.scrollTo({
        top: "0",
        left: scrollPosition,
        behavior: "smooth",
      });
    });
  });

  // ===== FOR PREVIOUS SLIDER ======
  prevSliderBtn.addEventListener("click", function () {
    if (scrollPosition >= slider.offsetWidth) {
      scrollPosition -= slider.offsetWidth;
    }

    console.log("scroll position prev => ", scrollPosition);

    // select the slider thumbnail according to
    // next or previous slider buttons clicking
    const slideNumber = scrollPosition / slider.offsetWidth;
    const thumbnailButtons = Array.from(
      document.getElementsByClassName("thumb-btn")
    );

    thumbnailButtons.forEach(btn => {
      btn.querySelector("img").style.border = "none";
    });

    thumbnailButtons[slideNumber].querySelector("img").style.border =
      "2px solid hsl(26, 100%, 55%)";

    console.log("scrollposition: prev slider" + scrollPosition);

    // disable the previous slider button when it reaches to the first slide
    if (scrollPosition < slider.offsetWidth) {
      prevSliderBtn.disabled = true;
      prevSliderBtn.style.cursor = "not-allowed";
    }

    // Enable the next slider button when previous slider button is
    // clicked during the slide goes last state
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

  // ===== FOR NEXT SLIDER ======
  nextSliderBtn.addEventListener("click", function () {
    scrollPosition += slider.offsetWidth;

    console.log("scroll position => ", scrollPosition);

    // select the slider thumbnail according to
    // next slider buttons clicking
    const slideNumber = scrollPosition / slider.offsetWidth;
    const thumbnailButtons = Array.from(
      document.getElementsByClassName("thumb-btn")
    );

    thumbnailButtons.forEach(btn => {
      btn.querySelector("img").style.border = "none";
    });

    thumbnailButtons[slideNumber].querySelector("img").style.border =
      "2px solid hsl(26, 100%, 55%)";

    // disable the next slider button when it reaches to last slide
    if (scrollPosition >= slider.scrollWidth - slider.offsetWidth) {
      nextSliderBtn.disabled = true;
      nextSliderBtn.style.cursor = "not-allowed";
    }

    // Enable the previous slider button when next slider button
    // is clicked for the first time
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
