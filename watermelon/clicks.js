let clicks = localStorage.getItem("clicks") != null ? +localStorage.getItem("clicks") : 0;

function getClicks() {
    return clicks;
}

function addClicks(amt) {
    clicks += amt;
}

function saveClicks() {
    localStorage.setItem("clicks", clicks);
}

function updateClicksText() {
    document.getElementById("clicks-count").innerText = Math.round(clicks);
}

setInterval(saveClicks, 2000 * 60);
setInterval(updateClicksText, 200);