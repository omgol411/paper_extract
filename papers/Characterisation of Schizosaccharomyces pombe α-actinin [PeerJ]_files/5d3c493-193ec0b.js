/*!
 * headroom.js v0.7.0 - Give your page some headroom. Hide your header until you need it
 * Copyright (c) 2014 Nick Williams - http://wicky.nillia.ms/headroom.js
 * License: MIT
 */

!function(a,b){"use strict";function c(a){this.callback=a,this.ticking=!1}function d(b){return b&&"undefined"!=typeof a&&(b===a||b.nodeType)}function e(a){if(arguments.length<=0)throw new Error("Missing arguments in extend function");var b,c,f=a||{};for(c=1;c<arguments.length;c++){var g=arguments[c]||{};for(b in g)f[b]="object"!=typeof f[b]||d(f[b])?f[b]||g[b]:e(f[b],g[b])}return f}function f(a){return a===Object(a)?a:{down:a,up:a}}function g(a,b){b=e(b,g.options),this.lastKnownScrollY=0,this.elem=a,this.debouncer=new c(this.update.bind(this)),this.tolerance=f(b.tolerance),this.classes=b.classes,this.offset=b.offset,this.scroller=b.scroller,this.initialised=!1,this.onPin=b.onPin,this.onUnpin=b.onUnpin,this.onTop=b.onTop,this.onNotTop=b.onNotTop}var h={bind:!!function(){}.bind,classList:"classList"in b.documentElement,rAF:!!(a.requestAnimationFrame||a.webkitRequestAnimationFrame||a.mozRequestAnimationFrame)};a.requestAnimationFrame=a.requestAnimationFrame||a.webkitRequestAnimationFrame||a.mozRequestAnimationFrame,c.prototype={constructor:c,update:function(){this.callback&&this.callback(),this.ticking=!1},requestTick:function(){this.ticking||(requestAnimationFrame(this.rafCallback||(this.rafCallback=this.update.bind(this))),this.ticking=!0)},handleEvent:function(){this.requestTick()}},g.prototype={constructor:g,init:function(){return g.cutsTheMustard?(this.elem.classList.add(this.classes.initial),setTimeout(this.attachEvent.bind(this),100),this):void 0},destroy:function(){var a=this.classes;this.initialised=!1,this.elem.classList.remove(a.unpinned,a.pinned,a.top,a.initial),this.scroller.removeEventListener("scroll",this.debouncer,!1)},attachEvent:function(){this.initialised||(this.lastKnownScrollY=this.getScrollY(),this.initialised=!0,this.scroller.addEventListener("scroll",this.debouncer,!1),this.debouncer.handleEvent())},unpin:function(){var a=this.elem.classList,b=this.classes;(a.contains(b.pinned)||!a.contains(b.unpinned))&&(a.add(b.unpinned),a.remove(b.pinned),this.onUnpin&&this.onUnpin.call(this))},pin:function(){var a=this.elem.classList,b=this.classes;a.contains(b.unpinned)&&(a.remove(b.unpinned),a.add(b.pinned),this.onPin&&this.onPin.call(this))},top:function(){var a=this.elem.classList,b=this.classes;a.contains(b.top)||(a.add(b.top),a.remove(b.notTop),this.onTop&&this.onTop.call(this))},notTop:function(){var a=this.elem.classList,b=this.classes;a.contains(b.notTop)||(a.add(b.notTop),a.remove(b.top),this.onNotTop&&this.onNotTop.call(this))},getScrollY:function(){return void 0!==this.scroller.pageYOffset?this.scroller.pageYOffset:void 0!==this.scroller.scrollTop?this.scroller.scrollTop:(b.documentElement||b.body.parentNode||b.body).scrollTop},getViewportHeight:function(){return a.innerHeight||b.documentElement.clientHeight||b.body.clientHeight},getDocumentHeight:function(){var a=b.body,c=b.documentElement;return Math.max(a.scrollHeight,c.scrollHeight,a.offsetHeight,c.offsetHeight,a.clientHeight,c.clientHeight)},getElementHeight:function(a){return Math.max(a.scrollHeight,a.offsetHeight,a.clientHeight)},getScrollerHeight:function(){return this.scroller===a||this.scroller===b.body?this.getDocumentHeight():this.getElementHeight(this.scroller)},isOutOfBounds:function(a){var b=0>a,c=a+this.getViewportHeight()>this.getScrollerHeight();return b||c},toleranceExceeded:function(a,b){return Math.abs(a-this.lastKnownScrollY)>=this.tolerance[b]},shouldUnpin:function(a,b){var c=a>this.lastKnownScrollY,d=a>=this.offset;return c&&d&&b},shouldPin:function(a,b){var c=a<this.lastKnownScrollY,d=a<=this.offset;return c&&b||d},update:function(){var a=this.getScrollY(),b=a>this.lastKnownScrollY?"down":"up",c=this.toleranceExceeded(a,b);this.isOutOfBounds(a)||(a<=this.offset?this.top():this.notTop(),this.shouldUnpin(a,c)?this.unpin():this.shouldPin(a,c)&&this.pin(),this.lastKnownScrollY=a)}},g.options={tolerance:{up:0,down:0},offset:0,scroller:a,classes:{pinned:"headroom--pinned",unpinned:"headroom--unpinned",top:"headroom--top",notTop:"headroom--not-top",initial:"headroom"}},g.cutsTheMustard="undefined"!=typeof h&&h.rAF&&h.bind&&h.classList,a.Headroom=g}(window,document);
/**
 * Author: Alf Eaton
 *
 * Arrange superscript stacked on top of subscript, e.g. for chemical formulae
 * The data-jats-arrange="stack" attribute only needs to be on the "sub", which must be immediately before the "sup"
 * e.g. NH<sub arrange="stack">4</sub><sup>+</sup>
 */
(function ($) {
	$.fn.superStack = function () {
		this.filter('sub').each(function () {
			var sub = $(this)

			// sub must be before the sup
			var sup = sub.next('sup')

			if (!sup.length) return

			// move the superscript to the left by the width of the subscript
			sup.css({
				position: 'relative',
				left: -sub.width()
			})

			// add a wrapper and shrink it to fit the widest stacked element
			var wrapper = $('<span/>').css({
				display: 'inline-block',
				'white-space': 'nowrap',
				width: Math.max(sub.width(), sup.width())
			})

			sub.add(sup).wrapAll(wrapper)
		})

		return this
	}
}(jQuery))

/*global PeerJ */

PeerJ.Article.Async = new function() {
    this.init = function() {
        $("[data-source]").each(loadRemoteResource);
    };

    var loadRemoteResource = function() {
        var node = $(this);
        var source = node.data("source");
        var clone = node.data("clone");

        $.ajax({
            url: source,
            dataType: "html",
            cache: false,
            success: function(data) {
                node.html(data).trigger("load.async");
                if (clone) {
                    $(clone).html(data); 
                }
            }
        });
    };
};

$(PeerJ.Article.Async.init);
/*global PeerJ */

PeerJ.Article.Conditional = new function() {
    this.init = function() {
        $(document).on("click", "[data-show-when]", function() {
            var node = $(this);

            // update the display in a timeout, to give time for inputs to actually change
            window.requestAnimationFrame(function() {
                showConditional(node, true);
            });

            // TODO: fired twice when a label is clicked
        });

        $("[data-show-when]").each(function() {
            showConditional($(this), false); // don't focus when not actually clicked
        });
    };

    var showConditional = function(node, focus) {
        var value = node.hasClass("radio") ? node.find("input:checked").val() : node.find("input").val();

        var conditional = node.attr("data-show-when"); // avoid conversion to a number
        var conditions = conditional.split(/\s*\|\s*/);
        var matched = $.inArray(value, conditions) !== -1;

        var parent = node.closest(".show-when-container");

        if (!parent.length) {
            parent = node.parent();
        }

        var targetSelector = node.attr("data-show-target");
        var target = parent.find(targetSelector);
        target.toggle(matched);

        if (matched) {
            if (target.hasClass("expanding")) {
                target.expanding();
            }

            if (focus) {
                target.focus();
            }
        }
    };
};

$(PeerJ.Article.Conditional.init);

$('.download-all')
    .on('click', function () {
        $(this).next('.download-notice').fadeIn('fast');
    })
    .after('<span class="download-notice hide"><i class="icon-exclamation-sign" style="color:orange"></i> <span>The ZIP download will start after a short delay…</span></span>')

$(function() {
    var navBarHeight = $(".navbar-fixed-top").outerHeight();

    var shiftWindow = function() {
        if (!location.hash) return;

        var node = $(location.hash);
        if (!node.length) return;

        $(document).scrollTop(node.offset().top - navBarHeight);
    };

    $(window).on("load hashchange", shiftWindow).trigger("hashchange");
});
/*global PeerJ */

// Adapted from preview.js, with the intention of switching all markup to Markdown later.
// NOTE: only use this for staff previews until it's better tested for security.
PeerJ.Article.MarkdownPreview = new function() {
    var remarkable;

    this.init = function() {
        var nodes = $("[data-markdown-preview-target]");

        if (nodes.length) {
            remarkable = new Remarkable({
                html: false
            });

            // run in a timeout to give an iframe time to update
            // TODO: wait for an event to fire?
            window.setTimeout(function () {
                nodes
                  .on("keyup", updatePreview)
                  .each(setPreviewTarget)
                  .trigger("keyup");
            }, 1000);
        }
    };

    // Update the preview when form input changes
    var updatePreview = function() {
        var inputNode = $(this);

        var preview = inputNode.data("markdown-preview-target");

        var inputText = $.trim(inputNode.val());

        if (!inputText.length) {
            preview.empty();
            return;
        }

        // If there's a softfails divider, only show text above divider in email preview.
        var softHardTextBreak = '[RESUBMISSION CHANGES]';
        if (inputText.indexOf(softHardTextBreak) >= 0) {
            var hardFailText = inputText.split(softHardTextBreak);
            inputText = hardFailText[0];
        }

        inputText = remarkable.render(inputText);

        preview.html(inputText);
    };

    var setPreviewTarget = function() {
        var inputNode = $(this);

        var previewSelector = inputNode.data("markdown-preview-target");
        var previewTarget = $(previewSelector);

        // the preview might be inside an iframe
        if (!previewTarget.length) {
            var previewFrame = $(".message-preview-frame");

            if (previewFrame.length) {
                previewTarget = previewFrame.contents().find(previewSelector);
            }
        }

        inputNode.data("markdown-preview-target", previewTarget).trigger("keyup");
    };
};

$(PeerJ.Article.MarkdownPreview.init);

/*global PeerJ */

PeerJ.Article.Markup = new function() {
    var markup = [
        [/\[sup\](.*?)\[sup\]/g, "<sup>$1</sup>"],
        [/\[sub\](.*?)\[sub\]/g, "<sub>$1</sub>"],
        [/\[i\](.*?)\[i\]/g, "<i>$1</i>"],
        [/\[b\](.*?)\[b\]/g, "<b>$1</b>"],
        [/\[p\](.*?)\[p\]/g, "<p>$1</p>"],
        [/\[url\](https?:\/\/.*?)\[url\]/g, "<a href=\"$1\">$1</a>"]
    ];

    var markupRe = new RegExp('\\[(sub|sup|i|b|p|url)\\]', 'g');

    this.convertToHTML = function(inputText) {
        // IMPORTANT:
        // escaping HTML characters first, to preserve special characters and prevent XSS
        inputText = inputText
            .replace(/&/g, "&amp;")
            .replace(/"/g, "&quot;")
            .replace(/'/g, "&#39;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;");

        $.each(markup, function() {
            inputText = inputText.replace(this[0], this[1]);
        });

        // replace newlines with <br>
        inputText = inputText.replace(/\n/g, "<br>");
        inputText = inputText.replace(/&nbsp;/g, " ");

        return inputText;
    };

    this.removeMarkupFromText = function (text) {
        return text.replace(markupRe, '');
    };
};

/*global PeerJ */

PeerJ.Article.Modal = new function() {
    this.init = function() {
        $("[target][data-toggle=modal]").on("click", setTargetURL);

        $(".modal")
            .on("hidden", function() {
                // return the form to its default state if the modal is dismissed
                $(this).find("input[type=reset]").click();
            }).on("shown", function() {
                // focus the first text input when the modal is shown
                try {
                    $(this).find("input[type=text]").first().focus();
                } catch (e) {}
            });
    };

    var setTargetURL = function() {
        var node = $(this);
        var targetSelector = node.attr("target");
        var target = $(targetSelector);

        target.attr("src", node.attr("href"));
    };
};

$(PeerJ.Article.Modal.init);
/*global PeerJ, $ */

PeerJ.Article.Preview = new function() {
    this.init = function() {
        // run in a timeout to give an iframe time to update
        // TODO: wait for an event to fire?
        window.setTimeout(function() {
            $("[data-preview-target]")
                .each(setPreviewTarget)
                .on("keyup change blur", updatePreview);

            $("[data-radio-preview-target]")
                .each(setRadioPreviewTarget)
                .on("keyup change blur", updateRadioPreview);

            $('.message-preview-frame').each(expandIframe);
            $('#note-to-reviewers-radio')
                .on('change', toggleNoteToReviewers)
                .change();
        }, 1000);

        // Height-expand 'author note' textfield and 'email preview' on Pass/Fail tab change.
        $('a[data-toggle="tab"]').on('shown.bs.tab', function() {
            $('.expanding').expanding();
            $('.message-preview-frame').each(expandIframe);
        });
    };

    // Expand an iframe to fit its contents
    var expandIframe = function () {
        var frame = $(this);
        var body = frame.contents().find('body');

        if (body.length) {
            // shrink first to get the proper height
            frame.css('height', 1);

            var height = body.outerHeight(true);

            // at least 500px, for browsers where detecting the height returned zero
            height = Math.max(height, 500);

            frame.css('height', height);
        }
    };

    // Update the preview when form input changes
    var updatePreview = function() {
        var inputNode = $(this);

        var preview = inputNode.data("preview-target");

        var inputText = $.trim(inputNode.val());

        if (!inputText.length) {
            preview.empty();
            return;
        }

        var appendText = inputNode.data("preview-append");
        if (appendText) {
            // On initial load may already have appended text, so remove to be sure
            inputText.slice(appendText, -1);
            inputText += appendText;
        }

        inputText = PeerJ.Article.Markup.convertToHTML(inputText);

        preview.html(inputText);
    };

    var updateRadioPreview = function() {
        var inputNode = $(this);
        var preview = inputNode.data("radio-preview-target");

        var checked = inputNode.find("input[type='radio']:checked");
        var idVal = checked.attr("id");
        var label = inputNode.find("label[for='" + idVal + "']").find('span.article-recommendation');
        var labelColor = label.css('background-color');
        var labelBorder = label.css('border');
        preview.text(label.text().toUpperCase());
        preview.css({
            "background-color": labelColor,
            "border": labelBorder,
        });
    };

    var findMaybeInIframe = function(selector) {
        var previewTarget = $(selector);

        if (!previewTarget.length) {
            var previewFrame = $(".message-preview-frame");

            if (previewFrame.length) {
                previewTarget = previewFrame.contents().find(selector);
            }
        }
        return previewTarget;
    };

    var setPreviewTarget = function() {
        var $this = $(this);
        var previewTarget = findMaybeInIframe($this.data("preview-target"));
        $this.data("preview-target", previewTarget).trigger("keyup");
    };

    var setRadioPreviewTarget = function() {
        var $this = $(this);
        var previewTarget = findMaybeInIframe($this.data("radio-preview-target"));
        $this.data("radio-preview-target", previewTarget).trigger("keyup");
    };

    var toggleNoteToReviewers = function(e) {
        var $changed = $(this).find("input:checked");
        var target = findMaybeInIframe($(this).data("toggle-box-target"));
        target.toggle($changed.val() !== "0");
    };
};

$(PeerJ.Article.Preview.init);

/*global PeerJ */

PeerJ.Article.Recommendations = new function() {
    var recommendationLabels = {
        accept: "Accept",
        major: "Major Revisions",
        minor: "Minor Revisions",
        reject: "Reject"
    };

    this.init = function() {
        $(".article-recommendation-input input:radio")
            .each(showRecommendationLabel);
    };

    var showRecommendationLabel = function() {
        var node = $(this);

        var value = node.val();

        var label = $("<span/>")
            .addClass("label")
            .addClass("article-recommendation article-recommendation-" + value)
            .text(recommendationLabels[value]);

        node.next("label").prepend(label);
    };
};

$(PeerJ.Article.Recommendations.init);
/*global PeerJ */

PeerJ.Article.Toggle = new function() {
    this.init = function() {
        $("[data-action=toggle]").each(initialiseButton);
    };

    var initialiseButton = function() {
        var node = $(this);

        var targetSelector = node.data("target");
        var targets = $(targetSelector);

        if (targets.length) {
            node.on("click", handleToggle);
        }
        else {
            node.hide();
        }
    };

    var handleToggle = function(event) {
        event.preventDefault();

        var node = $(this);

        var targetSelector = node.data("target");

        var target = $(targetSelector).toggle();
        node.toggleClass("active", target.is(":visible"));
    };
};

$(PeerJ.Article.Toggle.init);
/*global PeerJ */
/*
 * Handles subject modal events
 *
 */
PeerJ.User.SubjectsModalMethods = new function() {
    var primaryClass = 'subject-primary-selected';

    this.setupRowSelectEvents = function() {
        $('.subject-list-row').
            on('click', function(e) {
                // Ignore clicks from stars, labels as will interfere
                if ($(e.target).parent().hasClass('subject-list-row')) {
                    var check = $(this).find('[type=checkbox]');
                    check.prop('checked', !check.prop('checked')).change();
                }
            });
    }

    this.setupPrimarySubjectEvents = function(primary) {
        PeerJ.User.SubjectsModalMethods.setupPrimaryIconActions(primary);

        setupSidebarPrimaryActions(primary);
    }

    this.setupPrimaryIconActions = function(primary) {
        // Initialize primary select state on modal load
        var primaryVal = primary.val();
        if (primaryVal) {
            var star = $('#primary_subject_icon_' + primaryVal);
            star.addClass(primaryClass);
        }

        // Listen for primary (star) click events
        $('.subject-primary')
            .on('click', function() {
                var that = $(this);
                var check = that.closest('.subject-list-row').find('[type=checkbox]');

                // Remove selected primary if previously selected
                if (that.hasClass(primaryClass)) {
                    primary.val(null);
                    that.removeClass(primaryClass);
                } else {
                    // id may have changed, so retrieve again
                    var currentId = primary.val();
                    var newPrimaryId = that.data('id');

                    // Update form input
                    primary.val(newPrimaryId);

                    // Remove any previous selected primary and add new
                    $('.subject-primary').removeClass(primaryClass);
                    that.addClass(primaryClass);

                    // Tick checkbox
                    check.prop('checked', true);
                }

                // Fire a change event for any listeners
                primary.trigger('change');
            });

        // If subject deselected checkbox & this is a primary subject then primary should be removed & star deselected
        $('[type=checkbox]')
            .change(function() {
                var check = $(this);

                if (!check.is(":checked")) {
                    var star = check.closest('.subject-list-row').find('.subject-primary');
                    if (star.hasClass(primaryClass)) {
                        star.removeClass(primaryClass);
                        primary.val(null).trigger('change');
                    }
                }
            });
 
    }

    var setupSidebarPrimaryActions = function(primary) {
        var primaryId = primary.val();
        changeSidebarPrimaryValue(primaryId);

        // Set up listener
        primary
            .change(function() {
                var primaryId = primary.val();
                changeSidebarPrimaryValue(primaryId);
            });
    };

    /**
     * Updates side primary subject
     */
    var changeSidebarPrimaryValue = function(primaryId) {
        var noPrimaryMessageElem = $('#no-primary-selected');
        var primarySelectElem = $('#sidebar-primary-selection');
        var form = primarySelectElem.closest('form');

        if (primaryId) {
            var name = form.find('label[for="peerj_subjects_categories_' + primaryId + '"]').text();
            noPrimaryMessageElem.hide();
            primarySelectElem.text(name).show();
        } else {
            noPrimaryMessageElem.show();
            primarySelectElem.hide();
        }
    };

    this.setupSubjectTableSearch = function() {
        $('#subject-table-search').on("keyup", function() {
            var inputNode = $(this);
            var name = inputNode.val();
            var tr = $('.subject-list-row');

            var pattern = new RegExp(name, 'i');
            var matches = tr.find('.subject-item-name').filter(function() {
                return $(this).text().match(pattern);
            }).closest('tr');

            tr.hide();
            matches.each(function() {
                $(this).show();
            });

        });
    };

    this.setupSidebarFilterEvents = function()
    {
        var filterChoice = $('.subjects-sidebar-filter p');

        filterChoice
            .on('click', function() {
                var filter = $(this).data('id');
                var subject = $(this).data('is-subject');

                // Change active css
                filterChoice.removeClass('active');
                $(this).addClass('active');

                $('.section-list-row').hide();

                // Apply filter to rows
                if (subject) {
                    $('.subject-list-row').each(function() {
                        var row = $(this);

                        var matches = row.find('.subject-item-type').filter(function() {
                            return $.trim(this.textContent) == filter;
                        });

                        // hide if no matches
                        row.toggle(!!matches.length);
                    });
                } else if (filter == 'new') {
                    $('.subject-list-row').each(function() {
                        var row = $(this);

                        var matches = row.find('.subject-item-new').filter(function() {
                            return $.trim(this.textContent) == filter;
                        });

                        // hide if no matches
                        row.toggle(!!matches.length);
                    });
                } else if (filter == 'all') {
                    $('.subject-list-row').show();
                } else if (filter == 'sections'){
                    $('.subject-list-row').hide();
                    $('.section-list-row').show();
                } else {
                    // This is the selected only filter
                    $('.subject-list-row').each(function() {
                        var row = $(this);
                        var check = row.find('[type=checkbox]');
                        if (!check.is(":checked")) {
                            row.hide();
                        } else {
                            row.show();
                        }
                    });
                }
            });
    }
};