let mouseUpgrade = createClickerUpgrade("mouse", "allows you to click faster", 500, () => {
    clickDelay -= +(clickDelay / 10);
    explosionChance += +(explosionChance / 10);
}, "no", "clicker");

let basementSizeUpgrade = createClickerUpgrade("basement size", "increases the size of your basement", 500, () => {
    basementSize += 2;
}, "no", "clicker");

let borbUpgrade = createClickerUpgrade("borb", "gives more melons per click", 1000, () => {
    clickMultiplier += (3 * getUpgradeCount("borb") * borbMultiplier);
}, "no", "clicker");

let ratFoodUpgrade = createClickerUpgrade("RAT food", "increases the chance of extra melons per click", 1500, () => {
    if (!getUpgradeCount("diamond RATs")) {
        ratClickChance += 1;
    }
}, "no", "clicker");

let ratNipUpgrade = createClickerUpgrade("RATnip", "your RATs give you more clicks", 1500, () => {
    ratClickMultiplier += 0.1;
}, "no", "clicker");

let ratNip2Upgrade = createClickerUpgrade("RATnip 2", "more clicks by your RATs, now again.", 300000, () => {
    ratClickMultiplier += 0.1;
}, "no", "clicker")

let diamondPowderUpgrade = createClickerUpgrade("diamond powder", "feeds diamond RATs", 6_500_000, () => {
    ratClickChance++;
}, "no", "clicker")

let diamondPurifierUpgrade = createClickerUpgrade("diamond purifier", "with each upgrade, your diamond clicks are more pure. (more clicks)", 6_500_000, () => {
    diamondRatClickMultiplier += 0.2;
}, "no", "clicker")

ratFoodUpgrade.addLevelEvent(70, () => {
    if (getUpgradeCount("borb") >= 100 && getUpgradeCount("RATnip") == 60 && getUpgradeCount("RATnip 2") < 60) {
        showUpgradeButton("RATnip 2");
    }
    ratFoodUpgrade.hide();
    ratFoodUpgrade.preventUpgrades(true);
}, true, "clicker");

ratNipUpgrade.addLevelEvent(60, () => {
    if (getUpgradeCount("borb") >= 100 && getUpgradeCount("RAT food") == 70 && getUpgradeCount("RATnip 2") < 60) {
        showUpgradeButton("RATnip 2");
    }
    ratNipUpgrade.hide();
    ratNipUpgrade.preventUpgrades(true);
}, true, "clicker");

ratNip2Upgrade.addLevelEvent(60, () => {
    ratNip2Upgrade.hide();
    ratNip2Upgrade.preventUpgrades(true);
}, true, "clicker");

diamondPowderUpgrade.addLevelEvent(70, () => {
    diamondPowderUpgrade.hide();
    diamondPowderUpgrade.preventUpgrades(true);
}, true, "clicker");

diamondPurifierUpgrade.addLevelEvent(100, () => {
    diamondPurifierUpgrade.hide();
    diamondPurifierUpgrade.preventUpgrades(true);
}, true, "clicker");

mouseUpgrade.addLevelEvent(80, () => {
    clickDelay = 0;
    explosionChance = Infinity;
    mouseUpgrade.hide();
    mouseUpgrade.preventUpgrades(true);
}, true, "clicker");

// borbUpgrade.addLevelEvent(50, () => {
//     upgradeObjects["fast borbs"].show();
// }, true, "clicker");