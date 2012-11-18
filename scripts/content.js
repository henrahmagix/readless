jQuery(document).ready(function($) {
    var content = $('section article');
    for (var i = 0; i < 5; i++) {
        content.clone().appendTo($('section'));
    }
});
