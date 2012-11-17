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
        if (typeof data === 'object' && data instanceof jQuery) {
            if (! jqueryObjectIsInDOM(data)) {
                console.log('You must pass a location for the toggle')
                build(data)
            }
            else {
                init(data)
            }
        }
        else if (typeof data === 'string') {
            data = $(getInsertLocation(data))
            if (! jqueryObjectIsInDOM(data))
                console.log('You must pass a location for the toggle')
            build(data)
        }

        return data
    }

    $.fn.readless = function() {
        $.readless(this, 0)
    }

    var insertBefore = false,
        insertAfter = false,
        toggleElement = $('<a class="read-more" data-more="less">Read less...</a>')
            .css('cursor', 'pointer')

    function init(data) {
        console.log('init', data)
    }

    function build(data) {
        console.log('build', data)
        if (insertBefore)
            data.before(toggleElement)
        else
            data.after(toggleElement)
    }

    function jqueryObjectIsInDOM(obj) {
        return (obj.closest('html').length > 0)
    }

    function getInsertLocation(string) {
        // Match the entire string, and optionally the last two characters if
        // they are a space followed by - or +. This means matches[1] will
        // always be the selector string.
        var insertSelector = new RegExp(/(.*?) ?([-+])?$/)
        var matches = string.match(insertSelector)
        if (matches[2] === '-') {
            insertBefore = true
        }
        else if (matches[2] === '+') {
            insertAfter = true
        }
        return matches[1]
    }
})(jQuery)
