/*
Readless, a jQuery revealer.

Use Readless like so:

    jQuery(document).ready(function() {
        jQuery('.my-toggle').readless()
    })

Readless will find all the content that follows it in the DOM (within its
parent), wrap it, and slide it away. Clicking .my-toggle will reveal the
content, and continuously toggle it every click thereafter.
*/
(function($) {

    var prepend = false,
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

    $.readless = function(data) {
        if (typeof data === 'string' || data instanceof String) {
            data = getInsertLocation(data)
            $.readless.settings.location = $(data)
        }
        else {
            $.extend($.readless.settings, data)
        }
        addToggle()
        init()
    }

    $.fn.readless = function() {
        console.log('this is the toggle', this)
    }

    function addToggle() {
        var locations = $.readless.settings.locations
        var toggle = $.readless.settings.toggle
        console.log('addToggle', locations, toggle)
        locations.each(function() {
            toggle = toggle.clone()
            if (prepend) {
                console.log('inserting before')
                toggle.insertBefore(this)
            }
            else {
                console.log('inserting after')
                toggle.insertAfter(this)
            }
        }
    }

    function init() {
        var toggle = $.readless.settings.toggle
        console.log('init', locations, toggle)
        locations.each(function() {
            toggle = toggle.clone()
            if (prepend) {
                console.log('inserting before')
                toggle.insertBefore(this)
            }
            else {
                console.log('inserting after')
                toggle.insertAfter(this)
            }
            toggle.attr('data-more', 'more')
                .nextAll()
                .wrapAll('<div data-more="collapsed" />')
                .end()
            var wrapper = toggle.next('[data-more]')
            if (wrapper.length === 0) wrapper = toggle.closest('[data-more]')
            height = wrapper.outerHeight()
            console.log('wrapper height', height)
            toggle.click(function() {
                    // console.log(wrapper.length, wrapper)
                    if ($(this).attr('data-more') === 'more') {
                        $(this).attr('data-more', 'less')
                        wrapper.attr('data-more', 'expanded')
                            .animate({
                                'height': height
                            })
                    }
                    else {
                        $(this).attr('data-more', 'more')
                        wrapper.attr('data-more', 'collapsed')
                            .animate({
                                'height': '0'
                            })
                    }
                })
            toggle.siblings('[data-more]').animate({'height': '0'})
        })
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
            prepend = true
        }
        return matches[1]
    }
})(jQuery)
