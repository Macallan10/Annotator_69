function getAnnotations(t, e = false) {
    for (var n in ((spans = t.getElementsByTagName("span")), (highLC = ""), spans))
        spans.hasOwnProperty(n) &&
            ((n = spans[n]),
            (oC = n.outerHTML),
            (tagC = oC.substring(1, oC.indexOf(">"))),
            42 < tagC.length && tagC.length < 52 && n.style.cssText.toLowerCase().startsWith("background-color: rgb") && (highLC += e ? "-" + n.outerHTML + "<br>" : "-" + n.textContent + "<br>"));
    return highLC;
}
function extractHighLights(t) {
    var e = [];
    for (var n in ((e[0] = ""), (e[1] = ""), (spans = t.getElementsByTagName("span")), spans))
        spans.hasOwnProperty(n) &&
            ((n = spans[n]),
            (oC = n.outerHTML),
            (tagC = oC.substring(1, oC.indexOf(">"))),
            42 < tagC.length && tagC.length < 52 && n.style.cssText.toLowerCase().startsWith("background-color: rgb") && ((e[0] += "-" + n.outerHTML + "<br>"), (e[1] += " " + n.textContent)));
    return e;
}
function extractPopupNotes(t) {
    var e = [];
    if (((e[0] = ""), (e[1] = ""), t.getElementById("AnnotatorNotesMaxID")))
        for (var n = parseInt(t.getElementById("AnnotatorNotesMaxID").value), o = 1; o <= n; o++)
            (imgElem = t.getElementById("AnnotatorExtensionAddedNotesImg" + o)),
                null != imgElem && ((actualNotes = t.getElementById("AnnotatorExtensionActualNotes" + o)), null != actualNotes && ((e[0] += "-" + actualNotes.innerHTML + "<br>"), (e[1] += " " + actualNotes.textContent)));
    return e;
}
function extractAnnots(t) {
    var e = [];
    return (temp = extractHighLights(t)), (e[0] = temp[0]), (e[1] = temp[1]), (temp = extractPopupNotes(t)), (e[2] = temp[0]), (e[3] = temp[1]), e;
}
function composeAnnots(t, e, n) {
    return (
        "<center><b><i><font size='1' color='blue'>Highlights</font></i></b></center><hr>" +
        t +
        "<center><b><i><font size='1' color='blue'>Popup Notes</font></i></b></center><hr>" +
        e +
        "<center><b><i><font size='1' color='blue'>Page Notes</font></i></b></center><hr>" +
        n
    );
}
