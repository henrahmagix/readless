/*
Readless, a jQuery revealer.

Use Readless like so:

    jQuery(document).ready(function() {
        jQuery('.my-toggle').readless()
    })

Readless will find all the content that follows it in the DOM (within its
parent), wrap it, and slide it away. Clicking .my-toggle will reveal the
content, and continuously toggle it every click thereafter.

If you don't have a toggle already in the DOM, give Readless one and it will
insert it for you and set everything up. Be sure to pass it what you want to
show when your content is hidden:

    jQuery.readless(jQuery('<p class="revealer">Read more...</p>'))

Or you can give Readless just a CSS selector of the location where you would
like the toggle, and it will do the rest:

    jQuery.readless('section article p:first-of-type')

Ending the selector with '-' or '+' tells Readless to insert the toggle
before or after the set of elements, respectively (defaults to after):

    jQuery.readless('section article p:nth-of-type(2) -')

*/
(function($) {
    $.readless = function(data, minElements) {
        if (typeof data === "object" && data instanceof jQuery) {
            if (! jqueryObjectIsInDOM(data)) {
                build(data);
            }
            else {
                init(data);
            }
        }
        else if (typeof data === "string") {
            build(checkForInsertDirection(data));
        }

        return data;
    };

    $.fn.readless = function() {
        $.readless(this, 0);
    };

    var insertBefore = false,
        insertAfter = true;

    function init(data) {
        console.log('init', data);
    }

    function build(data) {
        console.log('build', data);
    }

    function jqueryObjectIsInDOM(obj) {
        return (obj.closest('html').length > 0);
    }

    function checkForInsertDirection(string) {
        var insertSelector = new RegExp( /(.*) ([-+])$/ );
        var matches = string.match(insertSelector);
        if (matches[2] === '-') {
            insertBefore = true;
            insertAfter = false;
        }
        return $(matches[1]);
    }
})(jQuery);
