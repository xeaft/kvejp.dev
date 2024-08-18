document.getElementsByClassName("button-open-file")[0].addEventListener("click", (ev) => {
    if (ev.button == 0) {
        readFile(saveFileExtension)
            .then(progressText => {
                downloadFile(getConvertedSaveFileString(progressText), "progress-converted.kvejp");
            });
    }
});

document.getElementById("string-convert").addEventListener("click", (ev) => {
    if (ev.button == 0) {
        let str = document.getElementsByClassName("save-string-input")[0].value;
        let save = getConvertedSaveFileString(str);
        if (save) {
            downloadFile(save, "progress-converted.kvejp");
        }
    }
});