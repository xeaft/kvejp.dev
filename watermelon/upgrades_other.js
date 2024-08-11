// todo: dont be lazy and make the createOneTimeUpgrade normal.
removeUpgradeButton("golden pressers");
removeUpgradeButton("worker raise");
removeUpgradeButton("legacy tools");
removeUpgradeButton("modern tractors");
removeUpgradeButton("soil soaker");
removeUpgradeButton("mecha arm");
removeUpgradeButton("gpt premium");
removeUpgradeButton("melons 11 debloat");
removeUpgradeButton("advanced bottles");
removeUpgradeButton("overthrow");
removeUpgradeButton("brownfields");
removeUpgradeButton("electricity overflow");
removeUpgradeButton("melonpad calculator");
removeUpgradeButton("fortunate miners");
removeUpgradeButton("more melons");
removeUpgradeButton("diamond RATs");
removeUpgradeButton("RATnip 2");
removeUpgradeButton("strong borbs");
removeUpgradeButton("big borbs");
removeUpgradeButton("superior borbs");
removeUpgradeButton("godlike borbs");

if (!getUpgradeCount("RATs")) {
    removeUpgradeButton("RAT food")
    removeUpgradeButton("RATnip")    
}
if (!getUpgradeCount("diamond RATs")) {
    removeUpgradeButton("diamond powder");
    removeUpgradeButton("diamond purifier");
}
if (getUpgradeCount("borb") >= 100 && getUpgradeCount("RATnip") == 60 && getUpgradeCount("RAT food") == 70 && getUpgradeCount("RATnip 2") < 60) {
    showUpgradeButton("RATnip 2");
}

presserUpgraede.addLevelEvent(100, () => {
    if (getUpgradeCount("golden pressers")) {
        return;
    }
    showUpgradeButton("golden pressers");
    showUpgradeButton("more melons")
}, true);

workerUpgrade.addLevelEvent(100, () => {
    if (getUpgradeCount("worker raise")) {
        return;
    }
    showUpgradeButton("worker raise");
}, true);

grandpaKvejplUpgrade.addLevelEvent(100, () => {
    if (getUpgradeCount("legacy tools")) {
        return;
    }
    showUpgradeButton("legacy tools");
}, true);

farmerUpgrade.addLevelEvent(100, () => {
    if (getUpgradeCount("modern tractors")) {
        return;
    }
    showUpgradeButton("modern tractors");
}, true);

farmUpgrade.addLevelEvent(100, () => {
    showUpgradeButton("soil soaker");
}, true);

experiencedFarmerUpgrade.addLevelEvent(100, () => {
    showUpgradeButton("mecha arm");
}, true);

experiencedFarmerUpgrade.addLevelEvent(100, () => {
    showUpgradeButton("gpt premium");
}, true);

experiencedFarmerUpgrade.addLevelEvent(100, () => {
    showUpgradeButton("melons 11 debloat");
}, true);

experiencedFarmerUpgrade.addLevelEvent(100, () => {
    showUpgradeButton("advanced bottles");
}, true);

experiencedFarmerUpgrade.addLevelEvent(100, () => {
    showUpgradeButton("overthrow");
}, true);

experiencedFarmerUpgrade.addLevelEvent(100, () => {
    showUpgradeButton("brownfields");
}, true);

experiencedFarmerUpgrade.addLevelEvent(100, () => {
    showUpgradeButton("electricity overflow");
}, true);

experiencedFarmerUpgrade.addLevelEvent(100, () => {
    showUpgradeButton("melonpad calculator");
}, true);

experiencedFarmerUpgrade.addLevelEvent(100, () => {
    showUpgradeButton("fortunate miners");
}, true);

borbUpgrade.addLevelEvent(70, () => {
    showUpgradeButton("strong borbs");
}, true)

borbUpgrade.addLevelEvent(100, () => {
    if (getUpgradeCount("RATnip") == 60 && getUpgradeCount("RAT food") == 70 && getUpgradeCount("RATnip 2") < 60) {
        showUpgradeButton("RATnip 2");
    }
})

borbUpgrade.addLevelEvent(150, () => {
    showUpgradeButton("big borbs");
}, true)

borbUpgrade.addLevelEvent(200, () => {
    showUpgradeButton("superior borbs");
}, true)

borbUpgrade.addLevelEvent(250, () => {
    showUpgradeButton("godlike borbs");
}, true)

ratNip2Upgrade.addLevelEvent(30, () => {
    removeUpgradeButton("RATnip 2");
    showUpgradeButton("diamond RATs");
}, true)


let entries = Object.entries(upgradeObjects);
for (let [index, [_key, val]] of Object.entries(upgradeObjects).entries()) {
    if (index < 3) {
        continue;
    }

    if (val.type == "clicker") {
        continue;
    }

    val.hide();

    entries[index - 1][1].addLevelEvent(1, () => {
        val.show();
    }, true);
}

createToastNotification("getting idle rewards. wait")
getIdleRewards();