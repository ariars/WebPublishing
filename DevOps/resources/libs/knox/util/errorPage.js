document.write("<script src='/static/common/js/util/popup.js'><\/script>");var errUtil={showErrorPage:function(module,refcode,errorType){var line="",moduleName="";switch(void 0===errorType&&(errorType="normal"),module){case"analytics":line="line01",moduleName="통계",modulesub="Analytics";break;case"board":line="line02",moduleName="게시",modulesub="Board";break;case"support":line="line02",moduleName="서포트",modulesub="Support";break;case"community":line="line03",moduleName="커뮤니티",modulesub="Community";break;case"blog":line="line03",moduleName="블로그",modulesub="Blog";break;case"mail":line="line04",moduleName="메일",modulesub="Mail";break;case"calendar":line="line05",moduleName="일정",modulesub="Calendar";break;case"contacts":line="line05",moduleName="연락처",modulesub="Contacts";break;case"memo":line="line05",moduleName="메모",modulesub="Memo";break;case"todo":line="line05",moduleName="할일",modulesub="ToDo";break;case"push":line="line05",moduleName="PUSH",modulesub="Push Notification";break;case"portal":line="line06",moduleName="포탈",modulesub="Portal";break;case"approval":line="line07",moduleName="결재",modulesub="Approval";break;case"englishhelpwizard":line="line08",moduleName="영문작성도우미",modulesub="English Help Wizard";break;case"poll":line="line08",moduleName="투표",modulesub="Poll";break;case"survey":line="line08",moduleName="설문",modulesub="Survey";break;case"mediaserver":line="line08",moduleName="미디어서버",modulesub="Media Server";break;case"search":line="line08",moduleName="통합검색",modulesub="Search";break;case"mediasamsung":line="line08",moduleName="미디어삼성",modulesub="Media Samsung";break;case"attachment":line="line08",moduleName="파일첨부",modulesub="Attachment";break;case"desktopmessage":line="line08",moduleName="데스크탑메시지",modulesub="Desktop Message";break;case"desktopmemo":line="line08",moduleName="데스크탑메모",modulesub="Desktop Memo";break;case"drm":line="line08",moduleName="DRM",modulesub="Digital Rights Management";break;case"pcpushclient":line="line08",moduleName="PC Push Client",modulesub="Push Notification PC Client";break;case"outlookaddin":line="line08",moduleName="Outlook Add-in",modulesub="Outlook Add-in";break;case"usermanagement":line="line08",moduleName="사용자",modulesub="User Management";break;case"integratedcreationform":line="line08",moduleName="통합작성창",modulesub="Integrated creation form";break;case"mailapps":line="line08",moduleName="메일Apps",modulesub="Mail Apps";break;case"editor":line="line08",moduleName="에디터",modulesub="Editor";break;case"squareapp":line="line09",moduleName="스퀘어(앱)",modulesub="Square App";break;case"squareserver":line="line09",moduleName="스퀘어(서버)",modulesub="Square Server";break;case"square":line="line09",moduleName="스퀘어",modulesub="Square";break;default:line="line01",moduleName="",modulesub=""}switch(errorType){case"normal":errUtil.createErrorPage(line,moduleName,modulesub,refcode);break;case"delay":errUtil.createDelayErrorPage(line,moduleName);break;case"portlet":errUtil.createPortletErrorPage(line,modulesub);break;case"wait":errUtil.createPortletWaitPage(line,modulesub);break;case"portletvariable":line="type02 "+line,errUtil.createPortletErrorPage(line,modulesub);break;case"cert":errUtil.createCertification()}errUtil.showLayer("alertMsgNew"),$("#alertMsgNew > div > div > button").click(function(){errUtil.closeLayer("alertMsgNew")})},replaceDomainName:function(message){var convertMsg=message;return-1===location.hostname.indexOf("samsung.net")&&convertMsg.indexOf("Knox Portal")>-1&&(convertMsg=convertMsg.split("Knox Portal").join("Brity Mail")),-1===location.hostname.indexOf("samsung.net")&&convertMsg.indexOf("samsung employees")>-1&&(convertMsg=convertMsg.split("samsung employees").join("Brity Mail user")),-1===location.hostname.indexOf("samsung.net")&&convertMsg.indexOf("logo.png")>-1&&(convertMsg=convertMsg.split("logo.png").join("logo_brity.png")),convertMsg},createErrorPage:function(line,moduleName,modulesub,refcode){var isRequireErr="RequireError"===refcode,str="<div class='system-error "+line+"'>";if(str+=" \t<span class='mark-line'></span>",str+=" \t<div class='error-header'>",str+=" \t\t<h1>Knox Portal 서비스 중 비정상 상황이 발생하였습니다.</h1>",str+="     \t\t<button type='button' class='button-img close'><span>팝업닫기</span></button>",str+=" \t</div>",str+=" \t<div class='error-body'>",str+=" \t\t<div class='error-txt'>",str+=" \t\t\t<ul class='error-code'>",str+=" \t\t\t\t<li>Service : "+modulesub+"</li>",str+=" \t\t\t\t<li>Reference Code : "+refcode+"</li>",str+=" \t\t\t</ul>",str+=" \t\t\t<ul class='main-info'>",str+=errUtil.showErrorMsg(modulesub,isRequireErr),str=errUtil.replaceDomainName(str),0==$("#alertMsgNew").length)(alertMsgDiv=document.createElement("div")).id="alertMsgNew",alertMsgDiv.style.display="none",alertMsgDiv.innerHTML=str,document.body.appendChild(alertMsgDiv);else{var searchedDiv=document.getElementById("alertMsgNew"),alertMsgDiv=document.createElement("div");alertMsgDiv.id="alertMsgNew",alertMsgDiv.style.display="none",alertMsgDiv.innerHTML=str,document.body.replaceChild(alertMsgDiv,searchedDiv)}$(".button.default.capture").click(function(){html2canvas($(this).parents(".system-error")[0],{onrendered:function(canvas){var attachs=[],imageData=canvas.toDataURL("image/png");errUtil.popupForm([],imageData,[],attachs,"support")}})})},errorMsg:function(moduleSub,refcode){var str="";return str+="<ul><p>[Knox Portal Service Error Information]</p><p><br></p>",str+="<p><span style='COLOR: #0000ff'><b>- Service : "+moduleSub+"</b></span></p>",str+="<p><span style='COLOR: #0000ff'><b>- Reference Code : "+refCode+"</b></span></p>",str+="<p><span style='COLOR: #0000ff'><b>- URL : "+referrer+"</b></span></p><p><br></p>",str+="<p><span style='COLOR: #7f7f7f'>** 오류와 관련하여 추가적으로 기재하실 내용이 있으면 아래 작성하여 주시기 바랍니다. **</span></p>",str+="<p><span style='COLOR: #7f7f7f'>** If you have more information of error or messages, please write below. **</span></p></ul>",str=errUtil.replaceDomainName(str)},showErrorMsg:function(modulesub,isRequireErr){var str="";return"Support"==modulesub?(str+="        \t\t<li>위 <em class='b'>문의코드</em>를 Knox Portal <em class='b text-under'><a href='#'>서비스데스크</a></em>에 <em class='point-c01'>문의</em>해 주시면",str+="        \t\t신속히 답변드리겠습니다. 감사합니다.</li>",str+="        \t</ul>",str+="        \t<ul class='sub-info'>",str+="        \t\t<li>An abnormal Condition has been occurred while using Knox Portal system.</li>",str+="        \t\t<li>Please <span class='point-c01'>contact</span> the Knox Portal Help Desk. We will answer as soon as possible. Thank you.</li>",str+="        \t</ul>",str+="    </div>"):(str+=" \t\t\t\t<li>우측 <span class='point-c01'>버튼을 클릭</span>하시면 오류 내용이 Q&A 게시판에 자동 등록됩니다.</li>",str+=" \t\t\t\t<li>내용을 남겨 주시면 신속하게 답변 드리겠습니다. 감사합니다.</li>",isRequireErr&&(str+="\t\t\t<br><li>F5를 누르시거나 브라우저를 <span class='point-c01'>새로고침</span> 해주시기 바랍니다.</li>"),str+=" \t\t\t</ul>",str+=" \t\t\t<ul class='sub-info'>",str+=" \t\t\t\t<li>An abnormal Condition has been occurred while using Knox Portal system.</li>",str+=" \t\t\t\t<li>If you <span class='point-c01'>click the button</span> on the right-hand side, the errors are automatically registered on a bulletin board.</li>",str+=" \t\t\t\t<li>We will answer as soon as possible. Thank you.</li>",isRequireErr&&(str+="\t\t\t<br><li>Press F5 or <span class='point-c01'>refresh your browser</span></li>"),str+=" \t\t\t</ul>",str+=" \t\t\t<button type='button' class='button default capture'><span>Ask for error</span></button>",str+=" \t\t</div>",str+=" \t</div>",str+=" </div>"),str=errUtil.replaceDomainName(str)},createDelayErrorPage:function(line,moduleName){var str="";if(str+="<div class='system-error type'>",str+="\t<span class='mark-line'></span>",str+="\t<div class='error-header'>",str+="\t\t<h1><img src='/static/common/image/common/logo.png' alt='mySingle'></h1>",str+="\t</div>",str+="\t<div class='error-body'>",str+="\t\t<div class='error-txt'>",str+="\t\t\t<ul class='main-info'>",str+="\t\t\t\t<li>임직원 여러분의 사용량 폭증으로 Knox Portal 응답속도 지연이 예상됩니다.</li>",str+="\t\t\t\t<li>이에 따라 한정하여 서비스를 제공하고 있으니 이점 양지하시어 <em class='point-c01'>잠시 후 사용해 주시기 바랍니다.</em></li>",str+="\t\t\t</ul>",str+="\t\t\t<ul class='sub-info'>",str+="\t\t\t\t<li>Knox Portal reaction velocity delay is expected due to the employees usage amount increase Ness to limited service is supported.</li>",str+="\t\t\t\t<li class='point-c01'>Please retry at a later time.</li>",str+="\t\t\t</ul>",str+="\t\t</div>",str+="\t</div>",str+="</div>",str=errUtil.replaceDomainName(str),0==$("#alertMsgNew").length)(alertMsgDiv=document.createElement("div")).id="alertMsgNew",alertMsgDiv.style.display="none",alertMsgDiv.innerHTML=str,document.body.appendChild(alertMsgDiv);else{var searchedDiv=document.getElementById("alertMsgNew"),alertMsgDiv=document.createElement("div");alertMsgDiv.id="alertMsgNew",alertMsgDiv.style.display="none",alertMsgDiv.innerHTML=str,document.body.replaceChild(alertMsgDiv,searchedDiv)}},createCertification:function(){var str="";if(str+="<div class='system-error type'>",str+="\t<span class='mark-line'></span>",str+="\t<div class='error-header'>",str+="\t\t<h1><img src='/static/common/image/common/logo.png' alt='mySingle'></h1>",str+="\t</div>",str+="\t<div class='error-body'>",str+="\t\t<div class='error-txt'>",str+="\t\t\t<ul class='main-info'>",str+="\t\t\t\t<li>임직원을 위한 시스템으로서 인가된 분만 사용할 수 있습니다.</li>",str+="\t\t\t\t<li>불법으로 사용시에는 법적 제재를 받을 수가 있습니다.</li>",str+="\t\t\t</ul>",str+="\t\t\t<ul class='sub-info'>",str+="\t\t\t\t<li>This system for samsung employees only.</li>",str+="\t\t\t\t<li>Only authorized user can access it. The use of thes product is strictly regulated by law.</li>",str+="\t\t\t</ul>",str+="\t\t\t<div class='copyright'>Legal Notice. Copyright 2015 SAMSUNG. All right reserved.</div>",str+="\t\t</div>",str+="\t</div>",str+="</div>",str=errUtil.replaceDomainName(str),0==$("#alertMsgNew").length)(alertMsgDiv=document.createElement("div")).id="alertMsgNew",alertMsgDiv.style.display="none",alertMsgDiv.innerHTML=str,document.body.appendChild(alertMsgDiv);else{var searchedDiv=document.getElementById("alertMsgNew"),alertMsgDiv=document.createElement("div");alertMsgDiv.id="alertMsgNew",alertMsgDiv.style.display="none",alertMsgDiv.innerHTML=str,document.body.replaceChild(alertMsgDiv,searchedDiv)}},createPortletErrorPage:function(line,moduleSub){var str="";if(str+="<div class='system-error "+line+"'>",str+="\t<span class='mark-line'></span>",str+="\t<div class='error-header'>",str+="\t\t<h1>Service : "+moduleSub+"</h1>",str+="\t</div>",str+="\t<div class='error-body'>",str+="\t\t<div class='error-txt st02'>",str+="\t\t\t<ul class='main-info'>",str+="\t\t\t\t<li>해당 서비스가 지연되고 있습니다.</li>",str+="\t\t\t\t<li>신속히 조치하여 정상적인 서비스를 제공하도록 하겠습니다.</li>",str+="\t\t\t\t<li>잠시만 기다려 주시기 바랍니다.</li>",str+="\t\t\t</ul>",str+="\t\t\t<ul class='sub-info'>",str+="\t\t\t\t<li>The Service is being delayed.</li>",str+="\t\t\t\t<li>We would do resolve errors for using a system quickly.</li>",str+="\t\t\t\t<li>While they being fixed, please wait.</li>",str+="\t\t\t</ul>",str+="\t\t</div>",str+="\t</div>",str+="</div>",str=errUtil.replaceDomainName(str),0==$("#alertMsgNew").length)(alertMsgDiv=document.createElement("div")).id="alertMsgNew",alertMsgDiv.style.display="none",alertMsgDiv.innerHTML=str,document.body.appendChild(alertMsgDiv);else{var searchedDiv=document.getElementById("alertMsgNew"),alertMsgDiv=document.createElement("div");alertMsgDiv.id="alertMsgNew",alertMsgDiv.style.display="none",alertMsgDiv.innerHTML=str,document.body.replaceChild(alertMsgDiv,searchedDiv)}},createPortletWaitPage:function(line,moduleSub){var str="";if(str+="<div class='system-error "+line+"'>",str+="\t<span class='mark-line'></span>",str+="\t<div class='error-header'>",str+="\t\t<h1>Service : "+moduleSub+"</h1>",str+="     \t\t<button type='button' class='button-img close'><span>팝업닫기</span></button>",str+="\t</div>",str+="\t<div class='error-body'>",str+="\t\t<div class='error-txt st02'>",str+="\t\t\t<ul class='main-info'>",str+="\t\t\t\t<li>요청하신 작업을 처리중 응답이 지연되고 있습니다.</li>",str+="\t\t\t\t<li>잠시 후 다시 이용해 주시기 바랍니다.</li>",str+="\t\t\t</ul>",str+="\t\t\t<ul class='sub-info'>",str+="\t\t\t\t<li>The response has been delayed in processing the requested tasks.</li>",str+="\t\t\t\t<li>After a while, please try again.</li>",str+="\t\t\t</ul>",str+="\t\t</div>",str+="\t</div>",str+="</div>",str=errUtil.replaceDomainName(str),0==$("#alertMsgNew").length)(alertMsgDiv=document.createElement("div")).id="alertMsgNew",alertMsgDiv.style.display="none",alertMsgDiv.innerHTML=str,document.body.appendChild(alertMsgDiv);else{var searchedDiv=document.getElementById("alertMsgNew"),alertMsgDiv=document.createElement("div");alertMsgDiv.id="alertMsgNew",alertMsgDiv.style.display="none",alertMsgDiv.innerHTML=str,document.body.replaceChild(alertMsgDiv,searchedDiv)}},showLayer:function(id){(new $.Popup).show(id)},closeLayer:function(id){(new $.Popup).handlerHide(id)},popupForm:function(subject,contentHtml,epIdList,attachs,moduleName){console.log("[popupTotalForm]");var recipients=[],options={initModule:moduleName,domainModel:{common:{subject:subject,lang:errUtil.getLocale()},contents:{type:"layer",contents:contentHtml},recipients:recipients,attachments:attachs}};$.popupWriteForm(options)},getLocale:function(){for(var cookiearray=document.cookie.split(";"),language="ko",i=0;i<cookiearray.length;i++)name=cookiearray[i].split("=")[0].trim(),"savelanguage"===name.toLowerCase()&&(value=cookiearray[i].split("=")[1].indexOf(".")>-1?cookiearray[i].split("=")[1].split(".")[0]:cookiearray[i].split("=")[1],"undefined"!==$.type(value)&&null!=value&&(language=value));return language.substr(0,2)},showError:function(key,replaces){var msg=errUtil.getMessageProperties(key,replaces);msg=="["+key+"]"&&(msg=key),msg=msg.replace("[","").replace("]",""),errUtil.createAlertDiv(),$("#alertMsg .pop-alert").html(msg),$("#alertMsg .pop-header > h1").html(errUtil.getMessageProperties("MSG.ALERT.0012")),errUtil.showLayer("alertMsg"),$("#alertMsg .button.default").click(function(){errUtil.closeLayer("alertMsg")})},getMessageProperties:function(key,replaces){var args=[key];return"array"===$.type(replaces)?args=$.merge(args,replaces):"undefined"!==$.type(replaces)&&null!=replaces&&args.push(replaces),$.i18n.prop.apply(this,args)},createAlertDiv:function(){if(0==$("#alertMsg").length){var str="    <div class='pop-header'>";str+="        <h1>알림</h1>",str+="    </div>",str+="    <div class='pop-body'>",str+="        <div class='pop-alert'></div>",str+="    </div>",str+="    <div class='pop-btn'>",str+="        <button type='button' class='button default'><span>확인</span></button>",str+="    </div>";var alertMsgDiv=document.createElement("div");alertMsgDiv.id="alertMsg",alertMsgDiv.style.display="none",alertMsgDiv.innerHTML=str,document.body.appendChild(alertMsgDiv),$("#alertMsg").addClass("popup alert popup-box03")}}};
//# sourceMappingURL=../maps/util/errorPage.js.map