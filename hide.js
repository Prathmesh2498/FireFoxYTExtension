
function trigger() {
    var allowedArray = ["Andrew Huberman", "freeCodeCamp.org", "Ecnerwala", "Engineering with Utsav", "Coding", "Code", "thenewboston"]
    console.log("Triggered", allowedArray);
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
                    break;
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
    if(chips){
        chips.click();
        chips.remove();
    }

    let sections = document.getElementById("contentContainer");
    if(sections){
        sections.remove();
    }

}

browser.runtime.onMessage.addListener((message) => {
    if (message.command === "run") {
        trigger();
    }
});

