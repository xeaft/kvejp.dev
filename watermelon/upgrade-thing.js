function createAnyUpgrade(name, description, cost, callback, delay, upgradeShopId, type) {
    let upgradeShop = document.getElementById(upgradeShopId);
    let button = document.createElement("div");
    let titleText = document.createElement("p");
    let costText = document.createElement("p");
    let titleCostContainer = document.createElement("div");
    let ownedText = document.createElement("p");
    let ownedAmt = 0;
    let onLevelUpgradeEvents = [];
    let onUpgradeEvents = [];
    let allowUpgrades = true;
    let originalCost = cost;

    upgradeMultipliers[name] = 1;
    priceMultipliers[name] = 1;
    striking[name] = false;

    let existingUpgradeJson = localStorage.getItem(name);
    if (existingUpgradeJson != null) {
        existingUpgradeJson = JSON.parse(existingUpgradeJson);
        ownedAmt = +existingUpgradeJson.o;
        cost = getCostForLevel(originalCost, ownedAmt);
    }

    let execOnce = typeof delay === 'string';
    
    if (execOnce) {
        for (let i = 0; i < ownedAmt; i++) {
            callback(name);
        }
    }

    titleText.innerText = name; 
    costText.innerText = Math.ceil(+cost);
    ownedText.innerText = ownedAmt;
    costText.className = "upgrade-cost";
    button.className = "upgrade-button";
    titleCostContainer.className = "upgrade-container";
    ownedText.className = "upgrade-owned";
    button.style.backgroundColor = "#232323";
    costText.style.marginLeft = "5%";
    button.id = `${name}-upgrade`;

    let fullCostText = document.createElement("p");
    fullCostText.className = "original-cost-text";
    fullCostText.innerText = cost;
    fullCostText.style.display = "none";

    titleCostContainer.appendChild(titleText);
    titleCostContainer.appendChild(costText);
    button.appendChild(titleCostContainer);
    button.appendChild(ownedText);
    button.appendChild(fullCostText);
    upgradeShop.appendChild(button);

    function upgradeItem(buyMultiple) {
        if (heldKeys["Shift"] && !buyMultiple) {
            upgradeItem(10);
            return;
        } else if (heldKeys["Control"] && !buyMultiple) {
            upgradeItem(100);
            return;
        }

        if (buyMultiple && typeof buyMultiple == "number") {
            for (let i = 0; i < buyMultiple; i++) {
                upgradeItem("multibuy");
            }
            return;
        }
        if (!allowUpgrades) {
            return null;
        }

        let clicks = getClicks();
        let costNum = +cost;

        if (clicks >= costNum * globalPriceMultiplier) {
            removeClicks(costNum * globalPriceMultiplier);
            let ownedAmt = +ownedText.innerHTML;
            cost = getNextCost(cost, ownedAmt);
            ownedAmt += 1;
            ownedText.innerHTML = ownedAmt;
            costText.innerHTML = Math.ceil(cost);
            fullCostText.innerText = Math.ceil(cost);

            let jsonObj = {
                o: ownedAmt,
            };

            localStorage.setItem(name, JSON.stringify(jsonObj));
            saveClicks();

            if (execOnce) {
                callback(name);
            }
            
            for (let onLevelEvent of onLevelUpgradeEvents) {
                if (typeof onLevelEvent == "function") {
                    onLevelEvent();
                }
            }
            
            for (let onUpgradeEvent of onUpgradeEvents) {
                if (typeof onUpgradeEvent == "function") {
                    onUpgradeEvent();
                }
            }

            return true;
        }

        return false;
    }

    button.addEventListener("click", (ev) => {
        if (ev.button == 0) {
            upgradeItem();
        }
    });

    let textSize = getTextSize(description);
    button.addEventListener("mouseenter", (ev) => {
        if (isMobile) {
            return;
        }
        
        let thing = document.getElementById("upgrade-hover-text");
        if (thing) {
            thing.parentElement.removeChild(thing);
        }

        let mouseY = ev.clientY;

        let bgDiv = document.createElement("div");
        bgDiv.style.position = "absolute";
        bgDiv.style.right = "16vw";
        bgDiv.style.top = mouseY + "px";
        bgDiv.style.width = textSize.x + 10 + "px";
        bgDiv.style.height = textSize.y + 10 + "px";
        bgDiv.id = "upgrade-hover-text";
        bgDiv.style.border = "1px solid white";
        bgDiv.style.backgroundColor = "#000";
        bgDiv.style.pointerEvents = "none";

        let textObj = document.createElement("p");
        textObj.style.lineHeight = textSize.y + 10 + "px";
        textObj.innerText = description;
        textObj.style.padding = "0";
        textObj.style.margin = "5px";
        bgDiv.appendChild(textObj);
        document.body.appendChild(bgDiv);
    });

    button.addEventListener("mousemove", (ev) => {
        let thing = document.getElementById("upgrade-hover-text");
        if (thing) {
            thing.style.top = ev.clientY + "px";
        }
    })

    button.addEventListener("mouseleave", (ev) => {
        let thing = document.getElementById("upgrade-hover-text");
        if (thing) {
            thing.parentElement.removeChild(thing);
        }
    });

    if (!execOnce) {
        setInterval(() => {
            if (striking[name]) {
                return;
            }

            let ownedAmt = +ownedText.innerHTML;
            for (let i = 0; i < ownedAmt; i++) {
                callback(name);
            }
        }, delay);
    }

    function addLevelEventFunction(targetLevel, callback, autoCallAfter) {
        if (autoCallAfter) {
            let upgrades = getUpgradeCount(name);
            if (upgrades >= targetLevel) {
                callback();
                return;
            }
        }

        function onUpgradeHelper() {
            let upgrades = getUpgradeCount(name);

            if (upgrades < targetLevel) {
                return;
            }
            
            if (upgrades > targetLevel) {
                let index = onLevelUpgradeEvents.indexOf(onUpgradeHelper);
                if (index > -1) {
                    onLevelUpgradeEvents.splice(index, 1);
                }
                return;
            }
            
            callback();

            let index = onLevelUpgradeEvents.indexOf(onUpgradeHelper);
            if (index > -1) {
                onLevelUpgradeEvents.splice(index, 1);
            }
        }
    
        onLevelUpgradeEvents.push(onUpgradeHelper);
    }

    function addOnUpgradeEvent(callback, autoCallOnPageload) {
        if (autoCallOnPageload) {
            callback();
        }

        onUpgradeEvents.push(callback);
    }

    function preventUpgrades(disabled) {
        allowUpgrades = !disabled;
    }

    function sellItem() {
        return false;
    }

    function hide() {
        button.style.display = "none";
    }

    function show() {
        button.style.display = "flex";
    }

    function isVisible() {
        return button.style.display == "flex";
    }

    function getlvlupg() {
        return onLevelUpgradeEvents
    }

    let upgradeObject = {
        "button": button,
        "addLevelEvent": addLevelEventFunction,
        "addOnUpgradeEvent": addOnUpgradeEvent,
        "hide": hide,
        "show": show,
        "isVisible": isVisible,
        "upgrade": upgradeItem,
        "sell": sellItem,
        "preventUpgrades": preventUpgrades,
        "getLevelEvents": getlvlupg,
        "type": type
    }

    upgradeObjects[name] = upgradeObject;

    return upgradeObject;
}

function createUpgrade(name, description, cost, callback, delay, type) {
    return createAnyUpgrade(name, description, cost, callback, delay, "upgrade-shop-container", type);
}

function markOneTimeUpgradeAsPurchased(upgradeName) {
    let upgradeShop = document.getElementById("onetime-upgrade-shop-container");
    let upgradeDiv = null;

    for (let i of upgradeShop.children) {
        let cUpradeName = i.id.split("-upgrade")[0];
        if (cUpradeName == upgradeName) {
            upgradeDiv = i;
        }
    }

    if (!upgradeDiv) {
        return;
    }

    upgradeDiv.classList.add("onetime-upgrade-purchased");
    upgradeDiv.style.backgroundColor = "#141414";
    let nameText = upgradeDiv.querySelectorAll("p")[1];
    nameText.style.color = "#666";
    let priceText = upgradeDiv.getElementsByClassName("upgrade-cost")[0];
    priceText.innerText = "owned";
    priceText.style.color = "#666";

    upgradeShop.appendChild(upgradeDiv);
}

function createOneTimeUpgrade(name, description, cost, callback) {
    let owned = localStorage.getItem(name) != null ? true : false;
    if (owned) {
        callback();
    }

    let upgradeShop = document.getElementById("onetime-upgrade-shop-container");
    let button = document.createElement("div");
    let titleText = document.createElement("p");
    let costText = document.createElement("p");
    let titleCostContainer = document.createElement("div");
    let ownedText = document.createElement("p");

    ownedText.className = "upgrade-owned";
    ownedText.innerText = "0";
    ownedText.style.display = "none";
    button.appendChild(ownedText);

    let fullCostText = document.createElement("p");
    fullCostText.className = "original-cost-text";
    fullCostText.innerText = cost;
    fullCostText.style.display = "none";

    let localStorageItem = localStorage.getItem(name);
    if (localStorageItem) {
        ownedText.innerText = "1";
    }

    button.id = name + "-upgrade";

    let existingUpgradeJson = localStorage.getItem(name);
    if (existingUpgradeJson != null) {
        existingUpgradeJson = JSON.parse(existingUpgradeJson);
        ownedAmt = existingUpgradeJson.o;
        cost = existingUpgradeJson.cost;
    }

    titleText.innerText = name; 
    costText.innerText = Math.ceil(+cost);
    button.className = "upgrade-button";
    costText.className = "upgrade-cost";
    titleCostContainer.className = "upgrade-container";
    button.style.backgroundColor = "#232323";
    costText.style.marginLeft = "5%";

    titleCostContainer.appendChild(titleText);
    titleCostContainer.appendChild(costText);
    button.appendChild(titleCostContainer);
    button.appendChild(fullCostText);
    upgradeShop.appendChild(button);

    if (owned) {
        markOneTimeUpgradeAsPurchased(name);
        return;
    }

    let textSize = getTextSize(description);
    button.addEventListener("mouseenter", (ev) => {
        if (isMobile) {
            return;
        }

        if (button.classList.contains("onetime-upgrade-purchased")) {
            return;
        }

        let thing = document.getElementById("upgrade-hover-text");
        if (thing) {
            thing.parentElement.removeChild(thing);
        }

        let mouseY = ev.clientY;

        let bgDiv = document.createElement("div");
        bgDiv.style.position = "absolute";
        bgDiv.style.right = "16vw";
        bgDiv.style.top = mouseY + "px";
        bgDiv.style.width = textSize.x + 10 + "px";
        bgDiv.style.height = textSize.y + 10 + "px";
        bgDiv.id = "upgrade-hover-text";
        bgDiv.style.border = "1px solid white";
        bgDiv.style.backgroundColor = "#000";
        bgDiv.style.pointerEvents = "none";

        let textObj = document.createElement("p");
        textObj.style.lineHeight = textSize.y + 10 + "px";
        textObj.innerText = description;
        textObj.style.padding = "0";
        textObj.style.margin = "5px";
        bgDiv.appendChild(textObj);
        document.body.appendChild(bgDiv);
    });

    button.addEventListener("mousemove", (ev) => {
        let thing = document.getElementById("upgrade-hover-text");
        if (thing) {
            thing.style.top = ev.clientY + "px";
        }
    })

    button.addEventListener("mouseleave", (ev) => {
        let thing = document.getElementById("upgrade-hover-text");
        if (thing) {
            thing.parentElement.removeChild(thing);
        }
    });

    button.addEventListener("click", (ev) => {
        if (ev.button == 0) {
            if (button.classList.contains("onetime-upgrade-purchased")) {
                return;
            }

            let clicks = getClicks();
            let costNum = +cost;

            if (clicks >= costNum * globalPriceMultiplier) {
                removeClicks(costNum * globalPriceMultiplier);
                callback();
                localStorage.setItem(name, true);
                // button.style.display = "none";
                ownedText.innerText = "1";
                saveClicks();
                markOneTimeUpgradeAsPurchased(name);
            }
        }
    });
}

function createClickerUpgrade(name, description, cost, callback, delay, type) {
    return createAnyUpgrade(name, description, cost, callback, delay, "clicker-upgrade-shop-container", type);
}

function getNextCost(currentCost, ownedAmt) {
    return currentCost + currentCost / 12;
}

function getCostForLevel(originalCost, level) {
    let finalCost = originalCost;

    for (let i = 0; i < level; i++) {
        finalCost = getNextCost(finalCost);
    }

    return finalCost;
}

function getTextSize(text) {
    let p = document.createElement("p");
    p.style.position = "absolute";
    p.style.visibility = "hidden";
    p.style.whiteSpace = "nowrap";
    p.textContent = text;

    document.body.appendChild(p);

    let size = {
        width: p.offsetWidth,
        height: p.offsetHeight
    };

    document.body.removeChild(p);
    return size;
}

function calculateEfficiency(workers, maxWorkers, workspaces) {
    let totalMaxWorkers = maxWorkers * workspaces;

    if (workers <= totalMaxWorkers) {
        return 1; 
    }

    return efficiency = totalMaxWorkers / workers;  
}

function closenessLevel(x, y) {
    let difference = Math.abs(x - y);
    let maxDifference = Math.max(x, y);
    let closenessScore = 10 - (difference / maxDifference * 10);
    
    if (closenessScore < 1) closenessScore = 1;
    if (closenessScore > 10) closenessScore = 10;
    
    return closenessScore;
}