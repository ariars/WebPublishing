(function ($) {
    $.fn.Html5UploadControl = function (options) {
        //파일 인덱스(각 파일의 ID 추출용으로 사용)
        var fileIndex = 0;

        // 업로드 된 파일의 갯수
        var uploadedFileCount = 0;

        // 선택된(업로드 할) 파일의 갯수
        var selectedFileCount = 0;

        // 업로드 할 파일 추가(드래그 및 파일 찾기)시 임시로 데이터를 저장할 변수
        var tempFormData = {};

        // 업로드 된 또는 업로드 할 파일의 총 크기
        var totalFileSize = 0;

        // 업로드 제한 확장자 배열 변수
        var filter = [];

        // 한번에 업로드 할 파일 크기 제한
        var limitSize = 4 * 1024 * 1000; // 4MB

        // 업로드 할 파일 갯수 제한
        var limitCount = 5;

        // 파일 업로드 서비스 주소
        var uploadServiceUrl = "";

        // 파일 삭제 서비스 주소
        var deleteServiceUrl = "";

        // 파일 업로드 결과 저장 배열 변수
        var uploadResult = {};

        // 파일 업로드의 Chunk 크기
        var blockSizeInKB = 512;

        // 파일 보관기간 시작일
        var expiresStartDate = "";

        // 파일 보관기간 종료일
        var expiresEndDate = "";

        // 현재 객체 저장 변수
        var obj = this;

        // 현재 플러그인 저장 변수
        var fileContainer = $(this);

        // 옵션값 대입
        if (options != undefined) {
            filter = options.filter;
            limitSize = options.limitSizeMB * 1024 * 1000;
            limitCount = options.limitCount;
            uploadServiceUrl = options.uploadServiceUrl;
            deleteServiceUrl = options.deleteServiceUrl;
            expiresStartDate = options.expiresStartDate;
            expiresEndDate = options.expiresEndDate;
        }

        init();

        // 파일 추가
        this.addSelectedFiles = function (files) {
            // 업로드 할 파일 총 용량을 체크하기 위한 변수
            var possibleUploadFileSize = totalFileSize;

            $.each(files, function (i, file) {
                try {
                    if (uploadedFileCount + Object.keys(tempFormData).length >= limitCount) {
                        //alert("최대 파일 갯수 (" + limitCount + "개)를 초과 하였습니다.");
                        //alert(String.format(Html5UploadControl_String.VALID_LIMIT_FILE_COUNT_TEXT, limitCount));
                        //행을 선택 하십시오.
                        //messageBox.openMessage(BASE_DEFAULT_CONFIRM_TITLE, String.format(Html5UploadControl_String.VALID_LIMIT_FILE_COUNT_TEXT, limitCount));

                        var messageBoxOption = {};
                        messageBoxOption.title = MESSAGE.ALERT;
                        messageBoxOption.message = $common.format(Html5UploadControl_String.VALID_LIMIT_FILE_COUNT_TEXT, [limitCount]);

                        messageBox.alert(messageBoxOption);

                        return false;
                    }
                    else {
                        possibleUploadFileSize += file.size;

                        //if (file.size > limitSize) {
                        if (possibleUploadFileSize > limitSize) {
                            //messageBox.openMessage(BASE_DEFAULT_CONFIRM_TITLE, String.format(Html5UploadControl_String.VALID_LIMIT_FILE_SIZE_TEXT, getDisplayFileSize(limitSize)));
                            var messageBoxOption = {};
                            messageBoxOption.title = MESSAGE.ALERT;
                            messageBoxOption.message = $common.format(Html5UploadControl_String.VALID_LIMIT_FILE_SIZE_TEXT, [getDisplayFileSize(limitSize)]);

                            messageBox.alert(messageBoxOption);

                            possibleUploadFileSize -= file.size;

                            return false;
                        }
                        if (filter != null && filter.length != 0 && jQuery.inArray(file.name.split(".").pop().toLowerCase(), filter) == -1) {
                            //messageBox.openMessage(BASE_DEFAULT_CONFIRM_TITLE, String.format(Html5UploadControl_String.VALID_LIMIT_FILE_TYPE_TEXT, file.name.split(".").pop()));
                            var messageBoxOption = {};
                            messageBoxOption.title = MESSAGE.ALERT;
                            messageBoxOption.message = $common.format(Html5UploadControl_String.VALID_LIMIT_FILE_TYPE_TEXT, [file.name.split(".").pop()]);

                            messageBox.alert(messageBoxOption);

                            return false;
                        }

                        var indexID = "file_" + (fileIndex++);

                        tempFormData[indexID] = file;

                        var fileHtml = "<li class='upload_delete' id='file_" + indexID + "'>"
                            + "    <div class='upload_file_name'><span>" + file.name + "</span></div>"
                            + "    <div class='upload_file_action'><a style='display: block;' href='javascript:'></a></div>"
                            //+ "    <div class='upload_file_status_bar'><div id='progress_" + indexID + "' class='progressBar'><span>0%</span><div></div></div></div>"
                            + "    <div class='upload_file_size'>" + getDisplayFileSize(file.size) + "</div>"
                            + "    <div class='upload_clearer'>&nbsp;</div>"
                            + "</li>";

                        fileContainer.find("#uploader_filelist").append($(fileHtml));

                        fileContainer.find("#file_" + indexID + " .upload_file_action").click(function () {
                            deleteFile(indexID);
                        });

                        totalFileSize += file.size;
                    }
                }
                catch (ex) {
                    messageBox.openErrorMessage(ex.message);
                }
            });

            if (Object.keys(tempFormData).length != 0) {
                fileContainer.find(".upload_droptext").hide();
                fileContainer.find('a.upload_start').removeClass("upload_disabled");
            }

            fileContainer.find(".upload_total_file_size").text(getDisplayFileSize(totalFileSize));

            fileContainer.find(".upload_totalcount").text(uploadedFileCount + Object.keys(tempFormData).length);
        }

        this.getFiles = function () {
            return tempFormData;
        }

        // 파일 업로드 플러그인 초기화
        function init() {
            // HTML5 브라우저 체크
            if (window.FormData === undefined) {
                //messageBox.openMessage(BASE_DEFAULT_CONFIRM_TITLE, Html5UploadControl_String.VALID_NOT_SUPPORTED_BROWSER_TEXT);
                var messageBoxOption = {};
                messageBoxOption.title = MESSAGE.ALERT;
                messageBoxOption.message = Html5UploadControl_String.VALID_NOT_SUPPORTED_BROWSER_TEXT;

                messageBox.alert(messageBoxOption);
                return;
            }

            fileContainer.addClass("upload_wrapper upload_scroll");

            fileContainer.append("<div class='upload_content'>"
                + "    <div class='upload_filelist_information'>"
                + "        <div class='upload_file_expires' style='margin-top:-6px !important;'>"
                + "          <a class='upload_button upload_add' id='html5_uploader_browse' style='position: relative; z-index: 1;' href='javascript:'>"
                + "              " + Html5UploadControl_String.BUTTON_ADD_FILES_TEXT
                + "              <input id='fileBrowser' type='file' style='left: 0px; top: 0px; width: 100%; height: 100%; position: absolute; z-index: 100; cursor: pointer; opacity: 0;' accept='*' multiple='' />"
                + "          </a>"
                + "        </div>"
                + "        <div class='upload_file_totalsize'>"
                + "             " + Html5UploadControl_String.TOTAL + " : <span class='upload_totalcount'>0</span>&nbsp;|&nbsp;"
                + "             <span class='upload_total_file_size'>0 KB</span> / "
                + "             <span>" + getDisplayFileSize(limitSize) + "</span>"
                + "        </div>"
                + "    </div>"
                + "    <div class='upload_filelist_header'>"
                + "        <div class='upload_file_name'>" + Html5UploadControl_String.COL_FILE_NAME_TEXT + "</div>"
                + "        <div class='upload_file_action'>&nbsp;</div>"
                + "        <div class='upload_file_size'>" + Html5UploadControl_String.COL_SIZE_TEXT + "</div>"
                + "        <div class='upload_clearer'>&nbsp;</div>"
                + "    </div>"
                + "    <div>"
                + "        <ul class='upload_filelist' id='uploader_filelist' style='position: relative;'>"
                + "            <li class='upload_droptext'>" + Html5UploadControl_String.FILE_DRAG_TEXT + "</li>"
                + "        </ul>"
                + "    </div>"
                + "</div>");

            fileContainer.find(".upload_start").click(function () {
                obj.uploadFile();
            });

            fileContainer.find("#fileBrowser").change(function () {
                obj.addSelectedFiles(this.files);
            });

            fileContainer.find("#test").click(function () {
                obj.test();
            }); 

            var fileListLayer = fileContainer.find(".upload_filelist");
            fileListLayer.on('dragenter', function (e) {
                e.stopPropagation();
                e.preventDefault();
            });
            fileListLayer.on('dragover', function (e) {
                e.stopPropagation();
                e.preventDefault();
            });
            fileListLayer.on('drop', function (e) {

                e.preventDefault();
                var files = e.originalEvent.dataTransfer.files;

                obj.addSelectedFiles(files);
            });

            $(document).on('dragenter', function (e) {
                e.stopPropagation();
                e.preventDefault();
            });
            $(document).on('dragover', function (e) {
                e.stopPropagation();
                e.preventDefault();
            });
            $(document).on('drop', function (e) {
                e.stopPropagation();
                e.preventDefault();
            });
        }

        // 일반 파일 업로드(현재 사용하지 않음)
        function uploadFileToServer(key, formData) {
            var jqXHR = $.ajax({
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
                            //Set progress
                            setProgress(key, percent);
                        }, false);
                    }
                    return xhrobj;
                },
                url: serviceUrl,
                type: "POST",
                contentType: false,
                processData: false,
                cache: false,
                data: formData,
                success: function (result) {
                    setProgress(key, 100);
                    uploadSuccess(key, result);
                },
                error: function (ex) {
                    serviceError(ex, key);
                }
            });
        }        

        // 화면에 파일 크기 문자열
        function getDisplayFileSize(size) {
            var sizeStr = "";
            var sizeKB = size / 1024;
            if (parseInt(sizeKB) > 1024000) {
                var sizeGB = size / (1024 * 1000000);
                sizeStr = sizeGB.toFixed(2) + " GB";
            }
            else if (parseInt(sizeKB) > 1024) {
                var sizeMB = size / (1024 * 1000);
                sizeStr = sizeMB.toFixed(2) + " MB";
            }
            else {
                sizeStr = sizeKB.toFixed(2) + " KB";
            }

            return sizeStr;
        }

        // 파일 삭제
        function deleteFile(fileIndex) {
            fileContainer.find("#file_" + fileIndex).remove();

            // 업로드 실패(오류) 파일을 삭제할 경우 tempFormData에서 삭제 되었으므로 fileSize는 계산하지 않는다.
            if (tempFormData[fileIndex] != null) {
                totalFileSize -= tempFormData[fileIndex].size;

                delete tempFormData[fileIndex];

                fileContainer.find(".upload_total_file_size").text(getDisplayFileSize(totalFileSize));
            }

            fileContainer.find(".upload_totalcount").text(uploadedFileCount + Object.keys(tempFormData).length);

            if (uploadedFileCount + Object.keys(tempFormData).length == 0) {
                fileContainer.find(".upload_droptext").show();
            }
        }

        return this;
    };
}(jQuery));