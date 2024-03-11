var SearchMenu=function($){function SearchMenu(option){if(option){this._option=option,this._initChk=!1,this._$win=$(window),this._$wrap=$("body"),this._searchAreaSelector=option.searchAreaSelector,this._boxSelector=option.boxSelector,this._clone=void 0!=option.clone&&option.clone,this._panelClass=void 0==option.panelClass?null:option.panelClass,this._callbackKeyword=void 0==option.callbackKeyword?[]:option.callbackKeyword,this._callbackKeywordReceive=void 0==option.callbackKeywordReceive?function(){}:option.callbackKeywordReceive,this._subListShow=void 0==option.subListShow?function(){}:option.subListShow,this._subListHide=void 0==option.subListHide?function(){}:option.subListHide,this._$searchArea=$(this._searchAreaSelector).addClass("js-layer-search"),this._clone?($(this._boxSelector).hide(),this._$layer=$(this._boxSelector+":not(.js-layer-box)").eq(0).clone().addClass("js-layer-box search-result-layer"),$(this._boxSelector+":not(.js-layer-box)").eq(0).after(this._$layer)):(this._$layer=$(this._boxSelector).addClass("js-layer-box search-result-layer").hide(),this._$layerBackup=this._$layer.clone()),this._positionSet=function(target,layer){var btnPosition=target.find("fieldset.in-search").offset(),btnWidth=target.find("fieldset.in-search").outerWidth(),btnWrap=this._$wrap;layer.css("min-width",btnWidth-2),$(".js-tab-view."+this._panelClass).hasClass("js-vertical")||"left"==this._option.setPosition?layer.css({left:btnPosition.left,right:"auto"}):layer.css({left:"",right:$(window).width()-btnPosition.left-this._$searchArea.filter(":visible").find("fieldset.in-search").outerWidth()}),btnPosition.top+layer.height()+target.outerHeight()+20>btnWrap.height()?btnPosition.top-layer.height()<0?layer.css({top:btnPosition.top+target.outerHeight()}):layer.css({top:btnPosition.top-layer.height()}):layer.css({top:btnPosition.top+target.outerHeight()})},this._subListPositionSet=function(){var _this=this,$subList=_this._$layer.find(".suggest-box:not(:hidden)");_this._$layer.offset().left+_this._$layer.outerWidth()+$subList.outerWidth()<$(window).width()?$subList.css({left:_this._$layer.width()}):$subList.css({left:-1*$subList.outerWidth()})},this._keyEvt=function(){var _this=this;this._$layer.bind("keydown.searchMenu",function(e){40==e.keyCode&&$(this).is(":focus")&&$(this).find("a:visible, button:visible, input:visible").eq(0).focus()});var $total=_this._$layer.find(".total");this._$layer.find("> .content > ul > li").bind("keydown.searchMenu",function(e){if(40==e.keyCode&&($(this).nextAll(":visible:first").find("a:first").focus(),_this._$layer.find("> .content > ul > li").size()==$(this).index()+1&&($total.size()>0?$total.find("a:first").focus():_this._$layer.find("a:first").focus())),38==e.keyCode&&($(this).prevAll(":visible:first").find("a:first").focus(),0==$(this).index()&&($total.size()>0?$total.find("a:first").focus():_this._$layer.find("a:last").focus())),39==e.keyCode){var $subLayer=$(this).find(".suggest-box");$subLayer.size()>0&&($subLayer.attr("tabindex",0).show().focus(),_this._subListShow($(this),$subLayer),_this._subListPositionSet())}}),this._$layer.find("> .content > ul > li .suggest-box").bind("keydown.searchMenu",function(e){return 40==e.keyCode&&$(this).is(":focus")&&$(this).find("a:visible, button:visible, input:visible").eq(0).focus(),37==e.keyCode&&($(this).hide(),$(this).closest("li").find("a:first").focus(),_this._subListHide($(this).closest("li"),$(this))),!1}),this._$layer.find("> .content > ul > li .suggest-box").on("keydown.searchMenu"," li",function(e){var $parent=$(this).closest(".suggest-box");return 40==e.keyCode&&($(this).nextAll(":visible:first").find("a:first").focus(),$parent.find("li").size()==$(this).index()+1&&$parent.find("li:first").find("a:first").focus()),38==e.keyCode&&($(this).prevAll(":visible:first").find("a:first").focus(),0==$(this).index()&&$parent.find("li:last").find("a:first").focus()),37==e.keyCode&&($parent.hide(),$parent.closest("li").find("a:first").focus(),_this._subListHide($(this).closest("li"),$parent)),13==e.keyCode&&$(this).find("a:first").click(),27==e.keyCode&&($parent.hide(),_this._subListHide($(this).closest("li"),$parent),_this._$layer.hide(),_this._$searchArea.find("input").focus()),!1}),$total.bind("keydown.searchMenu",function(e){38==e.keyCode&&_this._$layer.find("> .content > ul > li:last a:eq(0)").focus(),40==e.keyCode&&_this._$layer.find("a:first").focus()})},this._searchCallbackKeyWord=function(val){var hasKeyWord;for(var i in this._callbackKeyword){var keyWord=this._callbackKeyword[i];val.indexOf(keyWord)>-1&&(hasKeyWord=keyWord)}hasKeyWord&&(this._callbackKeywordReceive(hasKeyWord),this.hide())};var _this=this;this._$layer.find("li").each(function(i,tg){$tg=$(tg),$tg.find(".item-more").size()>0&&$tg.hover(function(){_this._subListShow($(this),$(this).find(".suggest-box")),$(this).find(".suggest-box").show(),_this._subListPositionSet($(this))},function(){_this._subListHide($(this),$(this).find(".suggest-box")),$(this).find(".suggest-box").hide()})}),this.init(),"function"==typeof this._option.addEvt&&this.addEvt()}}return SearchMenu.prototype.init=function(){if(!this._initChk){var _this=this;this._globalDeleteHandler=function(e,classValue){_this._panelClass==classValue&&_this.destroy()},null!=this._panelClass&&($(window).unbind("customEvent.globalLayerDelete",this._globalDeleteHandler),$(window).bind("customEvent.globalLayerDelete",this._globalDeleteHandler)),this._keyEvt(),this._$searchArea.each(function(i){$(this).data("search-btn-idx",i)}),this._$layer.bind("keydown.searchMenu",function(e){27==e.keyCode&&(_this._$searchArea.find("input").focus(),_this.hide())}),this._$searchArea.find("input").bind("focus.searchMenu",function(e){$(this).val()&&(_this._$layer.data("search-btn-idx",$(this).closest(".js-layer-search").data("search-btn-idx")),_this.show(e,$(this).closest(".js-layer-search")))});new beta.fix("searchInput"+Math.random(),this._$searchArea.find("input"));"function"==typeof this._option.inputKeyup?this._$searchArea.find("input").bind("keyup.searchMenu",function(e){if(27==e.keyCode)return!1;$(this).val()&&(_this._$layer.data("search-btn-idx",$(this).closest(".js-layer-search").data("search-btn-idx")),_this.show(e,$(this).closest(".js-layer-search"))),40==e.keyCode&&_this._$layer.focus();var info={inputVal:_this._$searchArea.find("input").val(),layer:_this._$layer};_this._option.inputKeyup(info),_this._subListPositionSet()}):this._$searchArea.find("input").bind("keyup.searchMenu",function(e){if(27==e.keyCode)return!1;$(this).val()&&(_this._$layer.data("search-btn-idx",$(this).closest(".js-layer-search").data("search-btn-idx")),_this.show(e,$(this).closest(".js-layer-search"))),_this.keyword(),40==e.keyCode&&_this._$layer.focus(),_this._subListPositionSet()}),this._$layer.on("focusin.searchMenu","a",function(e){_this._$layer.find(".over").removeClass("over"),$(this).parent().addClass("over"),_this._subListPositionSet()}),"function"==typeof this._option.enter&&this._$searchArea.find("input").bind("keypress.searchMenu",function(e){if(13==e.keyCode){var val=$(this).val();_this.enter(val),_this._searchCallbackKeyWord(val)}}),"function"==typeof this._option.itemClick&&(this._$layer.find("a").each(function(i){$(this).data("search-list-idx",i)}),this._$layer.on("click.searchMenu","a",function(e){_this.itemClick($(this))})),"function"==typeof this._option.searchBtnClick&&(this._$searchArea.find("button.search").unbind("click.searchMenu"),this._$searchArea.find("button.search").bind("click.searchMenu",function(){var val=$(this).closest(".js-layer-search").find("input").val();_this.searchBtnClick(val)})),this._$searchArea.parents("div").each(function(){$(this).unbind("scroll.searchMenu"),$(this).bind("scroll.searchMenu",function(){_this.hide()})}),this._initChk=!0}},SearchMenu.prototype.show=function(e,target){if(13!=e.keyCode){var _this=this,$target=target;this._$layer.find(".over").removeClass("over"),9!=e.keyCode?(this._positionSet($target,this._$layer),this._$layer.attr("tabindex","0").css("z-index","2000").show(),$(window).unbind("resize.searchMenu"),$(window).bind("resize.searchMenu",function(){_this._positionSet($target,_this._$layer)})):this._$layer.focus(),$(document).bind("mousedown.searchMenu",function(e){$(_this._boxSelector).is(e.target)||0!==$(_this._boxSelector).has(e.target).length||$(_this._$searchArea.find("input")).is(e.target)||_this.hide()}),"function"==typeof this._option.show&&this._option.show(this._$searchArea.eq(this._$layer.data("search-btn-idx")),this._$layer)}},SearchMenu.prototype.layerShow=function(){var _this=this,$target=this._$searchArea;this._$layer.data("search-btn-idx",$target.data("search-btn-idx")),this._$layer.find(".over").removeClass("over"),this._positionSet($target,this._$layer),this._$layer.attr("tabindex","0").css("z-index","2000").show(),this.keyword();var time;time&&clearTimeout(time),time=setTimeout(function(){_this._$layer.focus()},10),$(window).unbind("resize.searchMenu"),$(window).bind("resize.searchMenu",function(){_this._positionSet($target,_this._$layer)}),$(document).bind("mousedown.searchMenu",function(e){$(_this._boxSelector).is(e.target)||0!==$(_this._boxSelector).has(e.target).length||_this.hide()}),"function"==typeof this._option.show&&this._option.show(this._$searchArea.eq(this._$layer.data("search-btn-idx")),this._$layer)},SearchMenu.prototype.hide=function(){var _this=this;"function"==typeof this._option.hide&&this._option.hide(this._$searchArea.eq(this._$layer.data("search-btn-idx")),this._$layer),setTimeout(function(){_this._$searchArea.removeClass("on"),_this._$layer.find(".suggest-box").removeAttr("tabindex").css("z-index","auto").hide(),_this._$layer.removeAttr("tabindex").css("z-index","auto").hide()},0),$(window).unbind("resize.searchMenu"),$(document).unbind("mousedown.searchMenu")},SearchMenu.prototype.keyword=function(){var inputVal=this._$searchArea.eq(this._$layer.data("search-btn-idx")).find("input").val();this._$layer.find(".txt-val").text(inputVal)},SearchMenu.prototype.enter=function(val){var info={txtVal:val,searchArea:this._$searchArea.eq(this._$layer.data("search-btn-idx"))};this.hide(),this._option.enter(info)},SearchMenu.prototype.itemClick=function(target){var $target=target,txt=$target.find(".txt-val").text(),idx=$target.data("search-list-idx"),info={txtVal:txt,searchArea:this._$searchArea.eq(this._$layer.data("search-btn-idx")),i:idx,el:target};this.hide(),this._option.itemClick(info)},SearchMenu.prototype.searchBtnClick=function(val){var info={txtVal:val,searchArea:this._$searchArea.eq(this._$layer.data("search-btn-idx"))};this.hide(),this._option.searchBtnClick(info)},SearchMenu.prototype.disable=function(){this._initChk&&(this._$searchArea.removeClass("on").removeClass("js-layer-search"),this._$layer.removeClass("js-layer-box").removeAttr("tabindex").css("z-index","auto").hide(),$(window).unbind(".searchMenu"),$(document).unbind(".searchMenu"),this._$searchArea.find("input").unbind(".searchMenu"),this._$layer.unbind(".searchMenu"),this._$layer.find("a, button, input").eq(-1).unbind(".searchMenu"),this._$layer.find("a").unbind(".searchMenu"),this._$layer.off(),"function"==typeof this._option.enter&&this._$searchArea.find("input").unbind("keydown.searchMenu"),"function"==typeof this._option.itemClick&&this._$layer.find("a").unbind("click.searchMenu"),"function"==typeof this._option.searchBtnClick&&this._$searchArea.find("button.search").unbind("click.searchMenu"),this._$layer.unbind(),this._$layer.find("*").unbind(),this._initChk=!1)},SearchMenu.prototype.enable=function(){this.init()},SearchMenu.prototype.destroy=function(){this.disable(),this._clone?this._$layer.remove():(this._$layer.after(this._$layerBackup),this._$layer.remove()),this._$layer.find("> .content > ul > li .suggest-box").off("keydown.searchMenu","li"),this._$layer.off("focusin.searchMenu","a"),this._$layer.off("click.searchMenu","a"),$(window).unbind("customEvent.globalLayerDelete",this._globalDeleteHandler),this._$layer.find("> .content > ul > li").unbind("keydown.searchMenu"),$(this).unbind("scroll.searchMenu"),this._option=null,this._initChk=null,this._$win=null,this._$wrap=null,this._searchAreaSelector=null,this._boxSelector=null,this._clone=null,this._panelClass=null,this._callbackKeyword=null,this._callbackKeywordReceive=null,this._subListShow=null,this._subListHide=null,this._$searchArea=null,this._$layer=null,this._$layerBackup=null,this._positionSet=null,this._subListPositionSet=null,this._keyEvt=null,this._searchCallbackKeyWord=null,this.init=null,this.show=null,this.layerShow=null,this.hide=null,this.keyWord=null,this.enter=null,this.itemClick=null,this.searchBtnClick=null,this.disable=null,this.enable=null,this.addEvt=null,this.destroy=null},SearchMenu.prototype.addEvt=function(){var opts={self:this,searchArea:this._$searchArea,layer:this._$layer};this._option.addEvt(opts)},SearchMenu}(jQuery);
//# sourceMappingURL=../maps/searchMenu/SearchMenu.js.map