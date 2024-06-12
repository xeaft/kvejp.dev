function getProgress() {
    let progress = {};

    for (let i = 0; i < localStorage.length; i++) {
        let key = localStorage.key(i);
        let value = localStorage.getItem(key);

        if (value[0] == "{"){
            value = JSON.parse(value);
        }

        progress[key] = value;
    }

    return progress
}

function saveProgress() {
    let progress = getProgress();
    downloadFile(JSON.stringify(progress), "progress.kvejp");
}

function isPlainObject(obj) {
    return obj !== null && typeof obj === 'object' && obj.constructor === Object;
}

function loadProgress(progress) {
    let progressJson = {}
    try {
        progressJson = JSON.parse(progress);
    } catch {
        return;
    }

    localStorage.clear();

    for (let key in progressJson) {
        let thing = JSON.stringify(progressJson[key]);
        if (thing[0] !== '"') {
            progressJson[key] = thing;
        }
    }

    for (let key in progressJson) {
        localStorage.setItem(key, progressJson[key]);
    }

    location.reload(true);
}

function getConvertedSaveFileJSON(oldSaveString) {
    let oldSaveJSON = {}
    try {
        oldSaveJSON = JSON.parse(oldSaveString);
    } catch {
        return createToastNotification("invalid save file format.", "#f44");
    }

    for (let key in oldSaveJSON) {
        let val = oldSaveJSON[key];

        if (!isPlainObject(val)) {
            continue;
        }
        
        if (val["cost"] != undefined) {
            delete val["cost"];
        }

        if (val["owned"]) {
            val["o"] = val["owned"];
            delete val["owned"];
        }
    }

    return oldSaveJSON
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

function loadProgressFile() {
    return new Promise((resolve, reject) => {
        let fileInput = document.createElement('input');
        fileInput.type = 'file';
        fileInput.accept = '.kvejp';
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

let saveProgressButton = document.getElementById("save-progress");
let loadProgressButton = document.getElementById("load-progress");
let transferProgressButton = document.getElementById("transfer-progress");
let deleteProgressButton = document.getElementById("delete-progress");

function removeInfoWindow() {
    let preExistingElements = document.getElementsByClassName("bg-blur-full");
    if (preExistingElements.length > 0) {
        let background = preExistingElements[0];
        let container = background.querySelector("div");
        container.classList.remove("info-window-open");
        container.classList.add("info-window-closing");
        background.classList.remove("blur-open");
        background.classList.add("blur-closing");
        
        setTimeout(() => {background.parentElement.removeChild(background);}, 95);
    }
}

function createInfoWindow(title, text, callback, acceptText, cancelText) {
    let cancelButtonText = cancelText ? cancelText : "Cancel";
    let acceptButtonText = acceptText ? acceptText : "Accept";

    removeInfoWindow();

    let blurDiv = document.createElement("div");
    blurDiv.className = "bg-blur-full blur-open";

    let windowContainer = document.createElement("div");
    windowContainer.className = "info-window-container info-window-open";

    let windowTitle = document.createElement("p");
    windowTitle.className = "info-window-title";
    windowTitle.innerText = title;

    let descriptionText = document.createElement("p");
    descriptionText.className = "info-window-description";
    descriptionText.innerText = text;

    let buttonsContainer = document.createElement("div");
    buttonsContainer.className = "info-window-buttons-container"

    let cancelButton = document.createElement("div");
    cancelButton.className = "info-window-cancel-div info-window-div";

    let cancelButtonTextElement = document.createElement("p");
    cancelButtonTextElement.className = "info-window-cancel-text info-window-text";
    cancelButtonTextElement.innerText = cancelButtonText;

    let acceptButton = document.createElement("div");
    acceptButton.className = "info-window-accept-div info-window-div";

    let acceptButtonTextElement = document.createElement("p");
    acceptButtonTextElement.className = "info-window-accept-text info-window-text";
    acceptButtonTextElement.innerText = acceptButtonText;

    acceptButton.addEventListener("click", (ev) => {
        if (ev.button == 0) {
            try {
                callback();
            }
            catch {
                createToastNotification("Failed to do operation", "#f44");
            }
            removeInfoWindow();
        }
    });

    cancelButton.addEventListener("click", (ev) => {
        if (ev.button == 0) {
            removeInfoWindow();
        }
    })


    function create() {
        windowContainer.appendChild(windowTitle);
        windowContainer.appendChild(descriptionText);
        cancelButton.appendChild(cancelButtonTextElement);
        buttonsContainer.appendChild(cancelButton);
        acceptButton.appendChild(acceptButtonTextElement);
        buttonsContainer.appendChild(acceptButton);
        windowContainer.appendChild(buttonsContainer);
    
        blurDiv.appendChild(windowContainer);
        document.body.appendChild(blurDiv);
    }

    return {
        "container": windowContainer,
        "create": create
    }
}

saveProgressButton.addEventListener("click", (ev) => {
    if (ev.button == 0) {
        saveProgress();
    }
});

loadProgressButton.addEventListener("click", (ev) => {
    if (ev.button == 0) {
        loadProgressFile()
            .then(progressText => {
                loadProgress(progressText);
            })

        // TODO: load from string
        // let askWindow = createInfoWindow("load a save file", "", () => {

        // });

        // askWindow.container.appendChild(document.createElement("input"));
        // askWindow.create();
    }
});

let delButtonClicks = 0;
deleteProgressButton.addEventListener("click", (ev) => {
    if (ev.button == 0) {
        if (delButtonClicks < 3) {
            delButtonClicks++;
            deleteProgressButton.querySelector("p").innerText = `Delete Progress (${4 - delButtonClicks})`;
            let nowDelButtonClicks = delButtonClicks;
            setTimeout(() => {
                if (nowDelButtonClicks == delButtonClicks) {
                    deleteProgressButton.querySelector("p").innerText = `Delete Progress`;
                    delButtonClicks = 0;
                }
            }, 1000);
            return;
        }
        delButtonClicks = 0;
        deleteProgressButton.querySelector("p").innerText = `Delete Progress`;
        createInfoWindow("content deletion warning or whatever", "this action is permanent and cannot be reverted. everyone knows that tho", () => {localStorage.clear(); window.location.reload();}, "Continue", "Cancel").create();
    }
});

transferProgressButton.addEventListener("click", (ev) => {
    if (ev.button == 0) {
        createInfoWindow("progress transfer window", "due to a new savefile format u need to convert ur old savefile", () => {
            loadProgressFile()
                .then(progressText => {
                    downloadFile(JSON.stringify(getConvertedSaveFileJSON(progressText)), "progress-converted.kvejp");
                })
        }, "yeah, why not", "no, i dont want to").create();
    }
});

let currentProgressStr = JSON.stringify(getProgress());
if (currentProgressStr.includes("owned") || currentProgressStr.includes("cost")) {
    createInfoWindow("Old save format detected.", "the games save file format has changed, and no progress file using the old one will work. you can convert your current save file, or you can continue using the old file format. just a warning, the game will be full of NaN's and other fun things! All old save files can be converted using the new yellow button on the bottom of the page. also, this popup will annoy you everytime you have an old save. just because i dont feel like adding a ls check", () => {
        let saveString = JSON.stringify(getProgress());
        let newSaveJSON = getConvertedSaveFileJSON(saveString);
        let newSaveString = JSON.stringify(newSaveJSON);
        loadProgress(newSaveString);
    }, "Yes, convert my save file.", "No, proceed").create();
}