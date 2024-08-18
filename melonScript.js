let text = document.getElementsByTagName("p")[0];
let watermelon = document.getElementsByTagName("img")[0];
let compactClicksText = document.getElementById("compact-click-text");
let watermelonGone = false;
let animationInProgress = false;
let clickMultiplier = 1;
let extraClickMultiplier = 1;
let melonMultiplier = 1;
let clickDelay = 200;
let animationLength = 100;
let explosionChance = 150;
let basementOwned = false;
let basementSize = 2;
let farmersPerFarm = 4;
let upgradeMultipliers = {};
let ratOwned = false;
let diamondRatsOwned = false;
let ratClickChance = 5;
let ratClickMultiplier = 1.1;
let diamondRatClickMultiplier = 1.3;
let globalPriceMultiplier = 1;
let priceMultipliers = {};
let striking = {};
let upgradeObjects = {};
let heldKeys = {};
let isMobileUI = false;
let mobileMultibuyAmount = 1;
let mobileMultibuyOptions = [1, 5, 10, 50, 100];
let clicksSinceLastSession = 0;
let borbMultiplier = 1;
let clickerUpgradeShop = document.getElementById("clicker-upgrade-shop");
let onetimeUpgradeShop = document.getElementById("onetime-upgrade-shop");
let mainElement = this.document.getElementsByTagName("main")[0];
let pcShopsContainer = this.document.getElementById("clicker-onetime-shops-container");
let pcShopButtonContainer = this.document.getElementById("pc-other-shops-container");
let upgradeShop = this.document.getElementById("upgrade-shop");
let mobileButtons = this.document.getElementsByClassName("mobile-upgrade-category-button");
function clickWatermelon(x, y) {
    if (animationInProgress) {
        return;
    }

    let isCritical = false;
    let isDiamond = false;
    let randomNumber = Math.round(Math.random() * 100);

    if (ratOwned && !diamondRatsOwned) {
        if (randomNumber < ratClickChance) {
            isCritical = true;
        }
    } else {
        if (diamondRatsOwned) {
            isCritical = true;
            if (randomNumber < ratClickChance) {
                isDiamond = true;
            }
        }
    }

    let clicksToGet = clickMultiplier * extraClickMultiplier * (isCritical ? ratClickMultiplier : 1) * (isDiamond ? diamondRatClickMultiplier : 1);
    let randomOffset = Math.floor(Math.random() * 20) - 9;

    if (!settings.get("Compact Clicks Text")) {
        let clickText = document.createElement("p");
        let clickTextText = "+" + (Math.round(clicksToGet * 100) / 100);
        let clickTextWidth = getTextSize(clickTextText);
        clickText.className = "click-text";
        clickText.innerText = clickTextText;
        clickText.style.position = "absolute";
        clickText.style.left = x - 10 + randomOffset - Math.floor(clickTextWidth.width / 2) + "px";
        clickText.style.top = y - 30 + "px";

        let rotationAngle = 0;
        let textSize = 22
        if (isCritical) {
            clickText.style.color = "gold";
            rotationAngle = Math.round(Math.random() * 15) - 7;

            if (isDiamond) {
                rotationAngle = Math.round(Math.random() * 45) - 22;
                textSize = 26;
                clickText.style.color = "cyan";
            }
            clickText.style.setProperty("--rotation", `${rotationAngle}deg`);
            clickText.style.setProperty("--text-size", `${textSize}px`);
        }

        document.body.appendChild(clickText);
        setTimeout(() => {
            try {
                clickText.parentElement.removeChild(clickText);
            } catch {}
        }, 4200);
    } else {
        let clicks = Math.round(clicksToGet * 100) / 100;
        clicksSinceLastSession += clicks;
        compactClicksText.innerText = `+ ${Math.round(clicksSinceLastSession * 100) / 100}`;
        let cClicksSinceLastSession = clicksSinceLastSession;

        setTimeout(() => {
            if (cClicksSinceLastSession == clicksSinceLastSession) {
               compactClicksText.innerText = "";
               clicksSinceLastSession = 0; 
            }
        }, 2000);
    }

    setTimeout(() => {
        if (settings.get("Low Detail Mode")) {
            return;
        }

        let dropImage = document.createElement("img");
        let xOffset = Math.min(600, window.innerWidth);
        let posX = Math.round(Math.random() * xOffset);
        dropImage.className = "drop-image";
        dropImage.src = "/assets/melon.png";
        dropImage.style.top = "-50px";
        dropImage.style.left = Math.floor(window.innerWidth / 2) - xOffset / 2 + posX + "px";
        document.body.appendChild(dropImage);

        setTimeout(() => {
            try {
                dropImage.parentElement.removeChild(dropImage);
            } catch {}
        }, 6000);
    }, 350);

    addClicks(clicksToGet);
    updateClicksText();

    animationInProgress = true;

    setTimeout(() => {
        animationInProgress = false;
    }, clickDelay);
}

watermelon.addEventListener("mousedown", (ev) => {
    if (ev.button == 0) {
        watermelon.style.scale = "120%";
    }
});

watermelon.addEventListener("mouseup", (ev) => {
    if (ev.button == 0) {
        clickWatermelon(ev.clientX, ev.clientY);
        watermelon.style.scale = "100%";
    }
});

watermelon.addEventListener("touchstart", (ev) => {
    watermelon.style.scale = "120%";
});

watermelon.addEventListener("touchend", (ev) => {
    if (!watermelonGone) {
        let touch = ev.changedTouches[0];
        clickWatermelon(touch.clientX, touch.clientY);
        watermelon.style.scale = "100%";
    }
});

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

let pcUpgradeButtons = document.getElementsByClassName("pc-upgrade-category-button");

for (let btt of pcUpgradeButtons) {
    btt.addEventListener("click", (ev) => {
        if (ev.button != 0) {
            return;
        }

        for (let btt2 of pcUpgradeButtons) {
            btt2.classList.remove("active");
        };
        
        let buttonType = "onetime";
        let buttonText = btt.querySelector("p").innerText;

        if (buttonText == "Other") {
            buttonType =  "clicker";
        }

        for (let uShop of upgradeShops) {
            let shopType = uShop.id;
            if (shopType.startsWith("upgrade")) {
                continue;
            }

            if (shopType.startsWith(buttonType)) {
                uShop.style.display = "flex";
            } else {
                uShop.style.display = "none";
            }
        }

        btt.classList.add("active");
    })
}

window.addEventListener("keydown", (ev) => {
    heldKeys[ev.key] = true;
});

window.addEventListener("keyup", (ev) => {
    heldKeys[ev.key] = false;
});

window.addEventListener('resize', () => {
    isMobileUI = this.window.innerWidth < 768;

    if (isMobileUI) {
        mainElement.appendChild(clickerUpgradeShop);
        mainElement.appendChild(onetimeUpgradeShop);
        pcShopsContainer.style.display = "none";
        
        let touch = new Touch({
            identifier: Date.now(),
            target: pcShopButtonContainer.children[0],
            clientX: 0,
            clientY: 0
        });
        
        let touchList = [touch];
        
        let touchEndEvent = new TouchEvent('touchend', {
            changedTouches: touchList 
        });
    
        mobileButtons[1].dispatchEvent(touchEndEvent);
    } else {
        pcShopsContainer.style.display = "flex";
        pcShopsContainer.appendChild(clickerUpgradeShop);
        pcShopsContainer.appendChild(onetimeUpgradeShop);
        upgradeShop.style.display = "flex";
        pcShopButtonContainer.children[0].click();
    }    
});

window.dispatchEvent(new Event('resize'));

let mobileMultibuyButton = document.getElementById("mobile-multibuy-button");
mobileMultibuyButton.addEventListener("click", (ev) => {
    if (ev.button == 0) {
        let ind = mobileMultibuyOptions.indexOf(mobileMultibuyAmount);
        if (ind == -1) {
            createToastNotification("Invalid multibuy value", "#f44");
            mobileMultibuyAmount = 1;
            return;
        }
        let newInd = (ind + 1) % mobileMultibuyOptions.length;
        mobileMultibuyAmount = mobileMultibuyOptions[newInd];

        document.getElementById("mobile-multibuy-text").innerText = mobileMultibuyAmount;
    }
})

setInterval(() => {
    localStorage.setItem("last-online", Date.now());
}, 1000);

function getIdleRewards() {
    let lastOnline = localStorage.getItem("last-online");
    if (lastOnline === null) {
        return;
    }
    
    lastOnlineSeconds = +lastOnline / 1000;
    let cTimeSeconds = Date.now() / 1000;
    let secondsPassed = cTimeSeconds - lastOnlineSeconds;
    if (secondsPassed > 3000){
        for (let i = 0; i < secondsPassed / 20; i++) {
            for (let upgrade in upgradeObjects) {
                let upgObj = upgradeObjects[upgrade];
                if (getUpgradeCount(upgrade) > 0) {
                    upgObj.callback(upgrade);
                }
            }
        }
    }
    localStorage.setItem("last-online", Date.now());
}