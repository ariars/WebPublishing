var SelectMenu = function ($) {
    function SelectMenu(option) {
        this.create(option)
    }

    return SelectMenu.prototype.create = function (option)
    {
        option &&
            (
            this._option = option
            , this._initChk = !1
            , this._$win = $(window)
            , this._$wrap = $("body")
            , this._btnSelector = option.btnSelector
            , this._boxSelector = option.boxSelector
            , this._clone = void 0 != option.clone && option.clone
            , this._remove = void 0 != option.remove && option.remove
            , this._panelClass = void 0 == option.panelClass ? null : option.panelClass
            , this._isDelete = void 0 != option.isDelete && option.isDelete
            , this._showType = void 0 == option.showType ? "left" : option.showType
            , this._selectSelector = void 0 == option.selectSelector ? "li:not(.line)" : option.selectSelector
            , this._selectChange = void 0 != option.selectChange && option.selectChange
            , this._position = void 0 == option.position ? "bottom" : option.position
            , this._positionLeft = void 0 == option.positionLeft ? 0 : option.positionLeft
            , this._positionTop = void 0 == option.positionTop ? 0 : option.positionTop
            , this._itemSelector = void 0 == option.itemSelector ? "li:not(.line)" : option.itemSelector
            , this._disableBtn = void 0 != option.disableBtn && option.disableBtn
            , this._disableList = void 0 == option.disableList ? null : option.disableList
            , this._$btn = $(this._btnSelector).addClass("js-layer-btn")
            , this._clone ? (
                $(this._boxSelector).hide()
                , this._$layer = $(this._boxSelector)
                , this._$layer.find(".js-sub-select").removeClass("js-sub-select")
                , this._$layer.find(".js-sub-tree").removeClass("js-sub-tree")
                , $(this._boxSelector + ":not(.js-layer-box)").eq(0).after(this._$layer)) : (this._$layer = $(this._boxSelector).addClass("js-layer-box").css("z-index", "2000").hide()
                , this._$layerBackup = this._$layer.clone()
            ) ,
            this._positionSet = function (btn, layer)
            {
            },

            this._mouseGetLeft = function (e, obj, wrap)
            {
                var mouseWidth = e.pageX,
                    pageWidth = wrap.width(),
                    menuWidth = obj.width();
                return mouseWidth + menuWidth > pageWidth && menuWidth < mouseWidth ? mouseWidth - menuWidth : mouseWidth
            },

            this._mouseGetTop = function (e, obj, wrap)
            {
                var mouseHeight = e.pageY,
                    pageHeight = wrap.height(),
                    menuHeight = obj.height();
                return mouseHeight + menuHeight > pageHeight && menuHeight < mouseHeight ? mouseHeight - menuHeight : mouseHeight
            },

            this._keyEvt = function ()
            {
                var _this = this;
                this._$layer.find("a, button, input").each(function (i) {
                    $(this).data("select-focus-idx", i);
                });

                this._$layer.bind("keydown.selectMenu", function (e) {

                if (!($(e.target).filter(":input").size() > 0)) {
                    if (9 == e.keyCode && e.shiftKey && $(this).is(":focus")) return $(this).find("a:visible, button:visible, input:visible").eq(-1).focus(), !1;
                    if (38 == e.keyCode || 37 == e.keyCode) {
                        if ($(this).is(":focus")) $(this).find("a:visible, button:visible, input:visible").eq(-1).focus();
                        else {
                            for (i = getFocusIdx = $(this).find(":focus").data("select-focus-idx"); i >= 0 && (getFocusIdx--, !($(this).find("a, button, input").eq(getFocusIdx).is(":visible") || $(this).find("a, button, input").eq(getFocusIdx).parent().hasClass("check") && $(this).find("a, button, input").eq(getFocusIdx).parent().is(":visible") || $(this).find("a, button, input").eq(getFocusIdx).parent().hasClass("radio-des") && $(this).find("a, button, input").eq(getFocusIdx).parent().is(":visible"))); i--);
                            $(this).find("a, button, input").eq(getFocusIdx).focus(), getFocusIdx < 0 && $(this).find("a:visible, button:visible, input:visible").eq(-1).focus()
                        }
                        return !1
                    }
                    if (40 == e.keyCode || 39 == e.keyCode) {
                        if ($(this).is(":focus")) $(this).find("a:visible, button:visible, input:visible").eq(0).focus();
                        else {
                            for (var getFocusIdx = $(this).find(":focus").data("select-focus-idx"), i = getFocusIdx; i < $(this).find("a, button, input").length && (++getFocusIdx >= $(this).find("a, button, input").length && (getFocusIdx = 0), !($(this).find("a, button, input").eq(getFocusIdx).is(":visible") || $(this).find("a, button, input").eq(getFocusIdx).parent().hasClass("check") && $(this).find("a, button, input").eq(getFocusIdx).parent().is(":visible") || $(this).find("a, button, input").eq(getFocusIdx).parent().hasClass("radio-des") && $(this).find("a, button, input").eq(getFocusIdx).parent().is(":visible"))); i++);
                            $(this).find("a, button, input").eq(getFocusIdx).focus()
                        }
                        return !1
                    }
                }
            }), this._$layer.find("a, button, input").eq(-1).bind("keydown.selectMenu", function (e) {
                if (9 == e.keyCode && !e.shiftKey && $(this).is(":focus")) return _this._$layer.focus(), !1
            })
        }, $.fn.hasVerticalScrollBar = function () {
            return this[0].clientHeight < this[0].scrollHeight
        }, $.fn.hasHorizontalScrollBar = function () {
            return this[0].clientWidth < this[0].scrollWidth
        }, this.init(), "function" == typeof this._option.addEvt && this.addEvt())
    }, SelectMenu.prototype.init = function () {
        if (!this._initChk) {
            var _this = this;
            if (this._globalLayerDeleteHandler = function (e, classValue) {
                _this._panelClass == classValue && _this.destroy()
            }, null != this._panelClass && $(window).bind("customEvent.globalLayerDelete", this._globalLayerDeleteHandler), this._$btn.bind("layerHide.selectMenu", function () {
                _this._$btn.hasClass("js-active-select") && _this.hide()
            }), this._$layer.bind("layerHide.selectMenu", function () {
                _this._$btn.hasClass("js-active-select") && _this.hide()
            }), this._disableBtn && this._$btn.prop("disabled", !0), null != this._disableList) {
                this._$layer.find(this._selectSelector).removeClass("dis");
                for (var i = 0; i < this._disableList.length; i++) this._$layer.find(this._selectSelector).eq(this._disableList[i]).addClass("dis")
            }
            if (this._clone && this._$layer.find("input").length > 0) {
                idNum = 0;
                this._$layer.find("input").each(function () {
                    idNum++;
                    var count = "_layer" + $(".js-layer-box").length + "_" + idNum;
                    $(this).attr("id", $(this).attr("id") + count), $(this).attr("name", $(this).attr("name") + $(".js-layer-box").length), $(this).next("label").attr("for", $(this).next("label").attr("for") + count)
                })
            }
            switch (this._$btn.each(function (i) {
                $(this).data("select-btn-idx", i)
            }), this._keyEvt(), this._showType) {
                case "left":
                    this._$btn.bind("click.selectMenu", function (e) {
                        return _this._$layer.data("select-btn-idx", $(this).data("select-btn-idx")), "function" == typeof _this._option.beforeShow && (_this._option.beforeShow.apply(_this, [e]), _this._$layer.find("a, button, input").each(function (i) {
                            $(this).data("select-focus-idx", i)
                        })), _this.leftClick($(this)), !1
                    });
                    break;
                case "right":
                    this._$btn.bind("contextmenu.selectMenu", function (e) {
                        return _this._$layer.data("select-btn-idx", $(this).data("select-btn-idx")), "function" == typeof _this._option.beforeShow && (_this._option.beforeShow.apply(_this, [e]), _this._$layer.find("a, button, input").each(function (i) {
                            $(this).data("select-focus-idx", i)
                        })), _this.rightClick(e), !1
                    });
                    break;
                case "input":
                    this._$btn.bind("click.selectMenu focusin.selectMenu", function (e) {
                        _this._$layer.data("select-btn-idx", $(this).data("select-btn-idx")), _this.leftClick($(this))
                    }), this._$btn.bind("blur.selectMenu", function (e) { }), this._$layer.on("click.selectMenu", "li:not(.line)", function () {
                        _this._$btn.eq(_this._$layer.data("select-btn-idx")).val($(this).find("a").text()), _this._$btn.unbind("focusin.selectMenu"), _this.hide(), _this._$btn.bind("focusin.selectMenu", function (e) {
                            _this._$layer.data("select-btn-idx", $(this).data("select-btn-idx")), _this.leftClick($(this))
                        })
                    });
                    break;
                case "hover":
                    this._$btn.bind("mouseover.selectMenu", function () {
                        hoverTime && clearTimeout(hoverTime), _this.hover($(this))
                    }), this._$btn.bind("focusin.selectMenu", function () {
                        _this._$layer.is(":visible") || (_this._$layer.data("select-btn-idx", $(this).data("select-btn-idx")), _this.hover($(this)))
                    }), this._$btn.bind("mouseout.selectMenu", function () {
                        hoverTime && clearTimeout(hoverTime), hoverTime = setTimeout(function () {
                            _this.mouseout(_this._$btn.eq(_this._$layer.data("select-btn-idx")))
                        }, 200)
                    }), this._$layer.bind("mouseover.selectMenu", function () {
                        hoverTime && clearTimeout(hoverTime)
                    }), this._$layer.bind("mouseout.selectMenu", function () {
                        hoverTime && clearTimeout(hoverTime), hoverTime = setTimeout(function () {
                            _this.mouseout(_this._$btn.eq(_this._$layer.data("select-btn-idx")))
                        }, 200)
                    });
                    break;
                case "hoverCard":
                    var hoverTime;
                    this._$btn.bind("mouseover.selectMenu", function () {
                        _this._$layer.data("select-btn-idx", $(this).data("select-btn-idx")), hoverTime && clearTimeout(hoverTime), _this.mouseover($(this))
                    }), this._$btn.bind("focusin.selectMenu", function () {
                        _this._$layer.is(":visible") || (_this._$layer.data("select-btn-idx", $(this).data("select-btn-idx")), _this.mouseover($(this)))
                    }), this._$btn.bind("focusout.selectMenu", function () {
                        _this._$layer.is(":visible") && _this.mouseout(_this._$btn.eq(_this._$layer.data("select-btn-idx")))
                    }), this._$btn.bind("mouseout.selectMenu", function () {
                        hoverTime && clearTimeout(hoverTime), hoverTime = setTimeout(function () {
                            _this.mouseout(_this._$btn.eq(_this._$layer.data("select-btn-idx")))
                        }, 10)
                    })
            }
            if (this._$layer.bind("click.selectMenu", function (e) {
                e.stopPropagation()
            }), this._$layer.bind("keydown.selectMenu", function (e) {
                27 == e.keyCode && _this.hide()
            }), "function" == typeof this._option.select && (this._selectChange || this._$layer.find(this._selectSelector).each(function (i) {
                $(this).data("select-list-idx", i)
            }), this._$layer.on("click.selectMenu", this._selectSelector, function () {
                _this.select($(this))
            })), "function" == typeof this._option.itemClick && this._$layer.find(this._itemSelector).bind("click.selectMenu", function () {
                _this.itemClick($(this))
            }), this._$layer.find(".color-set input").length > 0) {
                var idNum = 0;
                this._$layer.find(".color-set input").each(function () {
                    idNum++;
                    var count = "_layer" + $(".js-layer-box").length + "_" + idNum;
                    $(this).attr("id", $(this).attr("id") + count), $(this).attr("name", $(this).attr("name") + "_layer" + $(".js-layer-box").length), $(this).next("label").attr("for", $(this).next("label").attr("for") + count)
                })
            }
            "function" == typeof this._option.colorSelect && (this._$btn.bind("click.selectMenu", function () {
                _this._$layer.find(".color-set input").each(function () {
                    $(this).val() == _this._$btn.eq(_this._$layer.data("select-btn-idx")).prev().find("input").val() && $(this).prop("checked", !0)
                })
            }), this._$layer.find(".color-set input").bind("change.selectMenu", function () {
                _this.colorSelect()
            })), this._$layer.find(".select02:not(.js-sub-select)").length > 0 && this._$layer.find(".select02:not(.js-sub-select)").subSelect(), this._$layer.find(".select-sub01:not(.js-sub-select)").length > 0 && this._$layer.find(".select-sub01:not(.js-sub-select)").subSelect(), this._$layer.find(".tree-st01:not(.js-sub-tree)").length > 0 && this._$layer.find(".tree-st01:not(.js-sub-tree)").treeSet(), this._initChk = !0
        }
        },

    SelectMenu.prototype.leftClick = function (target) {
        var _this = this,
        $target = target;

        switch (_this._mouseDownHandler = function (e)
        {
            $(_this._boxSelector).is(e.target)
                || 0 !== $(_this._boxSelector).has(e.target).length
                || !_this._$layer.is(":visible")
                || $(".datepicker-box").is(e.target)
                || 0 !== $(".datepicker-box").has(e.target).length
                || $(".js-layer-box").is(e.target)
                || 0 !== $(".js-layer-box").has(e.target).length
                || $(_this._btnSelector).is(e.target)
                || 0 !== $(_this._btnSelector).has(e.target).length
                || _this._$layer.nextAll(".dimmed-layer:visible").length <= 0 && _this.hide()
        },

        $(document).bind("mousedown.selectMenu", _this._mouseDownHandler)
        , $(".js-active-select").removeClass("js-active-select")
        , $target.addClass("js-active-select"), this._showType)
        {
            case "left":

                if ($target.hasClass("on")) {
                    this.hide();
                }   
                else {
                    this._$btn.removeClass("on").removeClass("not-outline")
                        , $target.addClass("on").addClass("not-outline")
                        , this._positionSet($target, this._$layer)
                        , this._$layer.attr("tabindex", "0").show().focus();

                    var time;

                    time && clearTimeout(time), time = setTimeout(function () {
                        _this._$layer.show().focus()
                    }, 20)
                }
                break;
            case "input":
                this._$btn.removeClass("on").removeClass("not-outline"), $target.addClass("on").addClass("not-outline"), this._positionSet($target, this._$layer), this._$layer.attr("tabindex", "0").show()
        }

        this._$layer.find(".js-sub").length > 0 && this._$layer.find(".js-sub").hide(), _this._resizeHandler = function () {
            $target.is(":visible") ? _this._positionSet($target, _this._$layer) : _this.hide()
        }, $(window).unbind("resize.selectMenu", _this._resizeHandler), $(window).bind("resize.selectMenu", _this._resizeHandler), $target.parents("div").each(function () {
            $(this).unbind("scroll.selectMenu"), $(this).bind("scroll.selectMenu", function () {
                "function" == typeof _this._option.hide && _this._option.hide(), $(this).addClass("bind-scroll"), $target.removeClass("on").removeClass("js-active-select"), _this._$layer.removeAttr("tabindex").hide(), _this._option.childBtnSelector && $(_this._option.childBtnSelector).removeClass("js-active-select on"), _this._option.childBoxSelector && $(_this._option.childBoxSelector).removeAttr("tabindex").hide(), $(".bind-scroll").removeClass("bind-scroll").unbind("scroll.selectMenu")
            })
        }), "function" == typeof this._option.show && this._option.show(this._$btn.eq(this._$layer.data("select-btn-idx")), this._$layer)
        },
        SelectMenu.prototype.rightClick = function (e) {
        var _this = this;
        $(".js-layer-box").removeAttr("tabindex").hide(), $(".js-layer-btn").removeClass("on"), this._$layer.find(".current").removeClass("current"), $(".js-active-select").removeClass("js-active-select"), this._$btn.addClass("js-active-select"), _this._mouseDownSelectMenuHandler = function (e) {
            $(_this._boxSelector).is(e.target) || 0 !== $(_this._boxSelector).has(e.target).length || _this.hide && _this.hide()
        }, $(document).unbind("mousedown.mouseDownSelectMenu", this._mouseDownSelectMenuHandler), $(document).bind("mousedown.mouseDownSelectMenu", _this._mouseDownSelectMenuHandler), this._$layer.find(".js-sub").length > 0 && this._$layer.find(".js-sub").hide(), 0 != $(e.target).parents("tr").length && ($(e.target).closest("tr").find("input[type=checkbox]").is(":checked") ? ($(e.target).closest("tr").addClass("current"), $(e.target).closest("tr").find("input[type=checkbox]").prop("checked", !0)) : ($(e.target).parents("tr").addClass("current").siblings().removeClass("current").find(".current:not(.todo)").removeClass("current"), $(e.target).parents("tr").eq(1).removeClass("current"), $(e.target).parents("tr").find("input[type=checkbox]").prop("checked", !0).end().siblings().find("input[type=checkbox]").prop("checked", !1))), this._$chkTr = $(e.target).closest("tr"), this._$layer.show().css({
            left: this._mouseGetLeft(e, this._$layer, this._$wrap),
            top: this._mouseGetTop(e, this._$layer, this._$wrap)
        }).attr("tabindex", 0).focus(), _this._resizeSelectMenuHandler = function () {
            _this.hide()
        }, $(window).unbind("resize.selectMenu", _this._resizeSelectMenuHandler), $(window).bind("resize.selectMenu", _this._resizeSelectMenuHandler);
        var $trEl = this._$chkTr;
        "function" == typeof this._option.show && this._option.show(this._$btn.eq(this._$layer.data("select-btn-idx")), this._$layer, $trEl)
        },
        SelectMenu.prototype.hover = function (target) {
        var _this = this,
            $target = target;
        _this._mouseDownHandler2 = function (e) {
            $(_this._boxSelector).is(e.target) || 0 !== $(_this._boxSelector).has(e.target).length || !_this._$layer.is(":visible") || $(_this._btnSelector).is(e.target) || 0 !== $(_this._btnSelector).has(e.target).length || _this._$layer.nextAll(".dimmed-layer:visible").length <= 0 && (target.removeClass("on").removeClass("js-active-select").focus(), _this._$layer.removeAttr("tabindex").hide())
        }, $(document).bind("mousedown.selectMenu", _this._mouseDownHandler2), $(".js-active-select").removeClass("js-active-select"), $(".js-layer-btn").removeClass("on"), this._$btn.removeClass("on"), $target.addClass("on").addClass("js-active-select"), this._positionSet($target, this._$layer), $(".js-layer-box").removeAttr("tabindex").hide(), navigator.userAgent.indexOf("Firefox") < 0 ? this._$layer.attr("tabindex", "0").show().focus() : this._$layer.show().focus().attr("tabindex", "0"), "function" == typeof this._option.show && this._option.show($target, this._$layer)
    }, SelectMenu.prototype.mouseover = function (target) {
        var $target = target;
        $(".js-layer-btn").removeClass("on"), this._$btn.removeClass("on"), $target.addClass("on").addClass("js-active-select"), this._positionSet($target, this._$layer), $(".js-layer-box").removeAttr("tabindex").hide(), this._$layer.show(), "function" == typeof this._option.show && this._option.show($target, this._$layer)
        },
        SelectMenu.prototype.mouseout = function (target) {
        var $target = target;
        target.removeClass("on").removeClass("js-active-select").focus(), this._$layer.removeAttr("tabindex").hide(), $(".js-layer-box").is(":visible") || ($(document).unbind("mousedown.selectMenu", this._mouseDownHandler), $(document).unbind("mousedown.selectMenu", this._mouseDownHandler2)), "function" == typeof this._option.hide && this._option.hide($target, this._$layer)
    },
        SelectMenu.prototype.select = function (target) {

        var $target = target;
        if (!$target.hasClass("dis")) {

            $target.addClass("current").siblings().removeClass("current");
            var idx = null;
            if (this._selectChange) {
                var currentObj = $target.find("a").text() + "<i>레이어열기</i>";
                this._$btn.find("span").html(currentObj), idx = $target.index()
            } else idx = $target.data("select-list-idx");
            this.hide(), this._option.select(idx, $target)
        }
        }, SelectMenu.prototype.setSelect = function (i) {

        var _this = this,
            data = i;
        this._$layer.find(".current").removeClass("current"), void 0 === data && (data = 0), "number" == typeof data && this._$layer.find(this._selectSelector).eq(data).addClass("current"), $.isArray(data) && $.each(data, function (i, item) {
            _this._$layer.find(_this._selectSelector).eq(item).addClass("current")
        })
    }, SelectMenu.prototype.disableBtn = function () {
        this._$btn.prop("disabled", !0)
    }, SelectMenu.prototype.enableBtn = function () {
        this._$btn.prop("disabled", !1)
    }, SelectMenu.prototype.disableList = function (i) {
        var val = i;
        if (this._$layer.find(this._selectSelector).removeClass("dis"), "number" == typeof val) this._$layer.find(this._selectSelector).eq(val).addClass("dis");
        else if ($.isArray(val))
            for (var i = 0; i < val.length; i++) this._$layer.find(this._selectSelector).eq(val[i]).addClass("dis");
        else "all" == val && this._$layer.find(this._selectSelector).addClass("dis")
    }, SelectMenu.prototype.enableList = function (i) {
        var val = i;
        if ("number" == typeof val) this._$layer.find(this._selectSelector).eq(val).removeClass("dis");
        else if ($.isArray(val))
            for (var i = 0; i < val.length; i++) this._$layer.find(this._selectSelector).eq(val[i]).removeClass("dis");
        else "all" == val && this._$layer.find(this._selectSelector).removeClass("dis")
        }, SelectMenu.prototype.itemClick = function (target) {
        var $target = target,
            opts = {
                self: this,
                btn: this._$btn.eq(this._$layer.data("select-btn-idx")),
                clickIdx: $target.index(),
                el: $target
            },
            layer = this._$layer;
        this._option.itemClick(opts, layer),
            this.hide()
    }, SelectMenu.prototype.colorSelect = function (target) {
        var color = this._$layer.find("input:radio:checked").val(),
            activeBtn = this._$btn.eq(this._$layer.data("select-btn-idx"));
        this._option.colorSelect(activeBtn, color), this.hide()
    }, SelectMenu.prototype.hide = function (isInput) {
        if ("function" == typeof this._option.hide && this._option.hide(this._$btn.eq(this._$layer.data("select-btn-idx")), this._$layer), "hover" != this._showType) {
            var _this = this;
            setTimeout(function () { _this._$layer.removeAttr("tabindex").hide() }, 0),
            this._showType,
            this._$btn.eq(
                this._$layer.data("select-btn-idx")).removeClass("on").removeClass("js-active-select"),
                $(window).unbind("resize.selectMenu", _this._resizeHandler),
                $(".bind-scroll").length > 0 && $(".bind-scroll").removeClass("bind-scroll").unbind("scroll.selectMenu"),
                $(".js-layer-box").is(":visible") || ($(document).unbind("mousedown.selectMenu", _this._mouseDownHandler),
                $(document).unbind("mousedown.selectMenu", _this._mouseDownHandler2)
            )
        } else {
            this.mouseout(this._$btn.eq(this._$layer.data("select-btn-idx")))
        }            
    }, SelectMenu.prototype.disable = function () {
        this._initChk && (
            this._$btn.removeClass("on").removeClass("js-layer-btn").removeClass("js-active-select"),
            this._$layer.removeClass("js-layer-box").removeAttr("tabindex").hide(),
            $(window).unbind(".selectMenu", this),
            $(document).unbind(".selectMenu", this),
            $(".bind-scroll").length > 0 && $(".bind-scroll").removeClass("bind-scroll").unbind("scroll.selectMenu"),
            this._$btn.unbind(".selectMenu"),
            this._$layer.unbind(".selectMenu"),
            this._$layer.find("a, button, input").eq(-1).unbind(".selectMenu"),
            this._$layer.off("click.selectMenu"),
            this._$layer.find(".layer-list li").unbind("click"),
            this._option.colorSelect && this._$layer.find(".color-set input").unbind(".selectMenu"),
            this._$btn.unbind("layerHide.selectMenu"),
            this._$layer.unbind(),
            this._$layer.find("*").unbind(),
            this._initChk = !1
        )
    }, SelectMenu.prototype.enable = function () {
        this.init()
    }, SelectMenu.prototype.destroy = function () {
        this.disable(),
            (this._clone ? this._$layer.remove() : (this._$layer.after(this._$layerBackup)),
            this._$layer.remove(), null != this._panelClass && this._isDelete && $(this._boxSelector).addClass("js-layer-box").remove()),
            $(window).unbind("customEvent.globalLayerDelete", this._globalLayerDeleteHandler),
            $(window).unbind("resize.selectMenu", this._resizeHandler),
            $(window).unbind("resize.selectMenu", this._resizeSelectMenuHandler),
            $(document).unbind("mousedown.selectMenu", this._mouseDownHandler),
            $(document).unbind("mousedown.selectMenu", this._mouseDownHandler2),
            this._option.addEvt = null,
            this._option.beforeShow = null,
            this._option.select = null,
            this._option.itemClick = null,
            this._option.colorSelect = null,
            this._option.childBtnSelector = null,
            this._option.childBoxSelector = null,
            this._option.show = null,
            this._mouseDownHandler = null,
            this._$chkTr = null,
            this._option = null,
            this._initChk = null,
            this._$win = null,
            this._$wrap = null,
            this._btnSelector = null,
            this._boxSelector = null,
            this._clone = null,
            this._remove = null,
            this._panelClass = null,
            this._isDelete = null,
            this._showType = null,
            this._selectSelector = null,
            this._selectChange = null,
            this._position = null,
            this._positionLeft = null,
            this._positionTop = null,
            this._positionSet = null,
            this._itemSelector = null,
            this._disableBtn = null,
            this._disableList = null,
            this._$btn = null,
            this._$layerBackup = null,
            this._mouseGetLeft = null,
            this._mouseGetTop = null,
            this._keyEvt = null,
            this.create = null,
            this.init = null,
            this.leftClick = null,
            this.rightClick = null,
            this.hover = null,
            this.mouseover = null,
            this.mouseout = null,
            this.select = null,
            this.setSelect = null,
            this.disableBtn = null,
            this.enableBtn = null,
            this.disableList = null,
            this.enableList = null,
            this.itemClick = null,
            this.colorSelect = null,
            this.hide = null,
            this.disable = null,
            this.enable = null,
            this.addEvt = null,
            this.getLayer = null,
            this.destroy = null
        },
        SelectMenu.prototype.addEvt = function () {
        var opts = {
            self: this,
            btn: this._$btn,
            layer: this._$layer
        };
        this._option.addEvt(opts)
    }, SelectMenu.prototype.getLayer = function () {
        return this._$layer
    }, SelectMenu
}(jQuery);
//# sourceMappingURL=../maps/selectMenu/SelectMenu.js.map