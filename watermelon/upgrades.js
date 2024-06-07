createUpgrade("presser", "presses melons", 10, () => {
    addClicks(2);
    updateClicksText();
}, 1000);

createUpgrade("basement farm", "basement quality melons", 100, () => {
    addClicks(500);
}, 1000)