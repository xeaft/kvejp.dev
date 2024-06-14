let saveProgressButton = document.getElementById("save-progress");
let loadProgressButton = document.getElementById("load-progress");
let transferProgressButton = document.getElementById("transfer-progress");
let deleteProgressButton = document.getElementById("delete-progress");

saveProgressButton.addEventListener("click", (ev) => {
    if (ev.button == 0) {
        saveProgress();
    }
});

loadProgressButton.addEventListener("click", (ev) => {
    if (ev.button == 0) {
        readFile(saveFileExtension)
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
        createInfoWindow("Content Deletion warning.", "This action is permanent and cannot be reverted. everyone knows that though, right?", () => {localStorage.clear(); window.location.reload();}, "Continue", "Cancel").create();
    }
});

transferProgressButton.addEventListener("click", (ev) => {
    if (ev.button == 0) {
        window.location.href = "./transfer";
    }
});

let currentProgressStr = JSON.stringify(getProgress());
if (currentProgressStr.includes("owned") || currentProgressStr.includes("cost")) {
    createInfoWindow("Old save format detected.", "the games save file format has changed, and no progress file using the old one will work. you can convert your current save file, or you can continue using the old file format. just a warning, the game will be full of NaN's and other fun things! All old save files can be converted using the new yellow button on the bottom of the page. also, this popup will annoy you everytime you have an old save. just because i dont feel like adding a ls check", () => {
        let saveString = JSON.stringify(getProgress());
        let newSaveString = getConvertedSaveFileString(saveString);
        loadProgress(newSaveString);
    }, "Yes, convert my save file.", "No, proceed").create();
}