var Popup = function ($) {
    function Popup(option) {
        option && (
            this._option = option,
            this._initChk = !1,
            this._$win = $(window),
            this._$wrap = $("body"),
            this._btnSelector = option.btnSelector,
            this._popupSelector = option.popupSelector, "object" == typeof
            this._popupSelector && (this._popupSelector = this._popupSelector.selector),
            this._clone = void 0 != option.clone && option.clone,
            this._panelClass = void 0 == option.panelClass ? null : option.panelClass,
            this._drag = void 0 != option.drag && option.drag,
            this._dimmed = void 0 == option.dimmed || option.dimmed,
            this._dimmedColor = void 0 == option.dimmedColor ? "rgba(255,255,255,.0)" : option.dimmedColor,
            this._$dimmed = $("<div>", { class: "dimmed-layer" }),
            this._closeSelector = void 0 == option.closeSelector ? ".pop-header button" : option.closeSelector,
            this._okSelector = void 0 == option.okSelector ? ".js-ok" : option.okSelector,
            this._cancelSelector = void 0 == option.cancelSelector ? ".js-cancel" : option.cancelSelector,
            this._yesSelector = void 0 == option.yesSelector ? ".js-yes" : option.yesSelector,
            this._noSelector = void 0 == option.noSelector ? ".js-no" : option.noSelector,
            this._$btn = $(this._btnSelector).addClass("js-popup-btn"),
            this._clone ? ($(this._popupSelector).hide(),
                this._$popup = $(this._popupSelector + ":not(.js-popup)").eq(0).clone().addClass("js-popup").css("z-index", "2000").hide(),
                this._$popup.find(".js-sub-select").removeClass("js-sub-select"),
                this._$popup.find(".js-sub-tree").removeClass("js-sub-tree"),
                $(this._popupSelector + ":not(.js-popup)").eq(0).after(this._$popup)) : (this._$popup = $(this._popupSelector).addClass("js-popup").css("z-index", "2000").hide(),
                this._$popupBackup = this._$popup.clone()),

            this._keyEvt = function () {

                var _this = this;
                this._$popup.bind("keydown.popup", function (e) {
                    27 == e.keyCode && _this.hide()
                }), this._$popup.find("a, button, input").each(function (i) {
                    $(this).data("popup-focus-idx", i)
                }), this._$popup.bind("keydown.popup", function (e) {
                    if (!($(e.target).filter(":input").size() > 0)) {
                        if (9 == e.keyCode && e.shiftKey && $(this).is(":focus")) return $(this).find("a:visible, button:visible, input:visible").eq(-1).focus(), !1;
                        if (38 == e.keyCode || 37 == e.keyCode) {
                            if ($(this).is(":focus")) $(this).find("a:visible, button:visible, input:visible").eq(-1).focus();
                            else {
                                for (i = getFocusIdx = $(this).find(":focus").data("popup-focus-idx"); i >= 0 && (getFocusIdx--, !($(this).find("a, button, input").eq(getFocusIdx).is(":visible") || $(this).find("a, button, input").eq(getFocusIdx).parent().hasClass("check") && $(this).find("a, button, input").eq(getFocusIdx).parent().is(":visible") || $(this).find("a, button, input").eq(getFocusIdx).parent().hasClass("radio-des") && $(this).find("a, button, input").eq(getFocusIdx).parent().is(":visible"))); i--);
                                $(this).find("a, button, input").eq(getFocusIdx).focus(), getFocusIdx < 0 && $(this).find("a:visible, button:visible, input:visible").eq(-1).focus()
                            }
                            return !1
                        }
                        if (40 == e.keyCode || 39 == e.keyCode) {
                            if ($(this).is(":focus")) $(this).find("a:visible, button:visible, input:visible").eq(0).focus();
                            else {
                                for (var getFocusIdx = $(this).find(":focus").data("popup-focus-idx"), i = getFocusIdx; i < $(this).find("a, button, input").length && (++getFocusIdx >= $(this).find("a, button, input").length && (getFocusIdx = 0), !($(this).find("a, button, input").eq(getFocusIdx).is(":visible") || $(this).find("a, button, input").eq(getFocusIdx).parent().hasClass("check") && $(this).find("a, button, input").eq(getFocusIdx).parent().is(":visible") || $(this).find("a, button, input").eq(getFocusIdx).parent().hasClass("radio-des") && $(this).find("a, button, input").eq(getFocusIdx).parent().is(":visible"))); i++);
                                $(this).find("a, button, input").eq(getFocusIdx).focus()
                            }
                            return !1
                        }
                    }
                }), this._$popup.find("a, button, input").eq(-1).bind("keydown.popup", function (e) {
                    if (9 == e.keyCode && !e.shiftKey && $(this).is(":focus")) return _this._$popup.focus(), !1
                })
        }, this._btnEvt = function () {
            var _this = this;
            "function" == typeof this._option.ok && this._$popup.find(this._okSelector).bind("click.popup", function () {
                _this._option.ok()
            }), "function" == typeof this._option.cancel && this._$popup.find(this._cancelSelector).bind("click.popup", function () {
                _this._option.cancel()
            }), "function" == typeof this._option.yes && this._$popup.find(this._yesSelector).bind("click.popup", function () {
                _this._option.yes()
            }), "function" == typeof this._option.no && this._$popup.find(this._noSelector).bind("click.popup", function () {
                _this._option.no()
            }), this._$popup.find(this._closeSelector).bind("click.popup", function () {
                _this.hide()
            })
        }, this._rgbToHex = function (rgb) {
            return (rgb = rgb.match(/^rgba?[\s+]?\([\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?/i)) && 4 === rgb.length ? "#" + ("0" + parseInt(rgb[1], 10).toString(16)).slice(-2) + ("0" + parseInt(rgb[2], 10).toString(16)).slice(-2) + ("0" + parseInt(rgb[3], 10).toString(16)).slice(-2) : ""
        }, $.fn.isScrollable = function () {
            var elem = $(this);
            return "scroll" == elem.css("overflow") || "auto" == elem.css("overflow") || "scroll" == elem.css("overflow-x") || "auto" == elem.css("overflow-x") || "scroll" == elem.css("overflow-y") || "auto" == elem.css("overflow-y")
        }, $.fn.hasScrollBar = function () {
            return this.get(0).scrollHeight > this.get(0).clientHeight
        }, this.init(), "function" == typeof this._option.addEvt && this.addEvt())
    }

    return Popup.prototype.init = function () {
        if (!this._initChk) {
            var _this = this;
            if (this._globalLayerDeleteHandler = function (e, classValue) {
                _this._panelClass == classValue && _this.destroy()
            }, null != this._panelClass && ($(window).unbind("customEvent.globalLayerDelete", this._globalLayerDeleteHandler), $(window).bind("customEvent.globalLayerDelete", this._globalLayerDeleteHandler)), this._clone && this._$popup.find("input").length > 0) {
                var idNum = 0;
                this._$popup.find("input").each(function () {
                    idNum++;
                    var count = "_popup" + $(".js-popup").length + "_" + idNum;
                    $(this).attr("id", $(this).attr("id") + count), $(this).attr("name", $(this).attr("name") + $(".js-popup").length), $(this).next("label").attr("for", $(this).next("label").attr("for") + count)
                })
            }
            this._$btn.each(function (i) {
                $(this).data("popup-btn-idx", i)
            }), this._drag && (this._$popup.find("*").each(function () {
                ($(this).isScrollable() || $(this).hasScrollBar()) && $(this).addClass("js-has-scroll")
            }), this._$popup.draggable({
                scroll: !1,
                containment: this._$wrap,
                handle: ".pop-header",
                start: function (e) {
                    if ($(this).data("scrolled")) return $(this).data("scrolled", !1).trigger("mouseup"), !1
                },
                drag: function (e, ui) {
                    var obj = ui.helper;
                    obj.find(".js-layer-btn.js-active-select").length > 0 && obj.find(".js-layer-btn.js-active-select").trigger("layerHide")
                }
            }).find("*").andSelf().bind("scroll.popup", function () {
                $(this).parents(".ui-draggable").data("scrolled", !0)
            })), this._dimmed && (this._$dimmed.css({
                position: "absolute",
                "z-index": "2000",
                left: 0,
                top: 0,
                width: "100%",
                height: "100%",
                display: "none",
                cursor: "default",
                background: this._dimmedColor
            }), -1 == navigator.appVersion.indexOf("MSIE 8.") && -1 == navigator.appVersion.indexOf("MSIE 7.") || this._$dimmed.css({
                background: this._rgbToHex(this._dimmedColor),
                opacity: this._dimmedColor.replace(/^.*,(.+)\)/, "$1")
            }), this._$popup.before(this._$dimmed), this._$dimmed.bind("click.popup", function (e) {
                e.preventDefault(), e.stopPropagation(), _this._$dimmed.next(".js-popup").find(".js-layer-btn").length > 0 && _this._$dimmed.next(".js-popup").find(".js-layer-btn").trigger("layerHide")
            })), this._keyEvt(), this._btnEvt(), this._$btn.bind("click.popup", function (e) {
                _this._$popup.data("popup-btn-idx", $(this).data("popup-btn-idx")), _this.show($(this))
            }), this._$popup.bind("click.popup", function (e) {
                e.stopPropagation(), _this._$popup.find(".js-layer-btn.js-active-select").is(e.target) || 0 !== _this._$popup.find(".js-layer-btn.js-active-select").has(e.target).length || _this._$popup.find(".js-layer-btn.js-active-select").trigger("layerHide"), _this._$popup.find(".select02.js-sub-select").is(e.target) || 0 !== _this._$popup.find(".select02.js-sub-select").has(e.target).length || _this._$popup.find(".select02.js-sub-select").trigger("layerHide")
            }), this._$popup.find(".select02:not(.js-sub-select)").length > 0 && this._$popup.find(".select02:not(.js-sub-select)").subSelect(), this._$popup.find(".tree-st01:not(.js-sub-tree)").length > 0 && this._$popup.find(".tree-st01:not(.js-sub-tree)").treeSet(), this._initChk = !0
        }
    }, Popup.prototype.show = function (target) {
        var _this = this,
            $target = target;
        this._dimmed || setTimeout(function () {
            $(document).bind("click.popup_" + this._popupSelector, function (e) {
                $(e.target).hasClass("ui-icon-circle-triangle-w") || $(e.target).hasClass("ui-icon-circle-triangle-e") || $(_this._popupSelector).is(e.target) || 0 !== $(_this._popupSelector).has(e.target).length || !_this._$popup.is(":visible") || $(".js-layer-box").is(e.target) || 0 !== $(".js-layer-box").has(e.target).length || $(_this._btnSelector).is(e.target) || 0 !== $(_this._btnSelector).has(e.target).length || _this._$popup.nextAll(".dimmed-layer:visible").length <= 0 && _this.hide()
            })
        }, 0), void 0 != this._btnSelector && void 0 != $target && $(".js-popup-btn").removeClass("on"), this._$popup.attr("tabindex", "0").css({
            left: $(window).width() / 2 - _this._$popup.outerWidth(!0) / 2,
            top: $(window).height() / 2 - _this._$popup.outerHeight(!0) / 2,
            "margin-left": 0,
            "margin-top": 0
        }).show().focus(), this._dimmed && this._$dimmed.show(), $(window).bind("resize.popup_" + this._popupSelector, function () {
            _this._$popup.css({
                left: $(window).width() / 2 - _this._$popup.outerWidth(!0) / 2,
                top: $(window).height() / 2 - _this._$popup.outerHeight(!0) / 2,
                "margin-left": 0,
                "margin-top": 0
            })
        }), void 0 != this._btnSelector && void 0 != $target && ($(".js-active-popup").removeClass("js-active-popup"), $target.addClass("js-active-popup")), "function" == typeof this._option.show && this._option.show(this._$btn.eq(this._$popup.data("popup-btn-idx")), this._$popup)
    }, Popup.prototype.hide = function () {
        "function" == typeof this._option.hide && this._option.hide(this._$btn.eq(this._$popup.data("popup-btn-idx")), this._$popup);
        void 0 != this._btnSelector && this._$btn.eq(this._$popup.data("popup-btn-idx")).removeClass("on").removeClass("js-active-popup").focus(), this._$popup.removeAttr("tabindex").hide(), this._dimmed || $(".js-popup").is(":visible") || $(document).unbind("click.popup_" + this._popupSelector), this._dimmed && this._$dimmed.hide(), $(window).unbind("resize.popup_" + this._popupSelector)
    }, Popup.prototype.disable = function () {
        this._initChk && (void 0 != this._btnSelector && this._$btn.removeClass("on").removeClass("js-active-popup").removeClass("js-popup-btn"), this._$popup.removeClass("js-popup").removeAttr("tabindex").hide(), $(document).unbind(".popup_" + this._popupSelector), $(window).unbind("resize.popup_" + this._popupSelector), void 0 != this._btnSelector && this._$btn.unbind(".popup"), this._$popup.unbind(".popup"), this._$popup.find("a, button, input").eq(-1).unbind(".popup"), this._$popup.find(this._closeSelector).unbind(".popup"), this._drag && (void 0 != this._$popup.draggable("instance") && this._$popup.draggable("destroy"), this._$popup.find("*").andSelf().unbind("scroll.popup")), this._dimmed && (this._$dimmed.unbind(".popup"), this._$dimmed.remove()), this._$popup.unbind(), this._$popup.find("*").unbind(), this._initChk = !1)
    }, Popup.prototype.enable = function () {
        this.init()
    }, Popup.prototype.destroy = function () {
            this.disable(),
            this._clone ? this._$popup.remove() : (this._$popup.after(this._$popupBackup), this._$popup.remove()), $(window).unbind("customEvent.globalLayerDelete", this._globalLayerDeleteHandler), $(window).unbind("resize.popup_" + this._popupSelector), this._option = null, this._initChk = null, this._$win = null, this._$wrap = null, this._btnSelector = null, this._popupSelector = null, this._clone = null, this._panelClass = null, this._drag = null, this._dimmed = null, this._dimmedColor = null, this._$dimmed = null, this._closeSelector = null, this._okSelector = null, this._cancelSelector = null, this._yesSelector = null, this._noSelector = null, this._$btn = null, this._$popupBackup = null, this._keyEvt = null, this._btnEvt = null, this._rgbToHex = null, this.init = null, this.show = null, this.hide = null, this.disable = null, this.enable = null, this.addEvt = null, this.destroy = null
    }, Popup.prototype.addEvt = function () {
        var opts = {
            self: this,
            btn: this._$btn,
            popup: this._$popup
        };
        this._option.addEvt(opts)
    }, Popup
}(jQuery);
//# sourceMappingURL=../maps/popup/Popup.js.map