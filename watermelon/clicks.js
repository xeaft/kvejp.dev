let clicks = localStorage.getItem("clicks") != null ? +localStorage.getItem("clicks") : 0;

function getClicks() {
    return clicks;
}

function addClicks(amt) {
    clicks += amt * melonMultiplier;
}

function removeClicks(amt) {
    clicks -= amt;
}

function saveClicks() {
    localStorage.setItem("clicks", clicks);
}

function getUpgradeCount(upgrade) {
    let upgradeButton = document.getElementById(`${upgrade}-upgrade`);
    if (upgradeButton == null) {
        return 0;
    }
    
    return +upgradeButton.querySelector(".upgrade-owned").innerText;
}

function getUpgradeCost(upgrade) {
    let upgradeButton = document.getElementById(`${upgrade}-upgrade`);
    if (upgradeButton == null) {
        return 0;
    }
    
    return +upgradeButton.querySelector(".upgrade-cost").innerText;
}

function buyUpgrade(upgrade, amt, force) {
    if (amt == null) {
        amt = 1;
    }
    
    let upgradeButton = document.getElementById(`${upgrade}-upgrade`);
    if (upgradeButton) {
        if (force) {
            console.log(
                "%cu%cp%cg%cr%ca%cd%ce",
                "color: red; background-color: #222; font-weight: bold;",
                "color: green; background-color: #323232; font-weight: bold;",
                "color: red; background-color: #222; font-weight: bold;",
                "color: green; background-color: #323232; font-weight: bold;",
                "color: red; background-color: #222; font-weight: bold;",
                "color: green; background-color: #323232; font-weight: bold;",
                "color: red; background-color: #222; font-weight: bold;"
              );        
        }

        for (let i = 0; i < amt; i++) {
            let upgradePrice = getUpgradeCost(upgrade);
            if (force) {
                removeClicks(-upgradePrice);          
            }
            
            if (getClicks() >= upgradePrice) {
                upgradeButton.click();
            } else {
                return false;
            }
        }

        return true;
    }
}
 
function removeUpgradeButton(upgradeName) {
    let upgradeButton = document.getElementById(`${upgradeName}-upgrade`);
    if (upgradeButton) {
        upgradeButton.style.display = "none";
    }
}

function showUpgradeButton(upgradeName) {
    let upgradeButton = document.getElementById(`${upgradeName}-upgrade`);
    if (upgradeButton) {
        upgradeButton.style.display = "flex";
    }
}

function updateClicksText() {
    let costTexts = document.getElementsByClassName("upgrade-cost");
    for (let costText of costTexts) {
        let oldCost = costText.parentElement.parentElement.querySelector(".original-cost-text").innerText;
        let cost = oldCost * globalPriceMultiplier;
        costText.innerText = Math.ceil(cost);        
        if (cost <= clicks) {
            costText.style.color = "#00c400";
        } else {
            costText.style.color = "#c40000";
        }
    }

    document.getElementById("clicks-count").innerText = Math.round(clicks);
}

function createToastNotification(text) {
    let textObj = document.createElement("p");
    let toasts = Array.from(document.getElementsByClassName("toast-notification"));

    for (let [index, toast] of toasts.entries()) {
        toast.style.top = (toasts.length - index) * 50 + "px";
    }

    textObj.className = "toast-notification";
    textObj.innerText = text;
    document.body.appendChild(textObj);
    setTimeout(() => {
        textObj.parentElement.removeChild(textObj);
    }, 4000);
}

function upgradeEverythingPossible(reverse) {
    let upgrades = Array.from(document.getElementsByClassName("upgrade-button"));
    if (reverse) {
        upgrades.reverse();
    }
    for (let i of upgrades) {
        if (i.style.display == "none") {
            continue;
        }

        let upgradeName = i.querySelector(".upgrade-container").querySelector("p").innerText;
        let canUpgrade = true;

        while (canUpgrade) {
            canUpgrade = buyUpgrade(upgradeName);
        }
    }
}

function rollXBuff() {
    let number = Math.round(Math.random() * 99);
    if (number > 30) {
        return;
    }

    let choice = Math.round(Math.random() * 100);
    if (choice < 40) {
        let debuffNames = Object.keys(debuffs);
        let debuffIndex = Math.round(Math.random() * (debuffNames.length - 1));
        let debuffName = debuffNames[debuffIndex];
        spawnDebuff(debuffName);
        return;
    }

    let buffNames = Object.keys(buffs);
    let buffIndex = Math.round(Math.random() * (buffNames.length - 1));
    let buffName = buffNames[buffIndex];
    spawnBuff(buffName);
}

setInterval(saveClicks, 0.167 * 1000 * 60);
setInterval(updateClicksText, 60);
setInterval(rollXBuff, 30000);