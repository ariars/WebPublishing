(function (w) {
    var _$appcommon = {};
    var parentCallback;
    var parentSubCallback;
    var parentControl;
    var dialog;

    _$appcommon.serviceurl = "";
    _$appcommon.PagerFormat = "<div> Page {pageIndex} of {pageCount} </div> <div> {first} {prev} {pages} {next} {last} </div> <div> Total {itemCount} </div>";

    _$appcommon.AjaxCall = function (option) {
        $.ajax({
            cache: false,
            type: option.type,
            url: option.url,
            data: (option.type == "GET" ? option.data : JSON.stringify(option.data)),
            contentType: "application/json; charset=utf-8",
            beforeSend: function (xhr) {

                _$appcommon.openLoading();

                if (option.beforeSend != null && option.beforeSend != undefined) {
                    option.beforeSend();
                }

                if (window.location !== window.parent.location) {
                    var tokenHeaderName = window.parent.$("#hfTokenHeaderName").val();
                    var tokenHeaderValue = window.parent.$("#hfTokenHeaderValue").val();
                }
                else {
                    var tokenHeaderName = $("#hfTokenHeaderName").val();
                    var tokenHeaderValue = $("#hfTokenHeaderValue").val();
                }

                if (tokenHeaderName != "" && tokenHeaderName != undefined) {
                    xhr.setRequestHeader(tokenHeaderName, tokenHeaderValue);
                }

                var paramTokenHeaderValue = $("#hfParamTokenHeaderValue").val();

                if (paramTokenHeaderValue != "" && paramTokenHeaderValue != undefined) {
                    xhr.setRequestHeader("ValidateParameterForgeryToken", paramTokenHeaderValue);
                }
            },
            success: function (data) {
                if (option.success != null && option.success != undefined) {
                    option.success();
                }
                else if (data.code == 400 || data.code == 401 || data.code == 403 || data.code == 9000) {
                    $appcommon.alert(data.value);
                }
            },
            complete: function () {

                if (option.complete != null && option.complete != undefined) {
                    option.complete();
                }
            },
            error: function (request, status, error) {

                _$appcommon.closeLoading();
                _$appcommon.closeLoadingPopup();

                console.log("code:" + request.status + "\n" + "message:" + request.responseText + "\n" + "error:" + error);

                var result = JSON.parse(request.responseText);

                if (result.code != undefined && result.code != 200) {
                    console.log("Status:" + result.code + " - ServiceUrl:" + option.url);

                    if (result.value == "") {
                        $appcommon.alert("An error has occurred. Please try again in a few minutes.");
                    }
                    else if (result.code == 2 || result.code == 403 || result.code == 999 || result.code == 1001 || result.code == 1002 || result.code == 9000) {
                        $appcommon.alert(result.value);
                    }

                }
                else {
                    if (option.error != null && option.error != undefined) {
                        option.error();
                    }

                    $appcommon.alert(error);
                }

            }
        }).done(function (result) {

            console.log("Status:" + result.code + " - ServiceUrl:" + option.url);

            if (result.code != undefined && result.code != 200) {
                if (result.value == "") {
                    $appcommon.alert("An error has occurred. Please try again in a few minutes.");
                }
                else if (result.code == 2 || result.code == 403 || result.code == 999 || result.code == 1001 || result.code == 1002) {
                    $appcommon.alert(result.value);
                }
                else if (result.code == 8000) {
                    $appcommon.alert(result.message);
                    window.location = result.value;
                }
                else if (result.code == 1005) {
                    window.location = result.value;
                }

            }
            else {
                if (option.done != null && option.done != undefined) {
                    option.done(result.value);
                }
            }

            if (option.lodingCompete != false) {
                _$appcommon.closeLoading();
                _$appcommon.closeLoadingPopup();
            }
        });
    }

    _$appcommon.Ajax = function (type, data, url, callback, lodingCompete) {
        var option = {
            type: type,
            url: url,
            data: data,
            beforeSend: function () {
            },
            complete: function () {
            },
            done: function (result) {
                if (callback != undefined) {
                    callback(result);
                }
            },
            lodingCompete: lodingCompete
        };

        $appcommon.AjaxCall(option);
    }

    _$appcommon.AjaxGet = function (data, url, callback) {
        var option = {
            type: "GET",
            url: url,
            data: data,
            beforeSend: function () {
                _$appcommon.openLoading();
            },
            complete: function () {
                _$appcommon.closeLoading();
            },
            done: function (result) {
                if (callback != undefined) {
                    callback(result);
                }
            }
        };

        $appcommon.AjaxCall(option);
    }

    _$appcommon.AjaxPost = function (data, url, callback) {
        var option = {
            type: "POST",
            url: url,
            data: data,
            beforeSend: function () {
                _$appcommon.openLoading();
            },
            complete: function () {
                _$appcommon.closeLoading();
            },
            done: function (result) {
                if (callback != undefined) {
                    callback(result);
                }
            }
        };

        $appcommon.AjaxCall(option);
    }

    _$appcommon.AjaxPut = function (data, url, callback) {
        var option = {
            type: "PUT",
            url: url,
            data: data,
            beforeSend: function () {
                _$appcommon.openLoading();
            },
            complete: function () {
                _$appcommon.closeLoading();
            },
            done: function (result) {
                if (callback != undefined) {
                    callback(result);
                }
            }
        };

        $appcommon.AjaxCall(option);
    }

    _$appcommon.AjaxDelete = function (data, url, callback) {
        var option = {
            type: "DELETE",
            url: url,
            data: data,
            beforeSend: function () {
                _$appcommon.openLoading();
            },
            complete: function () {
                _$appcommon.closeLoading();
            },
            done: function (result) {
                if (callback != undefined) {
                    callback(result);
                }
            }
        };

        $appcommon.AjaxCall(option);
    }

    // Ajax Json Return
    _$appcommon.AjaxJson = function (data, url, callback) {
        $.ajax({
            type: "POST",
            url: url,
            data: JSON.stringify(data),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (data) {
                if (data.ErrorMessage != null) {
                    $appcommon.alert("Error : " + data.ErrorMessage);
                } else {
                    callback(data);
                }
                return;
            },
            error: function (msg) {
                $appcommon.alert("AjaxJson Error : " + msg.responseText);
            }
        });
    }

    // Ajax Html Return
    _$appcommon.AjaxHtml = function (data, url, callback) {
        $.ajax({
            cache: false,
            type: "GET",
            url: url,
            data: data,
            contentType: "html",
            beforeSend: function (xhr) {
                _$appcommon.openLoading();
            },
            success: function (data) {
                //$appcommon.alert(data.value);
            },
            complete: function () {
            },
            error: function (request, status, error) {

                _$appcommon.closeLoading();
                _$appcommon.closeLoadingPopup();

                console.log("code:" + request.status + "\n" + "message:" + request.responseText + "\n" + "error:" + error);
            }
        }).done(function (result) {
            _$appcommon.closeLoading();
            _$appcommon.closeLoadingPopup();

            if (callback != undefined) {
                callback(result);
            }
        });
    }

    _$appcommon.AjaxFile = function (data, url, callback) {
        _$appcommon.openLoading();
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function (aa, bb) {
            var a;

            if (xhttp.readyState === 4 && xhttp.status === 200) {
                if (xhttp.response.size == 0) {
                    $appcommon.alert(MESSAGE.OccurErrorWhileWorking);
                }
                else if (xhttp.response.type.indexOf("application/json") > -1) {
                    var fileReader = new FileReader();
                    fileReader.onload = function () {
                        var result = JSON.parse(this.result);

                        if (result.code != undefined && result.code != 200) {
                            if (result.value == "") {
                                $appcommon.alert("An error has occurred. Please try again in a few minutes.");
                            }
                            else if (result.code == 2 || result.code == 403 || result.code == 999 || result.code == 1001 || result.code == 1002 || result.code == 9000) {
                                $appcommon.alert(result.value);
                            }
                            else if (result.code == 8000) {
                                $appcommon.alert(result.message);
                                window.location = result.value;
                            }
                            else if (result.code == 1005) {
                                window.location = result.value;
                            }
                        }
                        else {
                            if (callback != null && callback != undefined) {
                                callback(result.value);
                            }
                        }
                    };
                    fileReader.readAsText(xhttp.response);
                }
                else if (xhttp.response.type.indexOf("text/html") > -1) {
                    var fileReader = new FileReader();
                    fileReader.onload = function (e) {
                        $appcommon.alert(e.srcElement.result);
                    }
                    fileReader.readAsText(xhttp.response);
                }
                else {
                    var filename = "";
                    var disposition = xhttp.getResponseHeader('Content-Disposition');
                    if (disposition && disposition.indexOf('attachment') !== -1) {
                        var filenameRegex = /filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/
                        var matches = filenameRegex.exec(disposition);
                        if (matches != null && matches[1]) {
                            filename = matches[1].replace(/['"]/g, '');

                            if (filename.indexOf("UTF-8") == 0) {
                                filename = decodeURIComponent(filename.substring(5, filename.length));
                            }
                        }
                    }

                    var type = xhttp.getResponseHeader('Content-Type');

                    var blob = typeof File === 'function' && !(navigator.userAgent.toLowerCase().indexOf("edge") != -1)
                        ? new File([this.response], filename, { type: type })
                        : new Blob([this.response], { type: type });

                    if (window.navigator.msSaveOrOpenBlob) {
                        window.navigator.msSaveOrOpenBlob(blob, filename);
                    }
                    else {
                        var URL = window.URL || window.webkitURL;
                        var downloadUrl = URL.createObjectURL(blob);

                        if (filename) {
                            var a = document.createElement("a");
                            if (typeof a.download === 'undefined') {
                                window.location = downloadUrl;
                            } else {
                                a.href = downloadUrl;
                                a.download = filename;
                                document.body.appendChild(a);
                                a.click();
                            }
                        } else {
                            window.location = downloadUrl;
                        }

                        setTimeout(function () { URL.revokeObjectURL(downloadUrl); }, 1000); // cleanup
                    }
                }

                _$appcommon.closeLoading();
            }
            else {
                //alert("xhttp status : " + xhttp.readyState + " / " + xhttp.status);
            }
        };

        var data = JSON.stringify(data);
        xhttp.open("POST", url, true);
        xhttp.setRequestHeader("Content-Type", "application/json; charset=utf-8");
        //xhttp.setRequestHeader("Content-Length", JSON.stringify(data).length);

        if (window.location !== window.parent.location) {
            var tokenHeaderName = window.parent.$("#hfTokenHeaderName").val();
            var tokenHeaderValue = window.parent.$("#hfTokenHeaderValue").val();
        }
        else {
            var tokenHeaderName = $("#hfTokenHeaderName").val();
            var tokenHeaderValue = $("#hfTokenHeaderValue").val();
        }

        if (tokenHeaderName != "" && tokenHeaderName != undefined) {
            xhttp.setRequestHeader(tokenHeaderName, tokenHeaderValue);
        }
        xhttp.responseType = 'blob';
        xhttp.send(data);
    }

    // Ajax File Upload
    _$appcommon.AjaxUpload = function (data, url, callback) {

        $.ajax({
            xhr: function () {
                var xhrobj = $.ajaxSettings.xhr();
                if (xhrobj.upload) {
                    xhrobj.upload.addEventListener('progress', function (event) {
                        var percent = 0;
                        var position = event.loaded || event.position;
                        var total = event.total;
                        if (event.lengthComputable) {
                            percent = Math.ceil(position / total * 100);
                        }

                        $(".progress-bar").css("width", percent + "%");
                        $(".progress-bar b").text(percent + "%");

                    }, false);
                }
                return xhrobj;
            },
            type: "POST",
            url: url,
            data: data,
            processData: false,
            contentType: false,
            enctype: 'multipart/form-data', 
            cache: false,
            beforeSend: function (xhr) {
                //_$appcommon.openLoading();

                if (window.location !== window.parent.location) {
                    var tokenHeaderName = window.parent.$("#hfTokenHeaderName").val();
                    var tokenHeaderValue = window.parent.$("#hfTokenHeaderValue").val();
                }
                else {
                    var tokenHeaderName = $("#hfTokenHeaderName").val();
                    var tokenHeaderValue = $("#hfTokenHeaderValue").val();
                }

                if (tokenHeaderName != "" && tokenHeaderName != undefined) {
                    xhr.setRequestHeader(tokenHeaderName, tokenHeaderValue);
                }
            },
            complete: function () {
                //_$appcommon.closeLoading();
            },
            success: function (result) {
                //status.setProgress(100);
                if (callback != undefined) {
                    callback(result);
                }
            },
            error: function (msg) {
                $appcommon.alert("AjaxUpload Error : " + msg.responseText)
            }
        });
    }

    _$appcommon.FileDownLoad = function (serviceUrl, data) {
        _$appcommon.openLoading();

        $.fileDownload(serviceUrl, {
            httpMethod: "POST",
            data: data,
            successCallback: function (url) {
                _$appcommon.closeLoading();
            },
            failCallback: function (result, url) {
                _$appcommon.closeLoading();

                _$appcommon.alert("Fail Callback : " + result);
            }
        });
    }

    // 파라미터를 가져옵니다.
    _$appcommon.ParameterByName = function (name) {
        var regexS = "[\\?&]" + name + "=([^&#]*)";
        var regex = new RegExp(regexS);
        var results = regex.exec(window.location.href);
        if (results == null) {
            return "";
        } else {
            return results[1];
        }
    }

    // 파라미터를 배열로가져온다. 
    _$appcommon.Parameter = function () {
        var param = new Array();
        var url = location.search;
        var params;
        params = url.substring(url.indexOf('?') + 1, url.length);
        params = params.split("&");
        var size = params.length;
        var key, value;
        for (var i = 0; i < size; i++) {
            key = params[i].split("=")[0];
            value = params[i].split("=")[1];
            param[key] = value;
        }

        return param;
    }

    // 파라미터를 삭제한다.
    _$appcommon.ParameterRemove = function (remove) {
        var param = new Array();
        var url = location.search;
        var params;
        params = url.substring(url.indexOf('?') + 1, url.length);
        params = params.split("&");
        var size = params.length;
        var key, value;
        for (var i = 0; i < size; i++) {
            key = params[i].split("=")[0];
            value = params[i].split("=")[1];

            var ischeck = true;
            if (remove != undefined) {
                for (var j = 0; j < remove.length; j++) {
                    if (remove[j] == key) {
                        ischeck = false;
                    }
                }
            }

            if (ischeck) {
                param[key] = value;
            }
        }

        var Url = new Array();
        for (var key in param) {
            Url.push(key + "=" + param[key]);
        }

        var urlstring = "";
        if (Url.length > 0) {
            urlstring = "?" + Url.join("&");
        }

        return urlstring;
    }

    // 파라미터 배열을 Url 스트링으로 변환
    _$appcommon.ParameterString = function (ar) {

        var param = new Array();
        for (var key in ar) {
            param.push(key + "=" + ar[key]);
        }

        return param.join("&"); //인코딩 x
    }

    // 숫자만 입력가능하게 이벤트를 등록한다.
    _$appcommon.OnlyNum = function () {
        $(".OnlyNum").keydown(function (e) {
            // 키입력에 사용되는 몇몇 키는 허용..delete, backspace, esc 등등
            if (e.keyCode == 46 || e.keyCode == 8 || e.keyCode == 9 || e.keyCode == 27 || e.keyCode == 13
                || (e.keyCode == 65 && e.ctrlKey === true) || (e.keyCode >= 35 && e.keyCode <= 39) || e.keyCode == 110) {
                return;
            }
            else {
                if (e.shiftKey || (e.keyCode < 48 || e.keyCode > 57) && (e.keyCode < 96 || e.keyCode > 105)) {
                    //모바일 IE 브라우저의 경우 문자입력시 빈값이 남는다
                    if ($(this).val().length == 0) {
                        $(this).val('');
                    }
                    //모바일 크롬 브라우저의 경우 특수문자가 다 0으로 넘어오고  e.preventDefault(); 이벤트 실행이 안되는 버그수정
                    if (e.keyCode == 0) {
                        $(this).val('');
                    }
                    else {
                        e.preventDefault();
                    }
                }
            }
        });
    }

    // this prevents from typing non-number text, including "e".
    _$appcommon.isNumber = function (evt) {
        evt = (evt) ? evt : window.event;
        var charCode = (evt.which) ? evt.which : evt.keyCode;
        if ((charCode > 31 && (charCode < 48 || charCode > 57)) && charCode !== 46) {
            evt.preventDefault();
        } else {
            return true;
        }
    }

    _$appcommon.isPhoneNumber = function (evt) {
        evt = (evt) ? evt : window.event;
        var charCode = (evt.which) ? evt.which : evt.keyCode;
        // #, +, -, 숫자 허용
        if (charCode == 35 || charCode == 43 || charCode == 45) {
            return true
        }
        else {
            return this.isNumber(evt);
        }
    }

    _$appcommon.isSamCode = function (evt) {
        var theEvent = evt || window.event;
        var targetValue = theEvent.target.value;
        var regex = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z]?)*$/i;

        if (!regex.test(targetValue)) {
            theEvent.returnValue = false;
            if (theEvent.preventDefault) theEvent.preventDefault();
            theEvent.target.value = theEvent.target.value.substring(0, theEvent.target.value.length - 1);
        }
    }

    _$appcommon.ValidatePhoneNumber = function validate(evt) {
        var theEvent = evt || window.event;
        var targetValue = theEvent.target.value;
        var regex = /^#?\+?[0-9]*\-?[0-9]*\-?[0-9]*\-?[0-9]*$/

        if (!regex.test(targetValue)) {
            theEvent.returnValue = false;
            if (theEvent.preventDefault) theEvent.preventDefault();
            theEvent.target.value = theEvent.target.value.substring(0, theEvent.target.value.length - 1);
        }
    }

    _$appcommon.ValidateEmail = function validate(evt) {
        var theEvent = evt || window.event;
        var targetValue = theEvent.target.value;
        var regex = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;

        if (!regex.test(targetValue)) {
            theEvent.returnValue = false;
            if (theEvent.preventDefault) theEvent.preventDefault();
            theEvent.target.value = theEvent.target.value.substring(0, theEvent.target.value.length - 1);
        }
    }

    _$appcommon.ValidateIPKey = function validate(evt) {
        var theEvent = evt || window.event;
        var targetValue = theEvent.target.value;
        var regex = /^(([\*]|\d|[1-9]\d|1\d\d|2([0-4]\d|5[0-5]))\.){3}([\*]|\d|[1-9]\d|1\d\d|2([0-4]\d|5[0-5]))$/;

        if (!regex.test(targetValue)) {
            theEvent.returnValue = false;
            if (theEvent.preventDefault) theEvent.preventDefault();
            theEvent.target.value = theEvent.target.value.substring(0, theEvent.target.value.length - 1);
        }
    }

    _$appcommon.ValidateIP = function (text) {
        var filter = /^(([\*]|\d|[1-9]\d|1\d\d|2([0-4]\d|5[0-5]))\.){3}([\*]|\d|[1-9]\d|1\d\d|2([0-4]\d|5[0-5]))$/;
        if (filter.test(text) == true) {
            return true;
        } else {
            return false;
        }
    }

    _$appcommon.ValidateDate = function (date) {
        return moment(date, 'YYYY-MM-DD', true).isValid();
    }

    /**
     * 바이트 문자 입력가능 문자수 체크
     * 
     * @param id : tag id 
     * @param title : tag title
     * @param maxLength : 최대 입력가능 수 (byte)
     * @returns {Boolean}
     */
    _$appcommon.ByteLengthCheck = function (evt) {
        var theEvent = evt || window.event;
        var maxLength = (theEvent.target.maxLength != null || theEvent.target.maxLength == -1) ? theEvent.target.maxLength : 100;
        var byteResult = this.GetByteLength(theEvent.target.value, maxLength);
        //var str = theEvent.target.value;
        //var charCode = (evt.which) ? evt.which : evt.keyCode;
        //if (charCode > 31 && charCode !== 46) {
        //    str += charCode;
        //}
        //if (Number(this.ByteCheck(str)) > Number(maxLength)) {
        if (Number(byteResult.codeByte) > Number(maxLength)) {
            theEvent.returnValue = false;
            if (theEvent.preventDefault) theEvent.preventDefault();
            theEvent.target.value = theEvent.target.value.substring(0, byteResult.removeByteAt);
        }
        //else if ($.trim(theEvent.target.value).length != theEvent.target.value.length) {
        //    theEvent.target.value = $.trim(theEvent.target.value);
        //}
    }

    /**
     * 총 바이트수 / 제거할 바이트수 반환  
     * 
     * @param el : tag jquery object
     * @returns {Number, Number}
     */
    _$appcommon.GetByteLength = function (str, maxLength) {
        var codeByte = 0;
        var removeByteAt = 0;
        for (var idx = 0; idx < str.length; idx++) {
            var oneChar = escape(str.charAt(idx));
            if (oneChar.length == 1) {
                codeByte++;
            } else if (oneChar.indexOf("%u") != -1) {
                codeByte += 2;
            } else if (oneChar.indexOf("%") != -1) {
                codeByte++;
            }

            if (Number(codeByte) <= Number(maxLength)) {
                removeByteAt = idx + 1;
            }
        }

        return { codeByte: codeByte, removeByteAt: removeByteAt };
    }

    // 컨트롤 체크
    _$appcommon.TextboxCheckFocus = function (controlId, message) {

        if ($(controlId).length > 0) {
            if ($(controlId).val().replace(/^\s+|\s+$/g, '') == '') {
                $(controlId).focus();
                $appcommon.alert(message);
                return false;
            }
        }
        else {
            $appcommon.alert(MESSAGE.NoExistControl);
            return false;
        }

        return true;
    }

    _$appcommon.ComboboxCheckFocus = function (controlId, message) {
        var value = $(controlId + " option:selected").val().replace(/^\s+|\s+$/g, '');
        if (value == '' || value == 0) {
            $(controlId).focus();
            $appcommon.alert(message);
            return false;
        }
        return true;
    }

    // 팝업
    _$appcommon.popup = function (url, width, height, title) {
        $("#poupframe").attr("src", url); // 443px
        $(".pop_modal").css("width", width + 'px');
        $(".pop_modal").css("height", height + 'px');
        $("#poupframe").css("height", (height - 57) + 'px');
        $("#popup_title").text(title);
    }

    _$appcommon.openPopup = function (w, h, t, callback) {
        _$appcommon.parentCallback = null;
        if (h != null && w != null && t != null) {

            $(".pop_wrap").css("width", "100%");

            $appcommon.dialog.dialog("option", "title", t);
            $appcommon.dialog.dialog("option", "width", w);
            $appcommon.dialog.dialog("option", "height", h);
            $appcommon.dialog.dialog("option", "closeOnEscape", true);

            $(".modal_contents").height(h - 105);

            $appcommon.dialog.dialog("open");

            if (callback) {
                _$appcommon.parentCallback = callback;
            }
        }
    }

    _$appcommon.openFramePopup = function (url, h, w, t, callback, control, target) {

        _$appcommon.parentCallback = null;
        if (url != null && h != null && w != null && t != null) {
            var $iframe = $("<iframe>").attr("src", url).attr("style", "width:100%;height:" + h + "px;border:0;");
            $(".pop_wrap").append($iframe);
            $(".pop_wrap").css("width", "100%");

            $("#dialog").dialog("option", "title", t);
            $("#dialog").dialog("option", "width", w);
            $("#dialog").dialog("option", "closeOnEscape", true);

            $("#dialog").dialog("open");

            if (callback) {
                _$appcommon.parentCallback = callback;
            }   
        }
    }

    _$appcommon.openPopupBlockOverlay = function (url, h, w, t, callback) {

        _$appcommon.parentCallback = null;
        if (url != null && h != null && w != null && t != null) {
            var $iframe = $("<iframe>").attr("src", url).attr("style", "width:100%;height:" + h + "px;border:0;");
            $(".pop_wrap").append($iframe);
            $(".pop_wrap").css("width", "100%");

            $("#dialog").dialog("option", "title", t);
            $("#dialog").dialog("option", "width", w);
            $("#dialog").dialog("option", "closeOnEscape", false);

            $("#dialog").dialog("open");

            $("#dialog").dialog("widget")
                .next(".ui-widget-overlay")
                .css({ opacity: 1 });

            $('.ui-dialog-titlebar').hide();

            if (callback)
                _$appcommon.parentCallback = callback;
        }
    }

    _$appcommon.closePopup = function (val) {
        if (window.parent) {
            window.parent.$("#dialog").dialog("close");
        }
        else {
            $("#dialog").dialog("close");
        }
    }

    _$appcommon.closeFramePopup = function (val) {
        if (val) {
            window.parent.$appcommon.callbackPopupClose(val);
        }

        window.parent.$("#dialog").dialog("close");
    }

    _$appcommon.closeSubPopup = function (val) {
        window.parent.$appcommon.parentControl = "#mainModal";

        if (val) {
            window.parent.$appcommon.callbackSubPopupClose(val);
        }

        window.parent.$('#subModal').modal('hide');
    }

    _$appcommon.callbackPopupClose = function (val) {
        if (_$appcommon.parentCallback) {
            _$appcommon.parentCallback(val, _$appcommon.parentControl);
        }
    }

    _$appcommon.callbackSubPopupClose = function (val) {
        _$appcommon.parentSubCallback(val, _$appcommon.parentControl);
    }

    _$appcommon.openLoading = function (val) {
        if ($(".loadingcss").length > 0) {
            $(".loadingcss").removeClass("displayNone");
        }
        else {
            if (val == undefined) {
                window.parent.$appcommon.openLoading(true);
            }
        }
    }

    _$appcommon.openLoadingRepAdminSyncall = function (val) {
        if ($(".loadingcss").length > 0) {
            $(".loadingcss").removeClass("displayNone");
        }
        else {
            if (val == undefined) {
                window.parent.$appcommon.openLoadingRepAdminSyncall(true);
            }
        }
    }

    _$appcommon.closeLoading = function (val) {
        if ($(".loadingcss").length > 0) {
            $(".loadingcss").addClass("displayNone");
        }
        else {
            if (val == undefined) {
                window.parent.$appcommon.closeLoading(true);
            }
        }
    }

    _$appcommon.closeLoadingPopup = function (val) {
        if ($(".loadingcss").length > 0) {
            $(".loadingcss").addClass("displayNone");
        }
        else {
            if (val == undefined) {
                window.parent.$appcommon.closeLoadingPopup(true);
            }
        }
    }

    _$appcommon.formatDateTimeFromUTC = function (data, format) {
        if (!data) {
            return '';
        }

        if (format == null || format == undefined || format == "") {
            format = "YYYY-MM-DD HH:mm:ss";
        }

        return moment(new Date(data + 'Z')).format(format);
    }

    _$appcommon.formatDateTime = function (data, format) {
        if (!data) {
            return '';
        }

        if (format == null || format == undefined || format == "") {
            format = "YYYY-MM-DD HH:mm:ss";
        }

        return moment(data).format(format);
    }

    _$appcommon.formatDateTimeUnix = function (data, format) {
        if (format == null || format == undefined || format == "") {
            format = "YYYY-MM-DD HH:mm:ss";
        }

        return moment.unix(data).format(format);
    }

    _$appcommon.formatDate = function (data, format) {
        if (format == null || format == undefined || format == "") {
            format = "YYYY-MM-DD";
        }

        return moment(data).format(format);
    }

    _$appcommon.CheckSpecialCharacter = function (string, func) {
        var special_pattern = /[`~!@#$%^&*|\\\'\";:\/?]/gi;
        if (special_pattern.test(string) == true) {
            $appcommon.alert("사용 할 수 없는 단어가 포함되어 있습니다.");
        }
        else {
            if (func != null && ($.isFunction(func))) {
                func.apply();
            }
        }
    }

    _$appcommon.formatbool = function (data) {
        if (data) {
            return "True";
        }
        return "False"
    }

    _$appcommon.alert = function (text, callback, val) {
        //new PNotify({
        //    title: 'Infomation',
        //    text: text,
        //    type: 'info',
        //    styling: 'bootstrap3'
        //});

        var control = "#alertModal";

        if ($(control).length > 0) {

            $(control).modal({ backdrop: 'static' });
            $(control + " .modal-body").empty();
            $(control + " .modal-body").text(text);
            $(control).css("zindex", "1070!important");
            $(control + " .modal-title").text('Infomation');
            $(control).modal('show');
            $(".modal-backdrop").last().css("z-index", "1090");

            setTimeout(function () {
                $("#btnConfirm").focus();
            }, 10);
            $("#btnConfirm").attr('onclick', '').unbind('click');
            $('#btnConfirm').click(function () {
                if (callback) {
                    callback();
                }
            });

        }
        else {
            if (val == undefined) {
                window.parent.$appcommon.alert(text, callback, true);
            }
            else {
                alert(text);
            }
        }
    }

    _$appcommon.confirm = function (text, callback, val) {
        var control = "#alertModal";

        if ($(control).length > 0) {
            $(control).modal({ backdrop: 'static' });

            $(control + " .modal-body").empty();
            $(control + " .modal-body").text(text);
            $(control).css("zindex", "1070!important");
            $(control + " .modal-title").text('Infomation');
            $(control).modal('show');
            $(".modal-backdrop").last().css("z-index", "1090");
            setTimeout(function () {
                $('#btnConfirm').focus();
            }, 10);
            $("#btnConfirm").attr('onclick', '').unbind('click');
            $('#btnConfirm').click(function () {
                if (callback) {
                    callback();
                }
            });
        }
        else {
            if (val == undefined) {
                window.parent.$appcommon.confirm(text, callback, true);
            }
            else {
                if (confirm(text)) {
                    callback();
                };
            }
        }
    }

    //쿠키 삭제
    _$appcommon.removeCookies = function (cookieNames) {

        for (var i = 0; i < cookieNames.length; i++) {
            setCookie(cookieNames[i], "", -1);
        }
    }

    //쿠키 저장.
    _$appcommon.setCookie = function (cName, cValue, cDay) {

        var expire = new Date();
        expire.setDate(expire.getDate() + cDay);
        cookies = cName + '=' + escape(cValue) + '; path=/ '; // 한글 깨짐을 막기위해 escape(cValue)를 합니다.
        if (typeof cDay != 'undefined') cookies += ';expires=' + expire.toGMTString() + ';';
        document.cookie = cookies;
    }

    // 쿠키 가져오기
    _$appcommon.getCookie = function (cName) {

        cName = cName + '=';
        var cookieData = document.cookie;
        var start = cookieData.indexOf(cName);
        var cValue = '';
        if (start != -1) {
            start += cName.length;
            var end = cookieData.indexOf(';', start);
            if (end == -1) end = cookieData.length;
            cValue = cookieData.substring(start, end);
        }
        return unescape(cValue);
    }

    // 달력 초기화
    _$appcommon.CalendarInit = function (obj, required) {
        var required = required == 'required' ? required : '';
        var calendarHtml = "<div class='form_wrap_date'>";
        //calendarHtml += "<input type ='text' id='" + obj + "' name='" + obj + "' value='' readonly " + required + "/></div>";
        calendarHtml += "<input type ='text' class='datepicker' id='" + obj + "' name='" + obj + "' value='' " + required + " autocomplete='off' /></div>";

        $('#' + obj).html(calendarHtml);

        $('#' + obj).attr("id", "");

        $('#' + obj).DatePicker({
            inline: false,
            onChange: function (dates, el) {
                $('#' + obj).val(dates.format("isoDate"));
                var e = jQuery.Event("change");
                e.args = {};
                e.args.date = dates;
                $('#' + obj).trigger(e);
            }
        });
        $('#' + obj).attr("name", obj);

        if (typeof ($.fn.mask) === 'undefined') {
            return;
        }
        else {
            $('#' + obj).mask('0000-00-00');
        }
    }

    // 달력 Range 초기화
    _$appcommon.CalendarRangeInit = function (obj, required) {
        var required = required == 'required' ? required : '';

        var calendarHtml = "<div class='form_wrap_date'>";
        calendarHtml += "<input type ='text' class='datepicker' id='inputfromInput_" + obj + "' name='inputfromInput_" + obj + "' " + required + " readonly autocomplete='off' />" + "<label>~</label>";
        calendarHtml += "<input type ='text' class='datepicker' id='inputtoInput_" + obj + "' name='inputtoInput_" + obj + "' " + required + " readonly autocomplete='off' /></div>";

        $('#' + obj).html(calendarHtml);

        $('#inputfromInput_' + obj).DatePicker({
            inline: false,
            calendars: 1,
            mode: "single",
            onChange: function (dates, el) {
                if ($('#inputtoInput_' + obj).val() < dates.format("isoDate")) {
                    $('#inputtoInput_' + obj).val(dates.format("isoDate"));
                }
                // update the range display
                $('#inputfromInput_' + obj).val(dates.format("isoDate"));

                var e = jQuery.Event("change");
                e.args = {};
                e.args.fromDate = dates;
                e.args.toDate = new Date().parseISO8601($('#inputtoInput_' + obj).val());

                $('#' + obj).trigger(e);
            }
        });

        $('#inputtoInput_' + obj).DatePicker({
            inline: false,
            calendars: 1,
            mode: "single",
            onChange: function (dates, el) {
                if ($('#inputfromInput_' + obj).val() > dates.format("isoDate")) {
                    $('#inputfromInput_' + obj).val(dates.format("isoDate"));
                }
                $('#inputtoInput_' + obj).val(dates.format("isoDate"));
                var e = jQuery.Event("change");
                e.args = {};
                e.args.toDate = dates;

                e.args.fromDate = new Date().parseISO8601($('#inputfromInput_' + obj).val());

                $('#' + obj).trigger(e);
            }
        });
        $("#inputfromInput_" + obj).attr("name", "inputfromInput_" + obj);
        $("#inputtoInput_" + obj).attr("name", "inputtoInput_" + obj);

        if (typeof ($.fn.mask) != 'undefined') {
            $("#inputtoInput_" + obj).mask('0000-00-00');
            $("#inputfromInput_" + obj).mask('0000-00-00');
        }

        return $('#' + obj);
    }

    _$appcommon.FormValid = function (selector) {
        var result = true;
        var target = selector || 'body';

        function requriedInput() {
            if ($(this).val() && $(this).val().trim() !== '') {
                $(this).removeClass('valid_required');
            }
            else {
                $(this).addClass('valid_required');
            }
        };

        var requiredElements = $(target).find('[required]:visible');
        $.each(requiredElements, function (i, v) {
            var element = $(this);
            if (element.is("select")) {
                if (!element.val()) {
                    element.addClass('valid_required').unbind('change.sl').bind('change.sl', requriedInput);
                    result = false;
                }
                else {
                    element.removeClass('valid_required').unbind('change.sl');
                }
            }
            else if (element.is('input') || element.is('textarea')) {
                var ref = element.attr('ref');
                var refElement = ref ? element.siblings('#' + ref + ',[name="' + ref + '"]') : '';

                if (element.val().trim() === '' || (refElement && refElement.val().trim() === '')) {
                    if (refElement) {
                        element.addClass('valid_required');

                        refElement.addClass('valid_required').unbind('change.txt, keyup.txt').bind('change.txt, keyup.txt', function () {
                            if ($(this).val() && $(this).val().trim() !== '') {
                                element.removeClass('valid_required');
                                refElement.removeClass('valid_required');
                            }
                        });
                    } else {
                        element.addClass('valid_required').unbind('change.txt, keyup.txt').bind('change.txt, keyup.txt', requriedInput);
                    }

                    result = false;
                }
                else {
                    if (refElement) {
                        refElement.removeClass('valid_required').unbind('change.txt, keyup.txt');
                    }

                    element.removeClass('valid_required').unbind('change.txt, keyup.txt');
                }
            }
        });

        return result;
    };

    _$appcommon.Commas = function (x) {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    };

    _$appcommon.FileSize = function (bytes) {
        if (bytes >= 1073741824) { bytes = (bytes / 1073741824).toFixed(2) + " GB"; }
        else if (bytes >= 1048576) { bytes = (bytes / 1048576).toFixed(2) + " MB"; }
        else if (bytes >= 1024) { bytes = (bytes / 1024).toFixed(2) + " KB"; }
        else if (bytes > 1) { bytes = bytes + " bytes"; }
        else if (bytes == 1) { bytes = bytes + " byte"; }
        else { bytes = "0 bytes"; }
        return bytes;
    };

    _$appcommon.Split = function () {
        // splitter 설정
        var sizes = localStorage.getItem('split-sizes');

        if (sizes) {
            sizes = JSON.parse(sizes);
        } else {
            sizes = [50, 50]; // default sizes
        }

        var split = Split(['#ContentLeft', '#ContentCenter'], {
            minSize: [300, 300],
            maxSize: [600, Infinity],
            sizes: sizes,
            gutterSize: 5,
            onDragEnd: function (sizes) {
                localStorage.setItem('split-sizes', JSON.stringify(sizes))
            },
        });
    }

    _$appcommon.Splitresize = function () {
        windowResize();
    }

    w.$appcommon = _$appcommon;
})(window);

$(window).resize(function () {
    windowResize();
});

function windowResize() {
    $(".panel-content").css("height", (document.body.clientHeight - 98) + 'px');
}

/**
 * Resize function without multiple trigger
 * 
 * Usage:
 * $(window).smartresize(function(){  
 *     // code here
 * });
 */
(function ($, sr) {
    // debouncing function from John Hann
    // http://unscriptable.com/index.php/2009/03/20/debouncing-javascript-methods/
    var debounce = function (func, threshold, execAsap) {
        var timeout;

        return function debounced() {
            var obj = this, args = arguments;
            function delayed() {
                if (!execAsap)
                    func.apply(obj, args);
                timeout = null;
            }

            if (timeout)
                clearTimeout(timeout);
            else if (execAsap)
                func.apply(obj, args);

            timeout = setTimeout(delayed, threshold || 100);
        };
    };

    // smartresize 
    jQuery.fn[sr] = function (fn) { return fn ? this.bind('resize', debounce(fn)) : this.trigger(sr); };

})(jQuery, 'smartresize');

/* Mac Address Control */
(function ($) {
    function macControl(element, option) {
        var defaultOption = {
            separator: ':'
        };

        this.option = $.extend({}, defaultOption, option);
        this.$element = element;

        function isIE() {
            var ua = window.navigator.userAgent;
            return ua.indexOf('MSIE ') > 0 || ua.indexOf('Trident/') > 0 || ua.indexOf('Edge/') > 0
        };

        function init() {
            for (var i = 0; i < 6; i++) {
                var input = $('<input/>').attr({
                    type: 'text',
                    name: 'mac0' + i,
                    rel: i,
                    style: 'width:35px;text-align:center;ime-mode:disabled !important;'
                }).mask('AA', {
                    translation: {
                        A: { pattern: /([a-fA-F-0-9])/ }
                    }
                }).on('paste', function (e) {
                    var val = '';
                    try {
                        if (isIE()) {
                            val = window.clipboardData.getData('text');
                        } else {
                            val = e.originalEvent.clipboardData.getData('text');
                        }
                    }
                    catch (ex) { }

                    if (macControl.prototype.isValid(val)) {
                        var temp = val.replace(/[:-]/gi, ',');
                        var splitData = temp.split(',');

                        for (var i = 0; i < splitData.length; i++) {
                            $(element).find('input[name="mac0' + i + '"]').val(splitData[i]);
                        }
                    }
                });

                var separator = $('<span/>').attr({
                    style: 'margin:0px 5px 0px 5px'
                }).html('-');

                $(element).append(input);
                if (i != 5)
                    $(element).append(separator);
            }
        };

        init();
    }

    macControl.prototype = {
        setData: function (data) {
            if (this.isValid(data)) {
                var _self = this;
                var split = data.split(this.option.separator);

                if (split.length >= 6) {
                    $.each(split, function (i, v) {
                        _self.$element.find('input[name="mac0' + i + '"]').val(v);
                    });
                }
            }
        },

        getData: function () {
            var _self = this;
            var mac = '';
            $.each(this.$element.find('input[name*="mac0"]'), function (i) {
                mac += $(this).val().trim();

                if (i != 5) {
                    mac += _self.option.separator;
                }
            });

            return mac;
        },
        disable: function () {
            this.$element.find('input[name*="mac0"]').attr('disabled', true);
        },
        active: function () {
            this.$element.find('input[name*="mac0"]').attr('disabled', false);
        },
        isValid: function (data) {
            return /^([0-9A-Fa-f]{2}[:-]){5}([0-9A-Fa-f]{2})$/.test(data ? data : this.getData());
        }
    };

    $.fn.macAddressControl = function (option) {
        var control = new macControl($(this), option)
        $(this).data("macAddressControl", control);

        return control;
    };
})(jQuery);

(function ($) {

    Date.prototype.parseISO8601 = function (date) {
        var matches = date.match(/^\s*(\d{4})-(\d{2})-(\d{2})\s*$/);

        if (matches) {
            // 기존 Date 객체에서 year, month, date를 set하는 것은 아주아주아주 위험하다...
            // 따라서 year, month, date를 받는 생성자를 쓰자...
            var year = matches[1];
            var month = parseInt(matches[2]) - 1;
            var date = matches[3];
            date = new Date(year, month, date);
        }
        return date;
    };

    Date.prototype.yyyymmdd = function () {
        //if(this == null || $(this).val()) return "";
        var yyyy = this.getFullYear().toString();
        var mm = (this.getMonth() + 1).toString();
        var dd = this.getDate().toString();

        return yyyy + (mm[1] ? mm : '0' + mm[0]) + (dd[1] ? dd : '0' + dd[0]);
    }

    Date.prototype.yyyy_mm_dd = function () {

        var yyyy = this.getFullYear().toString();
        var mm = (this.getMonth() + 1).toString();
        var dd = this.getDate().toString();
        if (yyyy == "NaN" || yyyy == "") return "";

        return yyyy + "-" + (mm[1] ? mm : '0' + mm[0]) + "-" + (dd[1] ? dd : '0' + dd[0]);
    }

    Date.prototype.timeNow = function () {
        return ((this.getHours() < 10) ? "0" : "") + this.getHours() + ":" + ((this.getMinutes() < 10) ? "0" : "") + this.getMinutes();
    }

    Array.prototype.contains = function (obj) {
        var i = this.length;
        while (i--) {
            if (this[i] == obj) {
                return true;
            }
        }
        return false;
    }

    $.fn.doubleCalendar = function (method, date) {
        var dDate = new Date(Date.parse(date));

        if (typeof method == 'undefined') {
            return;
        }
        var objId = this.attr("id");
        if (typeof objId == 'undefined') {
            return;
        }

        if (method == "setFromDate") {
            if (!isNaN(dDate.getDate())) {
                $('#inputfromInput_' + objId).DatePickerSetDate(dDate, true);
            }
            var e = jQuery.Event("change");
            e.args = {};
            if (date == null || date == "") {
                $('#inputfromInput_' + objId).val('');
            } else {
                $('#inputfromInput_' + objId).val(dDate.yyyy_mm_dd());
            }
            e.args.fromDate = new Date(Date.parse($('#inputfromInput_' + objId).val()));
            e.args.toDate = new Date(Date.parse($('#inputtoInput_' + objId).val()));
            $('#inputfromInput_' + objId).trigger(e);
            return this;
        } else if (method == "setToDate") {
            if (!isNaN(dDate.getDate())) {
                $('#inputtoInput_' + objId).DatePickerSetDate(dDate, true);
            }
            var e = jQuery.Event("change");
            e.args = {};
            if (date == null || date == "") {
                $('#inputtoInput_' + objId).val('');
            } else {
                $('#inputtoInput_' + objId).val(dDate.yyyy_mm_dd());
            }
            e.args.fromDate = new Date(Date.parse($('#inputfromInput_' + objId).val()));
            e.args.toDate = new Date(Date.parse($('#inputtoInput_' + objId).val()));


            $('#inputtoInput_' + objId).trigger(e);
            return this;
        } else if (method == "getFromDate") {
            if ($('#inputfromInput_' + objId).val() == null || $('#inputfromInput_' + objId).val() == '') {
                return "";
            } else {
                return new Date().parseISO8601($('#inputfromInput_' + objId).val());
            }
        } else if (method == "getToDate") {
            if ($('#inputtoInput_' + objId).val() == null || $('#inputtoInput_' + objId).val() == '') {
                return "";
            } else {
                return new Date().parseISO8601($('#inputtoInput_' + objId).val());
            }
        } else if (method == "enableValidation") {
            /*구현할것*/
        }
    };

    jQuery.curCSS = function (element, prop, val) {
        return jQuery(element).css(prop, val);
    };

})(jQuery);