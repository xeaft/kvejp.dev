let title = document.getElementById("titletext");
let titleText = title.innerText;
let titleHTML = title.innerHTML;
let letters = "abcdefghijklmnopqrstuvwxyz";
let root = document.documentElement;

let varScale = 1;
let varUse = "svh";
addEventListener("resize", (event) => {
    root.style.setProperty("--height-scale", `${varScale}${varUse}`);
    root.style.setProperty("--width-scale", `${varScale}${varUse}`);
});

window.dispatchEvent(new Event("resize"));

let allMainTextObjs = document.getElementsByTagName("main")[0].getElementsByTagName("p");
let mainTextObjs = document.getElementsByClassName("stupidly-animated");

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

let userAgent = navigator.userAgent;
let isMobile = userAgent.match(/(iPhone|iPod|iPad|Android|BlackBerry|Windows Phone)/);

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