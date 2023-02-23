// get carousel DOM element
const carousel = document.querySelector(".carousel__items");
// prepare an array of DOM elements which of .carousel__items class
const carouselItems = [];

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

function appendVisualClasses(activeItemCollection) {
    activeItemCollection[0].classList.add("carousel__item--leftest");
    activeItemCollection[1].classList.add("carousel__item--left");
    activeItemCollection[2].classList.add("carousel__item--main");
    activeItemCollection[3].classList.add("carousel__item--right");
    activeItemCollection[4].classList.add("carousel__item--rightest");
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
        carouselItems.push(carouselItem);
    }
}

function InitializeCarousel() {
    //create wallpaper images and put them into carousel
    fillCarousel(wallpaperSources);

    // add CSS display classes to first active items
    appendVisualClasses(carouselItems.slice(0, 5));

    // Hide all the other ones
    for (let i = 5; i < carouselItems.length; i++) {
        carouselItems[i].classList.add("carousel__item--hidden");
    }

    // push ready DOM elements into the carousel
    for (let i = 0; i < carouselItems.length; i++) {
        carousel.appendChild(carouselItems[i]);
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
    if (selected !== undefined) {
        firstImageIndex = selected;
    } else {
        // add or distract one from first image index and normalize it to fit the array
        firstImageIndex += direction;
        firstImageIndex =
            firstImageIndex < 0
                ? carouselItems.length + firstImageIndex
                : firstImageIndex % carouselItems.length;
    }

    // reset each carousel item CSS to hide them
    for (let i = 0; i < carouselItems.length; i++) {
        carouselItems[i].className = "";
        carouselItems[i].classList.add("carousel__item");
        carouselItems[i].classList.add("carousel__item--hidden");
    }

    // re-add the CSS classes to currently active five items and show them again
    let slides = carouselItems.slice(firstImageIndex, firstImageIndex + 5);
    if (slides.length < 5) {
        slides = slides.concat(carouselItems.slice(0, 5 - slides.length));
    }
    for (let i = 0; i < slides.length; i++) {
        slides[i].classList.remove("carousel__item--hidden");
    }
    appendVisualClasses(slides);
}

scrollLeftBtn.addEventListener("click", () => {
    switchSlides(-1);
});

scrollRightBtn.addEventListener("click", () => {
    switchSlides(1);
});
