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

    var insertBefore = false,
        insertAfter = false,
        mustBuild = false,
        toggleElement = $('<a class="read-more" data-more="less">Read less...</a>')
            .css('cursor', 'pointer')

    $.readless = function(data, toggle) {
        // Test toggle
        if (toggle === undefined) {
            console.log('toggle undefined, setting to', toggleElement)
            toggle = toggleElement
            mustBuild = true
        }
        else {
            toggleElement = toggle
            if (! (toggleElement instanceof jQuery)) {
                toggleElement = $(toggleElement)
            }
            if (! jqueryObjectIsInDOM(toggleElement)) {
                mustBuild = true
            }
        }

        // Test data and run
        if (data instanceof jQuery) {
            console.log('jQuery object passed')
            // data must contain some elements
            if (! data.length > 0) {
                throw new Error('readless(): No elements to work on')
                return
            }
        }
        else if (typeof data === 'string' || data instanceof String) {
            console.log('selector string passed')
            data = $(getInsertLocation(data))
            if (! data.length > 0) {
                throw new Error('readless(): No elements to work on')
                return
            }
            mustBuild = true
        }
        else {
            throw new Error('readless() requires a jQuery object or selector string')
            return
        }

        if (mustBuild) build(data, toggle)

        init(data, toggle)

        // @TESTING
        return data
    }

    $.fn.readless = function(toggle) {
        $.readless(this, toggle)
    }

    function init(data, toggle) {
        console.log('init', data, toggle)
    }

    function build(data, toggle) {
        console.log('build', data, toggle)
        if (insertBefore) {
            console.log('inserting before')
            data.before(toggleElement)
        }
        else {
            console.log('inserting after')
            data.after(toggleElement)
        }
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
