function saveProgress() {
    let progress = {};

    for (let i = 0; i < localStorage.length; i++) {
        let key = localStorage.key(i);
        let value = localStorage.getItem(key);

        if (value[0] == "{"){
            value = JSON.parse(value);
        }

        progress[key] = value;
    }

    downloadFile(JSON.stringify(progress), "progress.kvejp");
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
                loadProgress(progressText);
            };
            reader.readAsText(file);
        } else {
            document.body.removeChild(fileInput);
        }
    });

    document.body.appendChild(fileInput);
    fileInput.click();
}

let saveProgressButton = document.getElementById("save-progress");
let loadProgressButton = document.getElementById("load-progress");
saveProgressButton.addEventListener("mousedown", (ev) => {
    if (ev.button == 0) {
        saveProgress();
    }
});

saveProgressButton.addEventListener("touchend", (ev) => {
    saveProgress();
});

loadProgressButton.addEventListener("mousedown", (ev) => {
    if (ev.button == 0) {
        loadProgressFile();
    }
});

loadProgressButton.addEventListener("touchend", (ev) => {
    loadProgressFile();
});