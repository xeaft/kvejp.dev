createClickerUpgrade("mouse", "allows you to click faster", 500, () => {
    clickDelay -= +(clickDelay / 10);
    explosionChance += +(explosionChance / 10);
}, "no");

createClickerUpgrade("basement size", "increases the size of your basement", 500, () => {
    basementSize += 1;
}, "no");

createClickerUpgrade("borb", "gives more melons per click", 1000, () => {
    clickMultiplier += 3;
}, "no");

createClickerUpgrade("RAT food", "increases the chance of extra melons per click", 1500, () => {
    ratClickChance += 1;
    if (getUpgradeCount("RAT food") >= 70) {
        removeUpgradeButton("RAT food");
    }
}, "no");

createClickerUpgrade("RATnip", "your RATs give you more clicks", 1500, () => {
    ratClickMultiplier += 0.1;
    if (getUpgradeCount("RATnip") >= 59) {
        removeUpgradeButton("RATnip");
    }
}, "no");