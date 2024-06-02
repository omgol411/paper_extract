/*!
 * Fresco - A Beautiful Responsive Lightbox - v2.1.4
 * (c) 2012-2016 Nick Stakenburg
 *
 * http://www.frescojs.com
 *
 * License: http://www.frescojs.com/license
 */
!function (a, b) {
	"function" == typeof define && define.amd ? define(["jquery"], b) : "object" == typeof module && module.exports ? module.exports = b(require("jquery")) : a.Fresco = b(jQuery)
}(this, function ($) {
	function baseToString(a) {
		return "string" == typeof a ? a : null == a ? "" : a + ""
	}

	function Timers() {
		return this.initialize.apply(this, _slice.call(arguments))
	}

	function getURIData(a) {
		var b = {type: "image"};
		return $.each(Types, function (c, d) {
			var e = d.data(a);
			e && (b = e, b.type = c, b.url = a)
		}), b
	}

	function detectExtension(a) {
		var b = (a || "").replace(/\?.*/g, "").match(/\.([^.]{3,4})$/);
		return b ? b[1].toLowerCase() : null
	}

	function View() {
		this.initialize.apply(this, _slice.call(arguments))
	}

	function Thumbnail() {
		this.initialize.apply(this, _slice.call(arguments))
	}

	var Fresco = {};
	$.extend(Fresco, {version: "2.1.4"}), Fresco.Skins = {fresco: {}};
	var Bounds = {
		viewport: function () {
			var a = {width: $(window).width()};
			if (Browser.MobileSafari || Browser.Android && Browser.Gecko) {
				var b = document.documentElement.clientWidth / window.innerWidth;
				a.height = window.innerHeight * b
			} else a.height = $(window).height();
			return a
		}
	}, Browser = function (a) {
		function b(b) {
			var c = new RegExp(b + "([\\d.]+)").exec(a);
			return c ? parseFloat(c[1]) : !0
		}

		return {
			IE: !(!window.attachEvent || -1 !== a.indexOf("Opera")) && b("MSIE "),
			Opera: a.indexOf("Opera") > -1 && (!!window.opera && opera.version && parseFloat(opera.version()) || 7.55),
			WebKit: a.indexOf("AppleWebKit/") > -1 && b("AppleWebKit/"),
			Gecko: a.indexOf("Gecko") > -1 && -1 === a.indexOf("KHTML") && b("rv:"),
			MobileSafari: !!a.match(/Apple.*Mobile.*Safari/),
			Chrome: a.indexOf("Chrome") > -1 && b("Chrome/"),
			ChromeMobile: a.indexOf("CrMo") > -1 && b("CrMo/"),
			Android: a.indexOf("Android") > -1 && b("Android "),
			IEMobile: a.indexOf("IEMobile") > -1 && b("IEMobile/")
		}
	}(navigator.userAgent), _slice = Array.prototype.slice, _ = {
		isElement: function (a) {
			return a && 1 == a.nodeType
		}, String: {
			capitalize: function (a) {
				return a = baseToString(a), a && a.charAt(0).toUpperCase() + a.slice(1)
			}
		}
	};
	!function () {
		function a(a) {
			var b;
			if (a.originalEvent.wheelDelta ? b = a.originalEvent.wheelDelta / 120 : a.originalEvent.detail && (b = -a.originalEvent.detail / 3), b) {
				var c = $.Event("fresco:mousewheel");
				$(a.target).trigger(c, b), c.isPropagationStopped() && a.stopPropagation(), c.isDefaultPrevented() && a.preventDefault()
			}
		}

		$(document.documentElement).on("mousewheel DOMMouseScroll", a)
	}();
	var Fit = {
		within: function (a, b) {
			for (var c = $.extend({
				height: !0,
				width: !0
			}, arguments[2] || {}), d = $.extend({}, b), e = 1, f = 5, g = {
				width: c.width,
				height: c.height
			}; f > 0 && (g.width && d.width > a.width || g.height && d.height > a.height);) {
				var h = 1, i = 1;
				g.width && d.width > a.width && (h = a.width / d.width), g.height && d.height > a.height && (i = a.height / d.height);
				var e = Math.min(h, i);
				d = {width: Math.round(b.width * e), height: Math.round(b.height * e)}, f--
			}
			return d.width = Math.max(d.width, 0), d.height = Math.max(d.height, 0), d
		}
	};
	$.extend($.easing, {
		frescoEaseInCubic: function (a, b, c, d, e) {
			return d * (b /= e) * b * b + c
		}, frescoEaseInSine: function (a, b, c, d, e) {
			return -d * Math.cos(b / e * (Math.PI / 2)) + d + c
		}, frescoEaseOutSine: function (a, b, c, d, e) {
			return d * Math.sin(b / e * (Math.PI / 2)) + c
		}
	});
	var Support = function () {
		function a(a) {
			return c(a, "prefix")
		}

		function b(a, b) {
			for (var c in a)if (void 0 !== d.style[a[c]])return "prefix" == b ? a[c] : !0;
			return !1
		}

		function c(a, c) {
			var d = a.charAt(0).toUpperCase() + a.substr(1), f = (a + " " + e.join(d + " ") + d).split(" ");
			return b(f, c)
		}

		var d = document.createElement("div"), e = "Webkit Moz O ms Khtml".split(" ");
		return {
			canvas: function () {
				var a = document.createElement("canvas");
				return !(!a.getContext || !a.getContext("2d"))
			}(),
			css: {animation: c("animation"), transform: c("transform"), prefixed: a},
			svg: !!document.createElementNS && !!document.createElementNS("http://www.w3.org/2000/svg", "svg").createSVGRect,
			touch: function () {
				try {
					return !!("ontouchstart" in window || window.DocumentTouch && document instanceof DocumentTouch)
				} catch (a) {
					return !1
				}
			}()
		}
	}();
	Support.detectMobileTouch = function () {
		Support.mobileTouch = Support.touch && (Browser.MobileSafari || Browser.Android || Browser.IEMobile || Browser.ChromeMobile || !/^(Win|Mac|Linux)/.test(navigator.platform))
	}, Support.detectMobileTouch();
	var ImageReady = function () {
		return this.initialize.apply(this, Array.prototype.slice.call(arguments))
	};
	$.extend(ImageReady.prototype, {
		supports: {
			naturalWidth: function () {
				return "naturalWidth" in new Image
			}()
		}, initialize: function (a, b, c) {
			return this.img = $(a)[0], this.successCallback = b, this.errorCallback = c, this.isLoaded = !1, this.options = $.extend({
				method: "naturalWidth",
				pollFallbackAfter: 1e3
			}, arguments[3] || {}), this.supports.naturalWidth && "onload" != this.options.method ? this.img.complete && "undefined" != $.type(this.img.naturalWidth) ? void setTimeout($.proxy(function () {
				this.img.naturalWidth > 0 ? this.success() : this.error()
			}, this)) : ($(this.img).bind("error", $.proxy(function () {
				setTimeout($.proxy(function () {
					this.error()
				}, this))
			}, this)), this.intervals = [[1e3, 10], [2e3, 50], [4e3, 100], [2e4, 500]], this._ipos = 0, this._time = 0, this._delay = this.intervals[this._ipos][1], void this.poll()) : void setTimeout($.proxy(this.fallback, this))
		}, poll: function () {
			this._polling = setTimeout($.proxy(function () {
				if (this.img.naturalWidth > 0)return void this.success();
				if (this._time += this._delay, this.options.pollFallbackAfter && this._time >= this.options.pollFallbackAfter && !this._usedPollFallback && (this._usedPollFallback = !0, this.fallback()), this._time > this.intervals[this._ipos][0]) {
					if (!this.intervals[this._ipos + 1])return void this.error();
					this._ipos++, this._delay = this.intervals[this._ipos][1]
				}
				this.poll()
			}, this), this._delay)
		}, fallback: function () {
			var a = new Image;
			this._fallbackImg = a, a.onload = $.proxy(function () {
				a.onload = function () {
				}, this.supports.naturalWidth || (this.img.naturalWidth = a.width, this.img.naturalHeight = a.height), this.success()
			}, this), a.onerror = $.proxy(this.error, this), a.src = this.img.src
		}, abort: function () {
			this._fallbackImg && (this._fallbackImg.onload = function () {
			}), this._polling && (clearTimeout(this._polling), this._polling = null)
		}, success: function () {
			this._calledSuccess || (this._calledSuccess = !0, this.isLoaded = !0, this.successCallback(this))
		}, error: function () {
			this._calledError || (this._calledError = !0, this.abort(), this.errorCallback && this.errorCallback(this))
		}
	}), $.extend(Timers.prototype, {
		initialize: function () {
			this._timers = {}
		}, set: function (a, b, c) {
			this._timers[a] = setTimeout(b, c)
		}, get: function (a) {
			return this._timers[a]
		}, clear: function (a) {
			a ? this._timers[a] && (clearTimeout(this._timers[a]), delete this._timers[a]) : this.clearAll()
		}, clearAll: function () {
			$.each(this._timers, function (a, b) {
				clearTimeout(b)
			}), this._timers = {}
		}
	});
	var Type = {
		isVideo: function (a) {
			return /^(youtube|vimeo)$/.test(a)
		}
	}, Types = {
		image: {
			extensions: "bmp gif jpeg jpg png webp", detect: function (a) {
				return $.inArray(detectExtension(a), this.extensions.split(" ")) > -1
			}, data: function (a) {
				return this.detect() ? {extension: detectExtension(a)} : !1
			}
		}, vimeo: {
			detect: function (a) {
				var b = /(vimeo\.com)\/([a-zA-Z0-9-_]+)(?:\S+)?$/i.exec(a);
				return b && b[2] ? b[2] : !1
			}, data: function (a) {
				var b = this.detect(a);
				return b ? {id: b} : !1
			}
		}, youtube: {
			detect: function (a) {
				var b = /(youtube\.com|youtu\.be)\/watch\?(?=.*vi?=([a-zA-Z0-9-_]+))(?:\S+)?$/.exec(a);
				return b && b[2] ? b[2] : (b = /(youtube\.com|youtu\.be)\/(vi?\/|u\/|embed\/)?([a-zA-Z0-9-_]+)(?:\S+)?$/i.exec(a), b && b[3] ? b[3] : !1)
			}, data: function (a) {
				var b = this.detect(a);
				return b ? {id: b} : !1
			}
		}
	}, VimeoThumbnail = function () {
		var a = function () {
			return this.initialize.apply(this, _slice.call(arguments))
		};
		$.extend(a.prototype, {
			initialize: function (a, b, c) {
				this.url = a, this.successCallback = b, this.errorCallback = c, this.load()
			}, load: function () {
				var a = b.get(this.url);
				if (a)return this.successCallback(a.data.url);
				var c = "http" + (window.location && "https:" == window.location.protocol ? "s" : "") + ":", d = getURIData(this.url).id;
				this._xhr = $.getJSON(c + "//vimeo.com/api/oembed.json?url=" + c + "//vimeo.com/" + d + "&callback=?", $.proxy(function (a) {
					if (a && a.thumbnail_url) {
						var a = {url: a.thumbnail_url};
						b.set(this.url, a), this.successCallback(a.url)
					} else this.errorCallback()
				}, this))
			}, abort: function () {
				this._xhr && (this._xhr.abort(), this._xhr = null)
			}
		});
		var b = {
			cache: [], get: function (a) {
				for (var b = null, c = 0; c < this.cache.length; c++)this.cache[c] && this.cache[c].url == a && (b = this.cache[c]);
				return b
			}, set: function (a, b) {
				this.remove(a), this.cache.push({url: a, data: b})
			}, remove: function (a) {
				for (var b = 0; b < this.cache.length; b++)this.cache[b] && this.cache[b].url == a && delete this.cache[b]
			}
		};
		return a
	}(), VimeoReady = function () {
		var a = function () {
			return this.initialize.apply(this, _slice.call(arguments))
		};
		$.extend(a.prototype, {
			initialize: function (a, b) {
				this.url = a, this.callback = b, this.load()
			}, load: function () {
				var a = b.get(this.url);
				if (a)return this.callback(a.data);
				var c = "http" + (window.location && "https:" == window.location.protocol ? "s" : "") + ":", d = getURIData(this.url).id;
				this._xhr = $.getJSON(c + "//vimeo.com/api/oembed.json?url=" + c + "//vimeo.com/" + d + "&callback=?", $.proxy(function (a) {
					var c = {dimensions: {width: a.width, height: a.height}};
					b.set(this.url, c), this.callback && this.callback(c)
				}, this))
			}, abort: function () {
				this._xhr && (this._xhr.abort(), this._xhr = null)
			}
		});
		var b = {
			cache: [], get: function (a) {
				for (var b = null, c = 0; c < this.cache.length; c++)this.cache[c] && this.cache[c].url == a && (b = this.cache[c]);
				return b
			}, set: function (a, b) {
				this.remove(a), this.cache.push({url: a, data: b})
			}, remove: function (a) {
				for (var b = 0; b < this.cache.length; b++)this.cache[b] && this.cache[b].url == a && delete this.cache[b]
			}
		};
		return a
	}(), Options = {
		defaults: {
			effects: {
				content: {show: 0, hide: 0},
				spinner: {show: 150, hide: 150},
				window: {show: 440, hide: 300},
				thumbnail: {show: 300, delay: 150},
				thumbnails: {slide: 0}
			},
			keyboard: {left: !0, right: !0, esc: !0},
			loadedMethod: "naturalWidth",
			loop: !1,
			onClick: "previous-next",
			overflow: !1,
			overlay: {close: !0},
			preload: [1, 2],
			position: !0,
			skin: "fresco",
			spinner: !0,
			spinnerDelay: 300,
			sync: !0,
			thumbnails: "horizontal",
			ui: "outside",
			uiDelay: 3e3,
			vimeo: {autoplay: 1, api: 1, title: 1, byline: 1, portrait: 0, loop: 0},
			youtube: {
				autoplay: 1,
				controls: 1,
				enablejsapi: 1,
				hd: 1,
				iv_load_policy: 3,
				loop: 0,
				modestbranding: 1,
				rel: 0,
				vq: "hd1080"
			},
			initialTypeOptions: {image: {}, vimeo: {width: 1280}, youtube: {width: 1280, height: 720}}
		}, create: function (a, b, c) {
			a = a || {}, c = c || {}, a.skin = a.skin || this.defaults.skin;
			var d = a.skin ? $.extend({}, Fresco.Skins[a.skin] || Fresco.Skins[this.defaults.skin]) : {}, e = $.extend(!0, {}, this.defaults, d);
			e.initialTypeOptions && (b && e.initialTypeOptions[b] && (e = $.extend(!0, {}, e.initialTypeOptions[b], e)), delete e.initialTypeOptions);
			var f = $.extend(!0, {}, e, a);
			if (Support.mobileTouch && "inside" == f.ui && (f.ui = "outside"), (!f.effects || Browser.IE && Browser.IE < 9) && (f.effects = {}, $.each(this.defaults.effects, function (a, b) {
					$.each(f.effects[a] = $.extend({}, b), function (b) {
						f.effects[a][b] = 0
					})
				}), f.spinner = !1), f.keyboard && ("boolean" == $.type(f.keyboard) && (f.keyboard = {}, $.each(this.defaults.keyboard, function (a, b) {
					f.keyboard[a] = !0
				})), ("vimeo" == b || "youtube" == b) && $.extend(f.keyboard, {
					left: !1,
					right: !1
				})), !f.overflow || Support.mobileTouch ? f.overflow = {
					x: !1,
					y: !1
				} : "boolean" == $.type(f.overflow) && (f.overflow = {
					x: !1,
					y: !0
				}), ("vimeo" == b || "youtube" == b) && (f.overlap = !1), (Browser.IE && Browser.IE < 9 || Support.mobileTouch) && (f.thumbnail = !1, f.thumbnails = !1), "youtube" != b && (f.width && !f.maxWidth && (f.maxWidth = f.width), f.height && !f.maxHeight && (f.maxHeight = f.height)), !f.thumbnail && "boolean" != $.type(f.thumbnail)) {
				var g = !1;
				switch (b) {
					case"youtube":
						var h = "http" + (window.location && "https:" == window.location.protocol ? "s" : "") + ":";
						g = h + "//img.youtube.com/vi/" + c.id + "/0.jpg";
						break;
					case"image":
					case"vimeo":
						g = !0
				}
				f.thumbnail = g
			}
			return f
		}
	}, Overlay = {
		initialize: function () {
			this.build(), this.visible = !1
		}, build: function () {
			this.element = $("<div>").addClass("fr-overlay").hide().append($("<div>").addClass("fr-overlay-background")), this.element.on("click", $.proxy(function () {
				var a = Pages.page;
				a && a.view && a.view.options.overlay && !a.view.options.overlay.close || Window.hide()
			}, this)), Support.mobileTouch && this.element.addClass("fr-mobile-touch"), this.element.on("fresco:mousewheel", function (a) {
				a.preventDefault()
			})
		}, setSkin: function (a) {
			this.skin && this.element.removeClass("fr-overlay-skin-" + this.skin), this.element.addClass("fr-overlay-skin-" + a), this.skin = a
		}, attach: function () {
			$(document.body).append(this.element)
		}, detach: function () {
			this.element.detach()
		}, show: function (a, b) {
			if (this.visible)return void(a && a());
			this.visible = !0, this.attach(), this.max();
			var c = Pages.page && Pages.page.view.options.effects.window.show || 0, d = ("number" == $.type(b) ? b : c) || 0;
			this.element.stop(!0).fadeTo(d, 1, a)
		}, hide: function (a, b) {
			if (!this.visible)return void(a && a());
			var c = Pages.page && Pages.page.view.options.effects.window.hide || 0, d = ("number" == $.type(b) ? b : c) || 0;
			this.element.stop(!0).fadeOut(d || 0, $.proxy(function () {
				this.detach(), this.visible = !1, a && a()
			}, this))
		}, getScrollDimensions: function () {
			var a = {};
			return $.each(["width", "height"], function (b, c) {
				var d = c.substr(0, 1).toUpperCase() + c.substr(1), e = document.documentElement;
				a[c] = (Browser.IE ? Math.max(e["offset" + d], e["scroll" + d]) : Browser.WebKit ? document.body["scroll" + d] : e["scroll" + d]) || 0
			}), a
		}, max: function () {
			var a;
			if (Browser.MobileSafari && Browser.WebKit && Browser.WebKit < 533.18 && (a = this.getScrollDimensions(), this.element.css(a)), Browser.IE && Browser.IE < 9) {
				var b = Bounds.viewport();
				this.element.css({height: b.height, width: b.width})
			}
			Support.mobileTouch && !a && this.element.css({height: this.getScrollDimensions().height})
		}
	}, Window = {
		initialize: function () {
			this.queues = [], this.queues.hide = $({}), this.pages = [], this._tracking = [], this._first = !0, this.timers = new Timers, this.build(), this.setSkin(Options.defaults.skin)
		}, build: function () {
			if (this.element = $("<div>").addClass("fr-window fr-measured").hide().append(this._box = $("<div>").addClass("fr-box").append(this._pages = $("<div>").addClass("fr-pages"))).append(this._thumbnails = $("<div>").addClass("fr-thumbnails")), Overlay.initialize(), Pages.initialize(this._pages), Thumbnails.initialize(this._thumbnails), Spinner.initialize(), UI.initialize(), this.element.addClass("fr" + (Support.mobileTouch ? "" : "-no") + "-mobile-touch"), this.element.addClass("fr" + (Support.svg ? "" : "-no") + "-svg"), Browser.IE)for (var a = 7; 9 >= a; a++)Browser.IE < a && this.element.addClass("fr-ltIE" + a);
			this.element.on("fresco:mousewheel", function (a) {
				a.preventDefault()
			})
		}, attach: function () {
			this._attached || ($(document.body).append(this.element), this._attached = !0)
		}, detach: function () {
			this._attached && (this.element.detach(), this._attached = !1)
		}, setSkin: function (a) {
			this._skin && this.element.removeClass("fr-window-skin-" + this._skin), this.element.addClass("fr-window-skin-" + a), Overlay.setSkin(a), this._skin = a
		}, setShowingType: function (a) {
			this._showingType != a && (this._showingType && (this.element.removeClass("fr-showing-type-" + this._showingType), Type.isVideo(this._showingType) && this.element.removeClass("fr-showing-type-video")), this.element.addClass("fr-showing-type-" + a), Type.isVideo(a) && this.element.addClass("fr-showing-type-video"), this._showingType = a)
		}, startObservingResize: function () {
			this._onWindowResizeHandler || $(window).on("resize orientationchange", this._onWindowResizeHandler = $.proxy(this._onWindowResize, this))
		}, stopObservingResize: function () {
			this._onWindowResizeHandler && ($(window).off("resize orientationchange", this._onWindowResizeHandler), this._onWindowResizeHandler = null)
		}, _onScroll: function () {
			Support.mobileTouch && this.timers.set("scroll", $.proxy(this.adjustToScroll, this), 0)
		}, _onWindowResize: function () {
			var a;
			(a = Pages.page) && (Thumbnails.fitToViewport(), this.updateBoxDimensions(), a.fitToBox(), UI.update(), UI.adjustPrevNext(null, 0), Spinner.center(), Overlay.max(), UI._onWindowResize(), this._onScroll())
		}, adjustToScroll: function () {
			Support.mobileTouch && this.element.css({top: $(window).scrollTop()})
		}, getBoxDimensions: function () {
			return this._boxDimensions
		}, updateBoxDimensions: function () {
			var a;
			if (a = Pages.page) {
				var b = Bounds.viewport(), c = Thumbnails.getDimensions(), d = "horizontal" == Thumbnails._orientation;
				this._boxDimensions = {
					width: d ? b.width : b.width - c.width,
					height: d ? b.height - c.height : b.height
				}, this._boxPosition = {
					top: 0,
					left: d ? 0 : c.width
				}, this._box.css($.extend({}, this._boxDimensions, this._boxPosition))
			}
		}, show: function (a, b) {
			if (this.visible)return void(a && a());
			this.visible = !0, this.opening = !0, this.attach(), this.timers.clear("show-window"), this.timers.clear("hide-overlay"), this.adjustToScroll();
			var c = ("number" == $.type(b) ? b : Pages.page && Pages.page.view.options.effects.window.show) || 0, d = 2;
			Overlay[Pages.page && Pages.page.view.options.overlay ? "show" : "hide"](function () {
				a && --d < 1 && a()
			}, c), this.timers.set("show-window", $.proxy(function () {
				this._show($.proxy(function () {
					this.opening = !1, a && --d < 1 && a()
				}, this), c)
			}, this), c > 1 ? Math.min(.5 * c, 50) : 1)
		}, _show: function (a, b) {
			var c = ("number" == $.type(b) ? b : Pages.page && Pages.page.view.options.effects.window.show) || 0;
			this.element.stop(!0).fadeTo(c, 1, a)
		}, hide: function (a) {
			if (this.view) {
				var b = this.queues.hide;
				b.queue([]), this.timers.clear("show-window"), this.timers.clear("hide-overlay");
				var c = Pages.page ? Pages.page.view.options.effects.window.hide : 0;
				b.queue($.proxy(function (a) {
					Pages.stop(), Spinner.hide(), a()
				}, this)), b.queue($.proxy(function (a) {
					UI.disable(), UI.hide(null, c), Keyboard.disable(), a()
				}, this)), b.queue($.proxy(function (a) {
					var b = 2;
					this._hide(function () {
						--b < 1 && a()
					}, c), this.timers.set("hide-overlay", $.proxy(function () {
						Overlay.hide(function () {
							--b < 1 && a()
						}, c)
					}, this), c > 1 ? Math.min(.5 * c, 150) : 1), this._first = !0
				}, this)), b.queue($.proxy(function (a) {
					this._reset(), this.stopObservingResize(), Pages.removeAll(), Thumbnails.clear(), this.timers.clear(), this._position = -1;
					var b = Pages.page && Pages.page.view.options.afterHide;
					"function" == $.type(b) && b.call(Fresco), this.view = null, this.opening = !1, this.closing = !1, this.detach(), a()
				}, this)), "function" == $.type(a) && b.queue($.proxy(function (b) {
					a(), b()
				}, this))
			}
		}, _hide: function (a, b) {
			var c = ("number" == $.type(b) ? b : Pages.page && Pages.page.view.options.effects.window.hide) || 0;
			this.element.stop(!0).fadeOut(c, a)
		}, load: function (a, b) {
			this.views = a, this.attach(), Thumbnails.load(a), Pages.load(a), this.startObservingResize(), b && this.setPosition(b)
		}, setPosition: function (a, b) {
			this._position = a, this.view = this.views[a - 1], this.stopHideQueue(), this.page = Pages.show(a, $.proxy(function () {
				b && b()
			}, this))
		}, stopHideQueue: function () {
			this.queues.hide.queue([])
		}, _reset: function () {
			this.visible = !1, UI.hide(null, 0), UI.reset()
		}, mayPrevious: function () {
			return this.view && this.view.options.loop && this.views && this.views.length > 1 || 1 != this._position
		}, previous: function (a) {
			var b = this.mayPrevious();
			(a || b) && this.setPosition(this.getSurroundingIndexes().previous)
		}, mayNext: function () {
			var a = this.views && this.views.length > 1;
			return this.view && this.view.options.loop && a || a && 1 != this.getSurroundingIndexes().next
		}, next: function (a) {
			var b = this.mayNext();
			(a || b) && this.setPosition(this.getSurroundingIndexes().next)
		}, getSurroundingIndexes: function () {
			if (!this.views)return {};
			var a = this._position, b = this.views.length, c = 1 >= a ? b : a - 1, d = a >= b ? 1 : a + 1;
			return {previous: c, next: d}
		}
	}, Keyboard = {
		enabled: !1, keyCode: {left: 37, right: 39, esc: 27}, enable: function (a) {
			this.disable(), a && ($(document).on("keydown", this._onKeyDownHandler = $.proxy(this.onKeyDown, this)).on("keyup", this._onKeyUpHandler = $.proxy(this.onKeyUp, this)), this.enabled = a)
		}, disable: function () {
			this.enabled = !1, this._onKeyUpHandler && ($(document).off("keyup", this._onKeyUpHandler).off("keydown", this._onKeyDownHandler), this._onKeyUpHandler = this._onKeyDownHandler = null)
		}, onKeyDown: function (a) {
			if (this.enabled) {
				var b = this.getKeyByKeyCode(a.keyCode);
				if (b && (!b || !this.enabled || this.enabled[b]))switch (a.preventDefault(), a.stopPropagation(), b) {
					case"left":
						Window.previous();
						break;
					case"right":
						Window.next()
				}
			}
		}, onKeyUp: function (a) {
			if (this.enabled) {
				var b = this.getKeyByKeyCode(a.keyCode);
				if (b && (!b || !this.enabled || this.enabled[b]))switch (b) {
					case"esc":
						Window.hide()
				}
			}
		}, getKeyByKeyCode: function (a) {
			for (var b in this.keyCode)if (this.keyCode[b] == a)return b;
			return null
		}
	}, Page = function () {
		function a() {
			return this.initialize.apply(this, _slice.call(arguments))
		}

		var b = 0, c = {}, d = $("<div>").addClass("fr-stroke fr-stroke-top fr-stroke-horizontal").append($("<div>").addClass("fr-stroke-color")).add($("<div>").addClass("fr-stroke fr-stroke-bottom fr-stroke-horizontal").append($("<div>").addClass("fr-stroke-color"))).add($("<div>").addClass("fr-stroke fr-stroke-left fr-stroke-vertical").append($("<div>").addClass("fr-stroke-color"))).add($("<div>").addClass("fr-stroke fr-stroke-right fr-stroke-vertical").append($("<div>").addClass("fr-stroke-color")));
		return $.extend(a.prototype, {
			initialize: function (a, c, d) {
				this.view = a, this.dimensions = {
					width: 0,
					height: 0
				}, this.uid = b++, this._position = c, this._total = d, this._fullClick = !1, this._visible = !1, this.queues = {}, this.queues.showhide = $({})
			}, create: function () {
				if (!this._created) {
					Pages.element.append(this.element = $("<div>").addClass("fr-page").append(this.container = $("<div>").addClass("fr-container")).css({opacity: 0}).hide());
					var a = this.view.options.position && this._total > 1;
					if (a && this.element.addClass("fr-has-position"), (this.view.caption || a) && (this.element.append(this.info = $("<div>").addClass("fr-info").append($("<div>").addClass("fr-info-background")).append(d.clone(!0)).append(this.infoPadder = $("<div>").addClass("fr-info-padder"))), a && (this.element.addClass("fr-has-position"), this.infoPadder.append(this.pos = $("<div>").addClass("fr-position").append($("<span>").addClass("fr-position-text").html(this._position + " / " + this._total)))), this.view.caption && this.infoPadder.append(this.caption = $("<div>").addClass("fr-caption").html(this.view.caption))), this.container.append(this.background = $("<div>").addClass("fr-content-background")).append(this.content = $("<div>").addClass("fr-content")), "image" == this.view.type && (this.content.append(this.image = $("<img>").addClass("fr-content-element").attr({src: this.view.url})), this.content.append(d.clone(!0))), a && "outside" == this.view.options.ui && this.container.append(this.positionOutside = $("<div>").addClass("fr-position-outside").append($("<div>").addClass("fr-position-background")).append($("<span>").addClass("fr-position-text").html(this._position + " / " + this._total))), "inside" == this.view.options.ui) {
						this.content.append(this.previousInside = $("<div>").addClass("fr-side fr-side-previous fr-toggle-ui").append($("<div>").addClass("fr-side-button").append($("<div>").addClass("fr-side-button-background")).append($("<div>").addClass("fr-side-button-icon")))).append(this.nextInside = $("<div>").addClass("fr-side fr-side-next fr-toggle-ui").append($("<div>").addClass("fr-side-button").append($("<div>").addClass("fr-side-button-background")).append($("<div>").addClass("fr-side-button-icon")))).append(this.closeInside = $("<div>").addClass("fr-close fr-toggle-ui").append($("<div>").addClass("fr-close-background")).append($("<div>").addClass("fr-close-icon"))), (this.view.caption || a && this.view.grouped.caption) && (this.content.append(this.infoInside = $("<div>").addClass("fr-info fr-toggle-ui").append($("<div>").addClass("fr-info-background")).append(d.clone(!0)).append(this.infoPadderInside = $("<div>").addClass("fr-info-padder"))), a && this.infoPadderInside.append(this.posInside = $("<div>").addClass("fr-position").append($("<span>").addClass("fr-position-text").html(this._position + " / " + this._total))), this.view.caption && this.infoPadderInside.append(this.captionInside = $("<div>").addClass("fr-caption").html(this.view.caption))), this.view.caption || !a || this.view.grouped.caption || this.content.append(this.positionInside = $("<div>").addClass("fr-position-inside fr-toggle-ui").append($("<div>").addClass("fr-position-background")).append($("<span>").addClass("fr-position-text").html(this._position + " / " + this._total)));
						var b = this.view.options.loop && this._total > 1 || 1 != this._position, c = this.view.options.loop && this._total > 1 || this._position < this._total;
						this.previousInside[(b ? "remove" : "add") + "Class"]("fr-side-disabled"), this.nextInside[(c ? "remove" : "add") + "Class"]("fr-side-disabled")
					}
					$.each(["x", "y"], $.proxy(function (a, b) {
						this.view.options.overflow[b] && this.element.addClass("fr-overflow-" + b)
					}, this)), this.element.addClass("fr-type-" + this.view.type), Type.isVideo(this.view.type) && this.element.addClass("fr-type-video"), this._total < 2 && this.element.addClass("fr-no-sides"), this._created = !0
				}
			}, _getSurroundingPages: function () {
				var a;
				if (!(a = this.view.options.preload))return [];
				for (var b = [], c = Math.max(1, this._position - a[0]), d = Math.min(this._position + a[1], this._total), e = this._position, f = e; d >= f; f++) {
					var g = Pages.pages[f - 1];
					g._position != e && b.push(g)
				}
				for (var f = e; f >= c; f--) {
					var g = Pages.pages[f - 1];
					g._position != e && b.push(g)
				}
				return b
			}, preloadSurroundingImages: function () {
				var a = this._getSurroundingPages();
				$.each(a, $.proxy(function (a, b) {
					b.preload()
				}, this))
			}, preload: function () {
				this.preloading || this.preloaded || "image" != this.view.type || !this.view.options.preload || this.loaded || (this.create(), this.preloading = !0, this.preloadReady = new ImageReady(this.image[0], $.proxy(function (a) {
					this.loaded = !0, c[this.view.url] = !0, this.preloading = !1, this.preloaded = !0, this.dimensions = {
						width: a.img.naturalWidth,
						height: a.img.naturalHeight
					}
				}, this), null, {method: "naturalWidth"}))
			}, load: function (a, b) {
				if (this.create(), this.loaded)return void(a && a());
				switch (this.abort(), this.loading = !0, this.view.options.spinner && (this._spinnerDelay = setTimeout($.proxy(function () {
					Spinner.show()
				}, this), this.view.options.spinnerDelay || 0)), this.view.type) {
					case"image":
						if (this.error)return void(a && a());
						this.imageReady = new ImageReady(this.image[0], $.proxy(function (b) {
							this._markAsLoaded(), this.setDimensions({
								width: b.img.naturalWidth,
								height: b.img.naturalHeight
							}), a && a()
						}, this), $.proxy(function () {
							this._markAsLoaded(), this.image.hide(), this.content.prepend(this.error = $("<div>").addClass("fr-error fr-content-element").append($("<div>").addClass("fr-error-icon"))), this.element.addClass("fr-has-error"), this.setDimensions({
								width: this.error.outerWidth(),
								height: this.error.outerHeight()
							}), this.error.css({width: "100%", height: "100%"}), a && a()
						}, this), {method: this.view.options.loadedMethod});
						break;
					case"vimeo":
						this.vimeoReady = new VimeoReady(this.view.url, $.proxy(function (b) {
							this._markAsLoaded(), this.setDimensions({
								width: b.dimensions.width,
								height: b.dimensions.height
							}), a && a()
						}, this));
						break;
					case"youtube":
						this._markAsLoaded(), this.setDimensions({
							width: this.view.options.width,
							height: this.view.options.height
						}), a && a()
				}
			}, setDimensions: function (a) {
				if (this.dimensions = a, this.view.options.maxWidth || this.view.options.maxHeight) {
					var b = this.view.options, c = {
						width: b.maxWidth ? b.maxWidth : this.dimensions.width,
						height: b.maxHeight ? b.maxHeight : this.dimensions.height
					};
					this.dimensions = Fit.within(c, this.dimensions)
				}
			}, _markAsLoaded: function () {
				this._abortSpinnerDelay(), this.loading = !1, this.loaded = !0, c[this.view.url] = !0, Spinner.hide(null, null, this._position)
			}, isVideo: function () {
				return Type.isVideo(this.view.type)
			}, insertVideo: function (a) {
				if (this.playerIframe || !this.isVideo())return void(a && a());
				var b = "http" + (window.location && "https:" == window.location.protocol ? "s" : "") + ":", c = $.extend({}, this.view.options[this.view.type] || {}), d = $.param(c), e = {
					vimeo: b + "//player.vimeo.com/video/{id}?{queryString}",
					youtube: b + "//www.youtube.com/embed/{id}?{queryString}"
				}, f = e[this.view.type].replace("{id}", this.view._data.id).replace("{queryString}", d);
				this.content.prepend(this.playerIframe = $("<iframe webkitAllowFullScreen mozallowfullscreen allowFullScreen>").addClass("fr-content-element").attr({
					src: f,
					height: this._contentDimensions.height,
					width: this._contentDimensions.width,
					frameborder: 0
				})), a && a()
			}, raise: function () {
				var a = Pages.element[0].lastChild;
				a && a == this.element[0] || Pages.element.append(this.element)
			}, show: function (a) {
				var b = this.queues.showhide;
				b.queue([]), b.queue($.proxy(function (a) {
					var b = this.view.options.spinner && !c[this.view.url];
					Spinner._visible && !b && Spinner.hide(), Pages.stopInactive(), a()
				}, this)), b.queue($.proxy(function (a) {
					this.updateUI(), UI.set(this._ui), a()
				}, this)), b.queue($.proxy(function (a) {
					Keyboard.enable(this.view.options.keyboard), a()
				}, this)), b.queue($.proxy(function (a) {
					Spinner.setSkin(this.view.options.skin), this.load($.proxy(function () {
						this.preloadSurroundingImages(), a()
					}, this))
				}, this)), b.queue($.proxy(function (a) {
					this.raise(), Window.setSkin(this.view.options.skin), UI.enable(), this.fitToBox(), Window.adjustToScroll(), a()
				}, this)), this.isVideo() && b.queue($.proxy(function (a) {
					this.insertVideo($.proxy(function () {
						a()
					}))
				}, this)), this.view.options.sync || b.queue($.proxy(function (a) {
					Pages.hideInactive(a)
				}, this)), b.queue($.proxy(function (a) {
					var b = 3, c = this.view.options.effects.content.show;
					Window.setShowingType(this.view.type), Window.visible || (c = this.view.options.effects.window.show, "function" == $.type(this.view.options.onShow) && this.view.options.onShow.call(Fresco)), this.view.options.sync && (b++, Pages.hideInactive(function () {
						--b < 1 && a()
					})), Window.show(function () {
						--b < 1 && a()
					}, this.view.options.effects.window.show), this._show(function () {
						--b < 1 && a()
					}, c), UI.adjustPrevNext(function () {
						--b < 1 && a()
					}, Window._first ? 0 : c), Window._first ? (UI.show(null, 0), Window._first = !1) : UI.show(null, 0);
					var d = this.view.options.afterPosition;
					"function" == $.type(d) && d.call(Fresco, this._position)
				}, this)), b.queue($.proxy(function (b) {
					this._visible = !0, a && a(), b()
				}, this))
			}, _show: function (a, b) {
				var c = Window.visible ? "number" == $.type(b) ? b : this.view.options.effects.content.show : 0;
				this.element.stop(!0).show().fadeTo(c || 0, 1, a)
			}, hide: function (a, b) {
				if (!this.element)return void(a && a());
				this.removeVideo(), this.abort();
				var c = "number" == $.type(b) ? b : this.view.options.effects.content.hide;
				this.isVideo() && (c = 0), this.element.stop(!0).fadeTo(c, 0, "frescoEaseInCubic", $.proxy(function () {
					this.element.hide(), this._visible = !1, Pages.removeTracking(this._position), a && a()
				}, this))
			}, stop: function () {
				var a = this.queues.showhide;
				a.queue([]), this.element && this.element.stop(!0), this.abort()
			}, removeVideo: function () {
				this.playerIframe && (this.playerIframe[0].src = "//about:blank", this.playerIframe.remove(), this.playerIframe = null)
			}, remove: function () {
				this.stop(), this.removeVideo(), this.element && this.element.remove(), this._track && (Pages.removeTracking(this._position), this._track = !1), this.preloadReady && (this.preloadReady.abort(), this.preloadReady = null, this.preloading = null, this.preloaded = null), this._visible = !1, this.removed = !0
			}, abort: function () {
				this.imageReady && (this.imageReady.abort(), this.imageReady = null), this.vimeoReady && (this.vimeoReady.abort(), this.vimeoReady = null), this._abortSpinnerDelay(), this.loading = !1
			}, _abortSpinnerDelay: function () {
				this._spinnerDelay && (clearTimeout(this._spinnerDelay), this._spinnerDelay = null)
			}, _getInfoHeight: function (a) {
				var b = this.view.options.position && this._total > 1;
				switch (this._ui) {
					case"fullclick":
					case"inside":
						if (!this.view.caption && !b)return 0;
						break;
					case"outside":
						if (!this.view.caption)return 0
				}
				var c = "inside" == this._ui ? this.infoInside : this.info;
				"outside" == this._ui && (a = Math.min(a, Window._boxDimensions.width));
				var d, e = c[0].style.width;
				return ("inside" == this._ui || "fullclick" == this._ui) && (e = "100%"), c.css({width: a + "px"}), d = parseFloat(c.outerHeight()), c.css({width: e}), d
			}, _whileVisible: function (a, b) {
				var c = [], d = Window.element.add(this.element);
				b && (d = d.add(b)), $.each(d, function (a, b) {
					var d = $(b).is(":visible");
					d || c.push($(b).show())
				});
				var e = this.element.hasClass("fr-no-caption");
				this.element.removeClass("fr-no-caption");
				var f = this.element.hasClass("fr-has-caption");
				this.element.addClass("fr-has-caption"), Window.element.css({visibility: "hidden"}), a(), Window.element.css({visibility: "visible"}), e && this.element.addClass("fr-no-caption"), f || this.element.removeClass("fr-has-caption"), $.each(c, function (a, b) {
					b.hide()
				})
			}, updateForced: function () {
				this.create(), this._fullClick = this.view.options.fullClick, this._noOverflow = !1, parseInt(this.element.css("min-width")) > 0 && (this._fullClick = !0), parseInt(this.element.css("min-height")) > 0 && (this._noOverflow = !0)
			}, updateUI: function (a) {
				this.updateForced();
				var a = this._fullClick ? "fullclick" : this.view.options.ui;
				this._ui && this.element.removeClass("fr-ui-" + this._ui), this.element.addClass("fr-ui-" + a), this._ui = a
			}, fitToBox: function () {
				if (this.content) {
					var a = (this.element, $.extend({}, Window.getBoxDimensions())), b = $.extend({}, this.dimensions), c = this.container;
					this.updateUI();
					var d = {left: parseInt(c.css("padding-left")), top: parseInt(c.css("padding-top"))};
					if ("outside" == this._ui && this._positionOutside) {
						var e = 0;
						this._whileVisible($.proxy(function () {
							this._positionOutside.is(":visible") && (e = this._positionOutside.outerWidth(!0))
						}, this)), e > d.left && (d.left = e)
					}
					a.width -= 2 * d.left, a.height -= 2 * d.top;
					var f, g = {
						width: !0,
						height: this._noOverflow ? !0 : !this.view.options.overflow.y
					}, h = Fit.within(a, b, g), i = $.extend({}, h), j = (this.content, 0), k = "inside" == this._ui, l = k ? this.infoInside : this.info, m = k ? this.captionInside : this.caption, n = k ? this.posInside : this.pos, o = !!m;
					switch (this._ui) {
						case"outside":
							var p, q = $.extend({}, i);
							this.caption && (p = this.caption, this._whileVisible($.proxy(function () {
								for (var b = 0, c = 2; c > b;) {
									j = this._getInfoHeight(i.width);
									var d = a.height - i.height;
									j > d && (i = Fit.within({width: i.width, height: Math.max(i.height - (j - d), 0)}, i, g)), b++
								}
								j = this._getInfoHeight(i.width);
								var e = .5;
								(!this.view.options.overflow.y && j + i.height > a.height || l && "none" == l.css("display") || e && j >= e * i.height) && (o = !1, j = 0, i = q)
							}, this), p)), l && l.css({width: i.width + "px"}), f = {width: i.width, height: i.height + j};
							break;
						case"inside":
							if (this.caption) {
								var p = m;
								this._whileVisible($.proxy(function () {
									j = this._getInfoHeight(i.width);
									var a = .45;
									a && j >= a * i.height && (o = !1, j = 0)
								}, this), p)
							}
							f = i;
							break;
						case"fullclick":
							var r = [];
							m && r.push(m), this._whileVisible($.proxy(function () {
								if ((m || n) && l.css({width: "100%"}), j = this._getInfoHeight(Window._boxDimensions.width), m && j > .5 * a.height)if (o = !1, n) {
									var b = this.caption.is(":visible");
									this.caption.hide(), j = this._getInfoHeight(Window._boxDimensions.width), b && this.caption.show()
								} else j = 0;
								i = Fit.within({width: a.width, height: Math.max(0, a.height - j)}, i, g), f = i
							}, this), r), this.content.css({"padding-bottom": 0})
					}
					m && m[o ? "show" : "hide"](), this.element[(o ? "remove" : "add") + "Class"]("fr-no-caption"), this.element[(o ? "add" : "remove") + "Class"]("fr-has-caption"), this.content.css(i), this.background.css(f), this.playerIframe && this.playerIframe.attr(i), this.overlap = {
						y: f.height + ("fullclick" == this._ui ? j : 0) - Window._boxDimensions.height,
						x: 0
					}, this._track = !this._noOverflow && this.view.options.overflow.y && this.overlap.y > 0, this._infoHeight = j, this._padding = d, this._contentDimensions = i, this._backgroundDimensions = f, Pages[(this._track ? "set" : "remove") + "Tracking"](this._position), this.position()
				}
			}, position: function () {
				if (this.content) {
					var a = this._contentDimensions, b = this._backgroundDimensions, c = {
						top: .5 * Window._boxDimensions.height - .5 * b.height,
						left: .5 * Window._boxDimensions.width - .5 * b.width
					}, d = {top: c.top + a.height, left: c.left}, e = 0, f = "inside" == this._ui ? this.infoInside : this.info;
					switch (this._ui) {
						case"fullclick":
							c.top = .5 * (Window._boxDimensions.height - this._infoHeight) - .5 * b.height, d = {
								top: Window._boxDimensions.height - this._infoHeight,
								left: 0,
								bottom: "auto"
							}, e = this._infoHeight;
							break;
						case"inside":
							d = {top: "auto", left: 0, bottom: 0}
					}
					if (this.overlap.y > 0) {
						var g = Pages.getXYP();
						switch (c.top = 0 - g.y * this.overlap.y, this._ui) {
							case"outside":
							case"fullclick":
								d.top = Window._boxDimensions.height - this._infoHeight;
								break;
							case"inside":
								var h = c.top + a.height - Window._boxDimensions.height, i = -1 * c.top;
								if (d.bottom = h, this.closeInside.css({top: i}), this._total > 1) {
									var j = Window.element.is(":visible");
									j || Window.element.show();
									var k = this.previousInside.attr("style");
									this.previousInside.removeAttr("style");
									var l = parseInt(this.previousInside.css("margin-top"));
									this.previousInside.attr({style: k}), j || Window.element.hide();
									var m = this.previousInside.add(this.nextInside), n = .5 * this.overlap.y;
									m.css({"margin-top": l + (i - n)}), this.positionInside && this.positionInside.css({bottom: h})
								}
						}
					} else"inside" == this._ui && this.element.find(".fr-info, .fr-side, .fr-close, .fr-position-inside").removeAttr("style");
					f && f.css(d), this.container.css({bottom: e}), this.content.css(c), this.background.css(c)
				}
			}
		}), a
	}(), Pages = {
		initialize: function (a) {
			this.element = a, this.pages = [], this.uid = 1, this._tracking = []
		}, load: function (a) {
			this.views = a, this.removeAll(), $.each(a, $.proxy(function (a, b) {
				this.pages.push(new Page(b, a + 1, this.views.length))
			}, this))
		}, show: function (a, b) {
			var c = this.pages[a - 1];
			this.page && this.page.uid == c.uid || (this.page = c, Thumbnails.show(a), Window.updateBoxDimensions(), c.show($.proxy(function () {
				b && b()
			}, this)))
		}, getPositionInActivePageGroup: function (a) {
			var b = 0;
			return $.each(this.pages, function (c, d) {
				d.view.element && d.view.element == a && (b = c + 1)
			}), b
		}, getLoadingCount: function () {
			var a = 0;
			return $.each(this.pages, function (b, c) {
				c.loading && a++
			}), a
		}, removeAll: function () {
			$.each(this.pages, function (a, b) {
				b.remove()
			}), this.pages = []
		}, hideInactive: function (a, b) {
			var c = [];
			$.each(this.pages, $.proxy(function (a, b) {
				b.uid != this.page.uid && c.push(b)
			}, this));
			var d = 0 + c.length;
			return 1 > d ? a && a() : $.each(c, function (c, e) {
				e.hide(function () {
					a && --d < 1 && a()
				}, b)
			}), c.length
		}, stopInactive: function () {
			$.each(this.pages, $.proxy(function (a, b) {
				b.uid != this.page.uid && b.stop()
			}, this))
		}, stop: function () {
			$.each(this.pages, function (a, b) {
				b.stop()
			})
		}, handleTracking: function (a) {
			Browser.IE && Browser.IE < 9 ? (this.setXY({
				x: a.pageX,
				y: a.pageY
			}), this.updatePositions()) : this._tracking_timer = setTimeout($.proxy(function () {
				this.setXY({x: a.pageX, y: a.pageY}), this.updatePositions()
			}, this), 30)
		}, clearTrackingTimer: function () {
			this._tracking_timer && (clearTimeout(this._tracking_timer), this._tracking_timer = null)
		}, startTracking: function () {
			Support.mobileTouch || this._handleTracking || $(document.documentElement).on("mousemove", this._handleTracking = $.proxy(this.handleTracking, this))
		}, stopTracking: function () {
			!Support.mobileTouch && this._handleTracking && ($(document.documentElement).off("mousemove", this._handleTracking), this._handleTracking = null, this.clearTrackingTimer())
		}, setTracking: function (a) {
			this.isTracking(a) || (this._tracking.push(this.pages[a - 1]), 1 == this._tracking.length && this.startTracking())
		}, clearTracking: function () {
			this._tracking = []
		}, removeTracking: function (a) {
			this._tracking = $.grep(this._tracking, function (b) {
				return b._position != a
			}), this._tracking.length < 1 && this.stopTracking()
		}, isTracking: function (a) {
			var b = !1;
			return $.each(this._tracking, function (c, d) {
				return d._position == a ? (b = !0, !1) : void 0
			}), b
		}, setXY: function (a) {
			this._xy = a
		}, getXYP: function (a) {
			var b = Pages.page, c = $.extend({}, Window._boxDimensions), a = $.extend({}, this._xy);
			a.y -= $(window).scrollTop(), b && ("outside" == b._ui || "fullclick" == b._ui) && b._infoHeight > 0 && (c.height -= b._infoHeight), a.y -= Window._boxPosition.top;
			var d = {x: 0, y: Math.min(Math.max(a.y / c.height, 0), 1)}, e = 20, f = {x: "width", y: "height"}, g = {};
			return $.each("y".split(" "), $.proxy(function (a, b) {
				g[b] = Math.min(Math.max(e / c[f[b]], 0), 1), d[b] *= 1 + 2 * g[b], d[b] -= g[b], d[b] = Math.min(Math.max(d[b], 0), 1)
			}, this)), this.setXYP(d), this._xyp
		}, setXYP: function (a) {
			this._xyp = a
		}, updatePositions: function () {
			this._tracking.length < 1 || $.each(this._tracking, function (a, b) {
				b.position()
			})
		}
	};
	$.extend(View.prototype, {
		initialize: function (object) {
			var options = arguments[1] || {}, data = {};
			if ("string" == $.type(object))object = {url: object}; else if (object && 1 == object.nodeType) {
				var element = $(object);
				object = {
					element: element[0],
					url: element.attr("href"),
					caption: element.data("fresco-caption"),
					group: element.data("fresco-group"),
					extension: element.data("fresco-extension"),
					type: element.data("fresco-type"),
					options: element.data("fresco-options") && eval("({" + element.data("fresco-options") + "})") || {}
				}
			}
			if (object && (object.extension || (object.extension = detectExtension(object.url)), !object.type)) {
				var data = getURIData(object.url);
				object._data = data, object.type = data.type
			}
			return object._data || (object._data = getURIData(object.url)), object && object.options ? object.options = $.extend(!0, $.extend({}, options), $.extend({}, object.options)) : object.options = $.extend({}, options), object.options = Options.create(object.options, object.type, object._data), $.extend(this, object), this
		}
	});
	var Spinner = {
		supported: Support.css.transform && Support.css.animation, initialize: function (a) {
			this.element = $("<div>").addClass("fr-spinner").hide();
			for (var b = 1; 12 >= b; b++)this.element.append($("<div>").addClass("fr-spin-" + b));
			this.element.on("click", $.proxy(function () {
				Window.hide()
			}, this)), this.element.on("fresco:mousewheel", function (a) {
				a.preventDefault()
			})
		}, setSkin: function (a) {
			this.supported && (this._skin && this.element.removeClass("fr-spinner-skin-" + this._skin), this.updateDimensions(), this.element.addClass("fr-spinner-skin-" + a), this._skin = a)
		}, updateDimensions: function () {
			var a = this._attached;
			a || this.attach(), this._dimensions = {
				width: this.element.outerWidth(),
				height: this.element.outerHeight()
			}, a || this.detach()
		}, attach: function () {
			this._attached || ($(document.body).append(this.element), this._attached = !0)
		}, detach: function () {
			this._attached && (this.element.detach(), this._attached = !1)
		}, show: function (a, b) {
			this._visible = !0, this.attach(), this.center();
			var c = Pages.page && Pages.page.view.options.effects.spinner.show || 0, d = ("number" == $.type(b) ? b : c) || 0;
			this.element.stop(!0).fadeTo(d, 1, a)
		}, hide: function (a, b, c) {
			this._visible = !1;
			var d = Pages.page && Pages.page.view.options.effects.spinner.hide || 0, e = ("number" == $.type(b) ? b : d) || 0;
			this.element.stop(!0).fadeOut(e || 0, $.proxy(function () {
				this.detach(), a && a()
			}, this))
		}, center: function () {
			if (this.supported) {
				this._dimensions || this.updateDimensions();
				var a = Pages.page, b = 0;
				a && "fullclick" == a._ui && a._whileVisible(function () {
					b = a._getInfoHeight(Window._boxDimensions.width)
				}), this.element.css({
					top: Window._boxPosition.top + .5 * Window._boxDimensions.height - .5 * this._dimensions.height - .5 * b,
					left: Window._boxPosition.left + .5 * Window._boxDimensions.width - .5 * this._dimensions.width
				})
			}
		}
	}, _Fresco = {
		_disabled: !1, _fallback: !0, initialize: function () {
			Window.initialize(), this._disabled || this.startDelegating()
		}, startDelegating: function () {
			this._delegateHandler || $(document.documentElement).on("click", ".fresco[href]", this._delegateHandler = $.proxy(this.delegate, this)).on("click", this._setClickXYHandler = $.proxy(this.setClickXY, this))
		}, stopDelegating: function () {
			this._delegateHandler && ($(document.documentElement).off("click", ".fresco[href]", this._delegateHandler).off("click", this._setClickXYHandler), this._setClickXYHandler = null, this._delegateHandler = null)
		}, setClickXY: function (a) {
			Pages.setXY({x: a.pageX, y: a.pageY})
		}, delegate: function (a) {
			if (!this._disabled) {
				a.stopPropagation(), a.preventDefault();
				var b = a.currentTarget;
				this.setClickXY(a), _Fresco.show(b)
			}
		}, show: function (object) {
			if (this._disabled)return void this.showFallback.apply(_Fresco, _slice.call(arguments));
			var options = arguments[1] || {}, position = arguments[2];
			arguments[1] && "number" == $.type(arguments[1]) && (position = arguments[1], options = {});
			var views = [], object_type, isElement = _.isElement(object);
			switch (object_type = $.type(object)) {
				case"string":
				case"object":
					var view = new View(object, options), _dgo = "data-fresco-group-options";
					if (view.group) {
						if (isElement) {
							var elements = $('.fresco[data-fresco-group="' + $(object).data("fresco-group") + '"]'), groupOptions = {};
							elements.filter("[" + _dgo + "]").each(function (i, element) {
								$.extend(groupOptions, eval("({" + ($(element).attr(_dgo) || "") + "})"))
							}), elements.each(function (a, b) {
								position || b != object || (position = a + 1), views.push(new View(b, $.extend({}, groupOptions, options)))
							})
						}
					} else {
						var groupOptions = {};
						isElement && $(object).is("[" + _dgo + "]") && ($.extend(groupOptions, eval("({" + ($(object).attr(_dgo) || "") + "})")), view = new View(object, $.extend({}, groupOptions, options))), views.push(view)
					}
					break;
				case"array":
					$.each(object, function (a, b) {
						var c = new View(b, options);
						views.push(c)
					})
			}
			var groupExtend = {grouped: {caption: !1}}, firstUI = views[0].options.ui;
			$.each(views, function (a, b) {
				b.caption && (groupExtend.grouped.caption = !0), a > 0 && b.options.ui != firstUI && (b.options.ui = firstUI)
			}), $.each(views, function (a, b) {
				b = $.extend(b, groupExtend)
			}), (!position || 1 > position) && (position = 1), position > views.length && (position = views.length);
			var positionInAPG;
			isElement && (positionInAPG = Pages.getPositionInActivePageGroup(object)) ? Window.setPosition(positionInAPG) : Window.load(views, position)
		}, showFallback: function () {
			function a(b) {
				var c, d = $.type(b);
				if ("string" == d)c = b; else if ("array" == d && b[0])c = a(b[0]); else if (_.isElement(b) && $(b).attr("href"))var c = $(b).attr("href"); else c = b.url ? b.url : !1;
				return c
			}

			return function (b) {
				if (this._fallback) {
					var c = a(b);
					c && (window.location.href = c)
				}
			}
		}()
	};
	$.extend(Fresco, {
		show: function (a) {
			return _Fresco.show.apply(_Fresco, _slice.call(arguments)), this
		}, hide: function () {
			return Window.hide(), this
		}, disable: function () {
			return _Fresco.stopDelegating(), _Fresco._disabled = !0, this
		}, enable: function () {
			return _Fresco._disabled = !1, _Fresco.startDelegating(), this
		}, fallback: function (a) {
			return _Fresco._fallback = a, this
		}, setDefaultSkin: function (a) {
			return Options.defaults.skin = a, this
		}
	}), (Browser.IE && Browser.IE < 7 || "number" == $.type(Browser.Android) && Browser.Android < 3 || Browser.MobileSafari && "number" == $.type(Browser.WebKit) && Browser.WebKit < 533.18) && (_Fresco.show = _Fresco.showFallback);
	var Thumbnails = {
		initialize: function (a) {
			this.element = a, this._thumbnails = [], this._orientation = "vertical", this._vars = {
				thumbnail: {},
				thumbnailFrame: {},
				thumbnails: {}
			}, this.build(), this.startObserving()
		}, build: function () {
			this.element.append(this.wrapper = $("<div>").addClass("fr-thumbnails-wrapper").append(this._slider = $("<div>").addClass("fr-thumbnails-slider").append(this._previous = $("<div>").addClass("fr-thumbnails-side fr-thumbnails-side-previous").append(this._previous_button = $("<div>").addClass("fr-thumbnails-side-button").append($("<div>").addClass("fr-thumbnails-side-button-background")).append($("<div>").addClass("fr-thumbnails-side-button-icon")))).append(this._thumbs = $("<div>").addClass("fr-thumbnails-thumbs").append(this._slide = $("<div>").addClass("fr-thumbnails-slide"))).append(this._next = $("<div>").addClass("fr-thumbnails-side fr-thumbnails-side-next").append(this._next_button = $("<div>").addClass("fr-thumbnails-side-button").append($("<div>").addClass("fr-thumbnails-side-button-background")).append($("<div>").addClass("fr-thumbnails-side-button-icon"))))))
		}, startObserving: function () {
			this._slider.delegate(".fr-thumbnail", "click", $.proxy(function (a) {
				a.stopPropagation();
				var b = $(a.target).closest(".fr-thumbnail")[0], c = b && $(b).data("fr-position");
				c && (this.setActive(c), Window.setPosition(c))
			}, this)), this._slider.bind("click", function (a) {
				a.stopPropagation()
			}), this._previous.bind("click", $.proxy(this.previousPage, this)), this._next.bind("click", $.proxy(this.nextPage, this))
		}, load: function (a) {
			this.clear();
			var b = "horizontal", c = !1;
			$.each(a, $.proxy(function (a, d) {
				"vertical" == d.options.thumbnails && (b = "vertical"), d.options.thumbnails || (c = !0)
			}, this)), this.setOrientation(b), this._disabledGroup = c, $.each(a, $.proxy(function (a, b) {
				this._thumbnails.push(new Thumbnail(b, a + 1))
			}, this)), this.fitToViewport()
		}, clear: function () {
			$.each(this._thumbnails, function (a, b) {
				b.remove()
			}), this._thumbnails = [], this._position = -1, this._page = -1
		}, setOrientation: function (a) {
			this._orientation && Window.element.removeClass("fr-thumbnails-" + this._orientation), Window.element.addClass("fr-thumbnails-" + a), this._orientation = a
		}, disable: function () {
			Window.element.removeClass("fr-thumbnails-enabled").addClass("fr-thumbnails-disabled"), this._disabled = !0
		}, enable: function () {
			Window.element.removeClass("fr-thumbnails-disabled").addClass("fr-thumbnails-enabled"), this._disabled = !1
		}, enabled: function () {
			return !this._disabled
		}, disabled: function () {
			return this._disabled
		}, updateVars: function () {
			var a = Window.element, b = this._vars, c = this._orientation, d = "horizontal" == c, e = d ? "top" : "left", f = d ? "left" : "top", g = d ? "bottom" : "left", h = d ? "top" : "right", i = d ? "width" : "height", j = d ? "height" : "width", k = {
				left: "right",
				right: "left",
				top: "bottom",
				bottom: "top"
			};
			this.element.removeClass("fr-thumbnails-measured");
			var l = a.is(":visible");
			if (l || a.show(), this.disabled() && this.enable(), !this.element.is(":visible") || this._thumbnails.length < 2 || this._disabledGroup)return this.disable(), $.extend(this._vars.thumbnails, {
				width: 0,
				height: 0
			}), l || a.hide(), void this.element.addClass("fr-thumbnails-measured");
			this.enable();
			var m = this._previous, n = this._next, o = this._thumbs, p = Bounds.viewport(), q = this.element["inner" + _.String.capitalize(j)](), r = parseInt(this._thumbs.css("padding-" + e)) || 0, s = Math.max(q - 2 * r, 0), t = parseInt(this._thumbs.css("padding-" + f)) || 0, u = (parseInt(this.element.css("margin-" + g)) || 0) + (parseInt(this.element.css("margin-" + h)) || 0);
			$.extend(b.thumbnails, {
				height: q + u,
				width: p[d ? "width" : "height"],
				paddingTop: r
			}), $.extend(b.thumbnail, {height: s, width: s}), $.extend(b.thumbnailFrame, {
				width: s + 2 * t,
				height: q
			}), b.sides = {
				previous: {
					width: n["inner" + _.String.capitalize(i)](),
					marginLeft: parseInt(m.css("margin-" + f)) || 0,
					marginRight: parseInt(m.css("margin-" + k[f])) || 0
				},
				next: {
					width: n["inner" + _.String.capitalize(i)](),
					marginLeft: parseInt(n.css("margin-" + f)) || 0,
					marginRight: parseInt(n.css("margin-" + k[f])) || 0
				}
			};
			var v = p[i], w = b.thumbnailFrame.width, o = this._thumbnails.length;
			b.thumbnails.width = v, b.sides.enabled = o * w / v > 1;
			var x = v, y = b.sides, z = y.previous, A = y.next, B = z.marginLeft + z.width + z.marginRight + A.marginLeft + A.width + A.marginRight;
			b.sides.enabled && (x -= B), x = Math.floor(x / w) * w;
			var C = o * w;
			x > C && (x = C);
			var D = x + (b.sides.enabled ? B : 0);
			b.ipp = x / w, this._mode = "page", b.ipp <= 1 && (x = v, D = v, b.sides.enabled = !1, this._mode = "center"), b.pages = Math.ceil(o * w / x), b.wrapper = {
				width: D + 1,
				height: q
			}, b.thumbs = {width: x, height: q}, b.slide = {
				width: o * w + 1,
				height: q
			}, l || a.hide(), this.element.addClass("fr-thumbnails-measured")
		}, hide: function () {
			this.disable(), this.thumbnails.hide(), this._visible = !1
		}, getDimensions: function () {
			var a = "horizontal" == this._orientation;
			return {
				width: a ? this._vars.thumbnails.width : this._vars.thumbnails.height,
				height: a ? this._vars.thumbnails.height : this._vars.thumbnails.width
			}
		}, fitToViewport: function () {
			if (this.updateVars(), !this.disabled()) {
				var a = $.extend({}, this._vars), b = "horizontal" == this._orientation;
				$.each(this._thumbnails, function (a, b) {
					b.resize()
				}), this._previous[a.sides.enabled ? "show" : "hide"](), this._next[a.sides.enabled ? "show" : "hide"](), this._thumbs.css({
					width: a.thumbs[b ? "width" : "height"],
					height: a.thumbs[b ? "height" : "width"]
				}), this._slide.css({width: a.slide[b ? "width" : "height"], height: a.slide[b ? "height" : "width"]});
				var c = {width: a.wrapper[b ? "width" : "height"], height: a.wrapper[b ? "height" : "width"]};
				c["margin-" + (b ? "left" : "top")] = Math.round(-.5 * a.wrapper.width) + "px", c["margin-" + (b ? "top" : "left")] = 0, this.wrapper.css(c), this._position && this.moveTo(this._position, !0)
			}
		}, moveToPage: function (a) {
			if (!(1 > a || a > this._vars.pages || a == this._page)) {
				var b = this._vars.ipp * (a - 1) + 1;
				this.moveTo(b)
			}
		}, previousPage: function () {
			this.moveToPage(this._page - 1)
		}, nextPage: function () {
			this.moveToPage(this._page + 1)
		}, show: function (a) {
			var b = this._position < 0;
			1 > a && (a = 1);
			var c = this._thumbnails.length;
			a > c && (a = c), this._position = a, this.setActive(a), ("page" != this._mode || this._page != Math.ceil(a / this._vars.ipp)) && this.moveTo(a, b)
		}, moveTo: function (a, b) {
			if (this.updateVars(), !this.disabled()) {
				var c, d = "horizontal" == this._orientation, e = Bounds.viewport()[d ? "width" : "height"], f = .5 * e, g = this._vars.thumbnailFrame.width;
				if ("page" == this._mode) {
					var h = Math.ceil(a / this._vars.ipp);
					this._page = h, c = -1 * (g * (this._page - 1) * this._vars.ipp);
					var i = "fr-thumbnails-side-button-disabled";
					this._previous_button[(2 > h ? "add" : "remove") + "Class"](i), this._next_button[(h >= this._vars.pages ? "add" : "remove") + "Class"](i)
				} else c = f + -1 * (g * (a - 1) + .5 * g);
				var h = Pages.page, j = {}, k = {};
				j[d ? "top" : "left"] = 0, k[d ? "left" : "top"] = c + "px", this._slide.stop(!0).css(j).animate(k, b ? 0 : h ? h.view.options.effects.thumbnails.slide || 0 : 0, $.proxy(function () {
					this.loadCurrentPage()
				}, this))
			}
		}, loadCurrentPage: function () {
			var a, b;
			if (this._position && this._vars.thumbnailFrame.width && !(this._thumbnails.length < 1)) {
				if ("page" == this._mode) {
					if (this._page < 1)return;
					a = (this._page - 1) * this._vars.ipp + 1, b = Math.min(a - 1 + this._vars.ipp, this._thumbnails.length)
				} else {
					var c = ("horizontal" == this._orientation, Math.ceil(this._vars.thumbnails.width / this._vars.thumbnailFrame.width));
					a = Math.max(Math.floor(Math.max(this._position - .5 * c, 0)), 1), b = Math.ceil(Math.min(this._position + .5 * c)), this._thumbnails.length < b && (b = this._thumbnails.length)
				}
				for (var d = a; b >= d; d++)this._thumbnails[d - 1].load()
			}
		}, setActive: function (a) {
			this._slide.find(".fr-thumbnail-active").removeClass("fr-thumbnail-active");
			var b = a && this._thumbnails[a - 1];
			b && b.activate()
		}, refresh: function () {
			this._position && this.setPosition(this._position)
		}
	};
	$.extend(Thumbnail.prototype, {
		initialize: function (a, b) {
			this.view = a, this._dimension = {}, this._position = b, this.preBuild()
		}, preBuild: function () {
			this.thumbnail = $("<div>").addClass("fr-thumbnail").data("fr-position", this._position)
		}, build: function () {
			if (!this.thumbnailFrame) {
				var a = this.view.options;
				Thumbnails._slide.append(this.thumbnailFrame = $("<div>").addClass("fr-thumbnail-frame").append(this.thumbnail.append(this.thumbnailWrapper = $("<div>").addClass("fr-thumbnail-wrapper")))), "image" == this.view.type && this.thumbnail.addClass("fr-load-thumbnail").data("thumbnail", {
					view: this.view,
					src: a.thumbnail || this.view.url
				});
				var b = a.thumbnail && a.thumbnail.icon;
				b && this.thumbnail.append($("<div>").addClass("fr-thumbnail-icon fr-thumbnail-icon-" + b));
				var c;
				this.thumbnail.append(c = $("<div>").addClass("fr-thumbnail-overlay").append($("<div>").addClass("fr-thumbnail-overlay-background")).append(this.loading = $("<div>").addClass("fr-thumbnail-loading").append($("<div>").addClass("fr-thumbnail-loading-background")).append(this.spinner = $("<div>").addClass("fr-thumbnail-spinner").hide().append($("<div>").addClass("fr-thumbnail-spinner-spin")))).append($("<div>").addClass("fr-thumbnail-overlay-border"))), this.thumbnail.append($("<div>").addClass("fr-thumbnail-state")), this.resize()
			}
		}, remove: function () {
			this.thumbnailFrame && (this.thumbnailFrame.remove(), this.thumbnailFrame = null, this.image = null), this.ready && (this.ready.abort(), this.ready = null), this.vimeoThumbnail && (this.vimeoThumbnail.abort(), this.vimeoThumbnail = null), this._loading = !1, this._removed = !0, this.view = null, this._clearDelay()
		}, load: function () {
			if (!(this._loaded || this._loading || this._removed)) {
				this.thumbnailWrapper || this.build(), this._loading = !0;
				var a = this.view.options.thumbnail, b = a && "boolean" == $.type(a) ? this.view.url : a || this.view.url;
				if (this._url = b, b)if ("vimeo" == this.view.type)if (b == a)this._url = b, this._load(this._url); else switch (this.view.type) {
					case"vimeo":
						this.vimeoThumbnail = new VimeoThumbnail(this.view.url, $.proxy(function (a) {
							this._url = a, this._load(a)
						}, this), $.proxy(function () {
							this._error()
						}, this))
				} else this._load(this._url)
			}
		}, activate: function () {
			this.thumbnail.addClass("fr-thumbnail-active")
		}, _load: function (a) {
			this.thumbnailWrapper.prepend(this.image = $("<img>").addClass("fr-thumbnail-image").attr({src: a}).css({opacity: 1e-4})), this.fadeInSpinner(), this.ready = new ImageReady(this.image[0], $.proxy(function (a) {
				var b = a.img;
				this.thumbnailFrame && this._loading && (this._loaded = !0, this._loading = !1, this._dimensions = {
					width: b.naturalWidth,
					height: b.naturalHeight
				}, this.resize(), this.show())
			}, this), $.proxy(function () {
				this._error()
			}, this), {method: this.view.options.loadedMethod})
		}, _error: function () {
			this._loaded = !0, this._loading = !1, this.thumbnail.addClass("fr-thumbnail-error"), this.image.hide(), this.thumbnailWrapper.append($("<div>").addClass("fr-thumbnail-image")), this.show()
		}, fadeInSpinner: function () {
			if (Spinner.supported && this.view.options.spinner) {
				this._clearDelay();
				var a = this.view.options.effects.thumbnail;
				this._delay = setTimeout($.proxy(function () {
					this.spinner.stop(!0).fadeTo(a.show || 0, 1)
				}, this), this.view.options.spinnerDelay || 0)
			}
		}, show: function () {
			this._clearDelay();
			var a = this.view.options.effects.thumbnail;
			this.loading.stop(!0).delay(a.delay).fadeTo(a.show, 0)
		}, _clearDelay: function () {
			this._delay && (clearTimeout(this._delay), this._delay = null)
		}, resize: function () {
			if (this.thumbnailFrame) {
				var a = "horizontal" == Thumbnails._orientation;
				if (this.thumbnailFrame.css({
						width: Thumbnails._vars.thumbnailFrame[a ? "width" : "height"],
						height: Thumbnails._vars.thumbnailFrame[a ? "height" : "width"]
					}), this.thumbnailFrame.css({
						top: a ? 0 : Thumbnails._vars.thumbnailFrame.width * (this._position - 1),
						left: a ? Thumbnails._vars.thumbnailFrame.width * (this._position - 1) : 0
					}), this.thumbnailWrapper) {
					var b = Thumbnails._vars.thumbnail;
					if (this.thumbnail.css({
							width: b.width,
							height: b.height,
							"margin-top": Math.round(-.5 * b.height),
							"margin-left": Math.round(-.5 * b.width),
							"margin-bottom": 0,
							"margin-right": 0
						}), this._dimensions) {
						var c, d = {
							width: b.width,
							height: b.height
						}, e = Math.max(d.width, d.height), f = $.extend({}, this._dimensions);
						if (f.width > d.width && f.height > d.height) {
							c = Fit.within(d, f);
							var g = 1, h = 1;
							c.width < d.width && (g = d.width / c.width), c.height < d.height && (h = d.height / c.height);
							var i = Math.max(g, h);
							i > 1 && (c.width *= i, c.height *= i), $.each("width height".split(" "), function (a, b) {
								c[b] = Math.round(c[b])
							})
						} else c = Fit.within(this._dimensions, f.width < d.width || f.height < d.height ? {
							width: e,
							height: e
						} : d);
						var j = Math.round(.5 * d.width - .5 * c.width), k = Math.round(.5 * d.height - .5 * c.height);
						this.image.removeAttr("style").css($.extend({}, c, {top: k, left: j}))
					}
				}
			}
		}
	});
	var UI = {
		_modes: ["fullclick", "outside", "inside"],
		_ui: !1,
		_validClickTargetSelector: [".fr-content-element", ".fr-content", ".fr-content > .fr-stroke", ".fr-content > .fr-stroke .fr-stroke-color"].join(", "),
		initialize: function (a) {
			$.each(this._modes, $.proxy(function (a, b) {
				this[b].initialize()
			}, this)), Window.element.addClass("fr-ui-inside-hidden fr-ui-fullclick-hidden")
		},
		set: function (a) {
			this._ui && (Window.element.removeClass("fr-window-ui-" + this._ui), Overlay.element.removeClass("fr-overlay-ui-" + this._ui)), Window.element.addClass("fr-window-ui-" + a), Overlay.element.addClass("fr-overlay-ui-" + a), this._enabled && this._ui && this._ui != a && (this[this._ui].disable(), this[a].enable(), UI[a].show()), this._ui = a
		},
		_onWindowResize: function () {
			Support.mobileTouch && this.show()
		},
		enable: function () {
			$.each(this._modes, $.proxy(function (a, b) {
				UI[b][b == this._ui ? "enable" : "disable"]()
			}, this)), this._enabled = !0
		},
		disable: function () {
			$.each(this._modes, $.proxy(function (a, b) {
				UI[b].disable()
			}, this)), this._enabled = !1
		},
		adjustPrevNext: function (a, b) {
			UI[this._ui].adjustPrevNext(a, b)
		},
		show: function (a, b) {
			UI[this._ui].show(a, b)
		},
		hide: function (a, b) {
			UI[this._ui].hide(a, b)
		},
		reset: function () {
			$.each(this._modes, $.proxy(function (a, b) {
				UI[b].reset()
			}, this))
		},
		update: function () {
			var a = Pages.page;
			a && this.set(a._ui)
		}
	};
	return UI.fullclick = {
		initialize: function () {
			this.build(), this._scrollLeft = -1
		}, build: function () {
			Window._box.append(this._previous = $("<div>").addClass("fr-side fr-side-previous fr-side-previous-fullclick fr-toggle-ui").append($("<div>").addClass("fr-side-button").append($("<div>").addClass("fr-side-button-background")).append($("<div>").addClass("fr-side-button-icon")))).append(this._next = $("<div>").addClass("fr-side fr-side-next fr-side-next-fullclick fr-toggle-ui").append($("<div>").addClass("fr-side-button").append($("<div>").addClass("fr-side-button-background")).append($("<div>").addClass("fr-side-button-icon")))).append(this._close = $("<div>").addClass("fr-close fr-close-fullclick").append($("<div>").addClass("fr-close-background")).append($("<div>").addClass("fr-close-icon"))), Browser.IE && Browser.IE <= 7 && this._previous.add(this._next).add(this._close).hide(), this._close.on("click", $.proxy(function (a) {
				a.preventDefault(), Window.hide()
			}, this)), this._previous.on("click", $.proxy(function (a) {
				Window.previous(), this._onMouseMove(a)
			}, this)), this._next.on("click", $.proxy(function (a) {
				Window.next(), this._onMouseMove(a)
			}, this))
		}, enable: function () {
			this.bind()
		}, disable: function () {
			this.unbind()
		}, reset: function () {
			Window.timers.clear("ui-fullclick"), this._x = -1, this._y = -1, this._scrollLeft = -1, this.resetPrevNext(), this._onMouseLeave()
		}, resetPrevNext: function () {
			var a = this._previous.add(this._next);
			a.stop(!0).removeAttr("style")
		}, bind: function () {
			this._onMouseUpHandler || (this.unbind(), Window._pages.on("mouseup", ".fr-container", this._onMouseUpHandler = $.proxy(this._onMouseUp, this)), Support.mobileTouch || (Window.element.on("mouseenter", this._showHandler = $.proxy(this.show, this)).on("mouseleave", this._hideHandler = $.proxy(this.hide, this)), Window.element.on("mousemove", this._mousemoveHandler = $.proxy(function (a) {
				var b = a.pageX, c = a.pageY;
				this._hoveringSideButton || c == this._y && b == this._x || (this._x = b, this._y = c, this.show(), this.startTimer())
			}, this)), Window._pages.on("mousemove", ".fr-container", this._onMouseMoveHandler = $.proxy(this._onMouseMove, this)).on("mouseleave", ".fr-container", this._onMouseLeaveHandler = $.proxy(this._onMouseLeave, this)).on("mouseenter", ".fr-container", this._onMouseEnterHandler = $.proxy(this._onMouseEnter, this)), Window.element.on("mouseenter", ".fr-side", this._onSideMouseEnterHandler = $.proxy(this._onSideMouseEnter, this)).on("mouseleave", ".fr-side", this._onSideMouseLeaveHandler = $.proxy(this._onSideMouseLeave, this)), $(window).on("scroll", this._onScrollHandler = $.proxy(this._onScroll, this))))
		}, unbind: function () {
			this._onMouseUpHandler && (Window._pages.off("mouseup", ".fr-container", this._onMouseUpHandler), this._onMouseUpHandler = null, this._showHandler && (Window.element.off("mouseenter", this._showHandler).off("mouseleave", this._hideHandler).off("mousemove", this._mousemoveHandler), Window._pages.off("mousemove", ".fr-container", this._onMouseMoveHandler).off("mouseleave", ".fr-container", this._onMouseLeaveHandler).off("mouseenter", ".fr-container", this._onMouseEnterHandler), Window.element.off("mouseenter", ".fr-side", this._onSideMouseEnterHandler).off("mouseleave", ".fr-side", this._onSideMouseLeaveHandler), $(window).off("scroll", this._onScrollHandler), this._showHandler = null))
		}, adjustPrevNext: function (a, b) {
			var c = Pages.page;
			if (!c)return void(a && a());
			var d = Window.element.is(":visible");
			d || Window.element.show();
			var e = this._previous.attr("style");
			this._previous.removeAttr("style");
			var f = parseInt(this._previous.css("margin-top"));
			this._previous.attr({style: e}), d || Window.element.hide();
			var g = c._infoHeight || 0, h = this._previous.add(this._next), i = {"margin-top": f - .5 * g}, j = "number" == $.type(b) ? b : Pages.page && Pages.page.view.options.effects.content.show || 0;
			this.opening && (j = 0), h.stop(!0).animate(i, j, a), this._previous[(Window.mayPrevious() ? "remove" : "add") + "Class"]("fr-side-disabled"), this._next[(Window.mayNext() ? "remove" : "add") + "Class"]("fr-side-disabled"), h[(c._total < 2 ? "add" : "remove") + "Class"]("fr-side-hidden"), a && a()
		}, _onScroll: function () {
			this._scrollLeft = $(window).scrollLeft()
		}, _onMouseMove: function (a) {
			if (!Support.mobileTouch) {
				var b = this._getEventSide(a), c = _.String.capitalize(b), d = b ? Window["may" + c]() : !1;
				if (b != this._hoveringSide || d != this._mayClickHoveringSide)switch (this._hoveringSide = b, this._mayClickHoveringSide = d, Window._box[(d ? "add" : "remove") + "Class"]("fr-hovering-clickable"), b) {
					case"previous":
						Window._box.addClass("fr-hovering-previous").removeClass("fr-hovering-next");
						break;
					case"next":
						Window._box.addClass("fr-hovering-next").removeClass("fr-hovering-previous")
				}
			}
		}, _onMouseLeave: function (a) {
			Window._box.removeClass("fr-hovering-clickable fr-hovering-previous fr-hovering-next"), this._hoveringSide = !1
		}, _onMouseUp: function (a) {
			if (!(a.which > 1)) {
				if (1 == Pages.pages.length)return void Window.hide();
				var b = this._getEventSide(a);
				Window[b](), this._onMouseMove(a)
			}
		}, _onMouseEnter: function (a) {
			this._onMouseMove(a)
		}, _getEventSide: function (a) {
			var b = (this._scrollLeft > -1 ? this._scrollLeft : this._scrollLeft = $(window).scrollLeft(), a.pageX - Window._boxPosition.left - this._scrollLeft), c = Window._boxDimensions.width;
			return .5 * c > b ? "previous" : "next"
		}, _onSideMouseEnter: function (a) {
			this._hoveringSideButton = !0, this._hoveringSide = this._getEventSide(a), this._mayClickHoveringSide = Window["may" + _.String.capitalize(this._hoveringSide)](), this.clearTimer()
		}, _onSideMouseLeave: function (a) {
			this._hoveringSideButton = !1, this._hoveringSide = !1, this._mayClickHoveringSide = !1, this.startTimer()
		}, show: function (a) {
			return this._visible ? (this.startTimer(), void("function" == $.type(a) && a())) : (this._visible = !0, this.startTimer(), Window.element.addClass("fr-visible-fullclick-ui").removeClass("fr-hidden-fullclick-ui"), Browser.IE && Browser.IE <= 7 && this._previous.add(this._next).add(this._close).show(), void("function" == $.type(a) && a()))
		}, hide: function (a) {
			var b = Pages.page && Pages.page.view.type;
			return !this._visible || b && ("youtube" == b || "vimeo" == b) ? void("function" == $.type(a) && a()) : (this._visible = !1, Window.element.removeClass("fr-visible-fullclick-ui").addClass("fr-hidden-fullclick-ui"), void("function" == $.type(a) && a()))
		}, clearTimer: function () {
			Support.mobileTouch || Window.timers.clear("ui-fullclick")
		}, startTimer: function () {
			Support.mobileTouch || (this.clearTimer(), Window.timers.set("ui-fullclick", $.proxy(function () {
				this.hide()
			}, this), Window.view ? Window.view.options.uiDelay : 0))
		}
	}, UI.inside = {
		initialize: function () {
		}, enable: function () {
			this.bind()
		}, disable: function () {
			this.unbind()
		}, bind: function () {
			this._onMouseUpHandler || (this.unbind(), Window._pages.on("mouseup", ".fr-content", this._onMouseUpHandler = $.proxy(this._onMouseUp, this)), Window._pages.on("click", ".fr-content .fr-close", $.proxy(function (a) {
				a.preventDefault(), Window.hide()
			}, this)).on("click", ".fr-content .fr-side-previous", $.proxy(function (a) {
				Window.previous(), this._onMouseMove(a)
			}, this)).on("click", ".fr-content .fr-side-next", $.proxy(function (a) {
				Window.next(), this._onMouseMove(a)
			}, this)), Window.element.on("click", ".fr-container, .fr-thumbnails, .fr-thumbnails-wrapper", this._delegateOverlayCloseHandler = $.proxy(this._delegateOverlayClose, this)), Support.mobileTouch || (Window.element.on("mouseenter", ".fr-content", this._showHandler = $.proxy(this.show, this)).on("mouseleave", ".fr-content", this._hideHandler = $.proxy(this.hide, this)), Window.element.on("mousemove", ".fr-content", this._mousemoveHandler = $.proxy(function (a) {
				var b = a.pageX, c = a.pageY;
				this._hoveringSideButton || c == this._y && b == this._x || (this._x = b, this._y = c, this.show(), this.startTimer())
			}, this)), Window._pages.on("mousemove", ".fr-info, .fr-close", $.proxy(function (a) {
				a.stopPropagation(), this._onMouseLeave(a)
			}, this)), Window._pages.on("mousemove", ".fr-info", $.proxy(function (a) {
				this.clearTimer()
			}, this)), Window._pages.on("mousemove", ".fr-content", this._onMouseMoveHandler = $.proxy(this._onMouseMove, this)).on("mouseleave", ".fr-content", this._onMouseLeaveHandler = $.proxy(this._onMouseLeave, this)).on("mouseenter", ".fr-content", this._onMouseEnterHandler = $.proxy(this._onMouseEnter, this)), Window.element.on("mouseenter", ".fr-side", this._onSideMouseEnterHandler = $.proxy(this._onSideMouseEnter, this)).on("mouseleave", ".fr-side", this._onSideMouseLeaveHandler = $.proxy(this._onSideMouseLeave, this)), $(window).on("scroll", this._onScrollHandler = $.proxy(this._onScroll, this))))
		}, unbind: function () {
			this._onMouseUpHandler && (Window._pages.off("mouseup", ".fr-content", this._onMouseUpHandler), this._onMouseUpHandler = null, Window._pages.off("click", ".fr-content .fr-close").off("click", ".fr-content .fr-side-previous").off("click", ".fr-content .fr-side-next"), Window.element.off("click", ".fr-container, .fr-thumbnails, .fr-thumbnails-wrapper", this._delegateOverlayCloseHandler), this._showHandler && (Window.element.off("mouseenter", ".fr-content", this._showHandler).off("mouseleave", ".fr-content", this._hideHandler).off("mousemove", ".fr-content", this._mousemoveHandler), Window._pages.off("mousemove", ".fr-info, .fr-close"), Window._pages.off("mousemove", ".fr-info"), Window._pages.off("mousemove", ".fr-content-element", this._onMouseMoveHandler).off("mouseleave", ".fr-content", this._onMouseLeaveHandler).off("mouseenter", ".fr-content", this._onMouseEnterHandler), Window.element.off("mouseenter", ".fr-side", this._onSideMouseEnterHandler).off("mouseleave", ".fr-side", this._onSideMouseLeaveHandler), $(window).off("scroll", this._onScrollHandler), this._showHandler = null))
		}, reset: function () {
			Window.timers.clear("ui-fullclick"), this._x = -1, this._y = -1, this._scrollLeft = -1, this._hoveringSide = !1, this._onMouseLeave()
		}, adjustPrevNext: function (a) {
			a && a()
		}, _onScroll: function () {
			this._scrollLeft = $(window).scrollLeft()
		}, _delegateOverlayClose: function (a) {
			var b = Pages.page;
			b && b.view.options.overlay && !b.view.options.overlay.close || $(a.target).is(".fr-container, .fr-thumbnails, .fr-thumbnails-wrapper") && (a.preventDefault(), a.stopPropagation(), Window.hide())
		}, _onMouseMove: function (a) {
			if (!Support.mobileTouch) {
				var b = this._getEventSide(a), c = _.String.capitalize(b), d = b ? Window["may" + c]() : !1;
				if ((1 == Pages.pages.length || Pages.page && "close" == Pages.page.view.options.onClick) && (b = !1), b != this._hoveringSide || d != this._mayClickHoveringSide)if (this._hoveringSide = b, this._mayClickHoveringSide = d, b)switch (Window._box[(d ? "add" : "remove") + "Class"]("fr-hovering-clickable"), b) {
					case"previous":
						Window._box.addClass("fr-hovering-previous").removeClass("fr-hovering-next");
						break;
					case"next":
						Window._box.addClass("fr-hovering-next").removeClass("fr-hovering-previous")
				} else Window._box.removeClass("fr-hovering-clickable fr-hovering-previous fr-hovering-next")
			}
		}, _onMouseLeave: function (a) {
			Window._box.removeClass("fr-hovering-clickable fr-hovering-previous fr-hovering-next"), this._hoveringSide = !1
		}, _onMouseUp: function (a) {
			if (!(a.which > 1) && $(a.target).is(UI._validClickTargetSelector)) {
				if (1 == Pages.pages.length || Pages.page && "close" == Pages.page.view.options.onClick)return void Window.hide();
				var b = this._getEventSide(a);
				Window[b](), this._onMouseMove(a)
			}
		}, _onMouseEnter: function (a) {
			this._onMouseMove(a)
		}, _getEventSide: function (a) {
			var b = (this._scrollLeft > -1 ? this._scrollLeft : this._scrollLeft = $(window).scrollLeft(), a.pageX - Window._boxPosition.left - this._scrollLeft), c = Window._boxDimensions.width;
			return .5 * c > b ? "previous" : "next"
		}, _onSideMouseEnter: function (a) {
			this._hoveringSideButton = !0, this._hoveringSide = this._getEventSide(a), this._mayClickHoveringSide = Window["may" + _.String.capitalize(this._hoveringSide)](), this.clearTimer()
		}, _onSideMouseLeave: function (a) {
			this._hoveringSideButton = !1, this._hoveringSide = !1, this._mayClickHoveringSide = !1, this.startTimer()
		}, show: function (a) {
			return this._visible ? (this.startTimer(), void("function" == $.type(a) && a())) : (this._visible = !0, this.startTimer(), Window.element.addClass("fr-visible-inside-ui").removeClass("fr-hidden-inside-ui"), void("function" == $.type(a) && a()))
		}, hide: function (a) {
			return this._visible ? (this._visible = !1, Window.element.removeClass("fr-visible-inside-ui").addClass("fr-hidden-inside-ui"), void("function" == $.type(a) && a())) : void("function" == $.type(a) && a())
		}, clearTimer: function () {
			Support.mobileTouch || Window.timers.clear("ui-inside")
		}, startTimer: function () {
			Support.mobileTouch || (this.clearTimer(), Window.timers.set("ui-inside", $.proxy(function () {
				this.hide()
			}, this), Window.view ? Window.view.options.uiDelay : 0))
		}
	}, UI.outside = {
		initialize: function () {
			this.build(), this._scrollLeft = -1
		}, build: function () {
			Window._box.append(this._previous = $("<div>").addClass("fr-side fr-side-previous fr-side-previous-outside").append($("<div>").addClass("fr-side-button").append($("<div>").addClass("fr-side-button-background")).append($("<div>").addClass("fr-side-button-icon")))).append(this._next = $("<div>").addClass("fr-side fr-side-next fr-side-next-outside").append($("<div>").addClass("fr-side-button").append($("<div>").addClass("fr-side-button-background")).append($("<div>").addClass("fr-side-button-icon")))).append(this._close = $("<div>").addClass("fr-close fr-close-outside").append($("<div>").addClass("fr-close-background")).append($("<div>").addClass("fr-close-icon"))), Browser.IE && Browser.IE <= 7 && this._previous.add(this._next).add(this._close).hide(), this._close.on("click", $.proxy(function (a) {
				a.preventDefault(), Window.hide()
			}, this)), this._previous.on("click", $.proxy(function (a) {
				Window.previous(), this._onMouseMove(a)
			}, this)), this._next.on("click", $.proxy(function (a) {
				Window.next(), this._onMouseMove(a)
			}, this))
		}, enable: function () {
			this.bind()
		}, disable: function () {
			this.unbind()
		}, reset: function () {
			Window.timers.clear("ui-outside"), this._x = -1, this._y = -1, this._scrollLeft = -1, this._onMouseLeave()
		}, bind: function () {
			this._onMouseUpHandler || (this.unbind(), Window.element.on("mouseup", ".fr-content", this._onMouseUpHandler = $.proxy(this._onMouseUp, this)), Window.element.on("click", ".fr-container, .fr-thumbnails, .fr-thumbnails-wrapper", this._delegateOverlayCloseHandler = $.proxy(this._delegateOverlayClose, this)), Support.mobileTouch || (Window._pages.on("mousemove", ".fr-content", this._onMouseMoveHandler = $.proxy(this._onMouseMove, this)).on("mouseleave", ".fr-content", this._onMouseLeaveHandler = $.proxy(this._onMouseLeave, this)).on("mouseenter", ".fr-content", this._onMouseEnterHandler = $.proxy(this._onMouseEnter, this)), Window.element.on("mouseenter", ".fr-side", this._onSideMouseEnterHandler = $.proxy(this._onSideMouseEnter, this)).on("mouseleave", ".fr-side", this._onSideMouseLeaveHandler = $.proxy(this._onSideMouseLeave, this)), $(window).on("scroll", this._onScrollHandler = $.proxy(this._onScroll, this))))
		}, unbind: function () {
			this._onMouseUpHandler && (Window.element.off("mouseup", ".fr-content", this._onMouseUpHandler), this._onMouseUpHandler = null, Window.element.off("click", ".fr-container, .fr-thumbnails, .fr-thumbnails-wrapper", this._delegateOverlayCloseHandler), this._onMouseMoveHandler && (Window._pages.off("mousemove", ".fr-content", this._onMouseMoveHandler).off("mouseleave", ".fr-content", this._onMouseLeaveHandler).off("mouseenter", ".fr-content", this._onMouseEnterHandler), Window.element.off("mouseenter", ".fr-side", this._onSideMouseEnterHandler).off("mouseleave", ".fr-side", this._onSideMouseLeaveHandler), $(window).off("scroll", this._onScrollHandler), this._onMouseMoveHandler = null))
		}, adjustPrevNext: function (a, b) {
			var c = Pages.page;
			if (!c)return void(a && a());
			var d = this._previous.add(this._next);
			this._previous[(Window.mayPrevious() ? "remove" : "add") + "Class"]("fr-side-disabled"), this._next[(Window.mayNext() ? "remove" : "add") + "Class"]("fr-side-disabled"), d[(c._total < 2 ? "add" : "remove") + "Class"]("fr-side-hidden"), a && a()
		}, _onScroll: function () {
			this._scrollLeft = $(window).scrollLeft()
		}, _delegateOverlayClose: function (a) {
			var b = Pages.page;
			b && b.view.options.overlay && !b.view.options.overlay.close || $(a.target).is(".fr-container, .fr-thumbnails, .fr-thumbnails-wrapper") && (a.preventDefault(), a.stopPropagation(), Window.hide())
		}, _onMouseMove: function (a) {
			if (!Support.mobileTouch) {
				var b = this._getEventSide(a), c = _.String.capitalize(b), d = b ? Window["may" + c]() : !1;
				if ((1 == Pages.pages.length || Pages.page && "close" == Pages.page.view.options.onClick) && (b = !1), b != this._hoveringSide || d != this._mayClickHoveringSide)if (this._hoveringSide = b, this._mayClickHoveringSide = d, b)switch (Window._box[(d ? "add" : "remove") + "Class"]("fr-hovering-clickable"), b) {
					case"previous":
						Window._box.addClass("fr-hovering-previous").removeClass("fr-hovering-next");
						break;
					case"next":
						Window._box.addClass("fr-hovering-next").removeClass("fr-hovering-previous")
				} else Window._box.removeClass("fr-hovering-clickable fr-hovering-previous fr-hovering-next")
			}
		}, _onMouseLeave: function (a) {
			Window._box.removeClass("fr-hovering-clickable fr-hovering-previous fr-hovering-next"), this._hoveringSide = !1
		}, _onMouseUp: function (a) {
			if (!(a.which > 1) && $(a.target).is(UI._validClickTargetSelector)) {
				if (1 == Pages.pages.length || Pages.page && "close" == Pages.page.view.options.onClick)return void Window.hide();
				var b = this._getEventSide(a);
				Window[b](), this._onMouseMove(a)
			}
		}, _onMouseEnter: function (a) {
			this._onMouseMove(a)
		}, _getEventSide: function (a) {
			var b = (this._scrollLeft > -1 ? this._scrollLeft : this._scrollLeft = $(window).scrollLeft(), a.pageX - Window._boxPosition.left - this._scrollLeft), c = Window._boxDimensions.width;
			return .5 * c > b ? "previous" : "next"
		}, show: function () {
			Browser.IE && Browser.IE <= 7 && this._previous.add(this._next).add(this._close).show()
		}, hide: function () {
		}, _onSideMouseEnter: function (a) {
			this._hoveringSideButton = !0, this._hoveringSide = this._getEventSide(a), this._mayClickHoveringSide = Window["may" + _.String.capitalize(this._hoveringSide)]()
		}, _onSideMouseLeave: function (a) {
			this._hoveringSideButton = !1, this._hoveringSide = !1, this._mayClickHoveringSide = !1
		}, clearTimer: function () {
		}
	}, $(document).ready(function (a) {
		_Fresco.initialize()
	}), Fresco
});

/*
 * Note when upgrading: remember to replace querySelectorAll with $ to support IE < 8
 * https://github.com/PeerJ/peerj/commit/39c3c14f62e5c315f7391187734a5a6b8fc0dec7
 */

/*!
 * imagesLoaded PACKAGED v3.1.8
 * JavaScript is all like "You images are done yet or what?"
 * MIT License
 */


/*!
 * EventEmitter v4.2.6 - git.io/ee
 * Oliver Caldwell
 * MIT license
 * @preserve
 */

(function () {
	

	/**
	 * Class for managing events.
	 * Can be extended to provide event functionality in other classes.
	 *
	 * @class EventEmitter Manages event registering and emitting.
	 */
	function EventEmitter() {}

	// Shortcuts to improve speed and size
	var proto = EventEmitter.prototype;
	var exports = this;
	var originalGlobalValue = exports.EventEmitter;

	/**
	 * Finds the index of the listener for the event in it's storage array.
	 *
	 * @param {Function[]} listeners Array of listeners to search through.
	 * @param {Function} listener Method to look for.
	 * @return {Number} Index of the specified listener, -1 if not found
	 * @api private
	 */
	function indexOfListener(listeners, listener) {
		var i = listeners.length;
		while (i--) {
			if (listeners[i].listener === listener) {
				return i;
			}
		}

		return -1;
	}

	/**
	 * Alias a method while keeping the context correct, to allow for overwriting of target method.
	 *
	 * @param {String} name The name of the target method.
	 * @return {Function} The aliased method
	 * @api private
	 */
	function alias(name) {
		return function aliasClosure() {
			return this[name].apply(this, arguments);
		};
	}

	/**
	 * Returns the listener array for the specified event.
	 * Will initialise the event object and listener arrays if required.
	 * Will return an object if you use a regex search. The object contains keys for each matched event. So /ba[rz]/ might return an object containing bar and baz. But only if you have either defined them with defineEvent or added some listeners to them.
	 * Each property in the object response is an array of listener functions.
	 *
	 * @param {String|RegExp} evt Name of the event to return the listeners from.
	 * @return {Function[]|Object} All listener functions for the event.
	 */
	proto.getListeners = function getListeners(evt) {
		var events = this._getEvents();
		var response;
		var key;

		// Return a concatenated array of all matching events if
		// the selector is a regular expression.
		if (typeof evt === 'object') {
			response = {};
			for (key in events) {
				if (events.hasOwnProperty(key) && evt.test(key)) {
					response[key] = events[key];
				}
			}
		}
		else {
			response = events[evt] || (events[evt] = []);
		}

		return response;
	};

	/**
	 * Takes a list of listener objects and flattens it into a list of listener functions.
	 *
	 * @param {Object[]} listeners Raw listener objects.
	 * @return {Function[]} Just the listener functions.
	 */
	proto.flattenListeners = function flattenListeners(listeners) {
		var flatListeners = [];
		var i;

		for (i = 0; i < listeners.length; i += 1) {
			flatListeners.push(listeners[i].listener);
		}

		return flatListeners;
	};

	/**
	 * Fetches the requested listeners via getListeners but will always return the results inside an object. This is mainly for internal use but others may find it useful.
	 *
	 * @param {String|RegExp} evt Name of the event to return the listeners from.
	 * @return {Object} All listener functions for an event in an object.
	 */
	proto.getListenersAsObject = function getListenersAsObject(evt) {
		var listeners = this.getListeners(evt);
		var response;

		if (listeners instanceof Array) {
			response = {};
			response[evt] = listeners;
		}

		return response || listeners;
	};

	/**
	 * Adds a listener function to the specified event.
	 * The listener will not be added if it is a duplicate.
	 * If the listener returns true then it will be removed after it is called.
	 * If you pass a regular expression as the event name then the listener will be added to all events that match it.
	 *
	 * @param {String|RegExp} evt Name of the event to attach the listener to.
	 * @param {Function} listener Method to be called when the event is emitted. If the function returns true then it will be removed after calling.
	 * @return {Object} Current instance of EventEmitter for chaining.
	 */
	proto.addListener = function addListener(evt, listener) {
		var listeners = this.getListenersAsObject(evt);
		var listenerIsWrapped = typeof listener === 'object';
		var key;

		for (key in listeners) {
			if (listeners.hasOwnProperty(key) && indexOfListener(listeners[key], listener) === -1) {
				listeners[key].push(listenerIsWrapped ? listener : {
					listener: listener,
					once: false
				});
			}
		}

		return this;
	};

	/**
	 * Alias of addListener
	 */
	proto.on = alias('addListener');

	/**
	 * Semi-alias of addListener. It will add a listener that will be
	 * automatically removed after it's first execution.
	 *
	 * @param {String|RegExp} evt Name of the event to attach the listener to.
	 * @param {Function} listener Method to be called when the event is emitted. If the function returns true then it will be removed after calling.
	 * @return {Object} Current instance of EventEmitter for chaining.
	 */
	proto.addOnceListener = function addOnceListener(evt, listener) {
		return this.addListener(evt, {
			listener: listener,
			once: true
		});
	};

	/**
	 * Alias of addOnceListener.
	 */
	proto.once = alias('addOnceListener');

	/**
	 * Defines an event name. This is required if you want to use a regex to add a listener to multiple events at once. If you don't do this then how do you expect it to know what event to add to? Should it just add to every possible match for a regex? No. That is scary and bad.
	 * You need to tell it what event names should be matched by a regex.
	 *
	 * @param {String} evt Name of the event to create.
	 * @return {Object} Current instance of EventEmitter for chaining.
	 */
	proto.defineEvent = function defineEvent(evt) {
		this.getListeners(evt);
		return this;
	};

	/**
	 * Uses defineEvent to define multiple events.
	 *
	 * @param {String[]} evts An array of event names to define.
	 * @return {Object} Current instance of EventEmitter for chaining.
	 */
	proto.defineEvents = function defineEvents(evts) {
		for (var i = 0; i < evts.length; i += 1) {
			this.defineEvent(evts[i]);
		}
		return this;
	};

	/**
	 * Removes a listener function from the specified event.
	 * When passed a regular expression as the event name, it will remove the listener from all events that match it.
	 *
	 * @param {String|RegExp} evt Name of the event to remove the listener from.
	 * @param {Function} listener Method to remove from the event.
	 * @return {Object} Current instance of EventEmitter for chaining.
	 */
	proto.removeListener = function removeListener(evt, listener) {
		var listeners = this.getListenersAsObject(evt);
		var index;
		var key;

		for (key in listeners) {
			if (listeners.hasOwnProperty(key)) {
				index = indexOfListener(listeners[key], listener);

				if (index !== -1) {
					listeners[key].splice(index, 1);
				}
			}
		}

		return this;
	};

	/**
	 * Alias of removeListener
	 */
	proto.off = alias('removeListener');

	/**
	 * Adds listeners in bulk using the manipulateListeners method.
	 * If you pass an object as the second argument you can add to multiple events at once. The object should contain key value pairs of events and listeners or listener arrays. You can also pass it an event name and an array of listeners to be added.
	 * You can also pass it a regular expression to add the array of listeners to all events that match it.
	 * Yeah, this function does quite a bit. That's probably a bad thing.
	 *
	 * @param {String|Object|RegExp} evt An event name if you will pass an array of listeners next. An object if you wish to add to multiple events at once.
	 * @param {Function[]} [listeners] An optional array of listener functions to add.
	 * @return {Object} Current instance of EventEmitter for chaining.
	 */
	proto.addListeners = function addListeners(evt, listeners) {
		// Pass through to manipulateListeners
		return this.manipulateListeners(false, evt, listeners);
	};

	/**
	 * Removes listeners in bulk using the manipulateListeners method.
	 * If you pass an object as the second argument you can remove from multiple events at once. The object should contain key value pairs of events and listeners or listener arrays.
	 * You can also pass it an event name and an array of listeners to be removed.
	 * You can also pass it a regular expression to remove the listeners from all events that match it.
	 *
	 * @param {String|Object|RegExp} evt An event name if you will pass an array of listeners next. An object if you wish to remove from multiple events at once.
	 * @param {Function[]} [listeners] An optional array of listener functions to remove.
	 * @return {Object} Current instance of EventEmitter for chaining.
	 */
	proto.removeListeners = function removeListeners(evt, listeners) {
		// Pass through to manipulateListeners
		return this.manipulateListeners(true, evt, listeners);
	};

	/**
	 * Edits listeners in bulk. The addListeners and removeListeners methods both use this to do their job. You should really use those instead, this is a little lower level.
	 * The first argument will determine if the listeners are removed (true) or added (false).
	 * If you pass an object as the second argument you can add/remove from multiple events at once. The object should contain key value pairs of events and listeners or listener arrays.
	 * You can also pass it an event name and an array of listeners to be added/removed.
	 * You can also pass it a regular expression to manipulate the listeners of all events that match it.
	 *
	 * @param {Boolean} remove True if you want to remove listeners, false if you want to add.
	 * @param {String|Object|RegExp} evt An event name if you will pass an array of listeners next. An object if you wish to add/remove from multiple events at once.
	 * @param {Function[]} [listeners] An optional array of listener functions to add/remove.
	 * @return {Object} Current instance of EventEmitter for chaining.
	 */
	proto.manipulateListeners = function manipulateListeners(remove, evt, listeners) {
		var i;
		var value;
		var single = remove ? this.removeListener : this.addListener;
		var multiple = remove ? this.removeListeners : this.addListeners;

		// If evt is an object then pass each of it's properties to this method
		if (typeof evt === 'object' && !(evt instanceof RegExp)) {
			for (i in evt) {
				if (evt.hasOwnProperty(i) && (value = evt[i])) {
					// Pass the single listener straight through to the singular method
					if (typeof value === 'function') {
						single.call(this, i, value);
					}
					else {
						// Otherwise pass back to the multiple function
						multiple.call(this, i, value);
					}
				}
			}
		}
		else {
			// So evt must be a string
			// And listeners must be an array of listeners
			// Loop over it and pass each one to the multiple method
			i = listeners.length;
			while (i--) {
				single.call(this, evt, listeners[i]);
			}
		}

		return this;
	};

	/**
	 * Removes all listeners from a specified event.
	 * If you do not specify an event then all listeners will be removed.
	 * That means every event will be emptied.
	 * You can also pass a regex to remove all events that match it.
	 *
	 * @param {String|RegExp} [evt] Optional name of the event to remove all listeners for. Will remove from every event if not passed.
	 * @return {Object} Current instance of EventEmitter for chaining.
	 */
	proto.removeEvent = function removeEvent(evt) {
		var type = typeof evt;
		var events = this._getEvents();
		var key;

		// Remove different things depending on the state of evt
		if (type === 'string') {
			// Remove all listeners for the specified event
			delete events[evt];
		}
		else if (type === 'object') {
			// Remove all events matching the regex.
			for (key in events) {
				if (events.hasOwnProperty(key) && evt.test(key)) {
					delete events[key];
				}
			}
		}
		else {
			// Remove all listeners in all events
			delete this._events;
		}

		return this;
	};

	/**
	 * Alias of removeEvent.
	 *
	 * Added to mirror the node API.
	 */
	proto.removeAllListeners = alias('removeEvent');

	/**
	 * Emits an event of your choice.
	 * When emitted, every listener attached to that event will be executed.
	 * If you pass the optional argument array then those arguments will be passed to every listener upon execution.
	 * Because it uses `apply`, your array of arguments will be passed as if you wrote them out separately.
	 * So they will not arrive within the array on the other side, they will be separate.
	 * You can also pass a regular expression to emit to all events that match it.
	 *
	 * @param {String|RegExp} evt Name of the event to emit and execute listeners for.
	 * @param {Array} [args] Optional array of arguments to be passed to each listener.
	 * @return {Object} Current instance of EventEmitter for chaining.
	 */
	proto.emitEvent = function emitEvent(evt, args) {
		var listeners = this.getListenersAsObject(evt);
		var listener;
		var i;
		var key;
		var response;

		for (key in listeners) {
			if (listeners.hasOwnProperty(key)) {
				i = listeners[key].length;

				while (i--) {
					// If the listener returns true then it shall be removed from the event
					// The function is executed either with a basic call or an apply if there is an args array
					listener = listeners[key][i];

					if (listener.once === true) {
						this.removeListener(evt, listener.listener);
					}

					response = listener.listener.apply(this, args || []);

					if (response === this._getOnceReturnValue()) {
						this.removeListener(evt, listener.listener);
					}
				}
			}
		}

		return this;
	};

	/**
	 * Alias of emitEvent
	 */
	proto.trigger = alias('emitEvent');

	/**
	 * Subtly different from emitEvent in that it will pass its arguments on to the listeners, as opposed to taking a single array of arguments to pass on.
	 * As with emitEvent, you can pass a regex in place of the event name to emit to all events that match it.
	 *
	 * @param {String|RegExp} evt Name of the event to emit and execute listeners for.
	 * @param {...*} Optional additional arguments to be passed to each listener.
	 * @return {Object} Current instance of EventEmitter for chaining.
	 */
	proto.emit = function emit(evt) {
		var args = Array.prototype.slice.call(arguments, 1);
		return this.emitEvent(evt, args);
	};

	/**
	 * Sets the current value to check against when executing listeners. If a
	 * listeners return value matches the one set here then it will be removed
	 * after execution. This value defaults to true.
	 *
	 * @param {*} value The new value to check for when executing listeners.
	 * @return {Object} Current instance of EventEmitter for chaining.
	 */
	proto.setOnceReturnValue = function setOnceReturnValue(value) {
		this._onceReturnValue = value;
		return this;
	};

	/**
	 * Fetches the current value to check against when executing listeners. If
	 * the listeners return value matches this one then it should be removed
	 * automatically. It will return true by default.
	 *
	 * @return {*|Boolean} The current value to check for or the default, true.
	 * @api private
	 */
	proto._getOnceReturnValue = function _getOnceReturnValue() {
		if (this.hasOwnProperty('_onceReturnValue')) {
			return this._onceReturnValue;
		}
		else {
			return true;
		}
	};

	/**
	 * Fetches the events object and creates one if required.
	 *
	 * @return {Object} The events storage object.
	 * @api private
	 */
	proto._getEvents = function _getEvents() {
		return this._events || (this._events = {});
	};

	/**
	 * Reverts the global {@link EventEmitter} to its previous value and returns a reference to this version.
	 *
	 * @return {Function} Non conflicting EventEmitter class.
	 */
	EventEmitter.noConflict = function noConflict() {
		exports.EventEmitter = originalGlobalValue;
		return EventEmitter;
	};

	// Expose the class either via AMD, CommonJS or the global object
	if (typeof define === 'function' && define.amd) {
		define('eventEmitter/EventEmitter',[],function () {
			return EventEmitter;
		});
	}
	else if (typeof module === 'object' && module.exports){
		module.exports = EventEmitter;
	}
	else {
		this.EventEmitter = EventEmitter;
	}
}.call(this));

/*!
 * eventie v1.0.4
 * event binding helper
 *   eventie.bind( elem, 'click', myFn )
 *   eventie.unbind( elem, 'click', myFn )
 */

/*jshint browser: true, undef: true, unused: true */
/*global define: false */

( function( window ) {



var docElem = document.documentElement;

var bind = function() {};

function getIEEvent( obj ) {
  var event = window.event;
  // add event.target
  event.target = event.target || event.srcElement || obj;
  return event;
}

if ( docElem.addEventListener ) {
  bind = function( obj, type, fn ) {
    obj.addEventListener( type, fn, false );
  };
} else if ( docElem.attachEvent ) {
  bind = function( obj, type, fn ) {
    obj[ type + fn ] = fn.handleEvent ?
      function() {
        var event = getIEEvent( obj );
        fn.handleEvent.call( fn, event );
      } :
      function() {
        var event = getIEEvent( obj );
        fn.call( obj, event );
      };
    obj.attachEvent( "on" + type, obj[ type + fn ] );
  };
}

var unbind = function() {};

if ( docElem.removeEventListener ) {
  unbind = function( obj, type, fn ) {
    obj.removeEventListener( type, fn, false );
  };
} else if ( docElem.detachEvent ) {
  unbind = function( obj, type, fn ) {
    obj.detachEvent( "on" + type, obj[ type + fn ] );
    try {
      delete obj[ type + fn ];
    } catch ( err ) {
      // can't delete window object properties
      obj[ type + fn ] = undefined;
    }
  };
}

var eventie = {
  bind: bind,
  unbind: unbind
};

// transport
if ( typeof define === 'function' && define.amd ) {
  // AMD
  define( 'eventie/eventie',eventie );
} else {
  // browser global
  window.eventie = eventie;
}

})( this );

/*!
 * imagesLoaded v3.1.8
 * JavaScript is all like "You images are done yet or what?"
 * MIT License
 */

( function( window, factory ) { 
  // universal module definition

  /*global define: false, module: false, require: false */

  if ( typeof define === 'function' && define.amd ) {
    // AMD
    define( [
      'eventEmitter/EventEmitter',
      'eventie/eventie'
    ], function( EventEmitter, eventie ) {
      return factory( window, EventEmitter, eventie );
    });
  } else if ( typeof exports === 'object' ) {
    // CommonJS
    module.exports = factory(
      window,
      require('wolfy87-eventemitter'),
      require('eventie')
    );
  } else {
    // browser global
    window.imagesLoaded = factory(
      window,
      window.EventEmitter,
      window.eventie
    );
  }

})( window,

// --------------------------  factory -------------------------- //

function factory( window, EventEmitter, eventie ) {



var $ = window.jQuery;
var console = window.console;
var hasConsole = typeof console !== 'undefined';

// -------------------------- helpers -------------------------- //

// extend objects
function extend( a, b ) {
  for ( var prop in b ) {
    a[ prop ] = b[ prop ];
  }
  return a;
}

var objToString = Object.prototype.toString;
function isArray( obj ) {
  return objToString.call( obj ) === '[object Array]';
}

// turn element or nodeList into an array
function makeArray( obj ) {
  var ary = [];
  if ( isArray( obj ) ) {
    // use object if already an array
    ary = obj;
  } else if ( typeof obj.length === 'number' ) {
    // convert nodeList to array
    for ( var i=0, len = obj.length; i < len; i++ ) {
      ary.push( obj[i] );
    }
  } else {
    // array of single index
    ary.push( obj );
  }
  return ary;
}

  // -------------------------- imagesLoaded -------------------------- //

  /**
   * @param {Array, Element, NodeList, String} elem
   * @param {Object or Function} options - if function, use as callback
   * @param {Function} onAlways - callback function
   */
  function ImagesLoaded( elem, options, onAlways ) {
    // coerce ImagesLoaded() without new, to be new ImagesLoaded()
    if ( !( this instanceof ImagesLoaded ) ) {
      return new ImagesLoaded( elem, options );
    }
    // use elem as selector string
    if ( typeof elem === 'string' ) {
      elem = document.querySelectorAll( elem );
    }

    this.elements = makeArray( elem );
    this.options = extend( {}, this.options );

    if ( typeof options === 'function' ) {
      onAlways = options;
    } else {
      extend( this.options, options );
    }

    if ( onAlways ) {
      this.on( 'always', onAlways );
    }

    this.getImages();

    if ( $ ) {
      // add jQuery Deferred object
      this.jqDeferred = new $.Deferred();
    }

    // HACK check async to allow time to bind listeners
    var _this = this;
    setTimeout( function() {
      _this.check();
    });
  }

  ImagesLoaded.prototype = new EventEmitter();

  ImagesLoaded.prototype.options = {};

  ImagesLoaded.prototype.getImages = function() {
    this.images = [];

    // filter & find items if we have an item selector
    for ( var i=0, len = this.elements.length; i < len; i++ ) {
      var elem = this.elements[i];
      // filter siblings
      if ( elem.nodeName === 'IMG' ) {
        this.addImage( elem );
      }
      // find children
      // no non-element nodes, #143
      var nodeType = elem.nodeType;
      if ( !nodeType || !( nodeType === 1 || nodeType === 9 || nodeType === 11 ) ) {
        continue;
      }
      var childElems = $('img', elem); // to support IE <8
      //var childElems = elem.querySelectorAll('img');
      // concat childElems to filterFound array
      for ( var j=0, jLen = childElems.length; j < jLen; j++ ) {
        var img = childElems[j];
        this.addImage( img );
      }
    }
  };

  /**
   * @param {Image} img
   */
  ImagesLoaded.prototype.addImage = function( img ) {
    var loadingImage = new LoadingImage( img );
    this.images.push( loadingImage );
  };

  ImagesLoaded.prototype.check = function() {
    var _this = this;
    var checkedCount = 0;
    var length = this.images.length;
    this.hasAnyBroken = false;
    // complete if no images
    if ( !length ) {
      this.complete();
      return;
    }

    function onConfirm( image, message ) {
      if ( _this.options.debug && hasConsole ) {
        console.log( 'confirm', image, message );
      }

      _this.progress( image );
      checkedCount++;
      if ( checkedCount === length ) {
        _this.complete();
      }
      return true; // bind once
    }

    for ( var i=0; i < length; i++ ) {
      var loadingImage = this.images[i];
      loadingImage.on( 'confirm', onConfirm );
      loadingImage.check();
    }
  };

  ImagesLoaded.prototype.progress = function( image ) {
    this.hasAnyBroken = this.hasAnyBroken || !image.isLoaded;
    // HACK - Chrome triggers event before object properties have changed. #83
    var _this = this;
    setTimeout( function() {
      _this.emit( 'progress', _this, image );
      if ( _this.jqDeferred && _this.jqDeferred.notify ) {
        _this.jqDeferred.notify( _this, image );
      }
    });
  };

  ImagesLoaded.prototype.complete = function() {
    var eventName = this.hasAnyBroken ? 'fail' : 'done';
    this.isComplete = true;
    var _this = this;
    // HACK - another setTimeout so that confirm happens after progress
    setTimeout( function() {
      _this.emit( eventName, _this );
      _this.emit( 'always', _this );
      if ( _this.jqDeferred ) {
        var jqMethod = _this.hasAnyBroken ? 'reject' : 'resolve';
        _this.jqDeferred[ jqMethod ]( _this );
      }
    });
  };

  // -------------------------- jquery -------------------------- //

  if ( $ ) {
    $.fn.imagesLoaded = function( options, callback ) {
      var instance = new ImagesLoaded( this, options, callback );
      return instance.jqDeferred.promise( $(this) );
    };
  }


  // --------------------------  -------------------------- //

  function LoadingImage( img ) {
    this.img = img;
  }

  LoadingImage.prototype = new EventEmitter();

  LoadingImage.prototype.check = function() {
    // first check cached any previous images that have same src
    var resource = cache[ this.img.src ] || new Resource( this.img.src );
    if ( resource.isConfirmed ) {
      this.confirm( resource.isLoaded, 'cached was confirmed' );
      return;
    }

    // If complete is true and browser supports natural sizes,
    // try to check for image status manually.
    if ( this.img.complete && this.img.naturalWidth !== undefined ) {
      // report based on naturalWidth
      this.confirm( this.img.naturalWidth !== 0, 'naturalWidth' );
      return;
    }

    // If none of the checks above matched, simulate loading on detached element.
    var _this = this;
    resource.on( 'confirm', function( resrc, message ) {
      _this.confirm( resrc.isLoaded, message );
      return true;
    });

    resource.check();
  };

  LoadingImage.prototype.confirm = function( isLoaded, message ) {
    this.isLoaded = isLoaded;
    this.emit( 'confirm', this, message );
  };

  // -------------------------- Resource -------------------------- //

  // Resource checks each src, only once
  // separate class from LoadingImage to prevent memory leaks. See #115

  var cache = {};

  function Resource( src ) {
    this.src = src;
    // add to cache
    cache[ src ] = this;
  }

  Resource.prototype = new EventEmitter();

  Resource.prototype.check = function() {
    // only trigger checking once
    if ( this.isChecked ) {
      return;
    }
    // simulate loading on detached element
    var proxyImage = new Image();
    eventie.bind( proxyImage, 'load', this );
    eventie.bind( proxyImage, 'error', this );
    proxyImage.src = this.src;
    // set flag
    this.isChecked = true;
  };

  // ----- events ----- //

  // trigger specified handler for event type
  Resource.prototype.handleEvent = function( event ) {
    var method = 'on' + event.type;
    if ( this[ method ] ) {
      this[ method ]( event );
    }
  };

  Resource.prototype.onload = function( event ) {
    this.confirm( true, 'onload' );
    this.unbindProxyEvents( event );
  };

  Resource.prototype.onerror = function( event ) {
    this.confirm( false, 'onerror' );
    this.unbindProxyEvents( event );
  };

  // ----- confirm ----- //

  Resource.prototype.confirm = function( isLoaded, message ) {
    this.isConfirmed = true;
    this.isLoaded = isLoaded;
    this.emit( 'confirm', this, message );
  };

  Resource.prototype.unbindProxyEvents = function( event ) {
    eventie.unbind( event.target, 'load', this );
    eventie.unbind( event.target, 'error', this );
  };

  // -----  ----- //

  return ImagesLoaded;

});

/*! Lazy Load XT v1.0.6 2014-11-19
 * http://ressio.github.io/lazy-load-xt
 * (C) 2014 RESS.io
 * Licensed under MIT */

(function ($, window, document, undefined) {
    // options
    var lazyLoadXT = 'lazyLoadXT',
        dataLazied = 'lazied',
        load_error = 'load error',
        classLazyHidden = 'lazy-hidden',
        docElement = document.documentElement || document.body,
    //  force load all images in Opera Mini and some mobile browsers without scroll event or getBoundingClientRect()
        forceLoad = (window.onscroll === undefined || !!window.operamini || !docElement.getBoundingClientRect),
        options = {
            autoInit: true, // auto initialize in $.ready
            selector: 'img[data-src]', // selector for lazyloading elements
            blankImage: 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7',
            throttle: 99, // interval (ms) for changes check
            forceLoad: forceLoad, // force auto load all images

            loadEvent: 'pageshow', // check AJAX-loaded content in jQueryMobile
            updateEvent: 'load orientationchange resize scroll touchmove focus', // page-modified events
            forceEvent: '', // force loading of all elements

            //onstart: null,
            oninit: {removeClass: 'lazy'}, // init handler
            onshow: {addClass: classLazyHidden}, // start loading handler
            onload: {removeClass: classLazyHidden, addClass: 'lazy-loaded'}, // load success handler
            onerror: {removeClass: classLazyHidden}, // error handler
            //oncomplete: null, // complete handler

            //scrollContainer: undefined,
            checkDuplicates: true
        },
        elementOptions = {
            srcAttr: 'data-src',
            edgeX: 0,
            edgeY: 0,
            visibleOnly: true
        },
        $window = $(window),
        $isFunction = $.isFunction,
        $extend = $.extend,
        $data = $.data || function (el, name) {
            return $(el).data(name);
        },
    // $.contains is not included into DOMtastic, so implement it there
        $contains = $.contains || function (parent, el) {
            while (el = el.parentNode) {
                if (el === parent) {
                    return true;
                }
            }
            return false;
        },
        elements = [],
        topLazy = 0,
    /*
     waitingMode=0 : no setTimeout
     waitingMode=1 : setTimeout, no deferred events
     waitingMode=2 : setTimeout, deferred events
     */
        waitingMode = 0;

    $[lazyLoadXT] = $extend(options, elementOptions, $[lazyLoadXT]);

    /**
     * Return options.prop if obj.prop is undefined, otherwise return obj.prop
     * @param {*} obj
     * @param {*} prop
     * @returns *
     */
    function getOrDef(obj, prop) {
        return obj[prop] === undefined ? options[prop] : obj[prop];
    }

    /**
     * @returns {number}
     */
    function scrollTop() {
        var scroll = window.pageYOffset;
        return (scroll === undefined) ? docElement.scrollTop : scroll;
    }

    /**
     * Add new elements to lazy-load list:
     * $(elements).lazyLoadXT() or $(window).lazyLoadXT()
     *
     * @param {object} [overrides] override global options
     */
    $.fn[lazyLoadXT] = function (overrides) {
        overrides = overrides || {};

        var blankImage = getOrDef(overrides, 'blankImage'),
            checkDuplicates = getOrDef(overrides, 'checkDuplicates'),
            scrollContainer = getOrDef(overrides, 'scrollContainer'),
            elementOptionsOverrides = {},
            prop;

        // empty overrides.scrollContainer is supported by both jQuery and Zepto
        $(scrollContainer).on('scroll', queueCheckLazyElements);

        for (prop in elementOptions) {
            elementOptionsOverrides[prop] = getOrDef(overrides, prop);
        }

        return this.each(function (index, el) {
            if (el === window) {
                $(options.selector).lazyLoadXT(overrides);
            } else {
                // prevent duplicates
                if (checkDuplicates && $data(el, dataLazied)) {
                    return;
                }

                var $el = $(el).data(dataLazied, 1);

                if (blankImage && el.tagName === 'IMG' && !el.src) {
                    el.src = blankImage;
                }

                // clone elementOptionsOverrides object
                $el[lazyLoadXT] = $extend({}, elementOptionsOverrides);

                triggerEvent('init', $el);

                elements.push($el);
            }
        });
    };


    /**
     * Process function/object event handler
     * @param {string} event suffix
     * @param {jQuery} $el
     */
    function triggerEvent(event, $el) {
        var handler = options['on' + event];
        if (handler) {
            if ($isFunction(handler)) {
                handler.call($el[0]);
            } else {
                if (handler.addClass) {
                    $el.addClass(handler.addClass);
                }
                if (handler.removeClass) {
                    $el.removeClass(handler.removeClass);
                }
            }
        }

        $el.trigger('lazy' + event, [$el]);

        // queue next check as images may be resized after loading of actual file
        queueCheckLazyElements();
    }


    /**
     * Trigger onload/onerror handler
     * @param {Event} e
     */
    function triggerLoadOrError(e) {
        triggerEvent(e.type, $(this).off(load_error, triggerLoadOrError));
    }


    /**
     * Load visible elements
     * @param {bool} [force] loading of all elements
     */
    function checkLazyElements(force) {
        if (!elements.length) {
            return;
        }

        force = force || options.forceLoad;

        topLazy = Infinity;

        var viewportTop = scrollTop(),
            viewportHeight = window.innerHeight || docElement.clientHeight,
            viewportWidth = window.innerWidth || docElement.clientWidth,
            i,
            length;

        for (i = 0, length = elements.length; i < length; i++) {
            var $el = elements[i],
                el = $el[0],
                objData = $el[lazyLoadXT],
                removeNode = false,
                visible = force,
                topEdge;

            // remove items that are not in DOM
            if (!$contains(docElement, el)) {
                removeNode = true;
            } else if (force || !objData.visibleOnly || el.offsetWidth || el.offsetHeight) {

                if (!visible) {
                    var elPos = el.getBoundingClientRect(),
                        edgeX = objData.edgeX,
                        edgeY = objData.edgeY;

                    topEdge = (elPos.top + viewportTop - edgeY) - viewportHeight;

                    visible = (topEdge <= viewportTop && elPos.bottom > -edgeY &&
                        elPos.left <= viewportWidth + edgeX && elPos.right > -edgeX);
                }

                if (visible) {
                    triggerEvent('show', $el);

                    var srcAttr = objData.srcAttr,
                        src = $isFunction(srcAttr) ? srcAttr($el) : el.getAttribute(srcAttr);
                    if (src) {
                        $el.on(load_error, triggerLoadOrError);
                        el.src = src;
                    }

                    removeNode = true;
                } else {
                    if (topEdge < topLazy) {
                        topLazy = topEdge;
                    }
                }
            }

            if (removeNode) {
                elements.splice(i--, 1);
                length--;
            }
        }

        if (!length) {
            triggerEvent('complete', $(docElement));
        }
    }


    /**
     * Run check of lazy elements after timeout
     */
    function timeoutLazyElements() {
        if (waitingMode > 1) {
            waitingMode = 1;
            checkLazyElements();
            setTimeout(timeoutLazyElements, options.throttle);
        } else {
            waitingMode = 0;
        }
    }


    /**
     * Queue check of lazy elements because of event e
     * @param {Event} [e]
     */
    function queueCheckLazyElements(e) {
        if (!elements.length) {
            return;
        }

        // fast check for scroll event without new visible elements
        if (e && e.type === 'scroll' && e.currentTarget === window) {
            if (topLazy >= scrollTop()) {
                return;
            }
        }

        if (!waitingMode) {
            setTimeout(timeoutLazyElements, 0);
        }
        waitingMode = 2;
    }


    /**
     * Initialize list of hidden elements
     */
    function initLazyElements() {
        $window.lazyLoadXT();
    }


    /**
     * Loading of all elements
     */
    function forceLoadAll() {
        checkLazyElements(true);
    }


    /**
     * Initialization
     */
    $(document).ready(function () {
        triggerEvent('start', $window);

        $window
            .on(options.loadEvent, initLazyElements)
            .on(options.updateEvent, queueCheckLazyElements)
            .on(options.forceEvent, forceLoadAll);

        $(document).on(options.updateEvent, queueCheckLazyElements);

        if (options.autoInit) {
            initLazyElements(); // standard initialization
        }
    });

})(window.jQuery || window.Zepto || window.$, window, document);

PeerJ.Article.Annotation = new function() {
    var articleBody, articleSidebars, annotationsSidebar;
    var heatmap, currentScroll, articleHeight;
    var icon = $("<i/>").addClass("icon-comment icon-flip-horizontal");
    var anchor = $("<a/>").addClass("plink").append(icon);
    var $window = $(window);
    var summaries = $("#questions-summaries");

    var askLink = $("#annotation-create-question").attr("href");
    var askButton = $("<a/>", { href: askLink })
        .addClass("btn btn-primary add-annotation")
        .attr("data-toggle", "annotation-form")
        .attr("rel", "nofollow")
        .text("Ask a question about this section");
    var askContainer = $("<div/>").addClass("annotation-form-container");
    var askInfo = $(".annotation-learn-more");

    var closeButton = $("<button/>")
            .addClass("btn btn-default close-annotations")
            .text("Close");

    // NOTE: this is only fired once MathJax has loaded
    this.init = function() {
        var loaders = $("a.annotation-loader").map(function() {
            var node = $(this);

            return $.get(node.attr("href"), function(data) {
                var collection = $(data);
                collection.replaceAll(node);

                var motivation = collection.data("collection-motivation");
                var count = collection.data("total-results");
                PeerJ.Article.Annotation.setMotivationCounts(motivation, count);
            });
        });

        articleBody = $("main");
        articleSidebars = $(".article-sidebar");
        annotationsSidebar = $("#annotations-sidebar");

        $("#article-item-middle").imagesLoaded(function() {
            $.when.apply($, $.makeArray(loaders)).then(function() {
                // don't distribute the annotations on preprints
                if (!$("article.preprint").length) {
                    // add to AnnotationManager::setAnnotationTargetContent if extending the list of annotatable node types
                    $.each(["p", ".fig", ".table-wrap"], addAnnotations);
                    $(document).on("click", ".plink", toggleAnchor);
                    $(document).on("click", ".close-annotations", closeAnnotations);
                    addHeatMap();
                    PeerJ.Article.Annotation.updateCounts();
                }

                PeerJ.Annotation.Target.showAnnotation();
            });
        });
    };

    this.emptySummaries = function() {
        if (!summaries.length) {
            summaries = $("<div/>", { id: "questions-summaries" })
                .insertBefore("#questions.annotations");
        }

        summaries.empty();
    };

    this.updateCounts = function() {
        this.emptySummaries();

        $(".annotations-positioned").each(function() {
            var node = $(this);
            var selector = node.data("selector");
            var annotations = node.find(".annotation");
            var count = annotations.length;
            var link = $(selector).find(".plink");

            link.find(".annotations-count").remove();

            if (count) {
                $("<div/>", { text: count }).addClass("annotations-count").appendTo(link);

                annotations.each(function() {
                    var node = $(this);
                    var summary = $("<div/>").addClass("annotation-summary");

                    var title = node.find(".annotation-title").clone();
                    title.attr("href", "#" + node.attr("id"));
                    $("<div/>").append(title).appendTo(summary);

                    var name = node.find(".user-name").clone();
                    var date = node.find(".annotation-date-published").clone();
                    $("<div/>").append(name).append("&middot;").append(date).appendTo(summary);

                    summary.appendTo(summaries);
                });
            }
        });

        if (typeof heatmap !== "undefined") {
            addHeatMapMarkers();
        }
    };

    this.setMotivationCounts = function(motivation, count) {
        $(".annotation-counter-" + motivation).text(count)
            .css("display", count ? "inline-block" : "none");
    };

    this.getMotivationCount = function(motivation) {
        var count = $(".annotation-counter-" + motivation).eq(0).text();

        return Number(count);
    };

    var addAnnotations = function(index, selector) {
        articleBody.find("section > " + selector).each(function(selectorIndex) {
            var node = $(this);
            var id = node.attr("id");

            if (!id) {
                var id = node.get(0).nodeName.toLowerCase() + "-" + (selectorIndex + 1);
                node.attr("id", id);
            }

            var nodeSelector = "#" + id;

            // add an anchor to the node
            var newAnchor = anchor.clone();
            newAnchor.attr("href", nodeSelector)
            .attr("rel", "nofollow");
            node.addClass("has-plink").prepend(newAnchor);

            var target = $("#questions").data("target");

            // create a container in the sidebar for annotations at this position
            var positioned = $("<div/>").addClass("annotations annotations-positioned");
            positioned.data("counts", 1);
            positioned.data("plink", newAnchor);
            positioned.attr("data-target", target);
            positioned.attr("data-selector", nodeSelector);
            newAnchor.data("annotations-positioned", positioned);
            annotationsSidebar.append(positioned);

            // add the annotations at this position, if there are any, to the sidebar container
            var containers = $(".annotation-container").filter(function() {
                return $(this).data("selector") == nodeSelector;
            });

            if (containers.length) {
                positioned.append(containers);
                newAnchor.addClass("plink-content");
            }

            containers.each(function() {
                MathJax.Hub.Queue(["Typeset", MathJax.Hub, this]);
            });

            var selectorAskButton = askButton.clone();
            selectorAskButton.attr("href", askLink + "&selector=" + encodeURIComponent(nodeSelector));
            positioned.append(selectorAskButton);

            positioned.append(closeButton.clone());
            positioned.append(askInfo.clone());
            positioned.append(askContainer.clone().show());
        });
    };

    var closeAnnotations = function(event) {
        event.preventDefault();

        $("body").removeClass("annotating");

        $(this).closest(".annotations-positioned")
            .data("plink").parent().removeClass("plink-active");
    };

    var toggleAnchor = function(event) {
        var anchor = $(this);
        var parent = anchor.closest(".has-plink");

        if (parent.hasClass("plink-active")) {
            event.preventDefault();
            $("body").removeClass("annotating");
            parent.removeClass("plink-active");
        } else {
            $("body").addClass("annotating");

            $(".plink-active").removeClass("plink-active");
            $(".annotations-positioned").fadeOut("fast");

            parent.addClass("plink-active");

            var positioned = anchor.data("annotations-positioned");
            var offset = anchor.offset();

            positioned.offset({ top: offset.top });
            positioned.fadeIn("fast");
            positioned.animate({ width: annotationsSidebar.width() }, "fast");

            var $window = $(window);
            var paddedTop = offset.top - 100;

            //if ($window.scrollTop() > paddedTop || $window.scrollTop() + $window.height() < paddedTop) {
                $("html, body").animate({ scrollTop: paddedTop });
            //
        }
    };

    var addHeatMap = function() {
        if ($(".annotation-container").length && $window.width() > 767) {
            heatmap = $('<div class="annotations-outer-heatmap"><div class="annotations-heatmap"></div></div>').appendTo("body");
            heatmap.on("click", ".annotation-marker", onMarkerClick);

            $window.on("resize", addHeatMapMarkers);

            $window.on("scroll", PeerJ.Article.Throttle(showCurrentScroll, 25));
        }
    };

    var addHeatMapMarkers = function() {
        heatmap.empty();
        currentScroll = $("<div/>").addClass("current-scroll").appendTo(heatmap);
        setArticleHeight();

        var items = $(".annotations-count");

        var counts = [];

        items.each(function() {
            counts.push(parseInt(this.textContent));
        });

        var max = Math.max.apply(Math, counts);

        items.each(function() {
            var node = $(this);
            var parent = node.closest(".plink");

            var top = parent.offset().top / articleHeight;
            var height = parent.height() / articleHeight;
            var href = parent.attr("href");

            var annotations = parseInt(node.text());
            var suffix = annotations === 1 ? "question" : "questions";

            $("<a/>", { href: href }).addClass("annotation-marker").css({
                    top: (top * 100) + "%",
                    height: (height * 100) + "%",
                    opacity: annotations / max
                }).tooltip({
                    placement: "right",
                    title: annotations + " " + suffix
                }).appendTo(heatmap);
        });
    };

    var onMarkerClick = function(event) {
        var selector = $(event.target).attr("href");
        $(selector).find(".plink").click();
    };

    var setArticleHeight = function() {
        articleHeight = $("#article-item-middle").height();
        setScrollHeight();
        showCurrentScroll();
    };

    var setScrollHeight = function() {
        var scrollHeight = ($window.height() / articleHeight) * 100;
        currentScroll.css("height", scrollHeight + "%");
    };

    var showCurrentScroll = function() {
        var top = ($window.scrollTop() / articleHeight) * 100;
        currentScroll.css({ top: top + "%" });
    };
};

$(PeerJ.Article.Annotation.init);

$(function () {
    var published = $('meta[name=citation_date]').attr('content');
    var linkText = 'Find in Wayback Machine';

    var options = {
        trigger: 'manual',
        animation: false,
        container: 'body',
        placement: 'left',
        html: true,
        template: '<div class="popover archive-popover"><div class="arrow"></div><div class="popover-inner"><div class="popover-content"></div></div></div>',
        delay: {
            show: 250,
            hide: 500
        }
    };

    // external links in the body of the article
    // TODO: exclude NCBI etc?
    $('article .body a.ext-link')
        .filter(includeHost)
        .popover($.extend({}, options, {
            content: function () {
                var link = $(this);

                return $('<a/>', {
                    text: linkText,
                    href: buildArchiveLink(link.attr('href'), published),
                    target: '_blank'
                });
            }
        }))
        .hover(showOnlyThisPopover, hideThisPopover);

    // plain URLs
    $('article a.uri')
        .filter(includeHost)
        .popover($.extend({}, options, {
            content: function () {
                var link = $(this);
                var citation = link.closest('.citation');
                var accessed = citation.find('.access-date time.date-in-citation').attr('datetime');

                return $('<a/>', {
                    text: linkText,
                    href: buildArchiveLink(link.attr('href'), published, accessed),
                    target: '_blank'
                });
            }
        }))
        .hover(showOnlyThisPopover, hideThisPopover);

    // URLs in the title of a citation
    $('article .citation')
        .find('a.article-title, a.data-title')
        .not('.uri')
        .filter(includeHost)
        .popover($.extend({}, options, {
            content: function () {
                var link = $(this);
                var citation = link.closest('.citation');
                var accessed = citation.find('.access-date time.date-in-citation').attr('datetime');

                return $('<a/>', {
                    text: linkText,
                    href: buildArchiveLink(link.attr('href'), published, accessed),
                    target: '_blank'
                });
            }
        }))
        .hover(showOnlyThisPopover, hideThisPopover);

    // exclude some hosts (DOI resolver, Google Scholar)
    function includeHost() {
        return !this.hostname.match(/(doi\.org|scholar\.google)/);
    }

    // use the date + url to build a wayback machine URL
    function buildArchiveLink (url, published, accessed) {
        var date = accessed || published; // use accessed date if available, otherwise the article's publication date

        return 'https://web.archive.org/web/' + buildDateString(date) + '/' + url;
    };

    // convert the date to a format suitable for a wayback machine URL
    function buildDateString (date) {
        var matches = date.match(/(\d{4})-(\d{1,2})-(\d{1,2})/);

        if (!matches) {
            return '*'; // * as date = show all versions
        }

        return matches.splice(1).map(padDatePart).join('');
    };

    // zero-pad date parts where necessary
    function padDatePart(datePart) {
        return datePart.length === 1 ? '0' + datePart : datePart;
    }

    // show the popover
    function showOnlyThisPopover () {
        var node = $(this);

        node.popover('show').siblings('.popover').on('mouseleave', function () {
            node.popover('hide');
        });
    };

    // hide the popover
    function hideThisPopover () {
        var node = $(this);

        var checkForHover = function () {
            setTimeout(function () {
                if ($('.popover:hover').length) {
                    checkForHover(); // still hovering
                } else {
                    node.popover('hide');
                }
            }, 100);
        };

        checkForHover();
    };
});

PeerJ.Article.Counter = new function() {
    this.init = function() {
        var containers = $(".article-item-metrics-counts");
        var counterURL = containers.filter("[data-src]").data("src");

        $.getJSON(counterURL, function(data) {
            containers.each(function(index, container) {
                $(container).find("[data-count]").each(function(index, node) {
                    var $node = $(node);
                    var count = $node.data("count");

                    if (data[count]) {
                        // number formatted in PHP as Number.toLocaleString()
                        // adds no thousands separator in some browsers (Firefox)
                        $node.text(data[count]).closest(".article-item-metrics-count").show();
                    }
                });
            }).fadeIn("slow");
        });
    };

    var loadArticleCounter = function(index, container) {
        var $container = $(container);
        var url = $container.data("src");

        $.getJSON(url, function(data) {

        });
    };
}

$(PeerJ.Article.Counter.init);

PeerJ.Article.DownloadModal = {

    showSignupAfterDownload: true,
    modal: $('#download-article-modal'),
    modalTrigger: $('.js-download-modal-trigger'),
    buttonsContainer: $('#download-modal-buttons-container'),
    signupContainer: $('#download-modal-signup-container'),
    downloadMessageContainer: $('#download-modal-downloading-message'),
    downloadButtons: $('.js-download-btn'),
    closeModalButton: $('.js-close-download-modal'),
    downloadConfirmText: $('.download-modal-confirm-title-text'),
    showDownloadUrl: $('.show-download-link'),
    downloadUrl: $('.article-modal-download-url'),

    init: function(){
        this.eventListeners();
    },

    eventListeners: function(){
        var self = this;
        this.modalTrigger.click(this.showModal.bind(this));
        this.downloadButtons.click(function(e){
            self.downloadClick(e, $(this));
        });
        this.closeModalButton.click(this.hideModal.bind(this));
        this.showDownloadUrl.click(this.toggleUrl.bind(this));
    },

    reset: function(){
        this.signupContainer.hide();
        this.downloadMessageContainer.hide();
        this.buttonsContainer.show();
    },

    showSignupForm: function(){
        this.downloadUrl.removeClass('show');
        $('.modal-header').hide();
        this.signupContainer.show();
        this.buttonsContainer.hide();
    },

    showDownloadingMessage: function(){
        this.buttonsContainer.hide();
        this.downloadMessageContainer.show();
    },

    showModal: function(){
        this.reset();
        this.modal.modal('show');
    },

    hideModal: function(){
        this.modal.modal('hide');
    },

    toggleUrl: function(){
        this.downloadUrl.toggleClass('show');
    },

    downloadClick: function(event, button){
        if(event.which != 1) return;

        /* Set download modal confirm text and URL for user display */
        this.downloadConfirmText.text(button.data('download-confirm-text'));
        var link = button.attr('href');
        this.downloadUrl.attr("href", link);
        this.downloadUrl.text(link);

        var downloadFormat = button.data('format');

        //Track event
        if(typeof ga != 'undefined') ga('send', 'event', 'Article Download', downloadFormat);

        if(this.showSignupAfterDownload){
            this.showSignupForm();
        } else {
            this.hideModal();
        }
    }

};

PeerJ.Article.DownloadModal.init();
/*global PeerJ */

PeerJ.Article.Figures = new function() {
    this.init = function() {
          fixImageHeights();
        addPopovers();
    };

    var popoverContent = function() {
        var container = $("<div/>").addClass("popover-figure");

        getRefForLink(this).find(".heading").clone().appendTo(container);

        var thumb = getRefForLink(this).find("img[data-thumb]").data("thumb");
        $("<img/>", { src: thumb }).appendTo(container);

        return container.get(0).outerHTML;

    };

    var getRefForLink = function(node) {
        var id = $(node).data("jats-rid").replace(/\./g, "\\.");

        return $("#" + id);
    };

    var addPopovers = function() {
        var options = {
            html: true,
            placement: "right",
            content: popoverContent,
            delay: { show: 250, hide: 500 }
        };

        /* add popover to references */
        $("a.xref-fig").popover(options);
    };

    // if a figure image has been scaled down horizontally by "max-width: 100%",
    // "height: auto" needs to be set to override the "height" attribute
    var fixImageHeights = function () {
      $('.fig img.graphic').each(function () {
         // if the image has been scaled down horizontally
         if (this.clientWidth < this.naturalWidth) {
           // set the height to "auto"
           this.style.height = 'auto';
         }
      });
    };
};

$(PeerJ.Article.Figures.init);

/*global PeerJ */

PeerJ.Article.Footnotes = new function() {
    this.init = function() {
        addPopovers();
    };

    var popoverContent = function() {
        return getFootNote(this).html();
    };

    var getFootNote = function(node) {
        var id = $(node).data("jats-rid");

        return $("#" + id);
    };

    var addPopovers = function() {
        var options = {
            html: true,
            placement: "right",
            content: popoverContent,
            delay: { show: 250, hide: 3000 }
        };

        /* add popover to references */
        $("a.xref-fn").popover(options);
    };
};

$(PeerJ.Article.Footnotes.init);

/*global PeerJ, item */

PeerJ.Article.Item = new function() {
    this.init = function() {
        addEventListeners();

        formatText();

        lazyLoadImages();

        setupTables();

        buildArticleNavigation();
        buildArticleMainBody();
        buildAuthorArticleSection();
        buildArticleAbstract();
        buildArticleNotes();
        buildSubjectNavigation();

        hideSections();

        if (isPreprint()) {
            // always show the abstract for preprints
            $(".abstract:hidden")
              .closest("#article-item-abstract-container")
              .find(".row-article-item-section-heading")
              .click();
        }

         //buildAuthorHovercards();
        //getPublicationFeed();
    };

    var buildSubjectNavigation = function() {
        var subjectnav = $(".subjects-navigation");

        // Add manuscript type to list
        var middle = $('#article-item-middle');
        var msTypeEntity = middle.data('ms-type-entity');
        var msTypeId = middle.data('ms-type-id');
        var msTypeText = middle.data('ms-type-text').replace(/\-/g, " ");

        var link = $("<a/>", {
            href: '/search/?type=' + msTypeEntity + '&manuscriptType=' + msTypeId,
            text: msTypeText
        });

        $("<div/>")
            .addClass("subject-item manuscriptType-item")
            .append(link)
            .appendTo(subjectnav);

        // Add subjects
        $(".subject").each(function() {
            var node = $(this);

            var link = $("<a/>", {
                href: node.attr("href"),
                text: node.text()
            });

            $("<div/>")
                .addClass("subject-item")
                .append(link)
                .appendTo(subjectnav);
        });

        $("h1.article-title").after(subjectnav);
    };

    var createSubjectSlug = function(slug)
    {
        slug = slug.replace(/'/g,"");
        slug = slug.replace(/\W+/g, "-");

        return slug.toLowerCase();
    };

    var hideSections = function() {
        $("#article-item-article-information").click();

        if ($(window).width() < 768) {
            var down = "icon-chevron-down";
            var right = "icon-chevron-right";

            $(".article-section-indicator").each(function(i) {
                if ($(this).hasClass(down)) {
                    $(this).removeClass(down);
                    $(this).addClass(right);
                }
            });
        }
    };

    var addEventListeners = function() {
        // IE8 has problems with ajax loads if Headroom initialized
        if (window.requestAnimationFrame) {
            initializeHeadroom();
        }

        returnToTop();

        $("body")
            .on("click", ".article-navigation .article-anchor a", showAnchorTarget)
            .on("click", "a.xref", showAnchorTarget);

        $("#flag-current-issue").on("hover", function() {
            $("#item-flag-button").tooltip("hide");
        });

        $("[data-counter-target]")
            .each(setCounterTarget)
            .on("keyup", updateCounter)
            .trigger("keyup");

        //$("#wikiModal").on("show", loadWikiEdit);

        if($(".save-flag-btn").length) {
            $(".save-flag-btn")
                .on("click", postFlagIssueForm);
        }

        $("article")
            .on("click", ".row-article-item-section-heading", toggleSection);

        initialiseScrollToggle();

        $(".article-sidebar").on("click", '.article-similar-publication', function(event) { gaTrackEvent(event, 'Similar', 'Publication', this.href); });
        $(".article-sidebar").on("click", '.article-similar-preprint', function(event) { gaTrackEvent(event, 'Similar', 'Preprint', this.href); });
        $(".article-sidebar").on("click", '.article-similar-editor', function(event) { gaTrackEvent(event, 'Similar', 'Editor', this.href); });
        $(".article-sidebar").on("click", '.article-similar-editor-cat', function(event) { gaTrackEvent(event, 'Similar', 'EditorCat', this.href); });

        var itemsToBeMoved = $("#article-identifiers, #article-collections, #article-corrections, #article-preexisting");

        if (itemsToBeMoved.length) {
            $(".article-authors").after(itemsToBeMoved);
            itemsToBeMoved.show();
        }

        $(".article-authors").after(buildPublishedDate());

        setupTweetToggle();
    };

    var setupTweetToggle = function() {
        if ($('#article-tweets-container').length) {
            $('#btn-view-tweets')
                .on('click', function() {
                    $('#article-main-container').hide();
                    $('.sidebar-heading').hide();
                    $('.article-navigation').hide();
                    $('#article-tweets-container').show();
                    $("html, body").animate({
                        scrollTop: 0
                    }, 500);
                });

            $('#btn-view-article')
                .on('click', function() {
                    $('#article-tweets-container').hide();
                    $('.sidebar-heading').show();
                    $('.article-navigation').show();
                    $('#article-main-container').show();
                });
        }

        if ($('.tweet-pagination').length) {
            $('#article-tweets-container')
                .on('click', '.tweet-pagination a', function(e) {
                    e.preventDefault();

                    $.ajax({
                        type: "GET",
                        url: $(this).attr('href'),
                        dataType: "json",
                        success: function(data) {
                            $('.tweet-items').html(data.html);

                            $("html, body").animate({
                                scrollTop: 0
                            }, 500);
                        }
                    });
                });
        }
    };

    var initializeHeadroom = function() {
        var navbarHeadroom = document.querySelector(".item-top-navbar");

        if (navbarHeadroom) {
            var headroom  = new Headroom(navbarHeadroom);

            headroom.init();
        }
    };

    var initialiseScrollToggle = function() {
        var $document = $(document);
        var navbar = $(".navbar");
        var itemNavbar = $(".item-top-navbar");

        navbar.addClass("visible");

        var onScroll = function () {
            var top = $document.scrollTop()

            if (top > 0) {
                navbar
                  .filter(".visible")
                  .removeClass("visible")
                  .hide();

                itemNavbar
                  .not(".visible")
                  .addClass("visible")
                  .show();
            } else {
                navbar
                  .not(".visible")
                  .addClass("visible")
                  .show();

                itemNavbar
                  .filter(".visible")
                  .removeClass("visible")
                  .hide();
            }
        };

        $document.on("scroll", PeerJ.Article.Throttle(onScroll, 250));
    };

    var returnToTop = function() {
        $("#top-return")
            .on("click", function() {
                $("html, body").animate({
                    scrollTop: 0
                }, 1000);
            });
    };

    var setupTables = function() {
        $("table").each(rotateVerticalHeadings);
    };

    var rotateVerticalHeadings = function() {
        // <th content-type="table-heading-vertical">foo</th>
        var headings = $(this).find('th[data-jats-content-type="table-heading-vertical"]');

        if (!headings.length) {
            return;
        }

        headings.css('white-space', 'nowrap');

        // get the current height of a heading, used to offset the rotated element later
        var height = headings.eq(0).height();

        headings.each(function () {
            var node = $(this);

            // create a rotated span
            var span = $('<span/>').css({
                'transform': 'rotate(-90deg)',
                'transform-origin': 'left bottom',
                'position': 'absolute',
                'bottom': '8px'
            });

            // move the heading node's contents into the rotated span
            span.append(node.contents());
            node.append(span);

            // adjust the node (particularly the height)
            node.css({
                'vertical-align': 'bottom',
                'position': 'relative',
                'height': span.width() + 16,
                'min-width': span.height()
            });

            // shift the rotated span to the middle of the heading node
            span.css('left', (height + node.width() + 8) / 2);
        });
    };

    var showAnchorTarget = function() {
        var node = $(this);
        var selector = node.attr("href");
        var target = $(selector);

        if (!target.is(":visible")) {
            target
                .closest(".row-article-item-section")
                .prev(".row-article-item-section-heading")
                .click();
        }
    };

    var toggleSection = function() {
        var node = $(this);

        if (node.children(".article-item-section-toggle").length) {
            node.next(".row-article-item-section").toggle();

            node
                .find(".article-section-indicator")
                .toggleClass("icon-chevron-down")
                .toggleClass("icon-chevron-right");
        }
    };

    var buildAuthorArticleSection = function() {
        var node = $("#article-information");
        node.addClass("article-item-section");

        var container = buildSectionContainer("Author and article information", "article-item-article-information");
        container.insertBefore(node).attr("id", "article-item-article-information-container");
        container.find(".article-item-section-content").append(node);
    };

    var isPreprint = function() {
        return $("article[itemscope].preprint").length;
    }

    var buildArticleAbstract = function() {
        var node = $("header.front .abstract");
        var parent = node.parent();

        var container = buildSectionContainer("Abstract", "article-item-abstract");

        var citation_data = $(".self-citation > dd").html();
        var citation = $("<div style='margin-top:20px'></div>").addClass("alert alert-info self-citation");
        citation.append("<p style='color:#444;font-weight:bold;font-size:14px;'>Cite this as</p>").append(citation_data);
        showCiteArticleMessage(citation);

        container
            .find(".article-item-section-content")
            .append(node);

        container
            .find(".abstract")
            .after(citation);

        container
            .insertAfter("#article-item-article-information-container")
            .attr("id", "article-item-abstract-container")
            .show();

        parent.remove();

        if (isPreprint()) {
            buildPreprint(container, citation);
        }
    };

    var buildPreprint = function(container, citation) {
        var link = $("link[rel=alternate][type='application/pdf']").get(0);
        if (link) {
            var pdfURL = link.href; // absolute URL

            if (container.width() > 499) {
                buildPreprintPreview(pdfURL, container).insertAfter(citation);
            } else {
                buildPreprintDownloadButton(pdfURL).insertAfter(citation);
            }
        }
    };

    var buildArticleNotes = function() {
        var node = $("header.front .notes");

        if (!node.length) {
            return;
        }

        var parent = node.parent();

        var container = buildSectionContainer("Author comment", "article-item-notes");
        container.find(".article-item-section-content").append(node);
        container.insertAfter("#article-item-abstract-container")
            .attr("id", "article-item-notes-container").show();

        parent.remove();
    };

    var buildPreprintDownloadButton = function(pdfURL) {
        var pdfIcon = $("<i/>").addClass("icon-white icon-file").css("margin-right", "5px");

        return $("<a/>", {
            href: pdfURL,
            text: "View Preprint PDF",
            rel: "tooltip",
            title: "View as PDF"
        }).addClass("btn btn-primary").prepend(pdfIcon);
    };

    var buildPreprintViewerURL = function(pdfURL) {
        var viewerLink = $("link[rel=pdf-viewer]");

        if (!viewerLink.length) {
            return false;
        }

        return viewerLink.attr("href") + "?file=" + encodeURIComponent(pdfURL);
    };

    var buildPreprintPreview = function (pdfURL, container) {
        return $("<iframe/>", {
            src: buildPreprintViewerURL(pdfURL) || pdfURL,
            allowfullscreen: "true",
            height: container.width() * 1.41,
            width: container.width()
        }).addClass("pdf-viewer");
    };

    /*
    var buildAuthorHovercards = function() {
        $(".authors > .name").each(function() {
            var node = $(this);

            node
                .attr("title", node.text()).popover()
                .data("content", "Show address, contributions, link to profile page, etc");
        });
    };
    */

    var buildArticleMainBody = function() {
        var content = $(".body > *, footer > .sec");

        // Start with main text and subsections of text, e.g. introduction, results, etc
        var wrapper = $("<div/>", { id: "article-item-main-sections" });
        wrapper.append(content);

        var preprint = $("article.preprint").length;
        var sectionTitle = preprint ? "Sections" : "Main article text";

        var container = buildSectionContainer(sectionTitle, "article-item-main-text");
        container.appendTo("#article-main-container main");
        container.find(".article-item-section-content").append(wrapper);

        var footer = $("article > footer");

        // Build the footer sections, e.g. acknowledgments, references, etc
        footer.find("> section").each(function() {
            var node = $(this);
            var id = "article-item-" + node.attr("id") + "-text";

            var sectionHeader = node.find("h2.heading");
            var sectionTitle = sectionHeader.text();
            sectionHeader.hide();

            var footerContainer = buildSectionContainer(sectionTitle, id);
            footer.append(footerContainer);

            footerContainer.find(".article-item-section-content").append(node);
        });

        // Bind leftbar navigation to main text
        /*
        $(".article-anchor").on("click", function() {
            $("#article-item-main-text").show();
        });
        */

        // Move wiki section into place
        //$("#article-item-wiki-container").insertAfter("header.front");
    };

    var buildArticleNavigation = function() {
        var container = $("<ul/>").addClass("nav nav-list");

        $("main .sec > h2.heading").each(function() {
            var node = $(this);

            var id = node.parent().attr("id");

            if (!id) {
                id = node.text().toLowerCase().replace(/\W/g, "-");
                node.parent().attr("id", id);
            }

            var link = $("<a/>", {
                href: "#" + id,
                text: node.text()
            });

            $("<li/>")
                .addClass("article-anchor")
                .append(link)
                .appendTo(container);
        });

        container.appendTo(".article-navigation");//.scrollspy();
    };

    /*
    var loadWikiEdit = function() {
        var resultContainer = $("#wiki-load-result");
        var url = $("#article-wiki-modal-url").data("href");

        resultContainer.load(url, function(response, status, xhr) {
            // some callback stuff for the wiki
            if (status == "error") {
                resultContainer.empty();

                $("<div/>")
                    .addClass("alert alert-error")
                    .text("Oops. We have a problem. Please close and try again. Error:" + xhr.status + " " + xhr.statusText)
                    .appendTo(resultContainer);
            }

            $("[data-toggle=tooltip]").tooltip();

            $("[data-counter-wiki]")
               .each(setCounterTarget)
               .on("keyup", updateCounter(1))
               .trigger("keyup");
        });
    };
    */

    var buildSectionContainer = function(headingText, headingId) {
        var container = $("<div/>");

        var headingContainer = $("<div/>").addClass("row-fluid row-article-item-section-heading").appendTo(container);

        var indicator = $("<div/>").addClass("span1 article-main-left-span1").appendTo(headingContainer);
        $("<i/>").addClass("article-section-indicator icon-chevron-down").appendTo(indicator);

        $("<h2/>").text(headingText).appendTo(headingContainer);

        $("<div/>", { id: headingId }).addClass("article-item-section-toggle").appendTo(headingContainer);

        var sectionContainer = $("<div/>").addClass("row-fluid row-article-item-section").appendTo(container);
        $("<div/>").addClass("span1 article-main-left-span1").html("&nbsp;").appendTo(sectionContainer);
        $("<div/>").addClass("span11 article-item-section-content").appendTo(sectionContainer);

        return container;
    };

    /**
     * Add a message about citing the published article instead of the preprint
     */
    var showCiteArticleMessage = function(citationNode) {
        // The message about a published article identifies preprints with associated published articles.
        var publishedURL = $("#article-preexisting a[rel='published-article']").attr("href");

        if (!publishedURL) {
            return;
        }

        var link = $("<a/>", {
            text: "the subsequent peer-reviewed version of this article",
            href: publishedURL
        });

        $("<p/>")
            .addClass("preprint-cite-article-message")
            .append("<span class='label label-warning'>note</span>")
            .append(" This preprint is not peer-reviewed. You may wish to reference ")
            .append(link)
            .append(".")
            .appendTo(citationNode);
    };

    var postFlagIssueForm = function(e) {
        e.preventDefault();
        var url = $('#article-flag-form').data('href');
        var em = $('#article-flag-form').serialize();
        var saving = '<div style="margin-left:40px;"><span class="label label-success" id="flag-modal-saving">Saving ...</span></div>';
        var loginBtn = $("#login_submit");

        $(".alert-error").remove();
        if(loginBtn.length == 0) {
            $("#flag-modal-result").prepend(saving);
        }

        $.post(url, em , function(data) {
            if(data.code == 200)
            {
                $("#flag-modal-saving").remove();

                if(data.action == 'login') {
                    $("#flag-modal-result").before(data.form);
                    $("#flag-modal-footer > .btn").text("Cancel");
                    $("#flag-modal-footer").append($("#login_submit"));
                    $(".form-actions").remove();
                    $("#login_submit").on("click", handleLogin);
                }
                else {
                    var result = '<div class="alert alert-success follow-success-alert" style="margin-left:40px;text-align:center">' + data.text + '</div>';
                    $("#flag-modal-result").before(result);
                    $("#flag-modal-footer > .btn").text("Close");
                    $("#login_submit").remove();
                    $("#ajax-login-container").remove();
                    $("#flag-modal-result").hide();
                }

                $(".save-flag-btn").hide();
            }
            else
            {
                var result = '<div class="alert alert-error" style="margin-left:40px;text-align:center">' + data.text + '</div>';
                $("#flag-modal-result").prepend(result);
            }
        })
        .fail(function() { alert("Sorry an error occurred. Please try again."); });
    }

    // TODO move this and follow login handlers into single function
    var handleLogin = function(e) {
        e.preventDefault();
        var ajaxLogin = $('#ajax-login-form');
        var url = ajaxLogin.attr('action');
        var em = ajaxLogin.serialize();
        var loginBtn = $("#login_submit");

        $('#ajax-login-error-row').hide();
        loginBtn.val('One moment ...');
        loginBtn.off("click", handleLogin);

        $.post(url, em , function(data) {
            if(data.code == 200)
            {
                if(data.auth == 'success') {
                    ajaxLogin.remove();
                    $('#ajax-login-error-row').hide();
                    $("#notification__token").val(data.token);
                    $(".save-flag-btn").trigger("click");
                } else {
                    // handle failed login with error message
                    $("#login_submit").on("click", handleLogin);
                    $("#login_submit").val('Sign in');
                    $('#ajax-login-error-row').show();
                }
            }

        });
    };

    /*
    var getPublicationFeed = function() {
        var renderItem = function(data) {
            $(".activity-loading").remove();

            $.each(data, function(index, item) {
                var data = $.parseJSON(item);

                var link = $("<a/>", {
                    href: "/user/" + data.subject,
                    text: data.subjectText
                });

                var p = $("<p/>")
                    .text(data.verb + " this publication")
                    .prepend(link)
                    .appendTo("#item-activity-container");
            });
        };

        var container = $("#item-activity-container");

        $("<div/>")
            .addClass("activity-loading")
            .html("Loading activity&hellip;")
            .appendTo(container);

        $.ajax({
          url: container.data("href"),
          dataType: "json",
          success: renderItem
        });
    };
    */

    var setCounterTarget = function() {
        var inputNode = $(this);
        var selector = inputNode.data("counter-target");
        var target = $(selector);
        target.parent().show();
        inputNode.data("counter-target", target);
    };

    //count text characters
    var updateCounter = function(arg) {
        var inputNode;

        if(!isNaN(parseFloat(arg)) && isFinite(arg)) {
            inputNode = $("[data-counter-wiki]");
        } else {
            inputNode = $(this);
        }
        var text = inputNode.val();
        var newlines = text.match(/\n/g);
        var count = text.length + (newlines ? newlines.length : 0);
        var remaining = inputNode.attr("maxlength") - count;
        var counter = inputNode.data("counter-target");
        counter.text(remaining);

        if (remaining>0) {
            counter
                .removeClass("label-important")
                .addClass("label-info");

        } else {
            counter
                .removeClass("label-info")
                .addClass("label-important");
        }
    };

     var gaTrackEvent = function (e, name, category, href)
     {
          if(typeof ga != 'undefined' && e.which == 1){
               if (!(e.shiftKey || e.altKey || e.metaKey || e.ctrlKey)) {
                  event.preventDefault();
                  // TODO: Investigate hitcallback to change window url
                  // and/or https://developers.google.com/analytics/devguides/collection/analyticsjs/events under Cross Browser Event Tracking
                  ga('send', 'event', name, category, href);
                  window.setTimeout(function(){ window.location = href }, 200);
               } else {
                  ga('send', 'event', name, category, href);
               }
          }
     };

    var buildPublishedDate = function() {
        var datePublished = $(".article-dates time[itemprop=datePublished]").text();
        var hasPMID = $("#article-identifier-pmid").length;

        var container = $("<div/>").addClass("article-publication-date");
        container.attr('id', 'article-pub-date-cont');

        if (hasPMID) {
            $("<span/>", {
                text: "Published "
            }).addClass("article-meta-name").appendTo(container);
        }

        $("<span/>", {
            text: moment(datePublished).format("MMMM D, YYYY")
        }).addClass("article-meta-value").appendTo(container);

        return container;
    };

    var lazyLoadImages = function() {
        if (window.devicePixelRatio > 1) {
            if (typeof lazyLoadXT != 'undefined') {
                $.lazyLoadXT.srcAttr = 'data-src-2x';
            }
        }
    };

    var formatText = function() {
        $('sub[data-jats-arrange="stack"]').superStack();
    };
};

$(PeerJ.Article.Item.init);

/*global PeerJ */

PeerJ.Article.References = new function() {
    this.init = function() {
        addPopovers();

        var references = $("#references");
        references.on("click", ".show-all-authors", expandAuthors);
        references.find(".citation").each(collapseAuthors);
    };

    var popoverContent = function() {
        return getRefForLink(this).html();
    };

    var getRefForLink = function(node) {
        var id = $(node).data("jats-rid").replace(/\./g, "\\.");

        return $("#" + id);
    };

    var addPopovers = function() {
        var options = {
            html: true,
            trigger: "hover",
            placement: "right",
            container: "body",
            content: popoverContent,
            delay: { show: 250, hide: 500 }
        };

        /* add popover to references */
        $("a.xref-bibr").popover(options);
    };

    var collapseAuthors = function() {
        var max = 10;

        var authors = $(this).find(".citation-authors-year [itemprop=author]");

        if (authors.length <= max) {
            return;
        }

        // wrap authors to hide (and separators) in a container
        var hiddenAuthors = authors.slice(max);

        var hiddenNodes = $();

        hiddenAuthors.each(function() {
            // add the previous separator to the list
            var separator = this.previousSibling;

            if (separator && separator.nodeValue.match(/^,\s*$/)) {
                hiddenNodes.push(separator);
            }

            // add this node to the list
            hiddenNodes.push(this);
        });

        hiddenNodes.wrapAll('<span class="hide hidden-authors"/>');

        $("<a/>", {
            href: "#",
            text: "+" + hiddenAuthors.length + " more",
            title: "Show hidden authors"
        }).addClass("show-all-authors").insertAfter(hiddenNodes.parent());
    };

    var expandAuthors = function(event) {
        event.preventDefault();

        var node = $(this);
        node.prev(".hidden-authors").contents().unwrap();
        node.remove();
    };
};

$(PeerJ.Article.References.init);

/*global PeerJ, Article */

PeerJ.Article.RightAffixFollow = new function() {

    this.init = function() {
        var $spy = $('nav.article-sidebar-block.follow');

        $spy.affix({
            offset: {
                top: function() {
                    var todoOffset = $('#article-sidebar-main-content').height();
                    return todoOffset;
                },
                bottom: 170,
            }
        });
    };
};

$(PeerJ.Article.RightAffixFollow.init);

PeerJ.Article.Supplemental = new function() {
    this.init = function() {
        var video = document.createElement("video");

        if (typeof video.canPlayType === "function") {
            $("[data-jats-mimetype=video]").each(addMediaPlayer);
        }
    };

    var addMediaPlayer = function() {
        var container = $(this);

        var mimetype = container.data("jats-mimetype") + "/" + container.data("jats-mime-subtype");

        var video = document.createElement("video");

        if (!video.canPlayType(mimetype)) {
            return;
        }

        video.setAttribute('preload', 'none');
        video.setAttribute('controls', 'controls');

        var download = container.find("a[download][data-rel=supplement]");

        var source = $("<source/>", {
            src: download.attr("href"),
            type: mimetype
        });

        $(video).append(source).insertBefore(download);
    }
}

$(PeerJ.Article.Supplemental.init);

// https://remysharp.com/2010/07/21/throttling-function-calls
PeerJ.Article.Throttle = function (fn, threshold, scope) {
    threshold || (threshold = 250);

    var last;
    var deferTimer;

    return function () {
        var context = scope || this;

        var now = +new Date;
        var args = arguments;

        if (last && now < last + threshold) {
            // hold on to it
            clearTimeout(deferTimer);
            deferTimer = setTimeout(function () {
                last = now;
                fn.apply(context, args);
            }, threshold);
        } else {
            last = now;
            fn.apply(context, args);
        }
    };
}

PeerJ.Article.TodoTwitterAbstract = {

    _saving: false,
    _validationMessageText: '',

    initialised: false,
    articleId: null,
    todoId: null,
    csrf: null,
    url: null,

    get addButton(){
        return document.getElementsByClassName('js-add-twitter-abstract-button');
    },
    get modal(){
        return $('#add-twitter-abstract-modal');
    },
    get urlInput(){
        return document.getElementById('twitter-abstract-url-input');
    },
    get saveButton(){
        return document.getElementById('twitter-abstract-url-save');
    },
    get saving(){
        return this._saving;
    },
    get validationMessage(){
        return document.getElementById('twitter-abstract-validation-message');
    },

    set saving(status){
        this._saving = status;
        if(status){
            this.saveButton.innerHTML = 'Saving...';
            this.saveButton.disabled = true;
            this.urlInput.disabled = true;
        } else {
            this.saveButton.innerHTML = 'Save';
            this.saveButton.disabled = false;
            this.urlInput.disabled = false;
        }
    },
    get validationMessageText(){
        return this._validationMessageText;
    },
    set validationMessageText(message){
        this._validationMessageText = message;
        this.validationMessage.innerHTML = message;
    },

    init: function(){
        this.saving = false;

        var self = this;

        for(var i=0; i<this.addButton.length; i++){
            (function(btn){

                btn.addEventListener('click', function(e){
                    self.articleId = btn.dataset.articleId;
                    self.todoId = btn.dataset.todoId;
                    self.csrf = btn.dataset.csrf;
                    self.url = btn.dataset.url;
                    self.showModal();
                });

            })(this.addButton[i]);
        }

        this.saveButton.addEventListener('click', function(){
            self.save();
        });

        this.initialised = true;
    },

    showModal: function(){
        this.validationMessageText = '';
        this.urlInput.value = this.url ? this.url : '';
        this.modal.modal('show');
    },

    validate: function(twitterLink){
        //Allow empty if a url already existed
        if(this.url && !twitterLink.length) return true;

        var twitterDomain = 'https://twitter.com/';
        return twitterLink.substring(0, twitterDomain.length) == twitterDomain;
    },

    save: function(){
        this.saving = true;
        this.validationMessageText = '';

        var value = this.urlInput.value;
        var valid = this.validate(value);

        if(!valid){
            this.validationMessageText = '<i class="icon-warning-sign"></i> Please enter a valid twitter url';
            this.saving = false;
            return;
        }

        var url = '/todos/save/' + this.articleId + '/' + this.todoId + '/';

        $.ajax({
            url: url,
            method: 'POST',
            data: {
                articleId: this.articleId,
                note: value,
                csrf: this.csrf
            },
            success: function(response){
                if(response.status != 'error'){
                    location.reload();
                } else {
                    this.validationMessageText = response.errors;
                    this.saving = false;
                }
                console.log('Success', response);
            },
            error: function(response){
                this.validationMessageText = 'Sorry, there was an error, please try again.';
                this.saving = false;
            },
            complete: function(){

            }
        });

    }

};

/*global PeerJ, Article */

PeerJ.Article.Todos = new function() {

    this.init = function() {
        getTodos();
    };

    var getTodos = function () {
        var sidebarContent = $('#article-sidebar-main-content');
        var todoUrl = sidebarContent.data('todo-href');
        $.get(todoUrl, function(data) {
            if (data.html) {
                sidebarContent.prepend(data.html);
                $("form.completed-task-form").each(function() {
                    $(this).find("input[type=checkbox]").on("change", saveCompletedTask);
                });
            }
        });
    };

    var saveCompletedTask = function(e) {
        e.preventDefault();

        var input = $(this);
        var form = input.closest("form");

        var help = form.find(".help-saving");
        help.show();

        $.ajax({
            url: form.attr("action"),
            type: form.attr("method"),
            data: form.serialize(),
            success: function(data) {
                // do something
                if (data.status == 'success') {
                    $('#completed-todo-count').text(data.completed + '%');
                    form.attr("action", data.url);
                } else {
                    alert("There was an error saving");
                    input.prop("checked", !input.prop("checked"));
                }

                help.hide();
            },
            error: function() {
                alert("There was an error saving");
                input.prop("checked", !input.prop("checked"));
                help.hide();
            }
        });

        return false;
    };
};

$(PeerJ.Article.Todos.init);

/*global PeerJ, $ */

PeerJ.Publication.TrendMdSidebar = new function() {
    this.init = function() {
        var articleMax = 3;

        var targetNode = document.getElementById('related-research-sidebar');
        var MutationObserver = window.MutationObserver || window.WebKitMutationObserver || window.MozMutationObserver;

        var observer = new MutationObserver(
            function (mutations) {
                mutations.forEach(function (mutation) {
                    if (mutation.type === 'childList' && mutation.addedNodes.length) {
                        var $targetNode = $(targetNode);
                        var widget = $targetNode.find('.trendmd-widget_horizontal');
                        widget.removeClass('trendmd-widget_horizontal');

                        var articles = $targetNode.find('.trendmd-widget-list-item');
                        for (var i=0; i<articles.length; i++) {
                            var article = articles[i];
                            if (i >= articleMax) {
                                article.style.display = 'none';
                            }
                        };
                    }
                });
            });
        observer.observe(targetNode, {attributes: true, childList: true, subtree: true} );
    };
};

$(PeerJ.Publication.TrendMdSidebar.init);

/*global PeerJ, follow */

PeerJ.Event.Follow = new function() {
    var BtnText;

    this.init = function() {
        $(".update-follow-btn").on("click", putFollowForm);
        $("#unfollowModal").on("show", loadUnfollowForm);

        checkIfFollowing();
        $("#settings-below-fold")
            .on("click", ".get-unfollow-form", getFollowForm);

        $(".notification-actions-btn")
            .on("click", ".unfollow-btn", unfollowItem);

        $(".follow-btn").on("click", getFollowForm);
        $(".notification-actions-btn")
            .on("click", ".follow-submit", followItem);
    };

    // TODO move this and flag login handlers into single function?
    var handleLogin = function() {
        var ajaxLogin = $('#ajax-login-form');
        var url = ajaxLogin.attr('action');
        var em = ajaxLogin.serialize();
        var loginBtn = $("#login_submit");

        $('#ajax-login-error-row').hide();
        loginBtn.val('One moment ...');
        loginBtn.off("click", handleLogin);

        $.post(url, em , function(data) {
            if(data.code == 200)
            {
                if(data.auth == 'success') {
                    ajaxLogin.remove();
                    $("#notification__token").val(data.token);
                    $('#ajax-login-error-row').hide();
                    $(".save-follow-btn").trigger("click");
                } else {
                    // handle failed login with error message
                    $("#login_submit").on("click", handleLogin);
                    $("#login_submit").val('Sign in');
                    $('#ajax-login-error-row').show();
                }
            }

        });
    };

    var putFollowForm = function(e) {
        e.preventDefault();
        var url = $('form#article-unfollow-form').data('href');
        var em = $('form#article-unfollow-form').serialize() + "&_method=PUT";
        var saving = '<div style="margin-left:40px;"><span class="label label-success" id="follow-modal-saving">Saving ...</span></div>';

        $(".alert-error").remove();
        $("#unfollow-form-load-result").prepend(saving);

        $.post(url, em , function(data) {
            $("#follow-modal-saving").remove();
            if(data.code == 200)
            {
                var result = '<div class="alert alert-success" style="margin-left:40px;text-align:center">' + data.text + '</div>';
                $(".update-follow-btn").show();
                $("#unfollow-form-load-result").html(result);
                $("#unfollowModal").modal("hide");
            }
            else
            {
                var result = '<div class="alert alert-error" style="margin-left:40px;text-align:center">' + data.text + '</div>';
                $("#unfollow-form-load-result").prepend(result);
            }
        })
        .fail(function() { alert("Sorry an error occurred. Please try again."); });
    }

    var unfollowForm = function() {
        var btnUnfollow = $(this);
        var token = $("#notification__token").val();
        var url = btnUnfollow.data('href');

        btnUnfollow.text("One moment ...");

        var onSuccess = function(data) {
           if(data.code != 200) {
                if(data.text) {
                    alert(data.text);
                } else {
                    alert('Sorry, but an error occurred while trying to unfollow. Please try again.');
                }
                btnUnfollow.text("Unfollow");
            }
            else {
                btnUnfollow.text("You have been unsubscribed.");
                $(".update-follow-btn").hide();
                var followBtn = '<a href="#followModal" class="btn btn-success" id="item-left-follow-btn" data-toggle="modal"><span title="Receive article updates" data-toggle="tooltip"> Follow</span></a>';
                // TODO: convert above to use jQuery to generate div rather than constructing by string
                //followBtn.toggleClass("btn-mini", isMiniButton);
                $("#item-left-unfollow-btn").before(followBtn);
                $("#item-left-unfollow-btn").remove();
                $("#item-left-follow-btn").show();
                $(".save-follow-btn").show();
                $("#follow-modal-result").show();
                $(".follow-success-alert").remove();
            }
        }

        var onError = function(jqXHR) {
            alert('Sorry, but an error occurred while trying to unfollow. Please try again.');
            btnUnfollow.show();
            $(".unfollowing-tmp-btn").remove();
        }

        $.ajax({
          url: url,
          type: "POST",
          dataType: "json",
            data: {
                  'notification[_token]': token,
                  '_method': 'DELETE'
             },
          success: onSuccess,
          error: onError
        });

    }

    var unfollowItem = function(e) {
        e.preventDefault();

        var btn = $(this);
        var form = btn.closest("form");
        var container = btn.closest(".notification-actions-btn");
        btn.html('<i class="icon-spinner icon-spin"></i>');

        $.ajax({
            type: form.attr("method"),
            url: form.attr("action"),
            data: form.serialize(),
            success: function(data) {
                if (data.code != 200) {
                    alert(data.text);
                } else {
                    container.html(data.html);
                    container.find("form").show();
                }
            },
            error: function() {
                alert("There was an error handling this unfollow");
            }
        });
    };

    // Loads unfollow form if needed after article/preprint loads
    var checkIfFollowing = function() {
        var followDesktop =  $("#notification-actions");

        if (followDesktop.is(":visible")) {
            var hasCheckUrl = followDesktop;
        } else {
            var hasCheckUrl = $("#notification-actions-mobile");
        }

        if (hasCheckUrl.length == 0) {
            return false;
        }

        var url = hasCheckUrl.data('href');

        var onError = function() {
            return false;
        }

        var onSuccess = function(data) {
            if (data.isFollowing) {
                hasCheckUrl.html(data.html);
            }
        }

        $.ajax({
          url: url,
          dataType: "json",
          success: onSuccess,
          error: onError
        });
    };

    var triggerFollowClick = function() {
        $(".follow-btn.hasFollowClick").trigger("click");
    };

    var getFollowForm = function()
    {
        var btnFollow = $(this);
        btnFollow.addClass('hasFollowClick');
        btnText = btnFollow.text();
        var url = btnFollow.data('href');
        var parent = btnFollow.closest(".notification-actions-btn");

        btnFollow.html('<i class="icon-spinner icon-spin"></i>');

        var onSuccess = function(data) {
           var code = data.code;
           if (code == 401) {
                // Run authentication extension
                $("#ajax-form").peerjAuthenticate({
                    onAuthenticate: triggerFollowClick,
                    html: data.html
                });

                btnFollow.text(btnText);

                return false;

            } else if (code != 200 && code != 202) {
                if(data.text) {
                    alert(data.text);
                } else {
                    alert('Sorry, but an error occurred. Please try again.');
                }
                btnFollow.text(btnText);
            } else {
                parent.append(data.html);
                parent.find('form').hide();

                var submit = parent.find('.follow-submit');
                if (submit.length == 0) {
                    // Check if unfollow instead
                    submit = parent.find('.unfollow-btn');
                }

                submit.trigger("click");

                // remove signup CTA if present
                var signup = $("#article-signup-p");
                if (signup.length) {
                    signup.fadeOut("slow");
                }
            }
        }

        var onError = function(jqXHR) {
            alert('Sorry, but an error occurred while trying to follow. Please try again.');
            btnFollow.text('Follow');
        }

        $.ajax({
            type: "post",
            url: url,
            data: {
                '_method': 'POST'
            },
            dataType: 'json',
            success: onSuccess,
            error: onError
        });
    };

    var followItem = function(e)
    {
        e.preventDefault();
        var form = $(this).closest('form');
        var btn = form.find('button');

        if (form.find('.icon-spin').length == 0) {
            btn.html('<i class="icon-spinner icon-spin"></i>');
        }

        $.ajax({
            type: form.attr("method"),
            url: form.attr("action"),
            data: form.serialize(),
            success: function(data) {
                form.parent().html(data.html);
            },
            error: function() {
                btn.txt(btnText);
                alert("There was an error handling this follow");
            }
        });
    };

    var buildEmailLabel = function (type, container, li)
    {
        var label;
        var dropdown;
        var switchDropdown = li.parent();
        var header = '<li class="li-heading">Switch to</li>';
        var currentLabel = container.find(".ns-email-label");
        var timeRow = container.find(".ns-time-label");

        switch(type) {
            case 'daily':
                label = '<span class="label label-warning ns-email-label">daily email</span> ';
                dropdown = header + '<li data-notify="null">No email digest</li><li data-notify="weekly">Weekly email digest</li>';
                break;

            case 'weekly':
                label = '<span class="label label-success ns-email-label">weekly email</span> ';
                dropdown = header + '<li data-notify="null">No email digest</li><li data-notify="daily">Daily email digest</li>';
                break;

            default:
                label = '<span class="ns-email-label"></span> ';
                dropdown = header + '<li data-notify="daily">Daily email digest</li><li data-notify="weekly">Weekly email digest</li>';
                break;
        }
        timeRow.before(label);
        currentLabel.remove();

        // Update dropdown choices
        $(switchDropdown).html(dropdown);
        $(".switch-notification-email > li")
            .off("click", switchNotificationEmail)
            .on("click", switchNotificationEmail);
    }

    var loadUnfollowForm = function() {
        var url = $("#unfollow-form-load-result").data("href");
        $("#unfollow-form-load-result").load( url, function(response, status, xhr)
        {
            $(".unfollow-item-btn")
                .on("click", unfollowForm);

            if (status == "error") {
                var msg = "<div class='alert alert-error'>Oops. We have a problem. Please close and try again. Error: ";
                $("#unfollow-form-load-result").html(msg + xhr.status + " " + xhr.statusText + "</div>");
            }
         });
    }

};


/*global PeerJ */

PeerJ.Article.External = new function() {
    this.init = function() {
        $("#metricsModal").one("shown", addExternals);
    }

    var addExternals = function() {
        // May 2018 - For GDPR we no longer autoload social widgets due to tracking.
        // Social buttons now loaded directly in modal without triggering external javascript and cookie inserts
        // Twitter
        // if (!document.getElementById("twitter-wjs")) {
        //     insertScript("//platform.twitter.com/widgets.js", "twitter-wjs");
        // }
        
        // Facebook
        // if (!document.getElementById("facebook-jssdk")) {
        //     var appId = $('head > meta[property="fb:app_id"]').attr('content');
        //
        //     insertScript("https://connect.facebook.net/en_GB/sdk.js#" + $.param({
        //         xfbml: 1,
        //         version: 'v2.0',
        //         appId: appId
        //     }), "facebook-jssdk");
        // }

        if (!document.getElementById('altmetric-button')) {
            var embed = $('.altmetric-embed');
            var doi = embed.data('doi');

            $.getJSON('https://api.altmetric.com/v1/doi/' + doi).then(function(data) {
                var link = $('<a/>', {
                    target: '_blank',
                    href: 'http://www.altmetric.com/details/' + data.altmetric_id
                });

                var icon = $('<img/>', {
                    src: 'https://d1uo4w7k31k5mn.cloudfront.net/v2/' + Math.ceil(data.score) + '.png',
                    alt: 'Altmetric button',
                    id: 'altmetric-button'
                }).css({
                    width: '88px',
                    height: '18px',
                    border: 'none'
                });

                link.append(icon).appendTo(embed);
            });
        }

        // Altmetric
        //insertScript("https://d1bxh8uas1mnw7.cloudfront.net/assets/embed.js");
    };

    var insertScript = function(url, id) {
        var script = document.createElement("script");
        //script.setAttribute("async", "async");
        script.setAttribute("type", "text/javascript");
        script.setAttribute("src", url);

        if (id) {
            script.setAttribute("id", id);
        }

        document.getElementsByTagName("head")[0].appendChild(script);
    };
};

$(PeerJ.Article.External.init);

PeerJ.Annotation.Accept = new function() {
    this.init = function() {
        $(document).on("click", "a.annotation-accept", acceptAnswer)
    };

    var acceptAnswer = function(event) {
        event.preventDefault();

        var button = $(this);
        var annotation = button.closest(".annotation");

        button.addClass("annotation-saving");

        $.ajax({
            type: "PUT",
            url: button.attr("href"),
            data: {
                accept: !annotation.hasClass("annotation-accepted"),
                _token: button.data("token")
            },
            dataType: "text",
            success: function(data) {
                button.removeClass("annotation-saving");
                annotation.toggleClass("annotation-accepted", data['accepted']);
                // TODO: improve this - need to update other "accept" buttons
                window.location.reload();
            },
            error: function(xhr) {
                button.removeClass("annotation-saving");
                button.addClass("annotation-saving-error");
            }
        });
    };
};

$(PeerJ.Annotation.Accept.init);

PeerJ.Annotation.DeleteAnnotation = new function() {
    this.init = function() {
        $(document).on("submit", ".form-annotation-delete", deleteItem);
    };

    var deleteItem = function(event) {
        event.preventDefault();

        if (!confirm("Are you sure you want to delete this item?")) {
            return false;
        }

        var form = $(this);
        var button = form.find(":submit");

        button.removeClass("btn-danger").addClass("btn-warning")
            .html("Deleting&hellip;");

        $.ajax({
            type: "POST",
            url: form.attr("action"),
            data: form.serialize(),
            dataType: "text",
            error: function(xhr) {
                button
                    .removeClass("btn-warning").addClass("btn-danger")
                    .text("Error").closest("form").css("opacity", 1);
            },
            success: function(data) {
                var annotation = form.closest(".annotation");

                annotation.next(".annotation-section").remove();

                annotation.fadeOut(function() {
                    annotation.remove();

                    if (typeof PeerJ.Article.Annotation == "undefined") {
                        // if on a question page and no annotations left (i.e deleted), redirect elsewhere
                        if (!countAnnotations()) {
                            var target = detectTarget();
                            if (target) {
                                // go to the target document, if there is one
                                window.location = target.replace(/#.*/, "");
                            } else {
                                // go to the home page
                                window.location = $(".brand").attr("href");
                            }
                        }
                    } else {
                        // article page - update annotation counts
                        PeerJ.Article.Annotation.updateCounts();

                        var motivation = annotation.data("motivation");
                        var count = PeerJ.Article.Annotation.getMotivationCount(motivation);
                        PeerJ.Article.Annotation.setMotivationCounts(motivation, count - 1);
                    }
                });
            }
        });
    };

    var countAnnotations = function() {
        return $(".annotation").length;
    };

    var detectTarget = function() {
        return $(".annotation-target-title").attr("href");
    };
};

$(PeerJ.Annotation.DeleteAnnotation.init);

PeerJ.Annotation.Form = new function() {
    this.init = function() {
        $(document)
            .on("click", "[data-toggle=annotation-form]", showForm)
            .on("click", ".annotation-cancel", cancelForm)
            .on("submit", ".form-annotation", saveAnnotation);

        if ($(".open-ask-form").length) {
            $("[data-toggle=annotation-form]")
                .trigger("click");
        }

        if ($("#annotation-create-question-btn-clone").length) {
            $("#annotation-create-question-btn-clone")
                .on("click", function() {
                    $("#annotation-create-question")
                        .trigger("click");
                });
        }
    };

    var showForm = function(event) {
        event.preventDefault();

        var node = $(this);

        var target = node.data("target");

        if (target) {
            if (target == "add-answer") {
                $(".annotation-add-answer").trigger("click");
                return;
            }
            var container = $(target);
        } else {
            var parent = node.closest(".annotation,.annotation-section");

            if (!parent.length) {
                parent = node.closest(".annotations-positioned");
            }

            var container = parent.find(".annotation-form-container").last();
        }

        container.html('<div style="text-align:center;font-weight:bold">one moment&hellip;</div><div class="progress progress-striped active"><div class="bar bar-info" style="width: 100%;"></div></div>').show();

        $.ajax({
            url: this.href,
            success: function(data) {
                container.html(data).find(":input:visible:first").focus();
                if ($(".search-annotation-form").length) {
                    container.append('<hr>');
                }

                var selector = container.closest("[data-selector]").data("selector");
                if (selector) {
                    container.find("input#question_annotation_selector").val(selector);
                }

                $("[data-counter-target]")
                    .each(setCounterTarget)
                    .on("keyup", updateCounter)
                    .trigger("keyup");

                //node.hide();
                $(".add-annotation,.close-annotations", container.parent()).hide();
                PeerJ.Annotation.Target.scrollTo(container);
            },
            error: function(xhr) {
                switch (xhr.status) {
                    case 401:
                        container.html(xhr.responseText).show()
                        break;

                    default:
                        alert("There was an error fetching the form");
                        break;
                }
            }
        });
    }

    var cancelForm = function(event) {
        event.preventDefault();

        $(this).closest(".annotation-form-container").fadeOut("fast", function() {
            $(this).empty();
        });

        // close parent if no other questions
        var parent = $(this).closest(".annotations-positioned");
        if (parent.find(".annotation-container").length) {
            $(".add-annotation,.close-annotations").show().children().show();
            $(".annotation-actions").children().show();
        } else {
            $(".close-annotations").trigger("click");
        }
    };

    var saveAnnotation = function(event) {
        var form = $(this);
        // For orphan questions do post non-ajax and redirect to landing page via controller.
        if ($("#annotation-question-create-container[data-nonajaxpost]").length) {
            return;
        }

        var button = form.find(":submit");

        button
            .removeClass("btn-primary").addClass("btn-warning")
            .html("Saving&hellip;");

        event.preventDefault();

        var url = form.attr("action");

        $.ajax({
            type: "POST",
            url: url,
            data: form.serialize(),
            dataType: "html",
            error: function(xhr) {
                button
                    .removeClass("btn-warning").addClass("btn-danger")
                    .text("Error").css("opacity", 1);
            },
            statusCode: {
                201: function(data, status, jqXHR) {
                    // form at the top of annotation index page
                    if (form.closest(".annotation-index-form").length) {
                        window.location.reload();
                        return;
                    }

                    var url = jqXHR.getResponseHeader('x-location');

                    if (needsCounts(form)) {
                        url += "?_counts=1";
                    }

                    $.get(url, function(data) {
                        var annotation = $(data);

                        form.closest(".annotation-form-container")
                            .prevAll(".add-annotation").last().before(annotation);

                        form.remove();
                        annotation.fadeIn();

                        window.location.hash = annotation.attr("id");
                        PeerJ.Annotation.Popover.add(annotation);
                        MathJax.Hub.Queue(["Typeset", MathJax.Hub, annotation.get(0)]);

                        if (typeof PeerJ.Article.Annotation != "undefined") {
                            PeerJ.Article.Annotation.updateCounts();

                            var motivation = annotation.data("motivation");
                            var count = PeerJ.Article.Annotation.getMotivationCount(motivation);
                            PeerJ.Article.Annotation.setMotivationCounts(motivation, count + 1);
                        }
                        // Better way? Assumes 201 only for new answers
                        if (annotation.closest("[data-motivation=answering]").length) {
                            $(".annotation-add-answer").remove();
                        }
                        $(".add-annotation").show();
                    });
                },
                204: function(data, status, jqXHR) {
                    var url = jqXHR.getResponseHeader('x-location');

                    if (needsCounts(form)) {
                        url += "?_counts=1";
                    }

                    $.get(url, function(data) {
                        var annotation = $(data);

                        form.closest(".annotation,.annotations")
                            .replaceWith(annotation).fadeIn();

                        //window.location.hash = annotation.attr("id");
                        PeerJ.Annotation.Popover.add(annotation);
                        MathJax.Hub.Queue(["Typeset", MathJax.Hub, annotation.get(0)]);

                        if (typeof PeerJ.Article.Annotation != "undefined") {
                            PeerJ.Article.Annotation.updateCounts();
                        }

                        $(".add-annotation").show();
                    });
                },
                400: function(xhr) {
                    form.replaceWith(xhr.responseText).fadeIn();
                }
            }
        });
    };

    var needsCounts = function(form) {
        if (form.closest(".annotations[data-counts]").length) {
            return true;
        }

        if (form.closest(".annotations").data("counts")) {
            return true;
        }

        return false;
    };

    var setCounterTarget = function() {
        var inputNode = $(this);
        var selector = inputNode.data("counter-target");
        var target = $(selector);

        target.parent().show();
        inputNode.data("counter-target", target);
    };

    //count text characters
    var updateCounter = function() {
        var inputNode = $(this);

        var text = inputNode.val();
        var newlines = text.match(/\n/g);
        var count = text.length + (newlines ? newlines.length : 0);
        var remaining = inputNode.data("ideallength") - count;

        var counter = inputNode.data("counter-target");

        counter.text("total: " + count);

    };

};

$(PeerJ.Annotation.Form.init);

PeerJ.Annotation.IncrementView = new function() {
    this.init = function() {
        // Set a timer to only count intentional pageviews
        setTimeout(function () {
            if (!navigator.userAgent.match(/bot|crawl|spider|scrap/i)) {
                increment();
            }
        }, 2000);
    };

    var increment = function() {
        var allowedAnnotations = ['questioning', 'commenting', 'faq', 'staff'];
        var paths = {
            'questioning': 'questions',
            'commenting': 'comments',
            'faq': 'questions/faq',
            'staff': 'questions/staff'
        };
        var content = document.getElementById('annotation-container');
        var motivation = content.getAttribute('data-motivation');
        var id = content.getAttribute('data-id');

        if (allowedAnnotations.indexOf(motivation) >= 0) {
            $.ajax({
                type: "GET",
                url: '/' + paths[motivation] + '/' + id + '/increment/',
                dataType: "json"
            });
        }
    };
};

$(PeerJ.Annotation.IncrementView.init);

PeerJ.Annotation.Popover = new function() {
    this.add = function(annotation) {
        annotation.find("[data-toggle=popover]").popover({
            trigger: "hover",
            placement: "right",
            container: "body"
        });
    };
};

PeerJ.Annotation.Publish = new function() {
    this.init = function() {
        $(document).on("click", ".form-annotation-public :submit", setPublic);
    };

    var setPublic = function(event) {
        event.preventDefault();

        var button = $(this);
        button.addClass("btn-warning");

        var form = button.closest("form");

        var text = button.find(".button-text");
        text.data("original", text.text()).text(text.data("status"));

        $.ajax({
            type: "PUT",
            url: form.attr("action"),
            data: {
                _token: form.find("[name=_token]").val(),
                isPublic: button.val()
            },
            dataType: "json",
            error: function(xhr) {
                button.removeClass("btn-warning").addClass("btn-danger");
                text.text("Error");
                form.css("opacity", 1);
            },
            success: function(data) {
                button.removeClass("btn-warning");
                text.text(text.data("original"));
                form.css("opacity", 1);
                form.closest(".annotation").toggleClass("annotation-public", data.isPublic);
            }
        });
    };
};

$(PeerJ.Annotation.Publish.init);

PeerJ.Annotation.Social = new function() {
    this.init = function() {
        $(document).on("click", ".annotation-social", openSocialWindow);
    };

    var openSocialWindow = function(event) {
        event.preventDefault();
        window.open(this.href, "popupwindow", "width=500,height=500,scrollbars,resizable");
    }
};

$(PeerJ.Annotation.Social.init);

PeerJ.Annotation.Target = new function() {
    this.init = function() {
        $(window).on("hashchange", PeerJ.Annotation.Target.showAnnotation).trigger("hashchange");
    };

    this.showAnnotation = function() {
        if (!window.location.hash) {
            return;
        }

        var hash = window.location.hash;
        var $node = $(hash);

        if (!$node.length) {
            return;
        }

        // if it's not an annotation, just scroll it into view
        if (!$node.is(".annotation")) {
            // if it's a tab pane, click the appropriate tab
            if ($node.is(".tab-pane")) {
                var tab = activateTab(hash);

                PeerJ.Annotation.Target.scrollTo(tab.closest(".nav-tabs"));
            } else {
                PeerJ.Annotation.Target.scrollTo($node);
            }

            return;
        }

        // if it is an annotation, set it as active and open the target element
        $node.addClass("annotation-active");
        var selector = $node.closest(".annotation-container").data("selector");

        if (selector) {
            var node = $(selector);
            if (!node.hasClass("plink-active")) {
                node.find(".plink-content").click();
            }
        } else {
            // if the parent tab is not active, activate it
            var parentTab = $node.closest(".tab-pane:hidden");

            if (parentTab.length) {
                activateTab("#" + parentTab.attr("id"));
            }

            PeerJ.Annotation.Target.scrollTo($node);
        }
    }

    var activateTab = function(hash) {
        var tab = $("a[data-toggle=tab]").filter(function () {
            return $(this).attr("href") === hash;
        });
        
        tab.click();

        return tab;
    }

    var navbarHeight = function() {
        var navbar = $(".navbar-fixed-top:visible");
        if (navbar.length) {
            return navbar.height();
        }

        var navbar = $(".item-top-navbar:visible");
        if (navbar.length) {
            return navbar.height();
        }

        return 0;
    };

    this.scrollTo = function($node) {
        if (!$node.length) {
            return;
        }

        var offset = $node.offset().top - (navbarHeight() + 10);
        $("html,body").animate({ scrollTop: offset + "px" });
    }
};

$(PeerJ.Annotation.Target.init);

PeerJ.Annotation.Vote = new function() {
    this.init = function() {
        $(document).on("click", ".annotation-vote", setVote);
    };

    var setVote = function(event) {
        event.preventDefault();

        var node = $(this);
        var annotation = node.closest(".annotation");

        if (node.hasClass("annotation-vote-disabled")) {
            if (!PeerJ.User.anonymous) {
                return false; // TODO: show tooltip?
            }
        }

        node.addClass("annotation-vote-saving");

        var vote = node.hasClass("annotation-voted") ? 0 : node.data("vote");
        var form = annotation.find(".form-annotation-vote");

        form.find("input[name=vote]").val(vote);

        $.ajax({
            type: "PUT",
            url: form.attr("action"),
            data: form.serialize(),
            dataType: "json",
            success: function(data) {
                showVote(form, data);
                node.removeClass("annotation-vote-saving");
            },
            error: function(xhr, data) {
                node.removeClass("annotation-vote-saving");

                switch (xhr.status) {
                    case 403:
                        // TODO: show tooltip
                        break;

                    case 401:
                        annotation.find(".annotation-form-container")
                            .html(xhr.responseText).show()
                        break;

                    default:
                        alert('Sorry, there was an error saving this vote');
                }
            }
        });
    };

    var showAuthenticationOptions = function(annotation) {
        $.ajax({
            url: annotation.find("link[rel=alternate][type='text/html']").attr("href") + "../index.form",
            success: function() {
              window.location.reload();
            },
            error: function(xhr) {
                annotation.find(".annotation-form-container").html(xhr.responseText).show();
            }
        });
    }

    var showVote = function(form, data) {
        var annotation = form.closest(".annotation");
        annotation.find(".annotation-score").text(data.score);
        annotation.find(".annotation-voted").removeClass("annotation-voted");

        if (data.vote != 0) {
            annotation.find(".annotation-vote").filter(function() {
                return $(this).data("vote") == data.vote;
            }).addClass("annotation-voted");
        }
    };
};

$(PeerJ.Annotation.Vote.init);

(function( $ ) {

    $.fn.peerjAuthenticate = function(options) {

        var container = this;
        var defaults = {
            // Default option settings
            onAuthenticate: function() {},
            form: 'register',/* which form to show as default. register|login */
            html: null,
            reload: false
        };

        var settings = $.extend( {}, defaults, options );

        container.html(settings.html);
        initializeModal();

        function initializeModal() {
            var modal = container.find('#loginsignup-dialog');
            var nodeContainer = container.find('.loginsubmit-form-inputs');
            if (settings.form == 'register') {
                var initialForm = document.getElementById('loginsubmit-signup-form');
            } else {
                var initialForm = document.getElementById('loginsubmit-login-form');
            }
            var clonedInitial = initialForm.cloneNode(true);

            nodeContainer.html(clonedInitial);

            if (settings.form == 'register') {
                setUpRegistrationActions(nodeContainer);
            }

            if (modal.length) {
                modal.modal();

                // Prevent body from scrolling. Can remove if upgrade to Bootstrap 3.0
                // http://stackoverflow.com/questions/9538868/prevent-body-from-scrolling-when-a-modal-is-opened
                $("body").addClass("modal-open");
                modal.on("hidden", function () {
                      $("body").removeClass("modal-open");
                });
                modal.on("change", '#loginsubmit-academic-rank-row select', selectRank).change();
                $('#loginsubmit-academic-rank-row select').change();
                setupModalActions(nodeContainer);
            }
        };

        function setupModalActions(nodeContainer) {
            // Click handlers
            nodeContainer
                .on('click', '.switch-loginsubmit-form', function(e) {
                    e.preventDefault();

                    var formId = $(this).data('id');
                    var form = document.getElementById(formId);
                    var cloned = form.cloneNode(true);
                    nodeContainer.html(cloned);
                    if (formId == 'loginsubmit-signup-form') {
                        setUpRegistrationActions(nodeContainer);
                    }
                    $('#loginsubmit-academic-rank-row select').change();
                });

            // Handle cancel and post-submit events
            container
                .on('click', '#modal-cancel', function() {
                    destroyModal();
                });

            // Trigger actual hidden submit button to run html5 form validators
            container
                .on('click', '#modal-submit', function() {
                    container.find(':submit').click();
                });

            $('#login-form')
                .on('submit', function(e) {
                    e.preventDefault();
                    setupAuthenticationPost();
                });

            container
                .on('click', '#terms-view', function(e) {
                    e.preventDefault();
                    viewTerms();
                });


        };

        function setUpRegistrationActions(nodeContainer) {
            var emailNode = nodeContainer.find('#fos_user_registration_form_email');
            var emailFeedbackDiv = nodeContainer.find('#loginsubmit-show-email');
            var emailFeedbackSpan = emailFeedbackDiv.find('span');
            var password = nodeContainer.find('#fos_user_registration_form_plainPassword');
            var passwordCheckNode = nodeContainer.find('#loginsubmit-show-password');

            // Setup email feedback
            emailNode
                .on('keyup', function() {
                    emailFeedbackDiv.slideDown(800);
                    emailFeedbackSpan.text(emailNode.val());
                });

            // Setup visible password feedback
            passwordCheckNode
                .on('click', function() {
                    passwordCheckNode.text(password.val());
                    nodeContainer.find('.loginsubmit-small-password-help').show();
                    password
                        .on('keyup', function() {
                            passwordCheckNode.text(password.val());
                        });
                });
        }

        function setupAuthenticationPost() {

            var btn = $(this);
            var form = container.find('form');
            var nodeContainer = form.find('.loginsubmit-form-inputs');
            var url = form.find('.switch-loginsubmit-form').data('href');
            var msgContainer = $('#modal-server-message');
            var loginError = form.find('.loginsubmit-password-reset');
            var loader = $('.peerj-authenticate-bubblingG');
            var buttons = $('.authentication-copy-btn');

            // Clear old error messages
            loginError.hide();
            msgContainer.text('');

            // Disable button
            buttons.hide();
            loader.show();

            msgContainer.text('');

            $.ajax({
                type: 'post',
                url: url,
                data: form.serialize(),
                dataType: "json",
                success: function(data) {
                    if (data.code == 200 && data.auth == 'success') {
                        destroyModal();
                        if (data.nav) {
                            $('.navbar-fixed-top').remove();
                            $('body').prepend(data.nav);
                            $(PeerJ.Search.Nav.init);
                        }

                        // Perform any callback
                        settings.onAuthenticate.call();

                    } else {
                        if (data.auth == false) {
                            loginError.show();
                        }
                        if (data.signup == false) {
                            nodeContainer.html(data.html);
                            setUpRegistrationActions(nodeContainer);
                            msgContainer.text('There was a problem creating your account. See above for errors to correct.');
                        }
                        btn.prop("disabled", false);
                        btn.removeClass('disabled');
                    }

                    buttons.show();
                    loader.hide();
                }
            });
        };

        function viewTerms() {
            var url = $('#terms-view').data('href');
            var termsElems = $('.signup-terms-container');
            var signupElems = $('.authentication-copy');
            $('#modal-server-message').html('');

            if($('#terms-details').html().trim()) {
                    termsElems.show();
            } else {
                $.ajax({
                    url: url,
                    success: function(data) {
                        if(data.code==400) {
                            return;
                        }
                        $('#terms-details').html(data.r);
                        termsElems.show();
                    }
                },"json");
            }
            signupElems.hide();

            $('#ret-sign').click(function() {
                termsElems.hide();
                signupElems.show();
            });
        }

        function destroyModal() {
            var modal = container.find('.modal');
            modal.modal('hide');

            modal
                .on('hidden', function () {
                    container.html('');
                    $('.modal-backdrop').remove();
                });
        };
        function selectRank(e) {
            var $rankOtherText = $('#loginsubmit-academic-rank-other');
            $rankOtherText.toggle($(this).find('option:selected').text() === 'Other');
        };
    };
}( jQuery ));
