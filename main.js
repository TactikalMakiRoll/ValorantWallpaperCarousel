// get carousel DOM element
const carousel = document.querySelector(".carousel__items");
// and switch-btns container
const indicatorParent = document.querySelector(".carousel__switch-btns");
// prepare an array of DOM elements which of .carousel__items class
const carouselItemCollection = [];
// and array of indicator elements
const indicatorCollection = [];

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

// positioning of active slide elements
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

// active indicator mark
function resetIndicatorActiveCSS() {
    for (let i = 0; i < indicatorCollection.length; i++) {
        indicatorCollection[i].classList.remove("carousel__switch-btn--active");
    }
}

// add/remove DOM listeners for active slides
function appendDOMListeners(activeItemCollection) {
    activeItemCollection[0].addEventListener("pointerdown", scrollToLeftest);
    activeItemCollection[1].addEventListener("pointerdown", scrollToLeft);
    activeItemCollection[3].addEventListener("pointerdown", scrollToRight);
    activeItemCollection[4].addEventListener("pointerdown", scrollToRightest);
}

function clearDOMListeners(activeItemCollection) {
    activeItemCollection[0].removeEventListener("pointerdown", scrollToLeftest);
    activeItemCollection[1].removeEventListener("pointerdown", scrollToLeft);
    activeItemCollection[3].removeEventListener("pointerdown", scrollToRight);
    activeItemCollection[4].removeEventListener(
        "pointerdown",
        scrollToRightest
    );
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
        indicatorParent.appendChild(indicator);
        indicatorCollection.push(indicator);
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

    // clear "pointerdown" event listeners for side items
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
    // plus add pointerdown event listeners
    slides = carouselItemCollection.slice(firstImageIndex, firstImageIndex + 5);
    if (slides.length < 5) {
        slides = slides.concat(
            carouselItemCollection.slice(0, 5 - slides.length)
        );
    }
    appendVisualClasses(slides);
    appendDOMListeners(slides);

    //make correct indicator button active
    resetIndicatorActiveCSS();

    indicatorCollection[
        (firstImageIndex + 2) % indicatorCollection.length
    ].classList.add("carousel__switch-btn--active");
}

//add DOM events to left/right buttons
scrollLeftBtn.addEventListener("pointerdown", () => {
    switchSlides(-1);
});

scrollRightBtn.addEventListener("pointerdown", () => {
    switchSlides(1);
});

//add DOM events to indicators
for (let i = 0; i < indicatorCollection.length; i++) {
    indicatorCollection[i].addEventListener("pointerdown", () => {
        resetIndicatorActiveCSS();
        switchSlides(i - 2 - firstImageIndex);
        indicatorCollection[i].classList.add("carousel__switch-btn--active");
    });
}
