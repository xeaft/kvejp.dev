if (getUpgradeCount("RAT food") >= 70) {
    removeUpgradeButton("RAT food");
}

if (getUpgradeCount("RATnip") >= 59) {
    removeUpgradeButton("RATnip");
}

if (getUpgradeCount("presser") < 100 || getUpgradeCount("golden pressers")) {
    removeUpgradeButton("golden pressers");
}

if (getUpgradeCount("worker") < 100 || getUpgradeCount("worker raise")) {
    removeUpgradeButton("worker raise");
}

if (getUpgradeCount("grandpa kvejpl") < 100 || getUpgradeCount("legacy tools")) {
    removeUpgradeButton("legacy tools");
}

if (getUpgradeCount("farmer") < 100 || getUpgradeCount("modern tractors")) {
    removeUpgradeButton("modern tractors");
}

if (getUpgradeCount("melon farm") < 100 || getUpgradeCount("soil soaker")) {
    removeUpgradeButton("soil soaker");
}

if (getUpgradeCount("experienced farmer") < 100 || getUpgradeCount("mecha arm")) {
    removeUpgradeButton("mecha arm");
}

if (getUpgradeCount("mouse") >= 80) {
    removeUpgradeButton("mouse");
}
