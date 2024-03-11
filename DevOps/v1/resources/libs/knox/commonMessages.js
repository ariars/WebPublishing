!function($){function init(options){settings=$.extend({},defaults,options),setMessages(this)}function setMessages($target){$.i18n.properties({name:settings.bundleName,path:"/"+settings.moduleName+settings.bundlePath,mode:"map",language:settings.language,callback:function(){setContent($target),setProperty($target,"title"),setProperty($target,"value"),setProperty($target,"placeholder"),setProperty($target,"summary"),"function"===$.type(settings.successHandler)&&settings.successHandler()}})}function setContent($target){$target.find("[data-message-id]").each(function(){var $finded=$(this),id=$finded.data("messageId"),args=$finded.data("messageArgs"),argId=$finded.data("messageArgumentId");argId&&(args=getMessage(argId));var message=getMessage(id,args),option=$finded.data("messageOption"),index=-1;if(option&&option.substr(0,OPTIONS.APPENDAT.length)==OPTIONS.APPENDAT){var options=option.split(":");option=options[0],index=options.length>1?options[1]:-1}switch(option){case OPTIONS.DEL_TAG:$finded.replaceWith(message);break;case OPTIONS.APPEND:$finded.append(message);break;case OPTIONS.PREPEND:$finded.prepend(message);break;case OPTIONS.APPENDAT:(isNaN(index)||index<0)&&(index=0),$finded.appendAt(message,index);break;default:$finded.html(message)}$finded.removeAttr("data-message-id")})}function setProperty($target,propName){$target.find("[data-"+propName+"-message-id]").each(function(){var $finded=$(this),message=getMessage($finded.data(propName+"MessageId"),$finded.data(propName+"MessageArgs"));$finded.prop(propName,message),$finded.removeAttr("data-"+propName+"-message-id")})}function getMessage(key,replaces){var args=[key];return"array"===$.type(replaces)?args=$.merge(args,replaces):"undefined"!==$.type(replaces)&&null!=replaces&&args.push(replaces),$.i18n.prop.apply(this,args)}var OPTIONS={DEL_TAG:"delTag",APPENDAT:"appendAt",PREPEND:"prepend",APPEND:"append"},defaults={moduleName:"",bundlePath:"/bundle/",bundleName:"messages",language:function(){for(var cookiearray=document.cookie.split(";"),language="ko_KR",i=0;i<cookiearray.length;i++)name=cookiearray[i].split("=")[0].trim(),"savelanguage"===name.toLowerCase()&&(value=cookiearray[i].split("=")[1].indexOf(".")>-1?cookiearray[i].split("=")[1].split(".")[0]:cookiearray[i].split("=")[1],"undefined"!==$.type(value)&&null!=value&&(language=value));return language}(),successHandler:function(){}},settings={},publicMethods={get:getMessage,set:setMessages,setContent:setContent,setProperty:setProperty};$.fn.message=function(method){return publicMethods[method]?publicMethods[method].apply(this,Array.prototype.slice.call(arguments,1)):"object"!==$.type(method)&&method?void $.error("Method "+method+" does not exist on jQuery.em_message"):init.apply(this,arguments)},$.fn.appendAt=function(element,index){var lastIndex=this.children().size()-1;return 0==(index=index<0?0:index>lastIndex?lastIndex:index)?this.prepend(element):index>lastIndex?this.append(element):this.children().eq(index).before(element),this}}(jQuery);
//# sourceMappingURL=maps/commonMessages.js.map