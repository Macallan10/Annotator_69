function annot() {
    chrome.tabs.query({ active: !0, currentWindow: !0 }, function (n) {
        chrome.tabs.sendMessage(n[0].id, { task: "annot" }, function (n) {
            console.log(n.retMessage);
        });
    }),
        window.open("", "_parent", ""),
        window.close();
}
function remAnnBtns() {
    chrome.tabs.query({ active: !0, currentWindow: !0 }, function (n) {
        chrome.tabs.sendMessage(n[0].id, { task: "remAnnBtns" }, function (n) {
            console.log(n.retMessage);
        });
    }),
        window.open("", "_parent", ""),
        window.close();
}
function annRem() {
    1 == confirm("Are you sure you want to continue?\nAll the annotations (except page notes) done on this page will be lost permanently.") &&
        chrome.tabs.query({ active: !0, currentWindow: !0 }, function (n) {
            chrome.tabs.sendMessage(n[0].id, { task: "annRem" }, function (n) {
                console.log(n.retMessage);
            });
        }),
        window.open("", "_parent", ""),
        window.close();
}
function pgNotes() {
    chrome.tabs.query({ active: !0, currentWindow: !0 }, function (n) {
        chrome.tabs.sendMessage(n[0].id, { task: "pgNotes" }, function (n) {
            console.log(n.retMessage);
        });
    }),
        window.open("", "_parent", ""),
        window.close();
}
chrome.tabs.query({ active: !0, currentWindow: !0 }, function (e) {
    (pgUrl = e[0].url),
        (u = pgUrl.replace("#", "")),
        0 <= pgUrl.indexOf("#") && u.length + 1 == pgUrl.length && (pgUrl = pgUrl.split("#")[0]),
        chrome.storage.local.get(pgUrl, function (n) {
            null != n[pgUrl] &&
                ((document.getElementById("tableRow").insertCell(0).innerHTML = "<img src='buttons/DelPageAnn.png' width = 30px id='remAnn' title = 'Remove annotations'/>"), (document.getElementById("remAnn").onclick = annRem));
            pgUrl.startsWith("chrome://")
                ? ((document.getElementById("showHideAnnotControls").outerHTML = ""), (document.getElementById("pgNotes").outerHTML = ""))
                : chrome.tabs.sendMessage(e[0].id, { task: "isAnnBtnsPres" }, function (n) {
                      null == n
                          ? ((document.getElementById("showHideAnnotControls").outerHTML = ""), (document.getElementById("pgNotes").outerHTML = ""))
                          : "true" == n.retMessage
                          ? ((document.getElementById("showHideAnnotControls").outerHTML = "<img src='buttons/RemAnnBtn.png' width = 30px id='remAnnBtns' title = 'Hide Annot Buttons'/>"),
                            (document.getElementById("remAnnBtns").onclick = remAnnBtns))
                          : ((document.getElementById("showHideAnnotControls").outerHTML = "<img src='buttons/AnnotDoc.png' width = 30px id='annot' title = 'Show Annot Buttons'/>"), (document.getElementById("annot").onclick = annot));
                  });
        });
}),
    (document.getElementById("pgNotes").onclick = pgNotes);
