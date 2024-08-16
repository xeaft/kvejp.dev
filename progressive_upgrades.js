let presserUpgraede = createUpgrade("presser", "presses melons", 10, (name) => {
    addClicks(0.01 * upgradeMultipliers.presser * getUpgradeCount(name));
}, 50, "progressive", true);

let workerUpgrade = createUpgrade("worker", "a worker in your basement. you must own the basement for them to work", 30, (name) => {
    if (basementOwned) {
        let workers = getUpgradeCount("worker");
        let efficiency = calculateEfficiency(workers, basementSize, 1);
        addClicks(0.1 * efficiency * upgradeMultipliers.worker * getUpgradeCount(name));
    }
}, 50, "progressive", true);

let grandpaKvejplUpgrade = createUpgrade("grandpa kvejpl", "grows melons in his basement", 100, (name) => {
    addClicks(0.15 * upgradeMultipliers[name] * getUpgradeCount(name));
}, 50, "progressive", true);

let farmerUpgrade = createUpgrade("farmer", "useful people for farming melons", 400, (name) => {
    addClicks(0.7 * upgradeMultipliers[name] * getUpgradeCount(name));
}, 50, "progressive", true);

let farmUpgrade = createUpgrade("melon farm", "a farm with melons, works better with 6 farmers", 800, (name) => {
    let farmAmt = getUpgradeCount("melon farm");
    let farmerAmt = getUpgradeCount("farmer") + getUpgradeCount("experienced farmer");
    let closeness = closenessLevel(farmAmt * farmersPerFarm, farmerAmt) / 5;
    if (closeness.toString() == NaN.toString()) {
        closeness = 0;
    }
    addClicks(1.5 * closeness * upgradeMultipliers[name] * getUpgradeCount(name));
}, 50, "progressive", true);

let experiencedFarmerUpgrade = createUpgrade("experienced farmer", "almost robotic. can work without a farm, somehow", 8000, (name) => {
    addClicks(25 * upgradeMultipliers[name] * getUpgradeCount(name));
}, 50, "progressive", true);

let melonMineUpgrade = createUpgrade("melon mine", "an abandoned mine with plenty of melons", 20_000, (name) => {
    addClicks(70 * upgradeMultipliers[name] * getUpgradeCount(name));
}, 50, "progressive", true);

let melonIntelligenceUpgrade = createUpgrade("melon intelligence", "plant with intelligent new tools. everywhere melons matter.", 350_000, (name) => {
    addClicks(250 * upgradeMultipliers[name] * getUpgradeCount(name));
}, 50, "progressive", true);

let melonFactoryUpgrade = createUpgrade("melon factory", "melon! = ?", 1_250_000, (name) => {
    addClicks(1200 * upgradeMultipliers[name] * getUpgradeCount(name));
}, 50, "progressive", true);

let melonPlantationUpgrade = createUpgrade("melon plantation", "theyre more efficient than farms", 22_750_000, (name) => {
    addClicks(4750 * upgradeMultipliers[name] * getUpgradeCount(name));
}, 50, "progressive", true);

let melonEmpireUpgrade = createUpgrade("melon empire", "en empire made out of melons, not sure how it helps though", 400_000_000, (name) => {
    addClicks(75_000 * upgradeMultipliers[name] * getUpgradeCount(name));
}, 50, "progressive", true);

// let karelTheDinosaur = createUpgrade("karel the dinosaur", "a sentient dinosaur. needs to be communicated with using the talafon", 175_500_000, (name) => {
//     if (!getUpgradeCount("talafon")) {
//         addClicks(525_000 * upgradeMultipliers[name]);
//     }
// }, 50, "progressive", true);

let melonScientistUpgrade = createUpgrade("melon scientist", "because science can make melons.", 1_500_000_000, (name) => {
    addClicks(1_100_000 * upgradeMultipliers[name] * getUpgradeCount(name));
}, 50, "progressive", true);

let comelonMinusPcUpgrade = createUpgrade("comelon minus pc", "melons with pre-installed spyware. runs really quickly tho", 7_500_000_000, (name) => {
    addClicks(3_500_000 * upgradeMultipliers[name] * getUpgradeCount(name));
}, 50, "progressive", true);

let asdasd = createUpgrade("melon gpt", "get melons. find melons. be more melonctive.", 40_000_000_000, (name) => {
    addClicks(1_100_000 * upgradeMultipliers[name] * getUpgradeCount(name));
}, 50, "progressive", true);

