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
    ]
}

function spawnDebuff(debuffType) {
   spawnXbuff(debuffType, "Debuff");
}

function spawnBuff(buffType) {
   spawnXbuff(buffType, "Buff");
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

    createToastNotification(`${type} gained - ${buffType} (${buff[0] / 1000}s)`);
    setTimeout(() => {
        buff[2]();
        createToastNotification(`${type} ended - ${buffType}`);
    }, buff[0]);
}