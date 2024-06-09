function getNoteImg(e) {
    return '<img id="AnnotatorExtensionAddedNotesImg' + e + '" src="' + chrome.extension.getURL("EmbeddedNotes.png") + '" width = 15px alt="N" style="background-color: rgb(255, 255, 128);" /></div>';
}
function getNoteDiv(e) {
    return (
        '<div id="AnnotatorExtensionAddedNotes' +
        e +
        '" class = "notes_white_content" style="background: #E1ECF8;">Notes:          <img id="AnnotatorExtensionCloseNotes' +
        e +
        '" class = "AnnotatorExtensionCloseAnnotBtn" src="' +
        chrome.extension.getURL("Cross.png") +
        '" width = 20px alt="E" title="Close"/>          <img id="AnnotatorExtensionDelNotes' +
        e +
        '" class = "AnnotatorExtensionDelNotesBtn" src="' +
        chrome.extension.getURL("delete.png") +
        '" width = 20px alt="E" title="Close"/>          <div id="AnnotatorExtensionActualNotes' +
        e +
        '" contenteditable="true" style="background: #FFFFFF; padding: 8px;"></div>          </div>'
    );
}
function htmlToElement(e) {
    var n = document.createElement("template");
    return (e = e.trim()), (n.innerHTML = e), n.content.firstChild;
}
function toggleNotes() {
    document.getElementById("AnnotatorExtensionAddNotes").clicked
        ? ($("#AnnotatorExtensionAddNotes").css("backgroundColor", "#FFFF00"), (document.getElementById("AnnotatorExtensionAddNotes").clicked = !1), $(document).unbind("click"))
        : ($("#AnnotatorExtensionAddNotes").css("backgroundColor", "#AAAA55"),
          $(document).click(function (e) {
              if (document.getElementById("AnnotatorExtensionAddNotes").clicked) {
                  var n = window.getSelection(),
                      t = parseInt(document.getElementById("AnnotatorNotesMaxID").value) + 1;
                  (temp = htmlToElement(getNoteImg(t))),
                      n.getRangeAt(0).insertNode(temp),
                      n.empty(),
                      (document.getElementById("AnnotatorExtensionNotesContDiv").innerHTML += getNoteDiv(t)),
                      bindAnnotatorNotesEvents(!0),
                      addNotesEvents((document.getElementById("AnnotatorNotesMaxID").value = t), !1),
                      $("#AnnotatorExtensionAddNotes").css("backgroundColor", "#FFFF00"),
                      (document.getElementById("AnnotatorExtensionAddNotes").clicked = !1),
                      $(document).unbind("click"),
                      $("#AnnotatorExtensionAddedNotesImg" + t).click();
              }
          }),
          setTimeout(function () {
              document.getElementById("AnnotatorExtensionAddNotes").clicked = !0;
          }, 100));
}
function bindAnnotatorNotesEvents(e) {
    for (var n = parseInt(document.getElementById("AnnotatorNotesMaxID").value), t = 1; t <= n; t++) addNotesEvents(t, e);
}
var isBound = function (e, t) {
    var o = !1;
    return (
        $.each($(e).data("events"), function (e, n) {
            e === t && (o = !0);
        }),
        o
    );
};
function addNotesEvents(s, e) {
    e ||
        ((tempElem = document.getElementById("AnnotatorExtensionAddedNotesImg" + s)),
        null != tempElem &&
            tempElem.addEventListener(
                "click",
                function (e) {
                    s = e.target.id.slice("AnnotatorExtensionAddedNotesImg".length);
                    var n = e.target.getBoundingClientRect(),
                        t = Math.ceil(n.left),
                        o = n.top,
                        i = document.body.getBoundingClientRect();
                    n.top, i.top;
                    260 < t && (t -= 250),
                        (document.getElementById("AnnotatorExtensionAddedNotes" + s).style.top = Math.ceil(o) + "px"),
                        (document.getElementById("AnnotatorExtensionAddedNotes" + s).style.left = t + "px"),
                        (document.getElementById("AnnotatorExtensionAddedNotes" + s).style.display = "block"),
                        (document.getElementById("AnnotatorExtensionNotesFade").style.display = "block"),
                        document.getElementById("AnnotatorExtensionActualNotes" + s).focus();
                },
                !1
            )),
        (tempElem = document.getElementById("AnnotatorExtensionCloseNotes" + s)),
        null != tempElem &&
            tempElem.addEventListener(
                "click",
                function (e) {
                    (s = e.target.id.slice("AnnotatorExtensionCloseNotes".length)),
                        (document.getElementById("AnnotatorExtensionAddedNotes" + s).style.display = "none"),
                        (document.getElementById("AnnotatorExtensionNotesFade").style.display = "none"),
                        savePage();
                },
                !1
            ),
        (tempElem = document.getElementById("AnnotatorExtensionDelNotes" + s)),
        null != tempElem &&
            tempElem.addEventListener(
                "click",
                function (e) {
                    (s = e.target.id.slice("AnnotatorExtensionDelNotes".length)),
                        (document.getElementById("AnnotatorExtensionAddedNotesImg" + s).outerHTML = ""),
                        (document.getElementById("AnnotatorExtensionAddedNotes" + s).outerHTML = ""),
                        (document.getElementById("AnnotatorExtensionNotesFade").style.display = "none"),
                        savePage();
                },
                !1
            );
}
function getPageNoteDiv() {
    return (
        '<div id="AnnotatorExtensionPageNote" class = "page_notes_white_content" style="background: #E1ECF8; padding: 8px;"><center><i>Page Notes:</i><br>&nbsp;</center>          <img id="AnnotatorExtensionPageCloseNotes" class = "AnnotatorExtensionCloseAnnotBtn" src="' +
        chrome.extension.getURL("Cross.png") +
        '" width = 20px alt="E" title="Close"/><div id="AnnotatorExtensionPageActualNotes" contenteditable="true"  data-text="Enter page-notes here (remove all the contents to delete it)" style="background: #FFFFFF; padding: 8px;"></div>          </div><div id="AnnotatorExtensionPgNoteFade" class="page_notes_black_overlay"></div>'
    );
}
function savePageNotes() {
    chrome.storage.local.get("AnnotatorAllPageNotes", function (e) {
        (pgUrl = document.URL), (u = pgUrl.replace("#", "")), 0 <= pgUrl.indexOf("#") && u.length + 1 == pgUrl.length && (pgUrl = pgUrl.split("#")[0]);
        var n = {};
        null != e.AnnotatorAllPageNotes && (n = e.AnnotatorAllPageNotes);
        var t = {},
            o = new Date();
        ((t.lastModified = o.toLocaleString()), (t.notes = document.getElementById("AnnotatorExtensionPageActualNotes").innerHTML), t.notes.replace(/(?:^(?:&nbsp;)+)|(?:(?:&nbsp;)+$)/g, ""))
            ? ((notePresent = !1),
              null != n[pgUrl] && (notePresent = !0),
              (n[pgUrl] = t),
              notePresent ||
                  chrome.runtime.sendMessage({ status: "noted" }, function (e) {
                      console.log(e.status);
                  }))
            : (delete n[pgUrl],
              chrome.runtime.sendMessage({ status: "unnoted" }, function (e) {
                  console.log(e.status);
              }));
        (e.AnnotatorAllPageNotes = n), chrome.storage.local.set(e), (document.getElementById("AnnotatorExtensionPgNoteFade").outerHTML = ""), (document.getElementById("AnnotatorExtensionPageNote").outerHTML = "");
    });
}
function fillPageNotes() {
    chrome.storage.local.get("AnnotatorAllPageNotes", function (e) {
        (pgUrl = document.URL), (u = pgUrl.replace("#", "")), 0 <= pgUrl.indexOf("#") && u.length + 1 == pgUrl.length && (pgUrl = pgUrl.split("#")[0]);
        var n = {};
        null != e.AnnotatorAllPageNotes && (n = e.AnnotatorAllPageNotes);
        var t = n[pgUrl];
        null != t && ((cont = t.notes), (document.getElementById("AnnotatorExtensionPageActualNotes").innerHTML = cont));
    });
}
function showPageNotes() {
    var e = createElem(getPageNoteDiv());
    document.body.insertBefore(e, document.body.childNodes[0]),
        (document.getElementById("AnnotatorExtensionPgNoteFade").style.display = "block"),
        fillPageNotes(),
        (tempElem = document.getElementById("AnnotatorExtensionPageCloseNotes")),
        null != tempElem &&
            tempElem.addEventListener(
                "click",
                function (e) {
                    savePageNotes();
                },
                !1
            );
}
function savePage() {
    var e = !1;
    null != document.getElementById("AnnotatorExtensionEraser") && (e = !0),
        e && document.getElementById("AnnotatorExtensionEraser").clicked && toggleEraser(),
        (pgUrl = document.URL),
        (u = pgUrl.replace("#", "")),
        0 <= pgUrl.indexOf("#") && u.length + 1 == pgUrl.length && (pgUrl = pgUrl.split("#")[0]);
    var n = {};
    $("#AnnotatorExtensionAll").remove(), (n[pgUrl] = document.documentElement.innerHTML), chrome.storage.local.set(n), e && insertMenu(), saveAnnots();
}
function saveAnnots() {
    chrome.storage.local.get("AnnotatorAllAnnots", function (e) {
        (pgUrl = document.URL), (u = pgUrl.replace("#", "")), 0 <= pgUrl.indexOf("#") && u.length + 1 == pgUrl.length && (pgUrl = pgUrl.split("#")[0]);
        var n = {};
        null != e.AnnotatorAllAnnots && (n = e.AnnotatorAllAnnots);
        var t = {};
        null != n[pgUrl] && null == (t = n[pgUrl]).lastVisited && (t = {});
        var o = new Date();
        (t.lastVisited = o.toLocaleString()),
            (t.lastModified = o.toLocaleString()),
            (t.title = $("title", document).text()),
            (annots = extractAnnots(document)),
            (t.highL = annots[0]),
            (t.highLText = annots[1]),
            (t.pNotes = annots[2]),
            (t.pNotesText = annots[3]),
            (n[pgUrl] = t),
            (e.AnnotatorAllAnnots = n),
            chrome.storage.local.set(e);
    }),
        chrome.runtime.sendMessage({ status: "edited" }, function (e) {
            console.log(e.status);
        });
}
function updateLastVisited() {
    chrome.storage.local.get("AnnotatorAllAnnots", function (e) {
        (pgUrl = document.URL), (u = pgUrl.replace("#", "")), 0 <= pgUrl.indexOf("#") && u.length + 1 == pgUrl.length && (pgUrl = pgUrl.split("#")[0]);
        var n = new Date(),
            t = {};
        null != e.AnnotatorAllAnnots && null != (t = e.AnnotatorAllAnnots)[pgUrl] && ((pgAnnots = t[pgUrl]), (pgAnnots.lastVisited = n.toLocaleString()), (t[pgUrl] = pgAnnots), (e.AnnotatorAllAnnots = t), chrome.storage.local.set(e));
    });
}
function getSavePage() {
    (pgUrl = document.URL),
        (u = pgUrl.replace("#", "")),
        isItSearchPage(u),
        0 <= pgUrl.indexOf("#") && u.length + 1 == pgUrl.length && (pgUrl = pgUrl.split("#")[0]),
        chrome.storage.local.get(pgUrl, function (e) {
            (isEditted = !1),
                null != e[pgUrl] &&
                    ((isEditted = !0),
                    (document.documentElement.innerHTML = e[pgUrl]),
                    (AnnotatorNotesMaxID = document.getElementById("AnnotatorNotesMaxID")),
                    (AnnotatorExtensionNotesFade = document.getElementById("AnnotatorExtensionNotesFade")),
                    null != AnnotatorNotesMaxID && null == AnnotatorExtensionNotesFade && (AnnotatorNotesMaxID.outerHTML += '<div id="AnnotatorExtensionNotesFade" class="notes_black_overlay"></div>'),
                    chrome.runtime.sendMessage({ status: "edited" }, function (e) {
                        console.log(e.status);
                    })),
                isEditted ||
                    chrome.storage.local.get("AnnotatorAllPageNotes", function (e) {
                        var n = {};
                        null != e.AnnotatorAllPageNotes && (n = e.AnnotatorAllPageNotes),
                            null != n[pgUrl] &&
                                chrome.runtime.sendMessage({ status: "noted" }, function (e) {
                                    console.log(e.status);
                                });
                    }),
                bindAnnotatorNotesEvents(!1),
                updateLastVisited();
        });
}
function createElem(e) {
    var n = document.createDocumentFragment(),
        t = document.createElement("div");
    for (t.innerHTML = e; t.firstChild; ) n.appendChild(t.firstChild);
    return n;
}
function insertMenu() {
    (AnnotatorNotesMaxID = '<input id="AnnotatorNotesMaxID" type="hidden" value=0><div id="AnnotatorExtensionNotesFade" class="notes_black_overlay"></div><div id="AnnotatorExtensionNotesContDiv"></div>'),
        document.getElementById("AnnotatorNotesMaxID") && (AnnotatorNotesMaxID = "");
    var e = createElem(
        '<div id = "AnnotatorExtensionAll"> <nav class="floating-menu" id="AnnotatorExtensionAllChild" ><img class = "AnnotatorExtensionMenuButtons" id="AnnotatorExtensionAddNotes" src="' +
            chrome.extension.getURL("notes.png") +
            '" width = 20px alt="E" title="Add pop-up notes"/>&nbsp;&nbsp;<br><img class = "AnnotatorExtensionShowMenuButtons" id="AnnotatorExtensionMkEditable" src="' +
            chrome.extension.getURL("edit.png") +
            '" width = 20px alt="E" title="Edit this page"/>&nbsp;&nbsp;<br><br><img class = "AnnotatorExtensionMenuButtons" id="AnnotatorExtensionHighlight" src="' +
            chrome.extension.getURL("ring.png") +
            '" width = 20px alt="E" title="Edit"/>&nbsp;&nbsp;<br><img class = "AnnotatorExtensionMenuButtons" id="AnnotatorExtensionRelevant" src="' +
            chrome.extension.getURL("ring.png") +
            '" width = 20px alt="E" title="Edit"/>&nbsp;&nbsp;<br><img class = "AnnotatorExtensionMenuButtons" id="AnnotatorExtensionAwesome" src="' +
            chrome.extension.getURL("ring.png") +
            '" width = 20px alt="E" title="Edit"/>&nbsp;&nbsp;<br><img class = "AnnotatorExtensionMenuButtons" id="AnnotatorExtensionClarify" src="' +
            chrome.extension.getURL("ring.png") +
            '" width = 20px alt="E" title="Edit"/>&nbsp;&nbsp;<br><img class = "AnnotatorExtensionMenuButtons" id="AnnotatorExtensionNoSense" src="' +
            chrome.extension.getURL("ring.png") +
            '" width = 20px alt="E" title="Edit"/>&nbsp;&nbsp;<br><img class = "AnnotatorExtensionMenuButtons" id="AnnotatorExtensionTODO" src="' +
            chrome.extension.getURL("ring.png") +
            '" width = 20px alt="E" title="Edit"/>&nbsp;&nbsp;<br><img class = "AnnotatorExtensionMenuButtons" id="AnnotatorExtensionRelated" src="' +
            chrome.extension.getURL("ring.png") +
            '" width = 20px alt="E" title="Edit"/>&nbsp;&nbsp;<br><br><img class = "AnnotatorExtensionMenuButtons" id="AnnotatorExtensionEraser" src="' +
            chrome.extension.getURL("Eraser.png") +
            '" width = 20px alt="E" title="Remove Highlight" />&nbsp;&nbsp;<br><img class = "AnnotatorExtensionMenuButtons" id="AnnotatorExtensionShowAnnot" src="' +
            chrome.extension.getURL("summary.png") +
            '" width = 20px alt="E" title="List Annotations"/>&nbsp;&nbsp;<br></nav><div id="AnnotatorExtensionAnnotFade" class="black_overlay"></div><div id="AnnotatorExtensionAnnotLight" class="white_content"></div></div>' +
            AnnotatorNotesMaxID
    );
    document.body.insertBefore(e, document.body.childNodes[0]), initContentScript();
}
function AnnotatorExtensionAnnotLightCont() {
    return 'No notes/highlights to display for the page. <img id="AnnotatorExtensionCloseAnnot" class = "AnnotatorExtensionCloseAnnotBtn" src="' + chrome.extension.getURL("Cross.png") + '" width = 20px alt="E" title="Close"/>';
}
function initContentScript() {
    $("#AnnotatorExtensionAddNotes").css("backgroundColor", "#ffff00"),
        (document.getElementById("AnnotatorExtensionAddNotes").color = "#ffff00"),
        (document.getElementById("AnnotatorExtensionAddNotes").clicked = !1),
        document.getElementById("AnnotatorExtensionAddNotes").addEventListener(
            "click",
            function () {
                toggleNotes();
            },
            !1
        ),
        document.getElementById("AnnotatorExtensionMkEditable").addEventListener(
            "click",
            function () {
                $("#AnnotatorExtensionAll").remove(),
                    document.body.innerHTML.startsWith('<div contenteditable="true" id="AnnotatorExtensionEditableDiv">')
                        ? ((document.body.innerHTML = document.body.childNodes[0].innerHTML), insertMenu(), savePage())
                        : ((document.body.innerHTML = "<div contenteditable='true' id='AnnotatorExtensionEditableDiv'>" + document.body.innerHTML + "</div>"), insertMenu()),
                    bindAnnotatorNotesEvents(!1);
            },
            !1
        );
    var e = ["AnnotatorExtensionHighlight", "AnnotatorExtensionRelevant", "AnnotatorExtensionAwesome", "AnnotatorExtensionClarify", "AnnotatorExtensionNoSense", "AnnotatorExtensionTODO", "AnnotatorExtensionRelated"],
        n = ["#ffff00", "#33d6ff", "#99ff99", "#FF90CB", "#FF7777", "#ccccff", "#33d600"],
        t = ["Highlight", "Mark relevant", "Awesome", "Didn't get it", "Does not make sense", "TODO", "Related text"];
    for (i = 0; i < 7; i++)
        $("#" + e[i]).css("backgroundColor", n[i]),
            (document.getElementById(e[i]).title = t[i]),
            (document.getElementById(e[i]).color = n[i]),
            i < 7 &&
                document.getElementById(e[i]).addEventListener(
                    "click",
                    function () {
                        hilite(this.color, this.tagV);
                    },
                    !1
                );
    $("#AnnotatorExtensionEraser").css("backgroundColor", "#ffffff"),
        $("#AnnotatorExtensionShowAnnot").css("backgroundColor", "#ffffff"),
        $("#AnnotatorExtensionSearch").css("backgroundColor", "#ffffff"),
        (document.getElementById("AnnotatorExtensionEraser").clicked = !1),
        document.getElementById("AnnotatorExtensionEraser").addEventListener(
            "click",
            function () {
                toggleEraser();
            },
            !1
        ),
        document.getElementById("AnnotatorExtensionShowAnnot").addEventListener(
            "click",
            function () {
                (document.getElementById("AnnotatorExtensionAnnotLight").style.display = "block"),
                    (document.getElementById("AnnotatorExtensionAnnotFade").style.display = "block"),
                    (temp = extractAnnots(document)),
                    chrome.storage.local.get("AnnotatorAllPageNotes", function (e) {
                        (pgUrl = document.URL), (u = pgUrl.replace("#", "")), 0 <= pgUrl.indexOf("#") && u.length + 1 == pgUrl.length && (pgUrl = pgUrl.split("#")[0]);
                        var n = {};
                        null != e.AnnotatorAllPageNotes && (n = e.AnnotatorAllPageNotes), (pgNote = "");
                        var t = n[pgUrl];
                        null != t && (pgNote = t.notes),
                            "" == temp[0] && "" == temp[2] && "" == pgNote
                                ? (highLC = AnnotatorExtensionAnnotLightCont())
                                : (highLC =
                                      composeAnnots(temp[0], temp[2], pgNote) +
                                      '<img id="AnnotatorExtensionCloseAnnot" class = "AnnotatorExtensionCloseAnnotBtn" src="' +
                                      chrome.extension.getURL("Cross.png") +
                                      '" width = 20px alt="E" title="Close"/>'),
                            (document.getElementById("AnnotatorExtensionAnnotLight").innerHTML = highLC),
                            document.getElementById("AnnotatorExtensionCloseAnnot").addEventListener(
                                "click",
                                function () {
                                    (document.getElementById("AnnotatorExtensionAnnotLight").style.display = "none"),
                                        (document.getElementById("AnnotatorExtensionAnnotFade").style.display = "none"),
                                        (document.getElementById("AnnotatorExtensionAnnotLight").innerHTML = "");
                                },
                                !1
                            );
                    });
            },
            !1
        );
}
// made by Lakshay Yadav 22116049
function insertNoShowMenu() {
    var e = createElem(
        '<nav class="floating-menu" id="AnnotatorExtensionAll"><img class = "AnnotatorExtensionShowMenuButtons" id="AnnotatorExtensionPgAdd" src="' +
            chrome.extension.getURL("PageEdit.png") +
            '" width = 20px alt="E" title="Enable for this page"/>&nbsp;&nbsp;<br><img class = "AnnotatorExtensionShowMenuButtons" id="AnnotatorExtensionDomAdd" src="' +
            chrome.extension.getURL("DomainEdit.png") +
            '" width = 20px alt="E" title="Enable for this domain"/>&nbsp;&nbsp;</nav>'
    );
    document.body.insertBefore(e, document.body.childNodes[0]),
        document.getElementById("AnnotatorExtensionPgAdd").addEventListener(
            "click",
            function () {
                enableURLEditing();
            },
            !1
        ),
        document.getElementById("AnnotatorExtensionDomAdd").addEventListener(
            "click",
            function () {
                enableDomainEditing();
            },
            !1
        );
}
function doOnLoad() {
    chrome.storage.local.get(["noShowUrls", "noShowDomains", "showURLs"], function (e) {
        if (null == e.noShowUrls || null == e.noShowDomains);
        else {
            (noShowUrls = e.noShowUrls), (noShowDomains = e.noShowDomains), (pgUrl = document.URL), (u = pgUrl.replace("#", "")), 0 <= pgUrl.indexOf("#") && u.length + 1 == pgUrl.length && (pgUrl = pgUrl.split("#")[0]), (show = !0);
            for (var n = 0; n < noShowDomains.length; n++)
                if (pgUrl.startsWith(noShowDomains[n])) {
                    show = !1;
                    break;
                }
            if (show) {
                for (n = 0; n < noShowUrls.length; n++)
                    if (pgUrl == noShowUrls[n]) {
                        show = !1;
                        break;
                    }
            } else if (null != e.showURLs) {
                showURLs = e.showURLs;
                for (n = 0; n < showURLs.length; n++)
                    if (pgUrl == showURLs[n]) {
                        show = !0;
                        break;
                    }
            }
            insertMenu(), bindAnnotatorNotesEvents(!1);
        }
    });
}
function disableURLEditing() {
    return (
        chrome.storage.local.get(["noShowUrls"], function (e) {
            (pgUrl = document.URL), (u = pgUrl.replace("#", "")), 0 <= pgUrl.indexOf("#") && u.length + 1 == pgUrl.length && (pgUrl = pgUrl.split("#")[0]);
            var n = [];
            null != e.noShowUrls && (n = e.noShowUrls), n.push(pgUrl), (e.noShowUrls = n), chrome.storage.local.set(e);
        }),
        !1
    );
}
function extractDomain(e) {
    return -1 < e.indexOf("://") ? e.split("://")[0] + "://" + e.split("/")[2] : e.split("/")[0];
}
function disableDomainEditing() {
    chrome.storage.local.get("noShowDomains", function (e) {
        (domain = extractDomain(document.URL)), (noShowDomains = e.noShowDomains), noShowDomains.push(domain), (e.noShowDomains = noShowDomains), chrome.storage.local.set(e), $("#AnnotatorExtensionAll").remove(), doOnLoad();
    });
}
function enableURLEditing() {
    return (
        chrome.storage.local.get(["noShowUrls", "showURLs"], function (e) {
            (pgUrl = document.URL), (u = pgUrl.replace("#", "")), 0 <= pgUrl.indexOf("#") && u.length + 1 == pgUrl.length && (pgUrl = pgUrl.split("#")[0]);
            var n = [];
            if (null != e.noShowUrls) {
                n = e.noShowUrls;
                for (var t = 0; t < n.length; t++) if (pgUrl == n[t]) return n.splice(t, 1), (e.noShowUrls = n), chrome.storage.local.set(e), $("#AnnotatorExtensionAll").remove(), doOnLoad(), !1;
            }
            var o = [];
            null != e.showURLs && (o = e.showURLs), o.push(pgUrl), (e.showURLs = o), chrome.storage.local.set(e), $("#AnnotatorExtensionAll").remove(), doOnLoad();
        }),
        !1
    );
}
function enableDomainEditing() {
    chrome.storage.local.get("noShowDomains", function (e) {
        (noShowDomains = e.noShowDomains), (pgUrl = document.URL);
        for (var n = 0; n < noShowDomains.length; n++) pgUrl.startsWith(noShowDomains[n]) && noShowDomains.splice(n--, 1);
        (e.noShowDomains = noShowDomains), chrome.storage.local.set(e), $("#AnnotatorExtensionAll").remove(), doOnLoad();
    });
}
function togVis(e) {
    var n = "none";
    "none" === document.getElementById(e).style.display && (n = "block"), (document.getElementById(e).style.display = n);
}
function fixHighAnnot() {
    var n = document.getElementsByTagName("*"),
        t = [];
    (t[0] = "rgb(255, 255, 0)"), (t[1] = "rgb(51, 214, 255)"), (t[2] = "rgb(153, 255, 153)"), (t[3] = "rgb(255, 144, 203)"), (t[4] = "rgb(255, 119, 119)"), (t[5] = "rgb(204, 204, 255)"), (t[6] = "rgb(51, 214, 0)");
    for (var o = 0, i = n.length; o < i; o++)
        if (((e = n[o]), "span" != e.nodeName.toLowerCase() && "AnnotatorExtensionMenuButtons" != e.className))
            for (var s = 0; s < 7; s++) $(e).css("background-color") == t[s] && ((e.style.backgroundColor = ""), (e.innerHTML = '<span style="background-color: ' + t[s] + ';">' + e.innerHTML + "</span>"));
        else if ("span" == e.nodeName.toLowerCase())
            for (s = 0; s < 7; s++)
                if ($(e).css("background-color") == t[s] && ((inH = e.innerHTML.replace(/^\s+|\s+$/g, "")), "<" == inH.charAt(0) && ">" == inH.charAt(inH.length - 1))) {
                    (preTag = inH.substring(0, inH.indexOf(">") + 1)), (inH = inH.substring(inH.indexOf(">") + 1)), (L = inH.length);
                    for (var l = L - 1; 0 <= l && "<" != inH.charAt(l); l--);
                    (postTag = inH.substring(l)), (e.innerHTML = inH), (e.outerHTML = preTag + e.outerHTML + postTag);
                }
}
function hilite(n, e) {
    var t,
        o,
        i = getSelectionHtml();
    if (null !== i && "" !== i) {
        if (window.getSelection)
            try {
                document.execCommand("BackColor", !1, n) || ((document.designMode = "on"), document.execCommand("HiliteColor", !1, n), (document.designMode = "off"));
            } catch (e) {
                (o = window.getSelection()).rangeCount && o.getRangeAt && (t = o.getRangeAt(0)),
                    (document.designMode = "on"),
                    t && (o.removeAllRanges(), o.addRange(t)),
                    document.execCommand("HiliteColor", !1, n) || document.execCommand("BackColor", !1, n),
                    (document.designMode = "off");
            }
        else document.selection && document.selection.createRange && (t = document.selection.createRange()).execCommand("BackColor", !1, n);
        fixHighAnnot(), savePage();
    }
}
function getSelectionHtml() {
    var e = "";
    if (void 0 !== window.getSelection) {
        var n = window.getSelection();
        if (n.rangeCount) {
            for (var t = document.createElement("div"), o = 0, i = n.rangeCount; o < i; ++o) t.appendChild(n.getRangeAt(o).cloneContents());
            e = t.innerHTML;
        }
    } else void 0 !== document.selection && "Text" == document.selection.type && (e = document.selection.createRange().htmlText);
    return e;
}
function toggleEraser() {
    document.getElementById("AnnotatorExtensionEraser").clicked
        ? ($("#AnnotatorExtensionEraser").css("backgroundColor", "#ffffff"), (document.getElementById("AnnotatorExtensionEraser").clicked = !1), $("span").unbind("click"))
        : (fixHighAnnot(),
          $("#AnnotatorExtensionEraser").css("backgroundColor", "#AA9988"),
          (document.getElementById("AnnotatorExtensionEraser").clicked = !0),
          $("span").click(function (e) {
              document.getElementById("AnnotatorExtensionEraser").clicked &&
                  (toggleEraser(),
                  ("SPAN" != e.target.tagName && "span" != e.target.tagName) ||
                      ((oC = e.target.outerHTML),
                      (tagC = oC.substring(1, oC.indexOf(">"))),
                      42 < tagC.length && tagC.length < 52 && e.target.style.cssText.toLowerCase().startsWith("background-color: rgb") && ((e.target.outerHTML = e.target.innerHTML), savePage())));
          }));
}
function isItSearchPage(e) {
    if (!(0 < e.length)) return !1;
    if ("search.html" !== e.split("/").pop()) return !1;
    if (null == document.getElementById("AnnotatorExtSearchDivToReplace")) return !1;
    var n = " <table align='center'>";
    return (
        (n += "    <tr><td><input type='text' id='AnnotatorSearchWords' size=80 placeholder='Search string or RegEx (Leave empty to fetch everything)'> "),
        (n += "     <img  id='AnnotatorExtensionSearchBtn' src='" + chrome.extension.getURL("searchIcon2.png") + "' width = 30px alt='E' title='Edit'/>"),
        (n += "     </td></tr><tr><td align = 'center'>"),
        (n += "     <input type='radio' name = 'AnnotatorSearchScope' id='AnnotatorSearchScope1' value='HighNote' checked='checked'>Search highlights and notes only &nbsp;&nbsp;&nbsp;"),
        (n += "     <input type='radio' name = 'AnnotatorSearchScope' id='AnnotatorSearchScope2' value='AllStuff'>Search everything/entire page contents (might be slow)"),
        (n += "     </td></tr> </table>"),
        (document.getElementById("AnnotatorExtSearchDivToReplace").innerHTML = n),
        addSearchBtnEventListener(),
        !0
    );
}
function addSearchBtnEventListener() {
    document.getElementById("AnnotatorExtensionSearchBtn").addEventListener("click", function () {
        chrome.storage.local.get(null, function (e) {
            var n = " <table style='width:100%; align = center;'>                            <tr>                            <td width = 100px></td><td><table class = 'searchResult' style='width:100%; align = center;'>",
                t = 0,
                o = [],
                i = e.AnnotatorAllAnnots;
            for (var s in (null == i && (i = {}),
            (resCount = 0),
            (searchRegEx = new RegExp(document.getElementById("AnnotatorSearchWords").value, "i")),
            (AnnotatorAllPageNotes = {}),
            null != e.AnnotatorAllPageNotes && (AnnotatorAllPageNotes = e.AnnotatorAllPageNotes),
            e))
                e.hasOwnProperty(s) &&
                    "noShowDomains" != s &&
                    "noShowUrls" != s &&
                    "showURLs" != s &&
                    "AnnotatorAllAnnots" != s &&
                    "AnnotatorAllPageNotes" != s &&
                    ((pgNotesC = ""),
                    null != AnnotatorAllPageNotes[s] && ((pgNotesC = AnnotatorAllPageNotes[s].notes), (AnnotatorAllPageNotes[s] = "")),
                    (stuff = extractStuff(s, i, e, pgNotesC, document.getElementById("AnnotatorSearchScope2").checked, searchRegEx)),
                    null != stuff &&
                        (0 == t && (n += "<tr><th>Title</th><th>Annotations</th></tr>"),
                        (n += '<tr><td><a href="' + s + '" target="_blank">' + stuff[2].substring(0, 50) + (50 < stuff[2].length ? "..." : "") + "</a><br>Last Visited: " + stuff[0] + "</td><td>" + stuff[3] + "</td></tr>"),
                        (o[t] = s),
                        (t += 1)));
            for (var s in AnnotatorAllPageNotes)
                "" != AnnotatorAllPageNotes[s] &&
                    ((pgNotesC = AnnotatorAllPageNotes[s].notes),
                    (pgNotesT = getTextFromHTML(pgNotesC)),
                    0 <= pgNotesT.search(searchRegEx) &&
                        (0 == t && (n += "<tr><th>Title</th><th>Annotations</th></tr>"),
                        (n += '<tr><td><a href="' + s + '" target="_blank">' + s + "</a><br>Last Visited: " + AnnotatorAllPageNotes[s].lastModified + "</td><td>" + pgNotesC + "</td></tr>"),
                        (o[t] = s),
                        (t += 1)));
            (n += "</table>                     </td> <td width = 100px></td>                     </tr>                     </table>"),
                (document.getElementById("SearchRes").innerHTML = n),
                null != document.getElementById("AnnotatorblueHeader") && (document.getElementById("AnnotatorblueHeader").outerHTML = "");
        });
    }),
        $("#AnnotatorSearchWords").keyup(function (e) {
            13 === e.keyCode && $("#AnnotatorExtensionSearchBtn").click();
        });
}
getSavePage(),
    chrome.runtime.onMessage.addListener(function (e, n, t) {
        console.log(n.tab ? "from a content script:" + n.tab.url : "from the extension"),
            "isAnnBtnsPres" == e.task && (document.getElementById("AnnotatorExtensionAll") ? t({ retMessage: "true" }) : t({ retMessage: "false" })),
            "annot" == e.task
                ? (insertMenu(), t({ retMessage: "done_annot" }))
                : "remAnnBtns" == e.task
                ? ($("#AnnotatorExtensionAll").remove(), t({ retMessage: "rem_Ann" }))
                : "annRem" == e.task
                ? ((pgUrl = document.URL),
                  (u = pgUrl.replace("#", "")),
                  0 <= pgUrl.indexOf("#") && u.length + 1 == pgUrl.length && (pgUrl = pgUrl.split("#")[0]),
                  chrome.storage.local.remove(pgUrl, function () {
                      var e = chrome.runtime.lastError;
                      e && console.error(e);
                  }),
                  chrome.storage.local.get("AnnotatorAllAnnots", function (e) {
                      var n = {};
                      null != e.AnnotatorAllAnnots && (n = e.AnnotatorAllAnnots), delete e[pgUrl], (e.AnnotatorAllAnnots = n), chrome.storage.local.set(e), window.location.reload(!0);
                  }),
                  t({ retMessage: "annRem" }))
                : "pgNotes" == e.task && (showPageNotes(), t({ retMessage: "called to show the page notes." }));
    });
