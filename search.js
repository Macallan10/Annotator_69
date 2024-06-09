function getTextFromHTML(t) {
    var e = document.createElement("span");
    return (e.innerHTML = t), e.textContent || e.innerText;
}
function extractStuff(t, e, n, l, o, s) {
    var r = [],
        a = !1,
        d = "";
    if (((parser = new DOMParser()), (htmlDoc = parser.parseFromString(n[t], "text/html")), (pgNotesT = getTextFromHTML(l)), null == e[t])) {
        (r[0] = "Not Logged"), (r[1] = "Not Logged");
        var i = $("<div></div>");
        i.html(n[t]), (r[2] = $("title", i).text()), (d += r[2] + " "), (null != r[2] && "" != r[2]) || (r[2] = "Title not found.");
        var g = extractAnnots(htmlDoc);
        (r[3] = composeAnnots(g[0], g[2], l)), (d += g[1] + " " + g[2] + " " + pgNotesT);
    } else {
        var N = e[t];
        (r[0] = N.lastVisited),
            null == r[0] && (r[0] = "NOT LOGGED"),
            (r[1] = N.lastModified),
            null == r[1] && (r[1] = "NOT LOGGED"),
            (r[2] = N.title),
            (d += r[2] + " "),
            null == r[2] && (r[2] = "NOT LOGGED"),
            (r[3] = composeAnnots(N.highL, N.pNotes, l)),
            null == r[3] && (r[3] = "NOT LOGGED"),
            (d += N.highLText + " " + N.pNotesText + " " + pgNotesT);
    }
    return 0 <= d.search(s) && (a = !0), o && !a && 0 <= htmlDoc.body.innerText.search(s) && (a = !0), a ? r : null;
}
document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("AnnotatorExtensionSearchBtn").addEventListener("click", function () {
        chrome.storage.local.get(null, function (t) {
            var e = "<table style='width:100%; align = center;'>                            <tr>                            <td width = 100px></td><td><table class = 'searchResult' style='width:100%; align = center;'>",
                n = 0,
                l = [],
                o = t.AnnotatorAllAnnots;
            for (var s in (null == o && (o = {}),
            (resCount = 0),
            (searchRegEx = new RegExp(document.getElementById("AnnotatorSearchWords").value, "i")),
            (AnnotatorAllPageNotes = {}),
            null != t.AnnotatorAllPageNotes && (AnnotatorAllPageNotes = t.AnnotatorAllPageNotes),
            t))
                t.hasOwnProperty(s) &&
                    "noShowDomains" != s &&
                    "noShowUrls" != s &&
                    "showURLs" != s &&
                    "AnnotatorAllAnnots" != s &&
                    "AnnotatorAllPageNotes" != s &&
                    ((pgNotesC = ""),
                    null != AnnotatorAllPageNotes[s] && ((pgNotesC = AnnotatorAllPageNotes[s].notes), (AnnotatorAllPageNotes[s] = "")),
                    (stuff = extractStuff(s, o, t, pgNotesC, document.getElementById("AnnotatorSearchScope2").checked, searchRegEx)),
                    null != stuff &&
                        (0 == n && (e += "<tr><th>Title</th><th>Annotations</th></tr>"),
                        (e += '<tr><td><a href="' + s + '" target="_blank">' + stuff[2].substring(0, 50) + (50 < stuff[2].length ? "..." : "") + "</a><br>Last Visited: " + stuff[0] + "</td><td>" + stuff[3] + "</td></tr>"),
                        (l[n] = s),
                        (n += 1)));
            for (var s in AnnotatorAllPageNotes)
                "" != AnnotatorAllPageNotes[s] &&
                    ((pgNotesC = AnnotatorAllPageNotes[s].notes),
                    (pgNotesT = getTextFromHTML(pgNotesC)),
                    0 <= pgNotesT.search(searchRegEx) &&
                        (0 == n && (e += "<tr><th>Title</th><th>Annotations</th></tr>"),
                        (e += '<tr><td><a href="' + s + '" target="_blank">' + s + "</a><br>Last Visited: " + AnnotatorAllPageNotes[s].lastModified + "</td><td>" + pgNotesC + "</td></tr>"),
                        (l[n] = s),
                        (n += 1)));
            (e += "</table>                     </td> <td width = 100px></td>                     </tr>                     </table>"),
                (document.getElementById("SearchRes").innerHTML = e),
                null != document.getElementById("AnnotatorblueHeader") && (document.getElementById("AnnotatorblueHeader").outerHTML = "");
        });
    }),
        $("#AnnotatorSearchWords").keyup(function (t) {
            13 === t.keyCode && $("#AnnotatorExtensionSearchBtn").click();
        });
});
