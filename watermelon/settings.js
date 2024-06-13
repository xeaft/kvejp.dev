let settingsButton = document.getElementById("global-settings-button");
let settingsOpened = false;
let settings = {};

settingsButton.addEventListener("click",  (ev) => {
    if (ev.button != 0) {
        return;
    }

    settingsOpened = !settingsOpened;
    openSettings();
});

function createSetting(name, callback) {
    let enabled = false;

    function create() {
        let container = document.createElement("div");
        let nameText = document.createElement("p");
        let enabledText = document.createElement("p");
    
        nameText.innerText = name;    
        nameText.style.color = "#c74848";
        nameText.className = "setting-text";
        enabledText.style.color = "#c74848";
        enabledText.innerText = "Disabled";
        enabledText.className = "setting-text";   
        container.className = "setting-bg-container";

        container.appendChild(nameText);
        container.appendChild(enabledText);

        let settingsWindow = document.getElementById("settings-window");
        if (settingsWindow) {
            settingsWindow.appendChild(container);
        } 
        
        container.addEventListener("click", (ev) => {
            if (ev.button == 0) {
                enabled = !enabled;
                nameText.style.color = enabled ? "#48c759" : "#c74848";
                enabledText.style.color = enabled ? "#48c759" : "#c74848";
                enabledText.innerText = enabled ? "Enabled" : "Disabled";
                callback(enabled);
            }
        });
    }
    let settingObject = {
        "create": create
    }

    settings[name] = settingObject;

    return settingObject;
}

createSetting("Low Detail Mode", (enabled) => {
    if (enabled) {
        // kill all particles, or something, idk
    }
});

createSetting("LDM does nothing btw", (enabled) => {
});

createSetting("dont even bother", (enabled) => {
});

createSetting("nothing is yet implemented", (enabled) => {
});

createSetting("but it will be soon", (enabled) => {
});

function openSettings() {
    let blurDiv = document.createElement("div");
    let hr = document.createElement("hr");
    let windowContainer = document.createElement("div");
    let windowTitle = document.createElement("p");
    let closeButton = document.createElement("div");
    
    blurDiv.className = "bg-blur-full blur-open";

    windowContainer.className = "info-window-container info-window-open";
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

    for (let i in settings) {
        let settingObj = settings[i];
        settingObj.create();
    }
}