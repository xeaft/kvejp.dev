let text = document.getElementsByTagName("p")[0];
let watermelon = document.getElementsByTagName("img")[0];
let watermelonGone = false;
let clicks = 0;

function changeWatermelonState(){
    watermelon.src = "/assets/melon_popped.png";
    text.innerText = "basil";
    setTimeout(() => {
        text.innerText = clicks;
    }, 75)
}

let animationInProgress = false;
function clickWatermelon() {
    if (animationInProgress) {
        return
    }
    let num = Math.round(Math.random() * 100) % 15;
    if (num == 2) {
        watermelonGone = true;
        changeWatermelonState();
        return;
    } 
    clicks += 1;
    text.innerText = clicks;
    animationInProgress = true;
    watermelon.style.scale = "120%";
    setTimeout(() => {
        watermelon.style.scale = "100%";
        setTimeout(() => {
            animationInProgress = false;
        }, 50)
    }, 100)
}

watermelon.addEventListener("click", ev => {
    if (ev.button == 0 && !watermelonGone) {
        clickWatermelon()
    }
})

watermelon.addEventListener("touchend", () => {
    if (!watermelonGone) {
        clickWatermelon(); 
    }
})