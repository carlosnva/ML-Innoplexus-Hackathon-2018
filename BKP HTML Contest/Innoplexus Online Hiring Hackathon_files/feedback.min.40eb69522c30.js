// feedback.js
// 2013, Kázmér Rapavi, https://github.com/ivoviz/feedback
// Licensed under the MIT license.
// Version 2.0

(function(e) {
    e.feedback = function(t) {
        function o() {
            canDraw = false;
            e(document).off("mouseenter mouseleave", ".feedback-helper");
            e(document).off("mouseup keyup");
            e(document).off("mousedown click", "#feedback-close");
            e(document).off("mousedown", "#feedback-canvas");
            e(document).off("mouseleave", "body");
            e(document).off("mouseenter", ".feedback-helper");
            e(document).off("selectstart dragstart", document);
            e("#feedback-module").off("click", ".feedback-wizard-close,.feedback-close-btn");
            e(document).off("click", "#feedback-submit");
            if (n.highlightElement) {
                e(document).off("click", "#feedback-canvas");
                e(document).off("mousemove", "#feedback-canvas")
            }
            e("#feedback-module").remove();
            e(".feedback-btn").show();
            n.onClose.call(this)
        } // close function o

        function u(t, n) {
            n = typeof n !== "undefined" ? n : true;
            t.clearRect(0, 0, e("#feedback-canvas").width(), e("#feedback-canvas").height());
            t.fillStyle = "rgba(102,102,102,0.5)";
            t.fillRect(0, 0, e("#feedback-canvas").width(), e("#feedback-canvas").height());
        } // close function u

        function a(e, t, r, i, s) {
            e.strokeStyle = n.strokeStyle;
            e.shadowColor = n.shadowColor;
            e.shadowOffsetX = n.shadowOffsetX;
            e.shadowOffsetY = n.shadowOffsetY;
            e.shadowBlur = n.shadowBlur;
            e.lineJoin = n.lineJoin;
            e.lineWidth = n.lineWidth;
            e.strokeRect(t, r, i, s);
            e.shadowOffsetX = 0;
            e.shadowOffsetY = 0;
            e.shadowBlur = 0;
            e.lineWidth = 1
        } // close function of a

        var n = e.extend({
            ajaxURL: "",
            postBrowserInfo: true,
            postHTML: true,
            postURL: true,
            proxy: undefined,
            letterRendering: false,
            initButtonText: "Send feedback",
            strokeStyle: "black",
            shadowColor: "black",
            shadowOffsetX: 1,
            shadowOffsetY: 1,
            shadowBlur: 10,
            lineJoin: "bevel",
            lineWidth: 3,
            html2canvasURL: "html2canvas.js",
            feedbackButton: ".feedback-btn",
            showDescriptionModal: false,
            isDraggable: false,
            onScreenshotTaken: function() {},
            tpl: {
                description: '<div id="feedback-welcome"><div class="feedback-logo">Feedback</div><p>Feedback lets you send us suggestions about our products. We welcome problem reports, feature ideas and general comments.</p><p>Start by writing a brief description:</p><textarea id="feedback-note-tmp"></textarea><p>Next we\'ll let you identify areas of the page related to your description.</p><div id="feedback-welcome-error">Please enter a description.</div><div class="feedback-wizard-close"></div></div>',
                submitSuccess: '<div id="feedback-submit-success"><div class="feedback-logo">Feedback</div><p>Thank you for your feedback. We value every piece of feedback we receive.</p><p>We cannot respond individually to every one, but we will use your comments as we strive to improve your experience.</p><button class="feedback-close-btn feedback-btn-blue">OK</button><div class="feedback-wizard-close"></div></div>',
                submitError: '<div id="feedback-submit-error"><div class="feedback-logo">Feedback</div><p>Sadly an error occured while sending your feedback. Please try again.</p><button class="feedback-close-btn feedback-btn-blue">OK</button><div class="feedback-wizard-close"></div></div>'
            },
            onClose: function() {},
            screenshotStroke: true,
            highlightElement: true,
            initialBox: false
        }, t);
        var r = !!window.HTMLCanvasElement;
        var i = n.feedbackButton == ".feedback-btn";
        var s = false;
        if (r) {
            if (i) {
                e("body").append('<button class="feedback-btn feedback-btn-gray">' + n.initButtonText + "</button>")
            }
            e(document).on("click", n.feedbackButton, function() {
                if (i) { e(this).hide() }
                if (!s) { e.getScript(n.html2canvasURL, function() { s = true }) }
                var t = false,
                    f = e(document).height(),
                    l = e(document).width(),
                    c = '<div id="feedback-module">';
                if (n.initialBox) {
                    c += n.tpl.description
                }
                c += '<canvas id="feedback-canvas"></canvas><div id="feedback-helpers"></div><input id="feedback-note" name="feedback-note" type="hidden"></div>';
                e("body").append(c);
                moduleStyle = { position: "absolute", left: "0px", top: "0px" };
                e("#feedback-module").css(moduleStyle);
                post = {};
                if (n.postBrowserInfo) {
                    post.browser = {};
                    post.browser.appCodeName = navigator.appCodeName;
                    post.browser.appName = navigator.appName;
                    post.browser.appVersion = navigator.appVersion;
                    post.browser.cookieEnabled = navigator.cookieEnabled;
                    post.browser.onLine = navigator.onLine;
                    post.browser.platform = navigator.platform;
                    post.browser.userAgent = navigator.userAgent;
                    post.browser.plugins = [];
                    e.each(navigator.plugins, function(e) {
                        post.browser.plugins.push(navigator.plugins[e].name)
                    });
                }
                if (n.postURL) { post.url = document.URL; }
                if (n.postHTML) { post.html = e("html").html(); }
                e("#feedback-module").on("click", ".feedback-wizard-close,.feedback-close-btn", function() { o() });
                e(document).on("click", "#feedback-submit", function() {
                    if (e("#feedback-note-tmp").val().length > 0) {
                        e("#feedback-submit-success,#feedback-submit-error").remove();
                        html2canvas(e("body")).then(function(canvas) {
                            // Export the canvas to its data URI representation
                            var temp = canvas.toDataURL("image/png");
                            post.img = temp;
                            post.note = e("#feedback-note-tmp").val();
                            var data = { feedback: JSON.stringify(post) };
                            e.ajax({
                                url: n.ajaxURL,
                                dataType: "json",
                                type: "POST",
                                data: data,
                                success: function() {
                                    e("#feedback-module").append(n.tpl.submitSuccess)
                                    e("#feedback-welcome").hide()
                                },
                                error: function() {
                                    e("#feedback-module").append(n.tpl.submitError)
                                    e("#feedback-welcome").hide()
                                }
                            })
                        });
                    } else { e("#feedback-welcome-error").show() }
                })

                // submit ends
            })
        }
    }
    // first function
})(jQuery)
