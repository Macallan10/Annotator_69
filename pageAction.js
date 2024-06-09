function makeLogoEditable() {
    chrome.tabs.query({ active: !0 }, function (e) {
        chrome.pageAction.setIcon({ tabId: e[0].id, path: "icons/LogoBlue32x32.png" });
    });
}
function makeLogoBlank() {
    chrome.tabs.query({ active: !0 }, function (e) {
        chrome.pageAction.setIcon({ tabId: e[0].id, path: "icons/LogoGray32x32.png" });
    });
}
function resetPageIconStatus() {
    chrome.webNavigation.onCompleted.addListener(function (e) {
        (pgUrl = e.url),
            (u = pgUrl.replace("#", "")),
            0 <= pgUrl.indexOf("#") && u.length + 1 == pgUrl.length && (pgUrl = pgUrl.split("#")[0]),
            chrome.storage.local.get(pgUrl, function (e) {
                null != e[pgUrl] && makeLogoEditable();
            }),
            chrome.storage.local.get("AnnotatorAllPageNotes", function (e) {
                var t = {};
                null != e.AnnotatorAllPageNotes && (t = e.AnnotatorAllPageNotes), null != t[pgUrl] && makeLogoEditable();
            });
    });
}
chrome.runtime.onMessage.addListener(function (e, t, o) {
    console.log(t.tab ? "from a content script:" + t.tab.url : "from the extension"),
        "edited" == e.status && (makeLogoEditable(), o({ status: "Done" })),
        "noted" == e.status && (makeLogoEditable(), o({ status: "Done" })),
        "unnoted" == e.status
            ? ((pgUrl = t.tab.url),
              (u = pgUrl.replace("#", "")),
              0 <= pgUrl.indexOf("#") && u.length + 1 == pgUrl.length && (pgUrl = pgUrl.split("#")[0]),
              chrome.storage.local.get(pgUrl, function (e) {
                  null != e[pgUrl] ? o({ status: "Nothing to be Done" }) : (makeLogoBlank(), o({ status: "Done" }));
              }))
            : console.log(t.tab ? "Unrecognized: from a content script:" + t.tab.url : "Unrecognized: from the extension");
});
