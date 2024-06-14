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
    root.style.setProperty("--height-scale", `${varScale}${varUse}`);
    root.style.setProperty("--width-scale", `${varScale}${varUse}`);
});

window.dispatchEvent(new Event("resize"));

let allMainTextObjs = document.getElementsByTagName("main")[0].getElementsByTagName("p");
let mainTextObjs = [];
for (let i of allMainTextObjs) {
    let objClassList = Array.from(i.classList);
    if (!objClassList.includes("important") && !objClassList.includes("noanimate")) {
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
    return end;
}

function textRenderIntervalFunc() {
    let ended = textRenderFunc(currentObjectIndex, textRenderInterval);
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
        });
    } else {
        element.addEventListener("mouseenter", () => {
            mouseTrail.style.boxShadow = "0 0 20px 8px #f00";
        });
    }

    element.addEventListener("mouseleave", () => {
        mouseTrail.style.boxShadow = "0 0 50px 10px #fff";
    });
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

let userAgent = navigator.userAgent;
let isMobile = userAgent.match(/(iPhone|iPod|iPad|Android|BlackBerry|Windows Phone)/);

if (isMobile) {
    mouseTrail.style.display = "none";
}

function downloadFile(content, filename) {
    let blob = new Blob([content], { type: 'text/plain' });
    let a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
}

function readFile(acceptType) {
    return new Promise((resolve, reject) => {
        let fileInput = document.createElement('input');
        fileInput.type = 'file';
        if (acceptType) {
            fileInput.accept = acceptType;
        } 
        fileInput.style.display = 'none';

        fileInput.addEventListener('change', (event) => {
            let file = event.target.files[0];
            if (file) {
                let reader = new FileReader();
                reader.onload = (e) => {
                    let progressText = e.target.result;
                    document.body.removeChild(fileInput);
                    resolve(progressText);
                };
                reader.onerror = (e) => {
                    document.body.removeChild(fileInput);
                    reject(e);
                };
                reader.readAsText(file);
            } else {
                document.body.removeChild(fileInput);
                reject(new Error("No file selected"));
            }
        });

        document.body.appendChild(fileInput);
        fileInput.click();
    });
}