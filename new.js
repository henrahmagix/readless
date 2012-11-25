(function($) {

    $.readless = function() {

    }

    $.readless.settings = {
        location: null,
        prepend: false,
        toggle: $('<a href="#" class="readless-toggle readless-open" />'),
        toggleTextOpen: 'Read less &laquo;',
        toggleTextClosed: 'Read more &raquo;',
        animation: {
            properties: {},
            options: {
                duration: 300,
                easing: 'swing'
            }
        }
    }

    $.readless.content = {}

    $.fn.readless = function(data) {
        // this == toggle. We assume everything is setup, and we are just
        // applying the click handler to the toggle already in the DOM.
        // However, we can accept $.readless.settings properties.
        if (data) {
            $.extend(true, $.readless.settings, data)
        }
        // Add classes.
        this.addClass('readless-toggle readless-open')
        // Cache all the content to be hidden.
        this.each(function(index) {
            var content = findContentToHide(this)
            // Add a unique identifer to this toggle.
            setContentUID(this, index)
            // Key by the index saved in the data attribute.
            $.readless.content[index] = content
        })
        this.click(clickHandler)
    }

    function clickHandler(e) {
        // Stop the usual action on this event.
        e.preventDefault()
        // Do we show or hide?
        var contentUID = getContentUID(this)
        if ($(this).hasClass('readless-open')) {
            hide(contentUID)
        }
        else {
            show(contentUID)
        }
        toggleStatus(this)
    }

    function findContentToHide(el) {
        $el = $(el)
        var content = $el.nextAll()
        if (content.length === 0) {
            content = findContentToHide($el.parent())
        }
        return content
    }

    function toggleStatus(toggle) {
        $(toggle).toggleClass('readless-open readless-closed')
    }

    function getContentUID(toggle) {
        return $(toggle).attr('data-readless')
    }

    function setContentUID(toggle, index) {
        $(toggle).attr('data-readless', index)
    }

    function hide(uid) {
        $.readless.content[uid].slideUp()
    }

    function show(uid) {
        $.readless.content[uid].slideDown()
    }
})(jQuery)
