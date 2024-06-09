createOneTimeUpgrade("melon basement", "a large space for workers and melons", 400, () => {
    basementOwned = true;
});

createOneTimeUpgrade("strong melons", "clicking produces more melons", 800, () => {
    extraClickMultiplier += 0.5;
});

createOneTimeUpgrade("juicy melons", "they have larger melon value. thats a thing", 1600, () => {
    melonMultiplier += 0.2;
});

createOneTimeUpgrade("kvejp nutrition", "extra nutritious melons", 4000, () => {
    melonMultiplier += 0.4;
});

createUpgrade("presser", "presses melons", 10, () => {
    addClicks(0.01);
}, 50);

createUpgrade("worker", "a worker in your basement. you must own the basement for them to work", 30, () => {
    if (basementOwned) {
        let workers = getUpgradeCount("worker");
        let closeness = closenessLevel(workers, 4 + basementSize) / 8
        addClicks(0.1 * closeness);
    }
}, 50);

createUpgrade("grandpa kvejpl", "grows melons in his basement", 100, () => {
    addClicks(0.15);
}, 50);

createUpgrade("farmer", "useful people for farming melons", 400, () => {
    addClicks(0.7);
}, 50);

createUpgrade("melon farm", "a farm with melons, works better with 6 farmers", 800, () => {
    let farmAmt = getUpgradeCount("melon farm");
    let farmerAmt = getUpgradeCount("farmer") + getUpgradeCount("experienced farmer");
    let closeness = closenessLevel(farmAmt * 6, farmerAmt) / 5;
    addClicks(1.5 * closeness);
}, 50);


createUpgrade("experienced farmer", "almost robotic. can work without a farm, somehow", 8000, () => {
    addClicks(30);
}, 50);

createClickerUpgrade("mouse", "allows you to click faster", 500, () => {
    clickDelay -= +(clickDelay / 10);
    explosionChance += +(explosionChance / 10);
}, "no");

createClickerUpgrade("basement size", "increases the size of your basement", 500, () => {
    basementSize += 1;
}, "no");

createClickerUpgrade("borb", "gives more melons per click", 1000, () => {
    clickMultiplier += 2.5;
}, "no");
