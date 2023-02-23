// get carousel DOM element
const carousel = document.querySelector(".carousel__items");
// and switch-btns container
const indicatorCollection = document.querySelector(".carousel__switch-btns");
// prepare an array of DOM elements which of .carousel__items class
const carouselItemCollection = [];
const activeEventListeners = [];

// prepare a list of names for each wallpaper
const wallpaperSources = [
    "reyna.jpg",
    "killjoy.jpg",
    "brimstone.png",
    "jett.jpg",
    "chamber.webp",
    "neon.jpeg",
    "omen.webp",
    "phoenix.jpg",
    "raze.jpg",
    "sage.jpg",
    "skye.jpg",
    "viper.jpg",
    "yoru.jpg",
];

// prepare events for active slides
const scrollToLeftest = function (e) {
    e.stopPropagation();
    switchSlides(-2);
};
const scrollToLeft = function (e) {
    e.stopPropagation();
    switchSlides(-1);
};
const scrollToRight = function (e) {
    e.stopPropagation();
    switchSlides(1);
};
const scrollToRightest = function (e) {
    e.stopPropagation();
    switchSlides(2);
};

function appendVisualClasses(activeItemCollection) {
    activeItemCollection[0].classList.add("carousel__item--leftest");
    activeItemCollection[1].classList.add("carousel__item--left");
    activeItemCollection[2].classList.add("carousel__item--main");
    activeItemCollection[3].classList.add("carousel__item--right");
    activeItemCollection[4].classList.add("carousel__item--rightest");
    for (let i = 0; i < activeItemCollection.length; i++) {
        activeItemCollection[i].classList.remove("carousel__item--hidden");
    }
}

function appendDOMListeners(activeItemCollection) {
    activeItemCollection[0].addEventListener("click", scrollToLeftest);
    activeItemCollection[1].addEventListener("click", scrollToLeft);
    activeItemCollection[3].addEventListener("click", scrollToRight);
    activeItemCollection[4].addEventListener("click", scrollToRightest);
}

function clearDOMListeners(activeItemCollection) {
    activeItemCollection[0].removeEventListener("click", scrollToLeftest);
    activeItemCollection[1].removeEventListener("click", scrollToLeft);
    activeItemCollection[3].removeEventListener("click", scrollToRight);
    activeItemCollection[4].removeEventListener("click", scrollToRightest);
}

function fillCarousel(sourceCollection) {
    for (let i = 0; i < sourceCollection.length; i++) {
        // create carousel item DOM element
        const carouselItem = document.createElement("div");
        carouselItem.classList.add("carousel__item");

        // create image and append "src" attribute to it
        const carouselImage = new Image();
        carouselImage.src = "/img/" + sourceCollection[i];
        carouselImage.alt = sourceCollection[i].split(".")[0] + "wallpaper";
        carouselImage.classList.add("carousel__image");
        carouselItem.appendChild(carouselImage);

        // add that DOM element to items array
        carouselItemCollection.push(carouselItem);

        // add a carousel indicator to each slide
        const indicator = document.createElement("button");
        indicator.classList.add("carousel__switch-btn");
        indicatorCollection.appendChild(indicator);
    }
}

function InitializeCarousel() {
    //create wallpaper images and put them into carousel
    fillCarousel(wallpaperSources);

    // add CSS display classes to first active items
    appendVisualClasses(carouselItemCollection.slice(0, 5));
    appendDOMListeners(carouselItemCollection.slice(0, 5));

    // Hide all the other ones
    for (let i = 5; i < carouselItemCollection.length; i++) {
        carouselItemCollection[i].classList.add("carousel__item--hidden");
    }

    // push ready DOM elements into the carousel
    for (let i = 0; i < carouselItemCollection.length; i++) {
        carousel.appendChild(carouselItemCollection[i]);
    }
}

InitializeCarousel();

// track which image is currently displayed first (The most left image on page)
let firstImageIndex = 0;

// get left/right arrows of the carousel
const scrollLeftBtn = document.querySelector(".carousel__move-btn--left");
const scrollRightBtn = document.querySelector(".carousel__move-btn--right");

// Switching slides. Direction is determening whether a left or right button was pressed, while selected is there in case indicators were pressed
function switchSlides(direction, selected) {
    // reset each carousel item CSS to hide them
    for (let i = 0; i < carouselItemCollection.length; i++) {
        carouselItemCollection[i].className = "";
        carouselItemCollection[i].classList.add("carousel__item");
        carouselItemCollection[i].classList.add("carousel__item--hidden");
    }

    // clear "click" event listeners for side items
    let slides = carouselItemCollection.slice(
        firstImageIndex,
        firstImageIndex + 5
    );
    slides = slides.concat(carouselItemCollection.slice(0, 5 - slides.length));
    clearDOMListeners(slides);

    if (selected !== undefined) {
        firstImageIndex = selected;
    } else {
        // add or distract one from first image index and normalize it to fit the array
        firstImageIndex += direction;
        firstImageIndex =
            firstImageIndex < 0
                ? carouselItemCollection.length + firstImageIndex
                : firstImageIndex % carouselItemCollection.length;
    }

    // re-add the CSS classes to currently active five items and show them again
    // plus add click event listeners
    slides = carouselItemCollection.slice(firstImageIndex, firstImageIndex + 5);
    if (slides.length < 5) {
        slides = slides.concat(
            carouselItemCollection.slice(0, 5 - slides.length)
        );
    }
    appendVisualClasses(slides);
    appendDOMListeners(slides);
}

scrollLeftBtn.addEventListener("click", () => {
    switchSlides(-1);
});

scrollRightBtn.addEventListener("click", () => {
    switchSlides(1);
});
