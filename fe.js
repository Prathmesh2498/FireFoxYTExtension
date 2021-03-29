function listenForClicks() {

    /*
        This function triggers the listener in hide.js to 
        call the function "trigger" in hide.js
    */
    function trigger(tabs) {
        browser.tabs.sendMessage(tabs[0].id, {
            command: "run",
        });
    }

    //Set a listener on the remove suggestions button
    let elem = document.getElementById("remove");
    elem.addEventListener("click", (e) => {
        browser.tabs.query({ active: true, currentWindow: true })
            .then(trigger)
            .catch(() => {
                console.error("Script Broke")
            });

    });



    /*
        This function triggers the listener in hide.js to 
        call the function "allowedChannel" in hide.js and passes value as an argument.
    */
    function triggerInput(tabs) {
        let value = document.getElementById("ip").value;
        browser.tabs.sendMessage(tabs[0].id, {
            command: "ip",
            data: value
        }).then(()=>{
            let msg = document.getElementById("success");
            msg.hidden = false;
        });
    }

    //Set a listener on the submit channel button
    let ele = document.getElementById("submit");
    ele.addEventListener("click", (e) => {
        browser.tabs.query({ active: true, currentWindow: true })
            .then(triggerInput)
            .catch(() => {
                console.error("Script Broke")
            });

    });

    /*
        This function triggers the listener in hide.js to 
        call the function "clearStorage" in hide.js
    */
    function clearStorage(tabs) {
        browser.tabs.sendMessage(tabs[0].id, {
            command: "armageddon"
        }).then(()=>{
            let msg = document.getElementById("del");
            msg.hidden = false;
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
 * This is taken from official documentation from 
 * https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/Your_first_WebExtension
 */
browser.tabs.executeScript({ file: "/hide.js" })
    .then(listenForClicks)
    .catch(() => {
        console.log("Script Broke");
    });

