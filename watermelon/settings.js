let settingsButton = document.getElementById("global-settings-button");
let settingsOpened = false;
let settings = {
    get: (name) => {
        return settingsModules[name].isEnabled();
    }
}
let settingsModules = {};

settingsButton.addEventListener("click",  (ev) => {
    if (ev.button != 0) {
        return;
    }

    settingsOpened = !settingsOpened;
    openSettings();
});

function createSetting(name, callback) {
    if (localStorage.getItem(name + "-setting") == null) {
        localStorage.setItem(name + "-setting", false);
    }

    let enabled = localStorage.getItem(name + "-setting") == "false" ? false : true;

    function create() {
        let container = document.createElement("div");
        let nameText = document.createElement("p");
        let enabledText = document.createElement("p");
    
        nameText.innerText = name;    
        nameText.className = "setting-text";
        nameText.style.color = enabled ? "#48c759" : "#c74848";
        enabledText.style.color = enabled ? "#48c759" : "#c74848";
        enabledText.innerText = enabled ? "Enabled" : "Disabled";
        enabledText.className = "setting-text";   
        container.className = "setting-bg-container";

        container.appendChild(nameText);
        container.appendChild(enabledText);

        let settingsWindow = document.getElementById("settings-window");
        if (settingsWindow) {
            settingsWindow.appendChild(container);
        } 

        if (enabled) {
            callback();
        }
    
        container.addEventListener("click", (ev) => {
            if (ev.button == 0) {
                enabled = !enabled;
                nameText.style.color = enabled ? "#48c759" : "#c74848";
                enabledText.style.color = enabled ? "#48c759" : "#c74848";
                enabledText.innerText = enabled ? "Enabled" : "Disabled";
                localStorage.setItem(name + "-setting", enabled);
                callback(enabled); 
            }
        });
    } 

    function isEnabled() {
        return enabled;
    }

    let settingObject = {
        "create": create,
        isEnabled: isEnabled
    };

    settingsModules[name] = settingObject;

    return settingObject;
}

createSetting("Low Detail Mode", (enabled) => {
    if (enabled) {
        for (let i of Array.from(document.getElementsByClassName("drop-image"))) {
            i.parentElement.removeChild(i);
        }
    }
});

createSetting("Compact Clicks Text", (enabled) => {
    if (enabled) {
        for (let i of Array.from(document.getElementsByClassName("click-text"))) {
            i.parentElement.removeChild(i);
        }
    }
});

function openSettings() {
    let blurDiv = document.createElement("div");
    let hr = document.createElement("hr");
    let windowContainer = document.createElement("div");
    let windowTitle = document.createElement("p");
    let closeButton = document.createElement("div");
    
    blurDiv.className = settings.get("Low Detail Mode") ? "bg-blur-full" : "bg-blur-full blur-open";

    windowContainer.className = settings.get("Low Detail Mode") ? "info-window-container" : "info-window-container info-window-open";
    windowContainer.id = "settings-window";
    
    windowTitle.className = "info-window-title";
    windowTitle.innerText = "Settings";

    closeButton.id = "settings-close-button";

    closeButton.addEventListener("click", (ev) => {
        if (ev.button == 0) {
            removeInfoWindow();
        }
    });

    function removeFunction(ev) {
        if (ev.key == "Escape") {
            removeInfoWindow();
            document.body.removeEventListener("keydown", removeFunction);
        }
    }

    document.body.addEventListener("keydown", removeFunction);

    windowContainer.appendChild(closeButton);
    windowContainer.appendChild(windowTitle);
    windowContainer.appendChild(hr);
    blurDiv.appendChild(windowContainer);
    document.body.appendChild(blurDiv);

    for (let i in settingsModules) {
        let settingObj = settingsModules[i];
        settingObj.create();
    }
}