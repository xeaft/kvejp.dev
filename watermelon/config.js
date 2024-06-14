let saveFileExtension = ".kvejp";

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

    return progress;
}

function saveProgress() {
    let progress = doStringThing(JSON.stringify(getProgress()));
    downloadFile(progress, "progress.kvejp");
}

function isPlainObject(obj) {
    return obj !== null && typeof obj === 'object' && obj.constructor === Object;
}

function loadProgress(progress) {
    progress = undoStringThing(progress);
    let progressJson = {};

    try {
        progressJson = JSON.parse(progress);
    } catch {
        console.log("Failed to parse JSON");
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
        if (key == "last-online") {
            continue;
        }
        localStorage.setItem(key, progressJson[key]);
    }

    location.reload(true);
}

function getConvertedSaveFileString(oldSaveString) {
    oldSaveString = undoStringThing(oldSaveString);
    let oldSaveJSON = {};
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

    let saveString = doStringThing(JSON.stringify(oldSaveJSON))

    return saveString;
}

function removeInfoWindow() {
    let preExistingElements = document.getElementsByClassName("bg-blur-full");
    if (preExistingElements.length > 0) {
        let background = preExistingElements[0];
        let container = background.querySelector("div");
        container.classList.remove("info-window-open");
        background.classList.remove("blur-open");

        if (!settings.get("Low Detail Mode")) {
            background.classList.add("blur-closing");
            container.classList.add("info-window-closing");
        }
        
        setTimeout(() => {background.parentElement.removeChild(background);}, 95);
    }
}

function createInfoWindow(title, text, callback, acceptText, cancelText) {
    let cancelButtonText = cancelText ? cancelText : "Cancel";
    let acceptButtonText = acceptText ? acceptText : "Accept";

    removeInfoWindow();

    let blurDiv = document.createElement("div");
    blurDiv.className = settings.get("Low Detail Mode") ? "bg-blur-full" : "bg-blur-full blur-open";

    let windowContainer = document.createElement("div");
    windowContainer.className = settings.get("Low Detail Mode") ? "info-window-container" : "info-window-container info-window-open";

    let windowTitle = document.createElement("p");
    windowTitle.className = "info-window-title";
    windowTitle.innerText = title;

    let descriptionText = document.createElement("p");
    descriptionText.className = "info-window-description";
    descriptionText.innerText = text;

    let buttonsContainer = document.createElement("div");
    buttonsContainer.className = "info-window-buttons-container";

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