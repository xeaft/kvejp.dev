let title = document.getElementById("titletext");
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
            newLetter = letters.charAt(Math.round(Math.random() * 100) % letters.length);
            let newText = titleHTML.substring(0, letterInd) + newLetter + titleHTML.substring(letterInd + 1);
            title.innerHTML = newText;
            counter++;
        }
    }, 50);
}, 2500);


let varScale = 1;
let varUse = "svh";
addEventListener("resize", (event) => {
    let tabs = document.getElementById("tabs");
    let header = document.getElementById("headerdiv");
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
    root.style.setProperty("--width-scale", `${varScale}${varUse}`);
});

window.dispatchEvent(new Event("resize"));

let allMainTextObjs = document.getElementsByTagName("main")[0].getElementsByTagName("p");
let mainTextObjs = []
for (let i of allMainTextObjs){
    let objClassList = Array.from(i.classList);
    if (!objClassList.includes("important")) {
        mainTextObjs.push(i);
    }
}

let mainText = "";
let currentObjectIndex = 0;
let currentTextIndex = 0;

function textRenderFunc(objIndex, interval) {
    let textObject = mainTextObjs[objIndex];

    if (mainText === "") {
        mainText = textObject.innerText;
        textObject.style.innerText = "";
        textObject.style.display = "block";

    }

    let minRandNum = 12;
    let maxRandNum = 20;
    let nextPartLen = Math.round((Math.random() * 100)) % (maxRandNum - minRandNum) + minRandNum;
    let end = false;
    let textIndex = currentTextIndex - objIndex * mainText.length;

    if (textIndex + nextPartLen >= mainText.length) {
        nextPartLen = mainText.length - textIndex;
        clearInterval(interval);
        end = true;
    }
    currentTextIndex += nextPartLen;
    textIndex = currentTextIndex - objIndex * mainText.length;
    textObject.innerText = mainText.substring(0, textIndex);
    return end
}

function textRenderIntervalFunc() {
    let ended = textRenderFunc(currentObjectIndex, textRenderInterval)
    if (ended && currentObjectIndex < mainTextObjs.length - 1) {
        currentObjectIndex += 1;
        mainText = "";
        textRenderInterval = setInterval(textRenderIntervalFunc, 120);
    }
}

let textRenderInterval;
if (mainTextObjs.length > 0) {
    textRenderInterval = setInterval(textRenderIntervalFunc, 120);
}

let mouseTrail = document.getElementById("mousetrailer");
let hoverableElements = document.getElementsByClassName("-hoverable");
let hoverable2 = document.getElementsByClassName("-hoverable2");

document.onmousemove = (ev) => {
    mouseTrail.style.left = ev.clientX + "px";
    mouseTrail.style.top = ev.clientY + "px";
};

function handleMouseHover(element, mode) {
    if (!mode) {
        element.addEventListener("mouseenter", () => {
            mouseTrail.style.boxShadow = "0 0 20px 8px #0ff";
        })
    } else {
        element.addEventListener("mouseenter", () => {
            mouseTrail.style.boxShadow = "0 0 20px 8px #f00";
        })
    }

    element.addEventListener("mouseleave", () => {
        mouseTrail.style.boxShadow = "0 0 50px 10px #fff";
    })
}

for (let element of hoverableElements) {
    handleMouseHover(element);
}

for (let element of hoverable2) {
    handleMouseHover(element, 1);
}

function payloadFunc() {
    let loc = window.location.href;
    if (loc.search("privacypolicy") > -1) {
        return
    }

    let bgdiv = document.getElementById("backgrounddiv");
    let hoverable = document.getElementsByClassName("-hoverable");
    let texts = document.getElementsByTagName("p");

    let configelems = document.getElementsByClassName("config");
    if (configelems.length) {
        configelems[0].style.display = "none";
    }

    let allThings = [...hoverable, ...texts]
    for (let i of allThings) {
        i.style.transition = "none"
        i.style.color = "red";
        let words = i.innerText.split(" ").length
        i.innerText = "why. ".repeat(words);
        i.style.fontSize = "50px";
    }
    title.style.color = "red";
    bgdiv.style.backgroundColor = "rgba(120, 0, 0, 0.8)";
    setTimeout(() => {
        location.reload()
    }, 800)
}

let letterArray = [];
let secretKey = "why would you type this"
document.body.addEventListener("keydown", ev => {
    letterArray.push(ev.key.toLowerCase());
    if (letterArray.length >= secretKey.length) {
        let lastSix = letterArray.slice(-secretKey.length);
        let result = lastSix.join("");
        if (result == secretKey) {
            payloadFunc();
            letterArray = [];
        }
    }
})

function setHoverEffect(objs, toggle) {
    for (let i of objs) {
        let classList = Array.from(i.classList);
        let hasClass = classList.includes("-hover-scalable")
        if (toggle && !hasClass) {
            i.classList.add("-hover-scalable");
        } else if (!toggle && hasClass) {
            i.classList.remove("-hover-scalable");
        }
        localStorage.setItem("text-scale", toggle)
    }
}

let textScalingToggle = document.getElementById("text-scale-checkbox");
if (textScalingToggle) {
    textScalingToggle.addEventListener("change", ev => {
        let checked = ev.currentTarget.checked;
        let scalable = document.querySelectorAll("main > p");
        setHoverEffect(scalable, checked);
    })
    textScalingToggle.checked = localStorage.getItem("text-scale") === "true" ? true : false
    let checked = textScalingToggle.checked;
    let scalable = document.querySelectorAll("main > p");
    setHoverEffect(scalable, checked);
}

