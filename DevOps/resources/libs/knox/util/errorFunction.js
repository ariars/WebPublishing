location.hostname.indexOf("samsung.net")>-1&&(document.domain="samsung.net"),document.write("<script src='/static/common/js/util/popup.js'><\/script>");var errFuncUtil={showLayer:function(id){(new $.Popup).show(id)},closeLayer:function(id){(new $.Popup).handlerHide(id)},popupForm:function(subject,contentHtml,epIdList,attachs,moduleName){console.log("[popupTotalForm]");var recipients=[],options={initModule:moduleName,domainModel:{common:{subject:subject,lang:errFuncUtil.getLocale()},contents:{type:"html",contents:contentHtml},recipients:recipients,attachments:attachs},popupSpecs:"width=1050, height=669"};$.popupWriteForm(options)},getLocale:function(){for(var cookiearray=document.cookie.split(";"),language="ko",i=0;i<cookiearray.length;i++)name=cookiearray[i].split("=")[0].trim(),"savelanguage"===name.toLowerCase()&&(value=cookiearray[i].split("=")[1].indexOf(".")>-1?cookiearray[i].split("=")[1].split(".")[0]:cookiearray[i].split("=")[1],"undefined"!==$.type(value)&&null!=value&&(language=value));return language.substr(0,2)},showError:function(key,replaces){var msg=errFuncUtil.getMessageProperties(key,replaces);msg=="["+key+"]"&&(msg=key),msg=msg.replace("[","").replace("]",""),errFuncUtil.createAlertDiv(),$("#alertMsg .pop-alert").html(msg),$("#alertMsg .pop-header > h1").html(errFuncUtil.getMessageProperties("MSG.ALERT.0012")),errFuncUtil.showLayer("alertMsg"),$("#alertMsg .button.default").click(function(){errFuncUtil.closeLayer("alertMsg")})},getMessageProperties:function(key,replaces){var args=[key];return"array"===$.type(replaces)?args=$.merge(args,replaces):"undefined"!==$.type(replaces)&&null!=replaces&&args.push(replaces),$.i18n.prop.apply(this,args)},createAlertDiv:function(){if(0==$("#alertMsg").length){var str="    <div class='pop-header'>";str+="        <h1>알림</h1>",str+="    </div>",str+="    <div class='pop-body'>",str+="        <div class='pop-alert'></div>",str+="    </div>",str+="    <div class='pop-btn'>",str+="        <button type='button' class='button default'><span>확인</span></button>",str+="    </div>";var alertMsgDiv=document.createElement("div");alertMsgDiv.id="alertMsg",alertMsgDiv.style.display="none",alertMsgDiv.innerHTML=str,document.body.appendChild(alertMsgDiv),$("#alertMsg").addClass("popup alert popup-box03")}},preventXss:function(value){var result=value;return result=result.replace(/\<|\>/g,"")}};
//# sourceMappingURL=../maps/util/errorFunction.js.map
