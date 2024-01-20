var Tab=function($){function Tab(option){option.useSubLink?this.createTitle(option):this.create(option)}return Tab.prototype.create=function(option){var $cloneEl=$(".tab-area .hidden-tab li").clone(),$cloneElAnchor=$cloneEl.find("a");$cloneEl.addClass(option.className),option.addClass&&$cloneEl.addClass(option.addClass),$cloneElAnchor.text(option.title),option.useDelete?$cloneEl.find(".del").bind("click",this,function(event){event.stopPropagation(),option.useDeleteCallback?option.parent.removeCallback(event.data):option.parent.removeTab(event.data)}):$cloneEl.find(".del").remove(),option.useCount||void 0==option.setPosition||$cloneEl.addClass("default pos"+option.setPosition),$cloneElAnchor.attr("title",option.data),$cloneElAnchor.bind("click",this,function(event){option.parent.changeTab(option.className,this)}),this._useCount=option.useCount,this._originClassName=option.originClassName,this._className=option.className,this._$cloneEl=$cloneEl},Tab.prototype.createTitle=function(option){var $cloneEl=$(".tab-area .hidden-title-tab li").clone(),$cloneElAnchor=$cloneEl.not(".bt").find("a");$cloneEl.not(".bt").removeClass().addClass(option.className+" current"),option.addClass&&$cloneEl.not(".bt").addClass(option.addClass),$cloneElAnchor.text(option.title),$cloneElAnchor.attr("title",option.data),$cloneEl.filter(".bt").find("button:not(.js-layer-btn) > span").html(option.subLinkData.title),$cloneEl.filter(".bt").find("button:not(.js-layer-btn)").bind("click",function(e){e.stopPropagation(),"function"==typeof option.subLinkData.click?option.subLinkData.click():console.log("click의 type은 function이어야 합니다.")}),this._useCount=option.useCount,this._originClassName=option.originClassName,this._className=option.className,this._$cloneEl=$cloneEl},Tab.prototype.click=function(){this.getEl().children("a").trigger("click")},Tab.prototype.getClassName=function(){return this._className},Tab.prototype.setTitle=function(name,title){var $tabEl=this.getEl();$tabEl.children("a").text(name),title&&$tabEl.children("a").attr("title",title)},Tab.prototype.getOriginClassName=function(){return this._originClassName},Tab.prototype.getUseCount=function(){return this._useCount},Tab.prototype.remove=function(){this._$cloneEl.remove(),this._useCount=null,this._originClassName=null,this._className=null,this._$cloneEl=null,this.create=null,this.createTitle=null,this.click=null,this.getClassName=null,this.setTitle=null,this.getOriginClassName=null,this.getUseCount=null,this.remove=null,this.getEl=null},Tab.prototype.getEl=function(){return this._$cloneEl},Tab}(jQuery);
//# sourceMappingURL=../maps/tab/Tab.js.map