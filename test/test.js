var gTest = false;

(function () {
    var oldOnload = window.onload;
    window.onload = function () {
        if (oldOnload) { oldOnload(); }
        gTest = true;
    };
}());
