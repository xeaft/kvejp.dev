let title = document.getElementsByTagName("h1")[0];
let titleText = title.innerText;
let titleHTML = title.innerHTML;
let letters = "abcdefghijklmnopqrstuvwxyz";
let root = document.documentElement;

let interval = setInterval(() => {
    let letterInd = Math.round(Math.random() * 100) % "kvejp".length;
    let newLetter = "";
    let counter = 0;
    let letterInterval = setInterval(() => {
        if (counter >= 8) {
            clearInterval(letterInterval);
            title.innerHTML = titleHTML;
        } else {
            newLetter = letters.charAt(Math.round(Math.random() * 100) % letters.length)
            let newText = titleHTML.substring(0, letterInd) + newLetter + titleHTML.substring(letterInd + 1);
            title.innerHTML = newText;
            counter++;
        }
    }, 50)
}, 2500)


let varScale = 1;
let varUse = "svh";
addEventListener("resize", (event) => {
    let tabs = document.getElementById("tabs");
    let header = document.getElementById("headerdiv")
    let width = window.innerWidth;
    let height = window.innerHeight;

    if (width < 768) {
        let headerHeight = header.offsetHeight;
        tabs.style.paddingTop = headerHeight + "px";
        tabs.style.justifyContent = "left";
        tabs.style.left = 0;
        tabs.style.paddingLeft = "-1.5svh";
    } else {
        tabs.style.paddingTop = "";
        tabs.style.justifyContent = "right";
        tabs.style.right = 0;
        tabs.style.paddingRight = "2svh";
    }

    root.style.setProperty("--height-scale", `${varScale}${varUse}`);
    root.style.setProperty("--width-scale", `${varScale}${varUse}`)
});

window.dispatchEvent(new Event("resize"))
