function listenForClicks() {

    function trigger(tabs) {
        browser.tabs.sendMessage(tabs[0].id, {
            command: "run",
        });
    }
    
    let elem = document.getElementById("remove");
    elem.addEventListener("click", (e) => {
        browser.tabs.query({ active: true, currentWindow: true })
            .then(trigger)
            .catch(() => {
                console.error("Script Broke")
            });

    });
    
    
    
    
    function triggerInput(tabs) {
        let value = document.getElementById("ip").value;
        browser.tabs.sendMessage(tabs[0].id, {
            command: "ip",
            data: value
        });
    }

    let ele = document.getElementById("submit");
    ele.addEventListener("click", (e) => {
        browser.tabs.query({ active: true, currentWindow: true })
            .then(triggerInput)
            .catch(() => {
                console.error("Script Broke")
            });

    });


    function clearStorage(tabs) {
        browser.tabs.sendMessage(tabs[0].id, {
            command: "armageddon"
        });
    }

    let btn = document.getElementById("deleteAll");
    btn.addEventListener("click", (e) => {
        browser.tabs.query({ active: true, currentWindow: true })
            .then(clearStorage)
            .catch(() => {
                console.error("Script Broke")
            });

    });



}


/**
 * When the popup loads, inject a content script into the active tab,
 * and add a click handler.
 * If we couldn't inject the script, handle the error.
 */
browser.tabs.executeScript({ file: "/hide.js" })
    .then(listenForClicks)
    .catch(() => {
        console.log("Script Broke");
    });

