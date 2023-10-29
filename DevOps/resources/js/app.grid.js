(function (w) {
    var _$appgrid = {};

    _$appgrid.gridLoaded = false;
    _$appgrid.previousItem = {};
    _$appgrid.selectItem = "";
    _$appgrid.applicationPath = $("#applicationPath").val();
    

    _$appgrid.jsgridoption = {
        width: "100%",
        sorting: true,
        autoload: true,
        autowidth: true,
        shrinkToFit: false,
        selecting: true,
        //inserting: true,
        editing: true,
        filtering: false,
        paging: true,
        pageLoading: true,
        loadIndication: false,
        pagerFormat: "<div> {first} {prev} {pages} {next} {last} </div>",
        //pagerFormat: "<div> Page {pageIndex} of {pageCount} </div> <div> {first} {prev} {pages} {next} {last} </div> <div> Total {itemCount} </div>",
        pageIndex: 1,
        pageSize: 15,
        pageButtonCount: 10,
        //pageFirstText: "<a class=\"pager first\" href=\"#\"><img src=\"" + _$appgrid.applicationPath + "Resources/img/grid/btn_pn_first.gif\" alt=\"" + LABEL.PagingFirst + "\" title=\"" + LABEL.PagingFirst + "\"></a>",
        pageFirstText: "<a class=\"pager first\" href=\"#\"><img src=\"../../Resources/img/button/btn_pn_first.gif\" alt=\"" + LABEL.PagingFirst + "\" title=\"" + LABEL.PagingFirst + "\"></a>",
        //pagePrevText: "<a class=\"pager pre\" href=\"#\"><img src=\"" + _$appgrid.applicationPath + "Resources/img/grid/btn_pn_pre.gif\" alt=\"" + LABEL.PagingPrev + "\" title=\"" + LABEL.PagingPrev + "\"></a>",
        pagePrevText: "<a class=\"pager pre\" href=\"#\"><img src=\"../../Resources/img/grid/btn_pn_pre.gif\" alt=\"" + LABEL.PagingPrev + "\" title=\"" + LABEL.PagingPrev + "\"></a>",
        //pageNextText: "<a class=\"pager next\" href=\"#\"><img src=\"" + _$appgrid.applicationPath + "Resources/img/grid/btn_pn_next.gif\" alt=\"" + LABEL.PagingNext + "\" title=\"" + LABEL.PagingNext + "\"></a>",
        pageNextText: "<a class=\"pager next\" href=\"#\"><img src=\"../../Resources/img/grid/btn_pn_next.gif\" alt=\"" + LABEL.PagingNext + "\" title=\"" + LABEL.PagingNext + "\"></a>",
        //pageLastText: "<a class=\"pager last\" href=\"#\"><img src=\"" + _$appgrid.applicationPath + "Resources/img/grid/btn_pn_last.gif\" alt=\"" + LABEL.PagingEnd + "\" title=\"" + LABEL.PagingEnd + "\"></a>",
        pageLastText: "<a class=\"pager last\" href=\"#\"><img src=\"../../Resources/img/grid/btn_pn_last.gif\" alt=\"" + LABEL.PagingEnd + "\" title=\"" + LABEL.PagingEnd + "\"></a>",
        controller: {},
        fields: [],
        rowClick: function (args) {
            $appgrid.rowClick(args);
        },
        deleteConfirm: function (item) {
            return MESSAGE.WillYouDelete;
        },
        onItemUpdating: function (args) {
            _$appgrid.previousItem = args.previousItem;
        },
        invalidMessage: "잘못된 데이터를 입력했습니다."
    }

    _$appgrid.checkboxtemplate = {
        headerTemplate: function () {
            return $("<div class=\"checkbox checkboxAll\"><label class=\"i-checks\"><input type=\"checkbox\" value=\"\"><i></i></label>")
                .on("change", function () {
                    $(this).find("input").is(":checked") ? selectAll(this) : unselectAll(this);
                }).add("<label>").attr("id", "chk_all").append("<span>").attr("for", "chk_all");
        },
        itemTemplate: function (value, item) {
            return $("<div class=\"checkbox non-event\"><label class=\"i-checks non-event\"><input class=\"chk non-event\" type=\"checkbox\" value=\"\"><i></i></label>");
        },
        align: "center",
        width: 40,
        sorting: false,
        editing: false,
        inserting: false,
        css: "non-event"
    }

    _$appgrid.buttonstemplate = function (modifyCallback, deleteCallback) {
        var width = 110;

        if (typeof Resource !== 'undefined') {
            width = (Resource.LCID == "1042" ? 110 : 130)
        }
        
        var itemTemplate = {
            itemTemplate: function (_, item) {
                var $customEditButton = $("<button>").attr("type", "button").addClass("button03 pr small non-event").append(LABEL.Modify).on("click", function () {
                    modifyCallback(item);
                });

                var $customDeleteButton = $("<button>").attr("type", "button").addClass("button03 pr small non-event").append(LABEL.Delete).on("click", function () {
                    deleteCallback(item);
                });

                return $("<div>").append($customEditButton).append("&nbsp;").append($customDeleteButton);
            },
            name: "",
            type: "text",
            title: "",
            width: width,
            align: "center",
            sorting: false,
            editing: false,
            inserting: false,
            css: "non-event"
        }
        return itemTemplate;
    }

    _$appgrid.editbuttonstemplate = function (modifyCallback) {

        var itemTemplate = {
            itemTemplate: function (_, item) {
                var $customEditButton = $("<button>").attr("type", "button").addClass("btn_list_sm non-event").append(LABEL.Modify).on("click", function () {
                    modifyCallback(item);
                });

                return $("<div>").append($customEditButton);
            },
            name: "",
            type: "text",
            title: "",
            width: 100,
            align: "center",
            css: "non-event"
        }
        return itemTemplate;
    }

    _$appgrid.linkButtonstemplate = function (linkCallback) {
        var itemTemplate = {
            itemTemplate: function (_, item) {
                //var $customEditButton = $("<button>").attr("type", "button").addClass("btn btn-primary btn-xs non-event").append(LABEL.Modify).on("click", function () {
                var $customEditButton = $("<button>").attr("type", "button").append(LABEL.ResultLog).on("click", function () {
                    linkCallback(item);
                });

                return $("<div>").append($customEditButton);
            },
            name: "",
            type: "text",
            title: "",
            width: 100,
            align: "center",
            css: "non-event"
        }
        return itemTemplate;
    }

    _$appgrid.deletebuttonstemplate = function (deleteCallback) {
        var itemTemplate = {
            itemTemplate: function (_, item) {
                var $customDeleteButton = $("<button>").attr("type", "button").addClass("button03 pr small non-event").append(LABEL.Delete).on("click", function () {
                    deleteCallback(item);
                });

                return $("<div>").append($customDeleteButton);
            },
            name: "",
            type: "text",
            title: "",
            width: 70,
            align: "center",
            css: "non-event"
        }
        return itemTemplate;
    }

    _$appgrid.deletebuttontemplate = function (deleteCallback, btntitle) {
        var itemTemplate = {
            itemTemplate: function (_, item) {
                var $span = $("<span>").attr({ class: "ico_s_add" });
                var $customDeleteButton = $("<button>").attr("href", "javascript:").addClass("button_s").append($span).append(btntitle).on("click", function () {
                    deleteCallback(item);
                    return false;
                });

                return $("<div>").append("&nbsp;").append($customDeleteButton);
            }, name: "", type: "text", title: "", width: 60, align: "center"
        }
        return itemTemplate;
    }

    _$appgrid.comtombuttontemplate = function (lable, size, callback) {

        var itemTemplate = {
            itemTemplate: function (_, item) {
                var $customButton = $("<button>").attr("type", "button").addClass("btn_list_sm non-event").append(lable).on("click", function () {
                    callback(item);
                });

                return $("<div>").append($customButton);
            },
            name: "",
            type: "text",
            title: "",
            width: size,
            align: "center",
            css: "non-event",
            editing: false,
            inserting: false
        }
        return itemTemplate;
    }

    _$appgrid.rowClick = function (args) {
        //if (args.event.target.type == "checkbox" || args.event.target.type == "radio")
        //    return;

        //if ($(args.event.target).closest("tr").children('td:first').find(':checkbox').prop("checked")) {
        //    $(args.event.target).closest("tr").children('td:first').find(':checkbox').prop("checked", false);
        //}
        //else {
        //    $(args.event.target).closest("tr").children('td:first').find(':checkbox').prop("checked", true);
        //}

        //if ($(args.event.target).closest("tr").children('td:first').find(':radio').prop("checked")) {
        //    $(args.event.target).closest("tr").children('td:first').find(':radio').prop("checked", false);
        //}
        //else {
        //    $(args.event.target).closest("tr").children('td:first').find(':radio').prop("checked", true);
        //}
    }

    _$appgrid.itemCheck = function (args) {
        _$appgrid.selectItem = args.item;
        $(args.event.target).parent().parent().find("tr").removeClass("selected");
        $(args.event.target).closest("tr").addClass("selected");
    }

    _$appgrid.OnLoadData = function (args) {
        if (!_$appgrid.gridLoaded) {
            $(args).jsGrid("loadData");
        }
        else {
            $(args).jsGrid("openPage", 1);
        }
    }

    _$appgrid.ParentOnLoadData = function (args) {
        if (!_$appgrid.gridLoaded) {
            $(args).jsGrid("loadData");
        }
        else {
            $(args).jsGrid("openPage", 1);
        }
    }

    _$appgrid.OnGridLoaded = function (args) {
        if (args == 0) {
            _$appgrid.gridLoaded = false;
        }
        else {
            _$appgrid.gridLoaded = true;
        }
    }

    _$appgrid.columnRowNum = {
        title: LABEL.RowNum, name: "RowNum", width: 70, align: "center", sorting: false
    };

    _$appgrid.columnCreateDateTime = {
        title: LABEL.CreateDateTime, name: "CreateDateTime", width: 120, align: "center", itemTemplate: function (_, item) {
            if (item != null) {
                return $appcommon.formatDateTime(item.CreateDateTime);
            }
            return "";
        }
    };

    _$appgrid.columnUpdateDateTime = {
        title: LABEL.UpdateDateTime, name: "UpdateDateTime", width: 120, align: "center", itemTemplate: function (_, item) {
            if (item != null) {
                return $appcommon.formatDateTime(item.UpdateDateTime);
            }
            return "";
        }
    };
    

    _$appgrid.columnCreateUserId = {
        title: "최초등록자", name: "CreateUserId", width: 120, align: "center"
    };

    _$appgrid.columnSystemApplication = {
        title: LABEL.SystemApplicationCode, name: "SystemApplicationCode", type: "text", width: 130, readOnly: true, editing: false,
        validate: {
            message: MESSAGE.SelectApplication,
            validator: function (value, data) { return "0" != value }
        }
        , insertTemplate: function () {
            var input = this.__proto__.insertTemplate.call(this);
            $(input).val($("#sbSystemApplicationCode option:selected").val()).prop("selected", true);;
            return input;
        }
    };

    _$appgrid.columnIsUse = {
        title: LABEL.IsUse, name: "IsUse", type: "checkbox", width: 90, align: "center"
        , itemTemplate: function (_, item) {
            return item.IsUse ? LABEL.Use : LABEL.NoUse;
        }
        , insertTemplate: function () {
            var input = this.__proto__.insertTemplate.call(this);
            $(input).attr("checked", true);
            return input;
        }
    };

    _$appgrid.columnIsUseString = {
        title: LABEL.IsUse, name: "IsUse", type: "text", width: 90, align: "center"
        , itemTemplate: function (_, item) {
            return item.IsUse ? LABEL.Use : LABEL.NoUse;
        }
    };

    _$appgrid.columnDisplayOrder = { title: LABEL.DisplayOrder, name: "DisplayOrder", type: "number", width: 80, align: "center", validate: "required" };

    _$appgrid.columnSortOrder = { title: LABEL.DisplayOrder, name: "SortOrder", type: "number", width: 80, align: "center", validate: "required" };

    _$appgrid.columnControl = { type: "control", modeSwitchButton: true, width: 110 };

    _$appgrid.radiotemplate = {
        title: LABEL.Select,
        itemTemplate: function (value, item) {
            return $("<input>").attr("type", "radio").attr("name", "selectrowgroup");
        },
        align: "center",
        width: 40,
        sorting: false,
        css: "non-event"
    }

    _$appgrid.upsertItem = function (item, url, isInsert, callback) {
        var d = $.Deferred();

        if (callback) {
            if (!callback()) {
                return d.promise();
            }
        }

        $appcommon.Ajax("POST", item, url, function (result) {
            $("#jsGrid").jsGrid("option", "inserting", false);
            alert("저장 되었습니다.");
            $appgrid.OnLoadData("#jsGrid");
            d.resolve(result);
        });

        return d.promise();
    }

    _$appgrid.deleteItem = function (item, url) {
        var d = $.Deferred();
        $appcommon.Ajax("POST", item, url, function (result) {
            $appgrid.OnLoadData("#jsGrid");
            d.resolve(result);
            alert("삭제되었습니다.");
        });

        return d.promise();
    }

    _$appgrid.columnyyyyMMdd = function (title, column) {
        return {
            title: title, name: column, type: "text", width: 100, align: "center"
            , insertTemplate: function (_, item) {
                var input = this.__proto__.insertTemplate.call(this);
                $(input).mask("9999-99-99", { placeholder: 'yyyy-MM-dd' });
                return input;
            }
            , editTemplate: function (_, item) {
                var input = this.__proto__.editTemplate.call(this);
                $(input).mask("9999-99-99", { placeholder: 'yyyy-MM-dd' });
                $(input).val(_);
                return input;
            }
        }
    };

    _$appgrid.columnBool = function (title, column) {
        return { title: title, name: column, type: "checkbox", width: 80, align: "center" }
    };

    w.$appgrid = _$appgrid;
})(window);

var selectAll = function (obj) {
    $(obj).parent().parent().parent().parent().parent().parent().find("input.chk[type=checkbox]").not(":disabled").prop("checked", true);
};

var unselectAll = function (obj) {
    $(obj).parent().parent().parent().parent().parent().parent().find("input.chk[type=checkbox]").prop("checked", false);
};

