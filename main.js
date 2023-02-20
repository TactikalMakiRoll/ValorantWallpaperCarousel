/* <div class="carousel__item">
    <img
        src="/img/harbour.jpg"
        alt="Harbour wallpaper"
        class="carousel__image" />
</div>
<div class="carousel__item">
    <img
        src="/img/reyna.jpg"
        alt="Reyna wallpaper"
        class="carousel__image" />
</div>
<div class="carousel__item">
    <img
        src="/img/killjoy.jpg"
        alt="Killjoy wallpaper"
        class="carousel__image" />
</div>
<div class="carousel__item">
    <img
        src="/img/brimstone.png"
        alt="Brimstone wallpaper"
        class="carousel__image" />
</div>
<div class="carousel__item">
    <img
        src="/img/jett.jpg"
        alt="Jett wallpaper"
        class="carousel__image" />
</div> */

//     <div class="carousel__item">
//     <img
//         src="/img/chamber.webp"
//         alt="Chamber wallpaper"
//         class="carousel__image" />
// </div>
// <div class="carousel__item">
//     <img
//         src="/img/neon.jpeg"
//         alt="Neon wallpaper"
//         class="carousel__image" />
// </div>
// <div class="carousel__item">
//     <img
//         src="/img/omen.webp"
//         alt="Omen wallpaper"
//         class="carousel__image" />
// </div>
// <div class="carousel__item">
//     <img
//         src="/img/phoenix.jpg"
//         alt="Phoenix wallpaper"
//         class="carousel__image" />
// </div>
// <div class="carousel__item">
//     <img
//         src="/img/raze.jpg"
//         alt="Raze wallpaper"
//         class="carousel__image" />
// </div>
// <div class="carousel__item">
//     <img
//         src="/img/sage.jpg"
//         alt="Sage wallpaper"
//         class="carousel__image" />
// </div>
// <div class="carousel__item">
//     <img
//         src="/img/skye.jpg"
//         alt="Skye wallpaper"
//         class="carousel__image" />
// </div>
// <div class="carousel__item">
//     <img
//         src="/img/viper.jpg"
//         alt="Viper wallpaper"
//         class="carousel__image" />
// </div>
// <div class="carousel__item">
//     <img
//         src="/img/yoru.jpg"
//         alt="Yoru wallpaper"
//         class="carousel__image" />
// </div>

// <button
// class="carousel__switch-btn carousel__switch-btn--left"></button>

const carousel = document.querySelector(".carousel__items");
const carouselItems = [];
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

let activeImage = 0;

for (let i = 0; i < wallpaperSources.length; i++) {
    const carouselItem = document.createElement("div");
    carouselItem.classList.add("carousel__item");

    const carouselImage = new Image();
    carouselImage.src = "/img/" + wallpaperSources[i];
    carouselImage.alt = wallpaperSources[i].split(".")[0] + "wallpaper";
    carouselImage.classList.add("carousel__image");

    if (i >= 5) {
        carouselItem.classList.add("carousel__item--hidden");
    }

    carouselItem.appendChild(carouselImage);
    carouselItems.push(carouselItem);
}

for (let i = 0; i < carouselItems.length; i++) {
    carousel.appendChild(carouselItems[i]);
}

const scrollLeftBtn = document.querySelector(".carousel__move-btn--left");
const scrollRightBtn = document.querySelector(".carousel__move-btn--right");

function switchSlides(direction, selected) {
    console.log("slides were switched");
    if (selected !== undefined) {
        activeImage = selected;
    } else {
        activeImage += direction;
        activeImage > carouselItems.length ? (activeImage = 0) : activeImage;
        activeImage < 0
            ? (activeImage = carouselItems.length - 1)
            : activeImage;
    }

    for (let i = 0; i < carouselItems.length; i++) {
        carouselItems[i].classList.add("carousel__item--hidden");
    }
    for (let i = activeImage, j = 0; j < 5; i++, j++) {
        console.log(i);
        i > carouselItems.length - 1 ? (i = 0) : i;
        i < 0 ? (i = carouselItems.length - 1) : i;
        carouselItems[i].classList.remove("carousel__item--hidden");
    }
}

scrollLeftBtn.addEventListener("click", () => {
    switchSlides(-1);
});
scrollRightBtn.addEventListener("click", () => {
    switchSlides(1);
});
