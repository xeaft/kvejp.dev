let presserButton = createUpgrade("presser", "presses melons", 10, () => {
    addClicks(0.01 * upgradeMultipliers.presser);
}, 50);

presserButton.addEventListener("mousedown", (ev) => {
    if (ev.button == 0) {
        let presserCount = getUpgradeCount("presser") + 1;
        let hasGoldenPresser = getUpgradeCount("golden pressers"); 
        if (presserCount >= 100 && !hasGoldenPresser) {
            showUpgradeButton("golden pressers");
        }
    }
})

let workerButton = createUpgrade("worker", "a worker in your basement. you must own the basement for them to work", 30, () => {
    if (basementOwned) {
        let workers = getUpgradeCount("worker");
        let efficiency = calculateEfficiency(workers, basementSize, 1);
        addClicks(0.1 * efficiency * upgradeMultipliers.worker);
    }
}, 50);

workerButton.addEventListener("mousedown", (ev) => {
    if (ev.button == 0) {
        let workerCount = getUpgradeCount("worker") + 1;
        let hasWorkerRaise = getUpgradeCount("worker raise"); 
        if (workerCount >= 100 && !hasWorkerRaise) {
            showUpgradeButton("worker raise");
        }
    }
})

let kvejplButton = createUpgrade("grandpa kvejpl", "grows melons in his basement", 100, () => {
    addClicks(0.15 * upgradeMultipliers["grandpa kvejpl"]);
}, 50);

kvejplButton.addEventListener("mousedown", (ev) => {
    if (ev.button == 0) {
        let kvejplCount = getUpgradeCount("grandpa kvejpl") + 1;
        let hasLegacyTools = getUpgradeCount("legacy tools"); 
        if (kvejplCount >= 100 && !hasLegacyTools) {
            showUpgradeButton("legacy tools");
        }
    }
})

let farmerButton = createUpgrade("farmer", "useful people for farming melons", 400, () => {
    addClicks(0.7 * upgradeMultipliers.farmer);
}, 50);

farmerButton.addEventListener("mousedown", (ev) => {
    if (ev.button == 0) {
        let farmerCount = getUpgradeCount("farmer") + 1;
        let hasModernTractors = getUpgradeCount("modern tractors"); 
        if (farmerCount >= 100 && !hasModernTractors) {
            showUpgradeButton("modern tractors");
        }
    }
})

let farmButton = createUpgrade("melon farm", "a farm with melons, works better with 6 farmers", 800, () => {
    let farmAmt = getUpgradeCount("melon farm");
    let farmerAmt = getUpgradeCount("farmer") + getUpgradeCount("experienced farmer");
    let closeness = closenessLevel(farmAmt * farmersPerFarm, farmerAmt) / 5;
    addClicks(1.5 * closeness * upgradeMultipliers["melon farm"]);
}, 50);

farmButton.addEventListener("mousedown", (ev) => {
    if (ev.button == 0) {
        let farmCount = getUpgradeCount("melon farm") + 1;
        let hasLegacyTools = getUpgradeCount("soil soaker"); 
        if (farmCount >= 100 && !hasLegacyTools) {
            showUpgradeButton("soil soaker");
        }
    }
})

let expFarmerButton = createUpgrade("experienced farmer", "almost robotic. can work without a farm, somehow", 8000, () => {
    addClicks(30 * upgradeMultipliers["experienced farmer"]);
}, 50);

expFarmerButton.addEventListener("mousedown", (ev) => {
    if (ev.button == 0) {
        let expFarmerCount = getUpgradeCount("experienced farmer") + 1;
        let hasLegacyTools = getUpgradeCount("mecha arm"); 
        if (expFarmerCount >= 100 && !hasLegacyTools) {
            showUpgradeButton("mecha arm");
        }
    }
})