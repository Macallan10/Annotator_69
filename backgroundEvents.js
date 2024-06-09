function loadNoShow() {
    chrome.storage.local.get(["noShowUrls", "noShowDomains"], function (t) {
        var o = [],
            s = [];
        null != t.noShowUrls && (o = t.noShowUrls),
            null != t.noShowDomains && (s = t.noShowDomains),
            null == t.noShowUrls &&
                (s.push("https://news.google."),
                s.push("http://www.bing."),
                s.push("https://www.youtube."),
                s.push("https://login.live."),
                s.push("https://onedrive.live."),
                s.push("https://outlook.live."),
                s.push("http://www.theverge."),
                s.push("https://mail.google."),
                s.push("https://www.google."),
                s.push("https://play.google."),
                s.push("https://drive.google."),
                s.push("https://calendar.google."),
                s.push("https://plus.google."),
                s.push("https://translate.google."),
                s.push("https://photos.google."),
                s.push("https://docs.google."),
                s.push("https://books.google."),
                s.push("https://hangouts.google."),
                s.push("https://www.facebook."),
                s.push("https://twitter."),
                s.push("https://www.linkedin."),
                s.push("https://www.pinterest."),
                s.push("https://www.tumblr."),
                s.push("https://www.flickr."),
                s.push("https://www.reddit."),
                s.push("https://www.snapchat."),
                s.push("https://web.whatsapp."),
                s.push("https://www.quora."),
                s.push("https://www.amazon."),
                s.push("https://www.swiggy."),
                s.push("https://www.flipkart."),
                s.push("https://www.snapdeal."),
                s.push("https://www.foodpanda."),
                s.push("https://www.zomato.")),
            (t.noShowDomains = s),
            (t.noShowUrls = o),
            chrome.storage.local.set(t);
    });
}
chrome.runtime.onInstalled.addListener(function () {
    chrome.declarativeContent.onPageChanged.removeRules(void 0, function () {
        chrome.declarativeContent.onPageChanged.addRules([{ conditions: [new chrome.declarativeContent.PageStateMatcher({})], actions: [new chrome.declarativeContent.ShowPageAction()] }]);
    });
}),
    chrome.runtime.onInstalled.addListener(function (t) {
        loadNoShow();
    });
