let saveFileExtension = ".kvejp";

function getProgress() {
    let progress = {};

    for (let i = 0; i < localStorage.length; i++) {
        let key = localStorage.key(i);

        if (key.startsWith("--")) {
            continue;
        }

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
        createToastNotification("invalid save file format.", "#f44");
        return false
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