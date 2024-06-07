let text = document.getElementsByTagName("p")[0];
let watermelon = document.getElementsByTagName("img")[0];
let watermelonGone = false;
let animationInProgress = false;
let clickMultiplier = 1
let clickDelay = 50;
let animationLength = 100;

function changeWatermelonState() {
    watermelon.src = "/assets/melon_popped.png";
    text.innerText = "basil";

    setTimeout(() => {
        text.innerText = getClicks();
    }, 75)

    let bgdiv = document.getElementById("backgrounddiv");
    let hoverable = document.getElementsByClassName("-hoverable");
    let texts = document.getElementsByTagName("p");

    let allThings = [...hoverable, ...texts];
    for (let i of allThings) {
        let oldTransition = i.style.transition;
        i.style.transition = "none"
        i.style.color = "red";
        setTimeout(() => {
            i.style.transition = oldTransition;
        }, 20);
    }

    bgdiv.style.backgroundColor = "rgba(40, 0, 0, 0.8)";
}

function clickWatermelon() {
    if (animationInProgress) {
        return;
    }

    let clicks = getClicks();

    let num = Math.round(Math.random() * 100) % 15;
    if (num == 2 && clicks > 15) {
        watermelonGone = true;
        changeWatermelonState();
        return;
    }

    addClicks(1 * clickMultiplier);
    updateClicksText();

    animationInProgress = true;
    watermelon.style.scale = "120%";
    setTimeout(() => {
        watermelon.style.scale = "100%";
        setTimeout(() => {
            animationInProgress = false;
        }, clickDelay)
    }, animationLength)
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

