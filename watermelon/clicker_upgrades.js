let mouseUpgrade = createClickerUpgrade("mouse", "allows you to click faster", 500, () => {
    clickDelay -= +(clickDelay / 10);
    explosionChance += +(explosionChance / 10);
}, "no");

let basementSizeUpgrade = createClickerUpgrade("basement size", "increases the size of your basement", 500, () => {
    basementSize += 2;
}, "no");

let borbUpgrade = createClickerUpgrade("borb", "gives more melons per click", 1000, () => {
    clickMultiplier += 3;
}, "no");

let ratFoodUpgrade = createClickerUpgrade("RAT food", "increases the chance of extra melons per click", 1500, () => {
    ratClickChance += 1;
}, "no");

let ratNipUpgrade = createClickerUpgrade("RATnip", "your RATs give you more clicks", 1500, () => {
    ratClickMultiplier += 0.1;
}, "no");


ratFoodUpgrade.addLevelEvent(70, () => {
    ratFoodUpgrade.hide();
    ratFoodUpgrade.preventUpgrades(true);
}, true);

ratNipUpgrade.addLevelEvent(60, () => {
    ratNipUpgrade.hide();
    ratNipUpgrade.preventUpgrades(true);
}, true);

mouseUpgrade.addLevelEvent(80, () => {
    clickDelay = 0;
    explosionChance = Infinity;
    mouseUpgrade.hide();
    mouseUpgrade.preventUpgrades(true);
}, true);

// borbUpgrade.addLevelEvent(50, () => {
//     upgradeObjects["fast borbs"].show();
// }, true);