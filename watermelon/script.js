let text = document.getElementsByTagName("p")[0];
let watermelon = document.getElementsByTagName("img")[0];
let watermelonGone = false;
let animationInProgress = false;
let clickMultiplier = 1;
let extraClickMultiplier = 1;
let melonMultiplier = 1;
let clickDelay = 50;
let animationLength = 100;
let explosionChance = 150;
let basementOwned = false;
let basementSize = 0;
let upgradeMultipliers = {};

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

    let num = Math.round(Math.random() * explosionChance * 10) % explosionChance;
    if (num == 2 && clicks > 15) {
        watermelonGone = true;
        changeWatermelonState();
        return;
    }

    addClicks(1 * clickMultiplier * extraClickMultiplier);
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