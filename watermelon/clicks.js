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
            if (force) {
                removeClicks(-getUpgradeCost(upgrade));          
            }

            upgradeButton.click();
        }
    }
}
 
function removeUpgradeButton(upgradeName) {
    let upgradeButton = document.getElementById(`${upgradeName}-upgrade`);
    if (upgradeButton) {
        upgradeButton.parentElement.removeChild(upgradeButton);
    }
}

function updateClicksText() {
    let costTexts = document.getElementsByClassName("upgrade-cost");
    for (let costText of costTexts) {
        let cost = +costText.innerText;
        if (cost <= clicks) {
            costText.style.color = "#00c400";
        } else {
            costText.style.color = "#c40000";
        }
    }

    document.getElementById("clicks-count").innerText = Math.round(clicks);
}

setInterval(saveClicks, 0.167 * 1000 * 60);
setInterval(updateClicksText, 60);