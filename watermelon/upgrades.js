createUpgrade("presser", "presses melons", 10, () => {
    addClicks(0.01);
}, 50);

createUpgrade("worker", "a worker in your basement. you must own the basement for them to work", 30, () => {
    if (basementOwned) {
        addClicks(0.1);
    }
}, 50);

createUpgrade("grandpa kvejpl", "grows melons in his basement", 100, () => {
    addClicks(0.15);
}, 50);

createUpgrade("melon farm", "a farm with melons, works better on the sunlight. very original", 400, () => {
    addClicks(0.75);
}, 50);

createUpgrade("im running out of ideas", "i really have no idea what this should be", 1200, () => {
    addClicks(4);
}, 50);

createUpgrade("experienced farmers", "almost robotic", 8000, () => {
    addClicks(30);
}, 50);


createOneTimeUpgrade("melon basement", "a large space for workers and melons", 400, () => {
    basementOwned = true;
});

createOneTimeUpgrade("strong melons", "clicking produces more melons", 800, () => {
    clickMultiplier += 0.5;
});

createOneTimeUpgrade("juicy melons", "they have larger melon value. thats a thing", 1600, () => {
    melonMultiplier += 0.2;
});

createOneTimeUpgrade("melon nutrition", "extra nutritious melons", 4000, () => {
    melonMultiplier += 0.4;
})

createUpgrade("mouse", "allows you to click faster", 500, () => {
    clickDelay -= +(clickDelay / 10);
    animationLength -= +(animationLength / 10);
    explosionChance += +(explosionChance / 10);
}, "no");
