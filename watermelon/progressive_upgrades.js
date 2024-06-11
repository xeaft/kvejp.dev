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

let grandpaKvejplUpgrade = createUpgrade("grandpa kvejpl", "grows melons in his basement", 100, (name) => {
    addClicks(0.15 * upgradeMultipliers[name]);
}, 50, () => {showUpgradeButton("farmer")}, "onclick");

let farmerUpgrade = createUpgrade("farmer", "useful people for farming melons", 400, (name) => {
    addClicks(0.7 * upgradeMultipliers[name]);
}, 50, () => {showUpgradeButton("melon farm")}, "onclick");

let farmUpgrade = createUpgrade("melon farm", "a farm with melons, works better with 6 farmers", 800, (name) => {
    let farmAmt = getUpgradeCount("melon farm");
    let farmerAmt = getUpgradeCount("farmer") + getUpgradeCount("experienced farmer");
    let closeness = closenessLevel(farmAmt * farmersPerFarm, farmerAmt) / 5;
    addClicks(1.5 * closeness * upgradeMultipliers[name]);
}, 50, () => {showUpgradeButton("farmer")}, "experienced farmer");

let experiencedFarmerUpgrade = createUpgrade("experienced farmer", "almost robotic. can work without a farm, somehow", 8000, (name) => {
    addClicks(25 * upgradeMultipliers[name]);
}, 50);

let melonMineUpgrade = createUpgrade("melon mine", "an abandoned mine with plenty of melons", 20_000, (name) => {
    addClicks(70 * upgradeMultipliers[name]);
}, 50);

let melonIntelligenceUpgrade = createUpgrade("melon intelligence", "plant with intelligent new tools. everywhere melons matter.", 65_000, (name) => {
    addClicks(250 * upgradeMultipliers[name]);
}, 50);

let melonFactoryUpgrade = createUpgrade("melon factory", "melon! = ?", 350_000, (name) => {
    addClicks(1200 * upgradeMultipliers[name]);
}, 50);

let melonPlantationUpgrade = createUpgrade("melon plantation", "theyre more efficient than farms", 1_250_000, (name) => {
    addClicks(4750 * upgradeMultipliers[name]);
}, 50);

let melonEmpireUpgrade = createUpgrade("melon empire", "en empire made out of melons, not sure how it helps though", 22_750_000, (name) => {
    addClicks(75_000 * upgradeMultipliers[name]);
}, 50);

// let karelTheDinosaur = createUpgrade("karel the dinosaur", "a sentient dinosaur. needs to be communicated with using the talafon", 175_500_000, (name) => {
//     if (!getUpgradeCount("talafon")) {
//         addClicks(525_000 * upgradeMultipliers[name]);
//     }
// }, 50);

let melonScientistUpgrade = createUpgrade("melon scientist", "because science can make melons.", 400_000_000, (name) => {
    addClicks(1_100_000 * upgradeMultipliers[name]);
}, 50);

let comelonMinusPcUpgrade = createUpgrade("comelon minus pc", "melons with pre-installed spyware. runs really quickly tho", 1_500_000_000, (name) => {
    addClicks(3_500_000 * upgradeMultipliers[name]);
}, 50);

let asdasd = createUpgrade("melon gpt", "plant with intelligent new tools. everywhere melons matter.", 7_500_000_000, (name) => {
    addClicks(1_100_000 * upgradeMultipliers[name]);
}, 50);

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

grandpaKvejplUpgrade.addLevelEvent(100, () => {
    if (getUpgradeCount("legacy tools")) {
        return;
    }
    showUpgradeButton("legacy tools");
});

farmerUpgrade.addLevelEvent(100, () => {
    if (getUpgradeCount("modern tractors")) {
        return;
    }
    showUpgradeButton("modern tractors");
});

farmUpgrade.addLevelEvent(100, () => {
    showUpgradeButton("soil soaker");
});

experiencedFarmerUpgrade.addLevelEvent(100, () => {
    showUpgradeButton("mecha arm");
});

let entries = Object.entries(upgradeObjects);
for (let [index, [_key, val]] of Object.entries(upgradeObjects).entries()) {
    if (index < 3) {
        continue;
    }

    val.hide();

    entries[index - 1][1].addLevelEvent(1, () => {
        val.show();
    }, true);
}