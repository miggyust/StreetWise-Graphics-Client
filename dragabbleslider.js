
/*  FOR THE DESIGNS, NEW ARRIVALS AND SHIRTS DRAGABBLE IMAGE SLIDER AND 
    THE CURSOR WILL CHANGE WHEN BEING DRAGGED.
*/


const sliderNew = document.querySelector(".container--collection__newarrivals");
const sliderDesigns = document.querySelector(".container--collection__designs");
const sliderShirts = document.querySelector(".container--collection__shirts");   

let isClicked = false;
let startX;
let scrollLeft;

//Draggable Slider for New Arrivals
sliderNew.addEventListener('mousedown', (e) =>{
    isClicked = true;
    startX = e.pageX - sliderNew.offsetLeft;
    scrollLeft = sliderNew.scrollLeft;
    sliderNew.style.cursor = "grabbing";
    
});

sliderNew.addEventListener('mouseleave', () => {
    isClicked = false;
    sliderNew.style.cursor = "grab";
    
});

sliderNew.addEventListener('mouseup' ,() => {
    isClicked = false;
    sliderNew.style.cursor = "grab";
});

sliderNew.addEventListener('mousemove', (e) =>{
    if(!isClicked) return;
    e.preventDefault();
    const x = e.pageX - sliderNew.offsetLeft;
    const scroll = (x - startX) * 1;
    sliderNew.scrollLeft = scrollLeft - scroll;
});

//Dragabble for Designs
sliderDesigns.addEventListener('mousedown', (e) =>{
    isClicked = true;
    startX = e.pageX - sliderDesigns.offsetLeft;
    scrollLeft = sliderDesigns.scrollLeft;
    sliderDesigns.style.cursor = "grabbing";
    
});

sliderDesigns.addEventListener('mouseleave', () => {
    isClicked = false;
    sliderDesigns.style.cursor = "grab";
    
});

sliderDesigns.addEventListener('mouseup' ,() => {
    isClicked = false;
    sliderDesigns.style.cursor = "grab";
});

sliderDesigns.addEventListener('mousemove', (e) =>{
    if(!isClicked) return;
    e.preventDefault();
    const x = e.pageX - sliderDesigns.offsetLeft;
    const scroll = (x - startX) * 1;
    sliderDesigns.scrollLeft = scrollLeft - scroll;
});

////Dragabble for Shirts
sliderShirts.addEventListener('mousedown', (e) =>{
    isClicked = true;
    startX = e.pageX - sliderShirts.offsetLeft;
    scrollLeft = sliderShirts.scrollLeft;
    sliderShirts.style.cursor = "grabbing";
    
});

sliderShirts.addEventListener('mouseleave', () => {
    isClicked = false;
    sliderShirts.style.cursor = "grab";
    
});

sliderShirts.addEventListener('mouseup' ,() => {
    isClicked = false;
    sliderShirts.style.cursor = "grab";
});

sliderShirts.addEventListener('mousemove', (e) =>{
    if(!isClicked) return;
    e.preventDefault();
    const x = e.pageX - sliderShirts.offsetLeft;
    const scroll = (x - startX) * 1;
    sliderShirts.scrollLeft = scrollLeft - scroll;
});




