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

        // 파일 업로드 실행
        this.uploadFile = function () {
            selectedFileCount = uploadedFileCount + Object.keys(tempFormData).length;

            fileContainer.find(".upload_upload_status").show();
            
            fileContainer.find(".upload_upload_status").text(String.format(Html5UploadControl_String.UPLOAD_FILE_STATUS_TEXT, uploadedFileCount, selectedFileCount));

            fileContainer.find(".upload_total_status").text("0%");

            for (var key in tempFormData) {
                fileContainer.find("#file_" + key).removeAttr("class");
                fileContainer.find("#file_" + key).addClass("upload_uploading");

                var guid = utility.newGuid();
                var file = tempFormData[key];
                var fileSize = file.size;
                var fileName = file.name;

                var blockSizeInKB = 512;
                var blockSize = blockSizeInKB * 1024;
                var blocks = [];
                var offset = 0;
                var index = 0;
                var list = "";
                while (offset < fileSize) {
                    var start = offset;
                    var end = Math.min(offset + blockSize, fileSize);

                    blocks.push({
                        name: fileName,
                        index: index,
                        guid: guid,
                        start: start,
                        end: end
                    });
                    list += index + ",";

                    offset = end;
                    index++;
                }

                uploadChunkFileToServer(key, file, blocks, 0);
            }
        }

        // 파일 삭제
        this.deleteFileToServer = function (key)
        {
            deleteFileToServer(key);
        }

        // 업로드 할 파일 추가
        this.addSelectedFiles = function (files) {
            // 업로드 할 파일 총 용량을 체크하기 위한 변수
            var possibleUploadFileSize = totalFileSize;

            $.each(files, function (i, file) {
                try {
                    if (uploadedFileCount + Object.keys(tempFormData).length >= limitCount) {
                        //alert("최대 파일 갯수 (" + limitCount + "개)를 초과 하였습니다.");
                        //alert(String.format(Html5UploadControl_String.VALID_LIMIT_FILE_COUNT_TEXT, limitCount));
                        //행을 선택 하십시오.
                        messageBox.openMessage(BASE_DEFAULT_CONFIRM_TITLE, String.format(Html5UploadControl_String.VALID_LIMIT_FILE_COUNT_TEXT, limitCount));
                        return false;
                    }
                    else {
                        possibleUploadFileSize += file.size;

                        //if (file.size > limitSize) {
                        if (possibleUploadFileSize > limitSize) {
                            //alert("파일 크기는 " + getDisplayFileSize(limitSize) + "를 넘을 수 없습니다.");
                            //alert(String.format(Html5UploadControl_String.VALID_LIMIT_FILE_SIZE_TEXT, getDisplayFileSize(limitSize)));
                            messageBox.openMessage(BASE_DEFAULT_CONFIRM_TITLE, String.format(Html5UploadControl_String.VALID_LIMIT_FILE_SIZE_TEXT, getDisplayFileSize(limitSize)));

                            possibleUploadFileSize -= file.size;
                            return false;
                        }
                        else if (jQuery.inArray(file.name.split(".").pop().toLowerCase(), filter) != -1) {
                            //alert("파일 확장자 " + file.name.split(".").pop() + "는 업로드 할 수 없습니다.");
                            //alert(String.format(Html5UploadControl_String.VALID_LIMIT_FILE_TYPE_TEXT, file.name.split(".").pop()));
                            messageBox.openMessage(BASE_DEFAULT_CONFIRM_TITLE, String.format(Html5UploadControl_String.VALID_LIMIT_FILE_TYPE_TEXT, file.name.split(".").pop()));
                            return false;
                        }
                        else {
                            var indexID = "file_" + (fileIndex++);

                            tempFormData[indexID] = file;

                            var fileHtml = "<li class='upload_delete' id='file_" + indexID + "'>"
                                        + "    <div class='upload_file_name'><span>" + file.name + "</span></div>"
                                        + "    <div class='upload_file_action'><a style='display: block;' href='javascript:'></a></div>"
                                        + "    <div class='upload_file_status_bar'><div id='progress_" + indexID + "' class='progressBar'><span>0%</span><div></div></div></div>"
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
                }
                catch (ex) {
                    //alert(ex.message);
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

        this.test = function () {
            alert("S");
        }

        // 파일 업로드 플러그인 초기화
        function init() {
            //if (window.File && window.Blob && window.FormData) {
            //}

            // HTML5 브라우저 체크
            if (window.FormData === undefined) {
                //alert(Html5UploadControl_String.VALID_NOT_SUPPORTED_BROWSER_TEXT);
                messageBox.openMessage(BASE_DEFAULT_CONFIRM_TITLE, VALID_NOT_SUPPORTED_BROWSER_TEXT);

                return;
            }

            fileContainer.addClass("upload_wrapper upload_scroll");

            fileContainer.append("<div class='upload_content'>"
                + "    <div class='upload_filelist_information'>"
                + "        <div class='upload_file_expires'>" + Html5UploadControl_String.UPLOAD_INFO_EXPIRESDATE_TEXT
                + "             <span>" + expiresStartDate + "</span> ~ "
                + "             <span>" + expiresEndDate + "</span>"
                + "        </div>"
                + "        <div class='upload_file_totalsize'>"
                + "             <span class='upload_total_file_size'>0 KB</span> / "
                + "             <span>" + getDisplayFileSize(limitSize) + "</span>"
                + "        </div>"
                + "        <div class='upload_file_count'>" + Html5UploadControl_String.UPLOAD_INFO_FILECNT_TEXT
                + "             <span class='upload_totalcount'>0</span>"
                + "        </div>"
                + "    </div>"
                + "    <div class='upload_filelist_header'>"
                + "        <div class='upload_file_name'>" + Html5UploadControl_String.COL_FILE_NAME_TEXT + "</div>"
                + "        <div class='upload_file_action'>&nbsp;</div>"
                + "        <div class='upload_file_status'><span>" + Html5UploadControl_String.COL_STATUS_TEXT + "</span></div>"
                + "        <div class='upload_file_size'>" + Html5UploadControl_String.COL_SIZE_TEXT + "</div>"
                + "        <div class='upload_clearer'>&nbsp;</div>"
                + "    </div>"
                + "    <div>"
                + "        <ul class='upload_filelist' id='uploader_filelist' style='position: relative;'>"
                + "            <li class='upload_droptext'>" + Html5UploadControl_String.FILE_DRAG_TEXT + "</li>"
                + "        </ul>"
                + "        <div class='upload_filelist_footer'>"
                + "            <div class='upload_file_name'>"
                + "                <div class='upload_buttons'>"
                + "                    <a class='upload_button upload_add' id='html5_uploader_browse' style='position: relative; z-index: 1;' href='#'>"
                + "                        " + Html5UploadControl_String.BUTTON_ADD_FILES_TEXT
                + "                        <input id='fileBrowser' type='file' style='left: 0px; top: 0px; width: 100%; height: 100%; position: absolute; z-index: 100; cursor: pointer; opacity: 0;' accept='*' multiple='' />"
                + "                    </a>"
                + "                    <a class='upload_button upload_start upload_disabled' href='javascript:;'>" + Html5UploadControl_String.BUTTON_START_UPLOAD_TEXT + "</a>"
                //+ "                     <a id='test'>test</a>"
                + "                <span class='upload_upload_status'></span>"
                + "                </div>"
                + "            </div>"
                + "            <div class='upload_file_action'></div>"
                + "            <div class='upload_file_status'><span class='upload_total_status'>0%</span></div>"
                + "            <div class='upload_file_size'><span class='upload_total_file_size'>0 KB</span></div>"
                + "            <div class='upload_progress'>"
                + "                <div class='upload_progress_container'>"
                + "                    <div class='upload_progress_bar'></div>"
                + "                </div>"
                + "            </div>"
                + "            <div class='upload_clearer'>&nbsp;</div>"
                + "        </div>"
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

        // Chunk 파일 업로드
        function uploadChunkFileToServer(key, file, blocks, index) {
            var block = blocks[index];

            var blob = file.slice(block.start, block.end);
            var fd = new FormData();
            fd.append("name", block.name);
            fd.append("index", block.index);
            fd.append("fullIndex", blocks.length);
            fd.append("guid", block.guid);
            fd.append("file", blob);

            $.ajax({
                url: uploadServiceUrl,
                data: fd,
                processData: false,
                contentType: false,
                cache: false,
                type: "POST",
                success: function (result) {
                    if (index < blocks.length - 1) {
                        var percent = 0;
                        var loaded = 0;

                        for (i = 0; i <= index; i++)
                        {
                            loaded += blob.size;
                        }

                        percent = Math.ceil(loaded / file.size * 100);

                        setProgress(key, percent);
                        uploadChunkFileToServer(key, file, blocks, (index + 1));
                    }
                    else if (index == blocks.length - 1)
                    {
                        setProgress(key, 100);
                        uploadSuccess(key, result);
                    }
                },
                error: function (ex) {
                    totalFileSize -= tempFormData[key].size;
                    delete tempFormData[key];
                    serviceError(ex, key)
                }
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

        // 파일 업로드 성공
        function uploadSuccess(key, result) {
            uploadedFileCount++;

            fileContainer.find(".upload_upload_status").text(String.format(Html5UploadControl_String.UPLOAD_FILE_STATUS_TEXT, uploadedFileCount, selectedFileCount));

            var totalPercent = (uploadedFileCount / selectedFileCount) * 100;
            fileContainer.find(".upload_total_status").text(parseInt(totalPercent) + "%");

            //alert(JSON.parse(result).status);
            uploadResult[key] = [JSON.parse(result).status, JSON.parse(result).fileID, JSON.parse(result).fileReturnID, JSON.parse(result).localFilePath, JSON.parse(result).fileUrlPath, tempFormData[key].size];

            delete tempFormData[key];
        }

        // 프로그레스바 % 적용
        function setProgress(key, progress) {
            var progressBarWidth = progress * fileContainer.find("#progress_" + key).width() / 100;
            fileContainer.find("#progress_" + key).find('div').css("width", progressBarWidth);
            fileContainer.find("#progress_" + key).find('span').text(progress + "% ");

            if (parseInt(progress) >= 100) {
                fileContainer.find("#file_" + key).removeAttr("class");
                fileContainer.find("#file_" + key).addClass("upload_done");
            }
        }

        // 파일 업로드 오류
        function serviceError(ex, key) {
            //alert("error : " + ex.responseText);
            messageBox.openErrorMessage(ex.responseText);

            fileContainer.find("#file_" + key).removeAttr("class");
            fileContainer.find("#file_" + key).addClass("upload_failed");

            fileContainer.find("#progress_" + key).find('span').text(Html5UploadControl_String.ERROR_TEXT);
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

        // 업로드 할 또는 업로드 완료된 파일 삭제
        function deleteFile(fileIndex) {
            //업로드 전 삭제 또는 업로드 오류 후 삭제 일 경우
            if (fileContainer.find("#file_" + fileIndex).hasClass("upload_delete") || fileContainer.find("#file_" + fileIndex).hasClass("upload_failed")) {
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
            //업로드 후 삭제 일 경우
            else if (fileContainer.find("#file_" + fileIndex).hasClass("upload_done")) {
                //if (confirm(Html5UploadControl_String.DELETE_FILE_CONFIRM_MESSAGE))
                //{
                //    deleteFileToServer(fileIndex);
                //}

                messageBox.openConfirmBox(obj, Html5UploadControl_String.DELETE_FILE_CONFIRM_MESSAGE, "deleteFileToServer", [fileIndex], null, null);
            }
        }

        // 서버 파일 삭제
        function deleteFileToServer(key) {

            var fileReturnID = uploadResult[key][2];
            var physicalPath = uploadResult[key][3];
            //var urlPath = uploadResult[key][4];
            var fileSize = uploadResult[key][5];

            var fd = new FormData();
            fd.append("key", fileReturnID);
            fd.append("path", physicalPath);
            
            $.ajax({
                url: deleteServiceUrl,
                data: fd,
                processData: false,
                contentType: false,
                cache: false,
                type: "POST",
                success: function (result) {
                    setProgress(key, 100);

                    fileContainer.find("#file_" + key).remove();

                    totalFileSize -= fileSize;

                    fileContainer.find(".upload_total_file_size").text(getDisplayFileSize(totalFileSize));

                    uploadedFileCount = uploadedFileCount == 0 ? uploadedFileCount = 0 : (uploadedFileCount - 1);
                    fileContainer.find(".upload_totalcount").text(uploadedFileCount + Object.keys(tempFormData).length);

                    if (uploadedFileCount + Object.keys(tempFormData).length == 0) {
                        fileContainer.find(".upload_droptext").show();
                    }
                },
                error: function (ex) {
                    serviceError(ex, key)
                }
            });
        }
    };
}(jQuery));