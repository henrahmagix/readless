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
        // Add current toggles to settings.
        setToggles(this)
        // Initialise.
        init()
    }

    // Setup toggle classes and cache all readless content.
    function init() {
        var $toggles = getToggles()
        // Add classes.
        setToggleClasses('readless-open')
        $toggles.addClass(getToggleClasses())
        // Cache all the content to be hidden.
        $toggles.each(function(index) {
            var content = findContentToHide($(this))
            // Add a unique identifer to this toggle.
            setContentUID(this, index)
            // Key by the index saved in the data attribute.
            setCachedContent(index, content)
        })
        // And now add the click handler: the main man.
        $toggles.click(clickHandler)
        console.log($.readless.settings)
    }

    // This is the action function called whenever a toggle is clicked.
    function clickHandler(e) {
        // Stop the usual action on this event.
        e.preventDefault()
        // Do we show or hide?
        var uid = getContentUID(this)
        if ($(this).hasClass('readless-open')) {
            hide(uid)
        }
        else {
            show(uid)
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

    /* Show and hide functions */

    function hide(uid) {
        var content = getCachedContent(uid)
        var animProperties = getAnimationProperties('hide')
        var animOptions = getAnimationOptions('hide')
        // Save the height as data on each element.
        content.each(function() {
            $this = $(this)
            var height = $this.outerHeight()
            saveHeight($this, height)
        })
        // Animate the set of elements, all to the same properties.
        content.animate(animProperties, animOptions)
    }

    function show(uid) {
        var content = getCachedContent(uid)
        var animProperties = getAnimationProperties('show')
        var animOptions = getAnimationOptions('show')
        // Animate each element individually to use their own height.
        content.each(function() {
            $this = $(this)
            // Override height with the element's saved height.
            $.extend(animProperties, {
                height: getHeight($this)
            })
            // Animate this element.
            $this.animate(animProperties, animOptions)
        })
    }

    /* Getters and setters */

    // Whether to prepend or append toggles not already in the DOM.
    function prepend(bool) {
        if (typeof bool == 'boolean') {
            $.readless.settings.prepend = bool
        }
        return $.readless.settings.prepend
    }
    function getHeight($el) {
        return $el.data('originalHeight')
    }
    function saveHeight($el, height) {
        $el.data('originalHeight', height)
    }

    // Content unique identifer: the data-readless attribute.
    function getContentUID(toggle) {
        return $(toggle).attr('data-readless')
    }
    function setContentUID(toggle, index) {
        $(toggle).attr('data-readless', index)
    }

    // Cached content.
    function getCachedContent(uid) {
        return readlessContent[uid]
    }
    function setCachedContent(uid, content) {
        readlessContent[uid] = content
    }

    // Toggle elements.
    function getToggles() {
        return $.readless.settings.toggles
    }
    function setToggles($toggles) {
        $.readless.settings.toggles = $toggles
    }

    // Toggle text
    function getToggleText(type) {
        if (type === 'open') return $.readless.settings.toggleTextOpen
        else if (type === 'closed') return $.readless.settings.toggleTextClosed
        return ''
    }
    function setToggleText(text, type) {
        if (type) {
            if (type === 'open') $.readless.settings.toggleTextOpen = text
            if (type === 'closed') $.readless.settings.toggleTextClosed = text
        }
        else {
            $.readless.settings.toggleTextOpen = text
            $.readless.settings.toggleTextClosed = text
        }
    }

    // Toggle classes
    function getToggleClasses() {
        return $.readless.settings.toggleClasses
    }
    function setToggleClasses(classes, override) {
        if (override) {
            $.readless.settings.toggleClasses = classes
        }
        else {
            $.readless.settings.toggleClasses += ' ' + classes
        }
    }

    // Animation properties
    function getAnimationProperties(type) {
        if (type === 'hide') return $.readless.settings.animation.hideProperties
        if (type === 'show') return $.readless.settings.animation.showProperties
        return {}
    }
    function setAnimationProperties(properties, type) {
        if (type) {
            if (type === 'hide') $.readless.settings.animation.hideProperties = properties
            if (type === 'show') $.readless.settings.animation.showProperties = properties
        }
        else {
            $.readless.settings.animation.hideProperties = properties
            $.readless.settings.animation.showProperties = properties
        }
    }

    // Animation options
    function getAnimationOptions(type) {
        if (type === 'hide') return $.readless.settings.animation.hideOptions
        if (type === 'show') return $.readless.settings.animation.showOptions
        return {}
    }
    function setAnimationOptions(options, type) {
        if (type) {
            if (type === 'hide') $.readless.settings.animation.hideOptions = options
            if (type === 'show') $.readless.settings.animation.showOptions = options
        }
        else {
            $.readless.settings.animation.hideOptions = options
            $.readless.settings.animation.showOptions = options
        }
    }
})(jQuery)
