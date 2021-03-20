function listenForClicks() {

    function trigger(tabs) {
        browser.tabs.sendMessage(tabs[0].id, {
            command: "run",
        });
    }

    document.addEventListener("click", (e) => {
        browser.tabs.query({ active: true, currentWindow: true })
            .then(trigger)
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

/*

    function addChannelNames() {
        let data = document.getElementById("channelNames").value;
        console.log(data);
        browser.tabs.sendMessage(tabs[0].id, {
            command: "addChannelNames",
            data: data
        });
    }
*/

