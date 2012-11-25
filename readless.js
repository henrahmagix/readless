(function($) {

    $.readless = function() {

    }

    $.readless.settings = {
        location: null,
        prepend: false,
        toggles: $('<a href="#" class="readless-default" />'),
        toggleTextOpen: 'Read less &laquo;',
        toggleTextClosed: 'Read more &raquo;',
        toggleClasses: 'readless-toggle',
        animation: {
            showProperties: {},
            hideProperties: {
                height: 0
            },
            hideOptions: {
                duration: 300,
                easing: 'swing',
                complete: function() {
                    $(this).css('overflow', 'hidden')
                }
            },
            showOptions: {
                duration: 300,
                easing: 'swing',
                complete: function() {
                    $(this).css('overflow', 'visible')
                }
            }
        }
    }

    // We cache all the content that readless finds to speed up click events.
    // The key is a unique ID (an integer index) stored in the data-readless
    // attribute, with the value being a jQuery object of the content.
    var readlessContent = {}

    $.fn.readless = function(data) {
        // 'this' is the toggle. We assume everything is setup, and we are just
        // applying the click handler to the toggle already in the DOM.
        // However, we can accept $.readless.settings properties.
        if (data) {
            $.extend(true, $.readless.settings, data)
        }
        $.readless.settings.toggles = this
        // Initialise.
        init()
    }

    // Setup toggle classes and cache all readless content.
    function init() {
        var $toggles = $.readless.settings.toggles
        // Add classes.
        $.readless.settings.toggleClasses += ' readless-open'
        $toggles.addClass($.readless.settings.toggleClasses)
        // Cache all the content to be hidden.
        $toggles.each(function(index) {
            var content = findContentToHide($(this))
            // Add a unique identifer to this toggle.
            setContentUID(this, index)
            // Key by the index saved in the data attribute.
            readlessContent[index] = content
        })
        // And now add the click handler: the main man.
        $toggles.click(clickHandler)
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

    function findContentToHide($el) {
        var content = $el.nextAll()
        // If there aren't any next siblings, go up one level and look there.
        // This is called recursively until next siblings are found.
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
        var content = readlessContent[uid]
        var anim = $.readless.settings.animation
        // Save the height as data on each element.
        content.each(function() {
            $this = $(this)
            var height = $this.outerHeight()
            $this.data('originalHeight', height)
        })
        // Animate the set of elements, all to the same properties.
        content.animate(anim.hideProperties, anim.hideOptions)
    }

    function show(uid) {
        var content = readlessContent[uid]
        var anim = $.readless.settings.animation
        // Animate each element individually to use their own height.
        content.each(function() {
            $this = $(this)
            // Override height with the element's saved height.
            $.extend(anim.showProperties, {
                height: $this.data('originalHeight')
            })
            // Animate this element.
            $this.animate(anim.showProperties, anim.showOptions)
        })
    }
})(jQuery)
