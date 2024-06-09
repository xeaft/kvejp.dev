let text = document.getElementsByTagName("p")[0];
let watermelon = document.getElementsByTagName("img")[0];
let watermelonGone = false;
let animationInProgress = false;
let clickMultiplier = 1;
let extraClickMultiplier = 1;
let melonMultiplier = 1;
let clickDelay = 200;
let animationLength = 100;
let explosionChance = 150;
let basementOwned = false;
let basementSize = 0;
let farmersPerFarm = 6
let upgradeMultipliers = {};
let ratOwned = false;
let ratClickChance = 5;
let ratClickMultiplier = 1.1;
let globalPriceMultiplier = 1;
let priceMultipliers = {};
let striking = {};

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

function clickWatermelon(x, y) {
    if (animationInProgress) {
        return;
    }

    let clicks = getClicks();

    let num = Math.round(Math.random() * explosionChance * 10) % explosionChance;
    if (num == 2 && clicks > 15) {
        watermelonGone = true;
        changeWatermelonState();
        return;
    }

    let isCritical = false;

    if (ratOwned) {
        let randomNumber = Math.round(Math.random() * 100);
        if (randomNumber < ratClickChance) {
            isCritical = true;
        }
    }

    let clicksToGet = 1 * clickMultiplier * extraClickMultiplier * (isCritical ? ratClickMultiplier : 1);
    let randomOffset = Math.floor(Math.random() * 20) - 9;
    let clickText = document.createElement("p");
    let clickTextText = "+" + (Math.round(clicksToGet * 100) / 100);
    let clickTextWidth = getTextSize(clickTextText)
    clickText.className = "click-text";
    clickText.innerText = clickTextText;
    clickText.style.position = "absolute";
    clickText.style.left = x - 10 + randomOffset - Math.floor(clickTextWidth.width / 2) + "px";
    clickText.style.top = y - 30 + "px";

    if (isCritical) {
        clickText.style.color = "gold";
    }

    document.body.appendChild(clickText);
    setTimeout(() => {
        clickText.parentElement.removeChild(clickText);
    }, 4200);

    setTimeout(() => {
        let dropImage = document.createElement("img");
        let xOffset = Math.min(600, window.innerWidth);
        let posX = Math.round(Math.random() * xOffset);
        dropImage.className = "drop-image";
        dropImage.src = "/assets/melon.png";
        dropImage.style.top = "-50px";
        dropImage.style.left = Math.floor(window.innerWidth / 2) - xOffset / 2 + posX + "px";
        document.body.appendChild(dropImage);

        setTimeout(() => {
            dropImage.parentElement.removeChild(dropImage);
        }, 6000);
    }, 350);

    addClicks(clicksToGet);
    updateClicksText();

    animationInProgress = true;
    watermelon.style.scale = "120%";

    setTimeout(() => {
        watermelon.style.scale = "100%";
    }, animationLength);

    setTimeout(() => {
        animationInProgress = false;
    }, clickDelay);
}

watermelon.addEventListener("click", ev => {
    if (ev.button == 0 && !watermelonGone) {
        clickWatermelon(ev.clientX, ev.clientY)
    }
})

watermelon.addEventListener("touchend", (ev) => {
    if (!watermelonGone) {
        let touch = ev.changedTouches[0];
        clickWatermelon(touch.clientX, touch.clientY);
    }
})

let mobileUpgradeButtons = document.getElementsByClassName("mobile-upgrade-category-button");
let upgradeShops = document.getElementsByClassName("upgrade-shop");
for (let btt of mobileUpgradeButtons) {
    btt.addEventListener("touchend", (ev) => {
        for (let btt2 of mobileUpgradeButtons) {
            btt2.classList.remove("active");
        };
        
        let buttonType = "onetime";
        let buttonText = btt.querySelector("p").innerText;

        if (buttonText == "Progressive") {
            buttonType = "upgrade";
        } else if (buttonText == "Other") {
            buttonType =  "clicker";
        }

        for (let uShop of upgradeShops) {
            let shopType = uShop.id;
            if (shopType.startsWith(buttonType)) {
                uShop.style.display = "flex";
            } else {
                uShop.style.display = "none";
            }
        }

        btt.classList.add("active");
    })
}