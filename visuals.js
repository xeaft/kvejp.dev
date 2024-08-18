function createToastNotification(text, colorOptional) {
    let color = colorOptional ? colorOptional : "#ffd700";
    let textObj = document.createElement("p");
    let toasts = Array.from(document.getElementsByClassName("toast-notification"));

    for (let [index, toast] of toasts.entries()) {
        toast.style.top = (toasts.length - index) * 50 + "px";
    }

    textObj.className = "toast-notification";
    textObj.innerText = text;
    textObj.style.color = color;
    document.body.appendChild(textObj);
    setTimeout(() => {
        textObj.parentElement.removeChild(textObj);
    }, 4000);
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