// file:///C:/Users/dmahar2/Documents/Projects/SYWRelayWebsite_3.7/r/index.html
// https://developers.google.com/analytics/devguides/collection/analyticsjs/
(function (i, s, o, g, r, a, m) {
    a = s.createElement(o),
    m = s.getElementsByTagName(o)[0];
    a.async = 1;
    a.src = g;
    m.parentNode.insertBefore(a, m);

    
    m = document.getElementsByTagName('script')[0];
    m.parentNode.insertBefore(script, m);
    
    var img = 
    m = document.getElementsByTagName('img')[0];
    m.parentNode.insertBefore(img, m);


})(window, document, 'script', 'https://www.google-analytics.com/analytics.js', 'ga');
//(i     , s       , o       , g                                              , r   );


! function (a, b, c) {
    function h(b) {
        var c = new Image;
        c.src = b.url + "&cachebust=" + +new Date * Math.random(), c.onload = function () {
            var b = a.getElementsByTagName("script")[0];
            c.style.display = "none", b.parentNode.appendChild(c), c = null
        }
    }

    function i(a, b, c) {
        ! function () {
            a.addEventListener(b, function (a) {
                h(c)
            })
        }()
    }
    for (var d = 0; d < c.length; d++) {
        var e = c[d],
            f = e.target;
        if (f) {
            f = a.querySelectorAll("." + f);
            for (var g = 0; g < f.length; g++) i(f[g], "ontouchstart" in b ? "touchstart" : "click", c[d])
        } else h(c[d])
    }
}(document, window, [{
    id: "Sears_SYW_Relay_App_Install_Desktop_Homepage_02.23.17",
    url: "https://tags.w55c.net/rs?id=fa12148aab1d4774aef689a5925b88d2&t=marketing"
}, {
    id: "Sears_SYW_Relay_App_Mobile_App_Download_Start_02.23.17",
    url: "https://tags.w55c.net/rs?id=a34883d311624670a228586b888674e4&t=marketing",
    target: "__btn__container__tracking"
}]);
