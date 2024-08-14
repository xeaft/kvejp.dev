let settings = Array.from(document.getElementById("settings-container").children);
settings =  settings.filter(child => child.tagName === 'DIV');


const colorHexRegex = /[^0-9a-fA-F]/g; 

for (let set of settings) {
    let settingType = set.classList[1];

    if (settingType == "color-setting") {
        let colorPicker = set.querySelector("input[type='color']");
        let textInput = set.querySelector("input[type='text']");
        let colorAffect = colorPicker.className;
        let defaultColor = cssVarDefaults[colorAffect] || getCSSVarValue(colorAffect);
        let resetToDefaultButton = set.querySelector("input[type='button']");

        let oldSettingVal = localStorage.getItem(colorAffect) || defaultColor;
        
        if (oldSettingVal.length == 9) {
            oldSettingVal = oldSettingVal.slice(0, 7);
        } else if (oldSettingVal.length == 4) {
            oldSettingVal = oldSettingVal.split('').map(char => char + char).join('').slice(1,8);
        }
        
        textInput.value = oldSettingVal;
        colorPicker.value = oldSettingVal;

        textInput.addEventListener("input", (_) => {
            let val = textInput.value;
            let hexcode = val.slice(1, val.length).replace(colorHexRegex, '');
            textInput.value = "#" + hexcode;
            val = textInput.value;

            if (val.length > 7) {
                textInput.value = val.slice(0, 7);
            } else if (val.length < 1) {
                textInput.value = "#";
            }

            if (val[0] != "#") {
                val[0] = "#";
            }
            
            val = textInput.value;

            if (val.length == 7 || val.length == 4) {
                if (val.length == 4) {
                    val = val.split('').map(char => char + char).join('').slice(1,8);
                }
                colorPicker.value = val;
                changeVar(colorAffect, val);
            }
        });

        colorPicker.addEventListener("input", (_) => {
            let val = colorPicker.value;
            textInput.value = val;
            changeVar(colorAffect, val);
        });

        resetToDefaultButton.addEventListener("click", () => {
            let col = defaultColor;

            if (col.length == 4) {
                col = col.split('').map(char => char + char).join('').slice(1,8);
            } else if (col.length == 9) {
                col = col.slice(0, 7);
            }

            textInput.value = col;
            colorPicker.value = col;

            changeVar(colorAffect, col);
        });
    }
}