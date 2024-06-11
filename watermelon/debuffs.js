let buffs = {
    "black friday": [
        30000,
        () => {
            globalPriceMultiplier = 0.75;
        },
        () => {
            globalPriceMultiplier = 1;
        }
    ],
    "quick growth": [
        30000,
        () => {
            melonMultiplier += 1;
        },
        () => {
            melonMultiplier -= 1;
        }
    ],
    "RAT effect": [
        60000,
        () => {
            ratClickChance += 100;
            ratClickMultiplier += 5;
            ratOwned += 1;
        },
        () => {
            ratClickChance -= 100;
            ratClickMultiplier -= 5;
            ratOwned -= 1;
        }
    ],
    "swedish friday": [
        -1,
        () => {
            removeClicks(-(getClicks() / 10));
        }
    ]
}

let debuffs = {
    "strike": [
        30000, // length (ms)
        () => { // start function
            striking["worker"] = true;
            striking["grandpa kvejpl"] = true;
            striking["farmer"] = true;
            striking["experienced farmer"] = true;
        },
        () => { // end function
            striking["worker"] = false;
            striking["grandpa kvejpl"] = false;
            striking["farmer"] = false;
            striking["experienced farmer"] = false;
        }
    ],
    "dry soil": [
        30000,
        () => {
            melonMultiplier -= 0.5;
        },
        () => {
            melonMultiplier += 0.5;
        }
    ],
    // "micromelon recall": [
    //     -1,
    //     () => {

    //     }
    // ]
}

function spawnDebuff(debuffType) {
   spawnXbuff(debuffType, "Debuff");
}

function spawnBuff(buffType) {
   spawnXbuff(buffType, "Buff");
}

function addStatusText(text, durationSeconds, XbuffType) {
    if (isMobile) {
        return;
    }

    let isPositive = XbuffType == "Buff";
    let conatiner = document.getElementById("status-effect-container");
    conatiner.style.display = "flex";

    let textElement = document.createElement("p");
    textElement.className = "status-effect-text";
    textElement.innerText = `${text} (${durationSeconds}s)`;
    
    let textWidth = getTextSize(`${text} (${durationSeconds}s)`).width;
    conatiner.style.width = textWidth + 50 + "px";
    
    textElement.style.color = isPositive ? "#8f8" : "#f44";
    conatiner.appendChild(textElement);
    
    let timeLeft = durationSeconds;
    let interval = setInterval(() => {
        timeLeft -= 1;
        
        let textWidth = getTextSize(`${text} (${timeLeft}s)`).width;
        conatiner.style.width = textWidth + 50 + "px";
        textElement.innerText = `${text} (${timeLeft}s)`;

        if (timeLeft == 0) {
            clearInterval(interval);
            conatiner.style.display = "none";
            textElement.parentElement.removeChild(textElement);
        }
    }, 1000)
}

function spawnXbuff(buffType, type) {
    let allBuffs = {...buffs, ...debuffs};
    let buff = allBuffs[buffType];
    let buffTime = buff[0];

    buff[1]();
    
    if (buffTime < 0) {
        createToastNotification(`${type} gained - ${buffType}`);
        return;
    }

    addStatusText(buffType, buffTime / 1000, type)
    createToastNotification(`${type} gained - ${buffType} (${buff[0] / 1000}s)`);

    setTimeout(() => {
        buff[2]();
        createToastNotification(`${type} ended - ${buffType}`);
    }, buff[0]);
}