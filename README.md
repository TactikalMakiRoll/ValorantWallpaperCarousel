# Valorant Wallpaper Carousel/Slider
This is a carousel I wrote myself to practice JS/CSS/DOM Skills. And as a bonus, you can check out cool Valorant wallpapers in there. (Link in heading)

**Link to project:** https://valorantwpp.netlify.app/

<a href="https://valorantwpp.netlify.app/">![image](https://user-images.githubusercontent.com/51524264/221661996-e14f8a54-1731-45d9-a1f6-bd6a3b7a77dd.png)</a>

## How It's Made:

- <a href="https://vitejs.dev/" target="_blank" rel="noreferrer"> <img src="https://vitejs.dev/logo-with-shadow.png" alt="Vite" width="40" height="40"> </a> - Vite as project builder
- <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript" target="_blank" rel="noreferrer"> <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/javascript/javascript-original.svg" alt="javascript" width="40" height="40"/> </a> - Vanilla JS  

### What I learned

- Positioning images within their absolutely positioned parent, dealing with layout issues that appear from this and using percentage based units so it fits
- Using DOM API with some JS algorithm knowledge to control transitions between slides.
- CSS specifics like :not selector, using CSS variables to save transition properties 
- Using visibility and toggling CSS classes is much faster than adding/removing DOM elements from the tree.

### Optimizations

Some things can be improved, for example:
- Responsiveness is still not perfect, on bigger screens, the app looks too in-the-face, on smaller screens it loses it's easy controls
- Animation of items transitioning could be done differently to prevent slides stacking on top of each other randomly with z-index changing and to prevent slides from always moving from center.
For example, we could track the next possible active item and give a new class to it, so it would appear from a different direction (visually natural). For now, I just added speed to the animation so it's not that obvious
- Some kind of a check could be added to only add slider once every image actually loads + noscript placeholder for someone who blocked JS from running

