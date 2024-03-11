/*=======================================================================
객 체 명   :   messageBox
내    용   :   메시지 박스
파라미터   :   
리 턴 값   :   
========================================================================*/
(function (w) {
    var _$messageBox = {};

    /*=======================================================================
    함 수 명   :   openErrorMessage
    내    용   :   에러 메시지 상자 팝업
    파라미터   :   errorMessage - 출력할 메시지
    리 턴 값   :   
        ========================================================================*/
    _$messageBox.openErrorMessage = function (errorMessage, okFunc) {
        try {
            //스크립트 Exception 인 경우
            if (errorMessage.message == undefined) {
                var errorMessageText = errorMessage.replace(/\\r\\n/g, "\r\n");
                messageBox.openErrorBox(LABEL.Error, errorMessageText, false, okFunc);
            }
            //코드비하인드 Exception 인 경우
            else {
                messageBox.openErrorBox(errorMessage.message, errorMessage.stacktrace.replace(/\\r\\n/g, "\r\n"), false, okFunc);
            }
        }
        catch (exception) { }
    }

    /*=======================================================================
    함 수 명   :   openErrorBox
    내    용   :   JQueryUI의 Modal Message 팝업(에러 메시지 용)
    파라미터   :   title - MessageBox의 타이틀
                    text - MessageBox의 내용
                    mode - 에러메시지 모드(디버그, 릴리즈)
    리 턴 값   :   
    ========================================================================*/
    _$messageBox.openErrorBox = function (title, text, resizable, okFunc) {
        if (title == null || title == "") {
            title = LABEL.Error;
        }

        if ($("div[rel='alertPopup']").length == 0) {
        }
        else {
            $("div[rel='alertPopup']").remove();
        }

        var div = $("<div id='pop_wrap' rel='alertPopup' title='" + LABEL.Error + "'></div>");

        $(function () {
            var buttons = [];

            var closeButton = {
                text: LABEL.Close,
                click: function () {
                    $(this).dialog("close");

                    if (okFunc != null && ($.isFunction(okFunc))) {
                        okFunc.apply();
                    }
                }
            }
            buttons.push(closeButton);

            var messageBody = "<div id='contents'><dl class='alert'><dt><img alt='success' src='/Resources/Images/common/ico_pop_error.png'></dt><dd class='row1'>" + "오류가 발생 하였습니다. 잠시 후 다시 시도해 주십시오." + "</dd></dl></div>";
            div.html(messageBody).dialog({
                resizable: resizable,
                width: 450,
                height: 'auto',
                modal: true,
                closeOnEscape: true,
                buttons: buttons,
                create: function () {
                    $(".ui-dialog-buttonset > button").removeClass().addClass("btn_list_rd");
                }
            });
        });
    }

    /*=======================================================================
    함 수 명   :   openMessage
    내    용   :   JQueryUI의 Modal Message 팝업
    파라미터   :    title - MessageBox의 타이틀
                    text - MessageBox의 내용
                    okFunc - 확인 버튼 클릭 함수
                    closeFunc - X 버튼 클릭 함수
    리 턴 값   :   
    ========================================================================*/
    _$messageBox.openMessage = function (title, text, okFunc, closeFunc) {
        if (title == null || title == "") {
            title = LABEL.Message;
        }

        if ($("div[rel='alertPopup']").length == 0) {
        }
        else {
            $("div[rel='alertPopup']").remove();
        }

        var div = $("<div id='pop_wrap' rel='alertPopup' title='" + title + "'></div>");

        $(function () {

            var buttons = [];

            var okButton = {
                text: LABEL.Confirm,
                click: function () {
                    $(this).dialog("close");

                    if (okFunc != null && ($.isFunction(okFunc))) {
                        okFunc.apply();
                    }
                }
            }
            buttons.push(okButton);

            var messageBody = "<div id='contents'><dl class='alert'><dt><img alt='success' src='/Resources/Images/common/ico_pop_success.png'></dt><dd class='row1'>" + text + "</dd></dl></div>";
            div.html(messageBody).dialog({
                modal: true,
                resizable: false,
                closeOnEscape: true,
                showClose: false,
                close: function () {
                    $(this).dialog("close");

                    if (closeFunc != null && ($.isFunction(closeFunc))) {
                        closeFunc.apply();
                    }
                },
                overlayClass: "dimmed",
                buttons: buttons,
                create: function () {
                    $(".ui-dialog-buttonset > button").removeClass().addClass("btn_list_rd");
                }
            });
        });
    }

    /*=======================================================================
    함 수 명   :   openConfirmBox
    내    용   :   JQueryUI의 Modal Confirmation 팝업
    파라미터   :  obj - call 한 객체
                    text - MessageBox의 내용
                    okFunc - 확인 버튼 클릭 함수
                    okFuncParam - 확인 버튼 클릭 함수의 인자값
                    cancelFunc - 취소 버튼 클릭 함수
                    cancelFuncParam - 취소 버튼 클릭 함수의 인자값
    리 턴 값   :   
    ========================================================================*/
    _$messageBox.openConfirmBox = function (text, okFunc, cancelFunc) {
        messageBox.openConfirm(LABEL.Confirm, text, okFunc, cancelFunc);
    }

    /*=======================================================================
    함 수 명   :   openConfirm
    내    용   :   JQueryUI의 Modal Confirmation 팝업
    파라미터   :    title - MessageBox의 타이틀
                    text - MessageBox의 내용
                    okFunc - 확인 버튼 클릭 함수
                    okFuncParam - 확인 버튼 클릭 함수의 인자값
                    cancelFunc - 취소 버튼 클릭 함수
                    cancelFuncParam - 취소 버튼 클릭 함수의 인자값
    리 턴 값   :   
    ========================================================================*/
    _$messageBox.openConfirm = function (title, text, okFunc, cancelFunc) {
        if (title == null || title == "") {
            title = LABEL.Confirm;
        }

        try {

            if ($("div[rel='alertPopup']").length == 0) {
            }
            else {
                $("div[rel='alertPopup']").remove();
            }

            var div = $("<div id='pop_wrap' rel='alertPopup' title='" + title + "'></div>");

            $(function () {

                var buttons = [];

                var yesButton = {
                    text: LABEL.Yes,
                    click: function () {
                        $(this).dialog("close");

                        if (okFunc != null && ($.isFunction(okFunc))) {
                            okFunc.apply();
                        }
                    }
                }
                buttons.push(yesButton);

                var noButton = {
                    text: LABEL.No,
                    click: function () {
                        $(this).dialog("close");

                        if (cancelFunc != null && ($.isFunction(cancelFunc))) {
                            cancelFunc.apply();
                        }
                    }
                }
                buttons.push(noButton);

                var messageBody = "<div id='contents'><dl class='alert'><dt><img alt='success' src='/Resources/img/common/ico_pop_warning.png'></dt><dd class='row1'>" + text + "</dd></dl></div>";
                div.html(messageBody).dialog({
                    resizable: false,
                    modal: true,
                    closeOnEscape: false,
                    buttons: buttons,
                    create: function () {
                        $(".ui-dialog-buttonset > button:eq(0)").removeClass().addClass("btn_list_rd");
                        $(".ui-dialog-buttonset > button:eq(1)").removeClass().addClass("btn_list");
                    }
                });
            });
        }
        catch (exception) { }
    }

    /*=======================================================================
    함 수 명   :   openAlertMessage
    내    용   :   ie alert창 호출
    파라미터   :    message - MessageBox의 내용
    리 턴 값   :   
    ========================================================================*/
    _$messageBox.openAlertMessage = function (message) {
        alert(message);
    }

    /*=======================================================================
    함 수 명   :   openConfirmMessage
    내    용   :   ie confirm창 호출
    파라미터   :    text - MessageBox의 내용
                    showResult - 확인 버튼 클릭 함수
    리 턴 값   :   
    ========================================================================*/
    _$messageBox.openConfirmMessage = function (message, showResult) {
        var result = false;

        if (confirm(message)) {
            result = true;
        }

        return result;
    }
    w.$messageBox = _$messageBox;
})(window);
