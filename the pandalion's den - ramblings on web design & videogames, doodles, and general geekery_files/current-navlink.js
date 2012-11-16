$(document).ready(function() {
    $("nav[role='main-navigation'] a").each(function() {
        var navlink = $(this).attr("href");
        var currenthref = window.location.pathname;
        if (navlink === currenthref) {
            $(this).addClass("current");
        }
    });
});