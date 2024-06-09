
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

createOneTimeUpgrade("efficient pressers", "pressers press twice as much", 4500, () => {
    upgradeMultipliers["presser"] += 1;
});

createOneTimeUpgrade("kvejpls wisdom", "kvejpls remember how to farm 60% more melons", 4500, () => {
    upgradeMultipliers["grandpa kvejpl"] += 0.6;
});

createOneTimeUpgrade("smaller farms", "farms only need 4 farmers", 4500, () => {
    farmersPerFarm = 4;
});

createOneTimeUpgrade("melon fertilizer", "farms produce 20% more melons", 4500, () => {
    upgradeMultipliers["melon farm"] += 0.2;
});

createOneTimeUpgrade("RATs", "every click has a 5% chance to give extra melons", 8000, () => {
    ratOwned = true;
});

createOneTimeUpgrade("golden pressers", "pressers are made out of gold", 80_000, () => {
    upgradeMultipliers["presser"] += 2;
});

createOneTimeUpgrade("worker raise", "paying your workers more will make them work harder, right?", 400_000, () => {
    upgradeMultipliers["worker"] += 2;
});

createOneTimeUpgrade("legacy tools", "everyone knows the eldery works better with the things they know", 1_000_000, () => {
    upgradeMultipliers["grandpa kvejpl"] += 2;
});

createOneTimeUpgrade("modern tractors", "tractors and farmers go hand in hand, hopefully", 4_000_000, () => {
    upgradeMultipliers["farmer"] += 2;
});

createOneTimeUpgrade("soil soaker", "makes your soil wet, and thats good. just dont make it too wet", 12_000_000, () => {
    upgradeMultipliers["melon farm"] += 2;
});

createOneTimeUpgrade("mecha arm", "experience...? actually, they might just be robots afterall", 60_000_000, () => {
    upgradeMultipliers["experienced farmer"] += 2;
    createToastNotification("you reached the last/final upgrade, for now. more updates soon");
});