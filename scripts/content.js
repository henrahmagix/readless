jQuery(document).ready(function($) {
    var content = $('section article');
    for (var i = 0; i < 2; i++) {
        content.clone().appendTo($('section'));
    }
    $('.go').click(function() {
        $('.readless').readless()
    })
});
