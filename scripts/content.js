jQuery(document).ready(function($) {
    var content = $('section article');
    for (var i = 0; i < 2; i++) {
        content.clone().appendTo($('section'));
    }
    $('.go').click(function(e) {
        e.preventDefault()
        $('.readless').readless()
        console.log('readless applied')
    })
});
