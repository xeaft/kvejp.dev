let presserUpgraede = createUpgrade("presser", "presses melons", 10, () => {
    addClicks(0.01 * upgradeMultipliers.presser);
}, 50);

let workerUpgrade = createUpgrade("worker", "a worker in your basement. you must own the basement for them to work", 30, () => {
    if (basementOwned) {
        let workers = getUpgradeCount("worker");
        let efficiency = calculateEfficiency(workers, basementSize, 1);
        addClicks(0.1 * efficiency * upgradeMultipliers.worker);
    }
}, 50);

let grandpaKvejplUpgrade = createUpgrade("grandpa kvejpl", "grows melons in his basement", 100, () => {
    addClicks(0.15 * upgradeMultipliers["grandpa kvejpl"]);
}, 50, () => {showUpgradeButton("farmer")}, "onclick");

let farmerUpgrade = createUpgrade("farmer", "useful people for farming melons", 400, () => {
    addClicks(0.7 * upgradeMultipliers.farmer);
}, 50, () => {showUpgradeButton("melon farm")}, "onclick");

let farmUpgrade = createUpgrade("melon farm", "a farm with melons, works better with 6 farmers", 800, () => {
    let farmAmt = getUpgradeCount("melon farm");
    let farmerAmt = getUpgradeCount("farmer") + getUpgradeCount("experienced farmer");
    let closeness = closenessLevel(farmAmt * farmersPerFarm, farmerAmt) / 5;
    addClicks(1.5 * closeness * upgradeMultipliers["melon farm"]);
}, 50, () => {showUpgradeButton("farmer")}, "experienced farmer");

let experiencedFarmerUpgrade = createUpgrade("experienced farmer", "almost robotic. can work without a farm, somehow", 8000, () => {
    addClicks(30 * upgradeMultipliers["experienced farmer"]);
}, 50);

experiencedFarmerUpgrade.addLevelEvent(100, () => {
    showUpgradeButton("mecha arm");
});


farmerUpgrade.hide();
farmUpgrade.hide();
experiencedFarmerUpgrade.hide();


presserUpgraede.addLevelEvent(100, () => {
    if (getUpgradeCount("golden pressers")) {
        return;
    }
    showUpgradeButton("golden pressers");
});

workerUpgrade.addLevelEvent(100, () => {
    if (getUpgradeCount("worker raise")) {
        return;
    }
    showUpgradeButton("worker raise");
});

grandpaKvejplUpgrade.addLevelEvent(1, () => {
    farmerUpgrade.show();
}, true);
grandpaKvejplUpgrade.addLevelEvent(100, () => {
    if (getUpgradeCount("legacy tools")) {
        return;
    }
    showUpgradeButton("legacy tools");
});

farmerUpgrade.addLevelEvent(1, () => {
    farmUpgrade.show();
}, true);
farmerUpgrade.addLevelEvent(100, () => {
    if (getUpgradeCount("modern tractors")) {
        return;
    }
    showUpgradeButton("modern tractors");
});

farmUpgrade.addLevelEvent(100, () => {
    showUpgradeButton("soil soaker");
});
farmUpgrade.addLevelEvent(1, () => {
    experiencedFarmerUpgrade.show();
}, true);