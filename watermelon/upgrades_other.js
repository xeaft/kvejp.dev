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

presserUpgraede.addLevelEvent(100, () => {
    if (getUpgradeCount("golden pressers")) {
        return;
    }
    showUpgradeButton("golden pressers");
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

getIdleRewards();