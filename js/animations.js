const slider = document.querySelector(".brands-slider");
let isDown = false;
let startX;
let scrollLeft;

// Auto scroll
let scrollAmount = 0;
function autoScroll(){
    scrollAmount += 1; // speed
    if(scrollAmount > slider.scrollWidth - slider.clientWidth){
        scrollAmount = 0;
    }
    slider.scrollLeft = scrollAmount;
    requestAnimationFrame(autoScroll);
}
requestAnimationFrame(autoScroll);

// Drag to scroll
slider.addEventListener("mousedown", (e)=>{
    isDown = true;
    startX = e.pageX - slider.offsetLeft;
    scrollLeft = slider.scrollLeft;
    cancelAnimationFrame(autoScroll); // pause auto scroll while dragging
});
slider.addEventListener("mouseleave",()=>{isDown=false; requestAnimationFrame(autoScroll);});
slider.addEventListener("mouseup",()=>{isDown=false; requestAnimationFrame(autoScroll);});
slider.addEventListener("mousemove",(e)=>{
    if(!isDown) return;
    e.preventDefault();
    const x = e.pageX - slider.offsetLeft;
    const walk = (x - startX)*2;
    slider.scrollLeft = scrollLeft - walk;
});