// Insert the following at the point you want to hide content.
// <p class='read-more'>Read more...</p>
window.log = function(args) {
    window.console.log.call(console, args);
}
// Wrap the content to hide.
// $('.read-more').nextAll().wrapAll('<div class='more' />');

testJqueryObject = function(errorMessage) {
    // Ensure this is either a string or jQuery thisect
    if (typeof this === 'string')
        return $(this);
    else if ( ! (typeof this === 'thisect' && this instanceof $) )
        throw new Error(errorMessage);
    return this;
}
/*
location
dommy
dommyClassToggle
*/
$.fn.readMore = function($args) {
    console.log(this);
    console.log($args);

    if (typeof $args === "undefined") {
        console.log('no args passed');
        $(this)
            .nextAll()
            .wrapAll('<div data-more="expanded" />')
            .end()
            .attr('data-more', 'less')
            .click(function(){
                var more = $(this).attr('data-more');
                if (more === 'more')
                    $(this)
                        .attr('data-more', 'less')
                        .siblings('[data-more]')
                        .attr('data-more', 'expanded');
                else
                    $(this)
                        .attr('data-more', 'more')
                        .siblings('[data-more]')
                        .attr('data-more', 'collapsed');
                $(this).slideToggle();
            });
    }
    // var msg = {};
    // msg.location = 'readMore(): location must be selector string or jQuery object';
    // msg.dommy = 'readMore(): dommy must be selector string or jQuery object';
    // testJqueryObject.call($args.location, msg.location);
    // testJqueryObject.call($args.dommy, msg.dommy);
    // $args.dommyClass.toggle = $args.dommyClass.join(' ');
    // // Is dommyClassToggle a string?
    // if (typeof $args.dommyClass !== "object" &&
    //     typeof $args.dommyClass.open !== "object" &&
    //     typeof $args.dommyClass.closed !== "object")
    //     throw new Error('readMore(): dommyClass must be an object with open and closed properties');
    // //@Test dommyClass.open and closed are strings
    // //@Test dommyText

    // $args.location = this.find($args.location);
    // // Wrap the rest of the content after location.
    // $args.location.nextAll().wrapAll($args.dommy.attr('data-more', 'open'));

    // // Slide the content and change the text to reflect it.
    // $args.dommy.click(function(){
    //     $(this).toggleClass($args.dommyClassToggle).siblings('[data-more]').slideToggle().attr('data-more', 'closed');
    //     if ($(this).attr('data-more') === 'closed') $(this).text($args.dommyText.open);
    //     else $(this).text($args.dommyText.closed);
    // });
}

$(function($){
    // $('.main-content article').readMore({
    //     location: 'p:nth-child(2)',
    //     dommy: '<div class="read-more" />',
    //     dommyText: {
    //         open: 'Read less',
    //         closed: 'Read more'
    //     }
    // });
    $('.main-content article p:nth-child(2)').after(
        '<div class="read-more" />'
    );
    $('.main-content article .read-more').readMore();
});
