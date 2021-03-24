function clearStorage(){
    localStorage.clear();
    //console.log("All channel names deleted!");
}

if (!localStorage.getItem("allowedArray")) {
    let allowedArrayString = "freeCodeCamp.org,ecnerwala,Engineering with Utsav,sudoCODE,3Blue1Brown,Clément Mihailescu, Errichto,Akshay Saini,MIT OpenCourseWare,stanfordonline,Andrew Huberman";
    localStorage.setItem("allowedArray", allowedArrayString);
    //console.log("First Write Done")
}

function addAllowedChannel(channelName = "default") {
    if (channelName === "default") {
        return;
    }
    else {
        let currentString = localStorage.getItem("allowedArray");
        let array = currentString.split(',');
        if (array.indexOf(channelName) === -1) {
            let allowedArrayString = currentString + "," + channelName;
            localStorage.setItem("allowedArray", allowedArrayString);
            //console.log("Added channel ", channelName);
        }

    }
}

function trigger() {
    var allowedArray = localStorage.getItem("allowedArray").split(',')
    //console.log("Triggered", allowedArray);
    if (window.location.href === "https://www.youtube.com/") {
        var e = null;
        e = document.getElementById("contents").childNodes;
        let i = e[0];
        while (i !== null) {
            let b = i.nextSibling;
            var allowed = false;
            for (let j = 0; j < allowedArray.length; j++) {
                if (i.innerText.includes(allowedArray[j])) {
                    allowed = true;
                }
            }
            if (!allowed) {
                i.remove();
            }
            i = b;

        }
    }
    else {
        var element = null;
        element = document.getElementById("secondary");
        element.remove();
    }
    let toolbar = document.getElementById("guide-button");
    toolbar.remove();

    let chips = document.getElementById("chips");
    if (chips) {
        chips.click();
        chips.remove();
    }

    let sections = document.getElementById("contentContainer");
    if (sections) {
        sections.remove();
    }

}

browser.runtime.onMessage.addListener((message) => {
    if (message.command === "run") {
        trigger();
    }
    else if (message.command === "ip") {
        addAllowedChannel(message.data);
    }
    else if(message.command === "armageddon"){
        clearStorage();
    }
});

