!function($){$.fn.subSelect=function(opts){if(!this.length)return null;var settings=$.extend({type:"a"},opts);return this.each(function(){var $this=$(this),type=settings.type;type=$this.hasClass("select02")?"a":"b",$this.addClass("js-sub-select"),$this.bind("layerHide",function(){$(this).find("> ul").is(":visible")&&($(this).find("> ul:visible").prev("button").focus(),$(this).find("> ul:visible").hide(),$(document).unbind("click.subSelect"))}),"a"==type&&($this.find("> ul").addClass("js-select-list"),$this.find("> button").on("click",function(e){$(this).parent().find("> ul").is(":visible")?($(this).parent().find("> ul").hide(),$(this).parent().find("> button").focus(),$(document).unbind("click.subSelect")):($(".js-select-list").hide(),$(this).parent().find("> ul").show(),$(document).bind("click.subSelect",function(e){$this.find(".layer-list").is(e.target)||0!==$this.find(".layer-list").has(e.target).length||!$this.find(".layer-list").is(":visible")||$this.find("> button").is(e.target)||0!==$this.find("> button").has(e.target).length||($this.find(".layer-list").hide(),$this.find("> button").focus(),$(document).unbind("click.subSelect"))}))}),$this.find(".layer-list").on("click","li a",function(e){if($(this).closest(".js-sub-select").find(".current").removeClass("current"),$(this).parent().addClass("current").siblings().removeClass("current"),$(this).parents("ul.layer-list").hide(),$(this).parents("ul.layer-list").prev().focus(),$this.find("> button .cate-select").length>0){var boxColor=$(this).find("span").eq(1).css("background-color");$(this).parents("ul.layer-list").prev().find(".sch-value .cate-select").css("background-color",boxColor),$(this).parents("ul.layer-list").prev().find(".sch-value span:not(.cate-select)").text($(this).text())}else $(this).parents("ul.layer-list").prev().find(".sch-value").text($(this).text());return $(this).parents("ul.layer-list").prev().find(".sch-value").attr("title",$(this).text()),$(this).hasClass("js-self-input")?$(this).parents(".select02").next(".day-term").show():$(this).parents(".select02").next(".day-term").hide(),$(document).unbind("click.subSelect"),!1})),"b"==type&&($this.next().addClass("js-select-list"),$this.on("click",function(e){$(this).next(".ly-sub-box").is(":visible")?($(this).next(".ly-sub-box").hide(),$(document).unbind("click.subSelect")):($(".js-select-list").hide(),$(this).next(".ly-sub-box").show(),$(document).bind("click.subSelect",function(e){$this.next(".ly-sub-box").is(e.target)||0!==$this.next(".ly-sub-box").has(e.target).length||!$this.next(".ly-sub-box").is(":visible")||$this.is(e.target)||0!==$this.has(e.target).length||($this.next(".ly-sub-box").hide(),$this.focus(),$(document).unbind("click.subSelect"))}))}),$this.next(".ly-sub-box").on("click","li",function(){var currentObj=$(this).find("a").text()+"<i>레이어열기</i>";return $(this).parents(".ly-sub-box").prev().find("span").html(currentObj),$(this).parents(".ly-sub-box").hide(),$(this).parents(".ly-sub-box").prev().focus(),$(document).unbind("click.subSelect"),$(document).trigger("itemSelect.subSelect",$(this).index()),!1}))})}}(jQuery);
//# sourceMappingURL=../maps/selectMenu/subSelect.js.map
