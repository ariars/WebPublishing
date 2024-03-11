(function (w) {
    var _$applibraries = {};

    // 권역 정보 출력
    _$applibraries.Solution = function () {
        var d = $.Deferred();

        var data = {
            IsUse: true
        }

        $appcommon.Ajax("POST", data, $("#applicationPath").val() + "Solution/SolutionSelect", function (data) {
            d.resolve(data);
        });

        return d.promise();
    };

    _$applibraries.KnoxTitleCode = function (data) {
        var d = $.Deferred();

        $appcommon.Ajax("POST", data, "../../Ops/Knox/KnoxTitleCodeSelect", function (result) {
            $.each(result, function (i, v) {
                v.Name = v.CompanyCode 
            });
            result.unshift({ Code: "", Name: "-- 선택 --" });
            d.resolve(result);
        });

        return d.promise();
    };

    _$applibraries.KnoxCompany = function (data) {
        var d = $.Deferred();

        $appcommon.Ajax("POST", data, "../../Ops/Knox/KnoxCompanyTypeSelect", function (result) {
            $.each(result, function (i, v) {
                v.Type = v.Type
            });
            result.unshift({ Type: "", Type: "-- 선택 --" });
            d.resolve(result);
        });

        return d.promise();
    };

    _$applibraries.Menu = function (data) {
        var d = $.Deferred();

        $appcommon.Ajax("POST", data, "../../Setting/MenuSelect", function (result) {
            $.each(result, function (i, v) {
                v.Name = v.Name + " (" + v.Code + ")"
            });
            result.unshift({ Code: "", Name: "-- 선택 -- " });
            d.resolve(result);
        });

        return d.promise();
    };

    _$applibraries.Code = function (data) {
        var d = $.Deferred();

        $appcommon.Ajax("POST", data, "../Setting/CodeSelect", function (result) {
            
            $.each(result, function (i, v) {
                v.Name = v.Name + " (" + v.Code + ")"
            });
            result.unshift({ Code: "", Name: "-- 선택 -- " });
            d.resolve(result);
        });

        return d.promise();
    };

    _$applibraries.MenuType = [{ key: "Management", value: "Management" }, { key: "User", value: "User" }];

    _$applibraries.Authority = function (data) {
        var d = $.Deferred();

        $appcommon.Ajax("POST", data, "../System/AuthoritySelect", function (items) {

            $.each(items, function (i, v) {
                v.Name = v.Name + " (" + v.SystemAuthorityCode + ")"
            });
            items.unshift({ SystemAuthorityCode: "", Name: "-- 선택 -- " });
            d.resolve(items);
        });

        return d.promise();
    };

    // List Page View
    _$applibraries.EnableList = function () {
        $("#containerList").css("display", "block");
        $("#containerWrite").css("display", "none");
        $("#containerDetail").css("display", "none");
    }

    // Write Page View
    _$applibraries.EnableWrite = function () {
        $("#containerList").css("display", "none");
        $("#containerWrite").css("display", "block");
        $("#containerDetail").css("display", "none");
    }

    // Detail Page View
    _$applibraries.EnableDetail = function () {
        $("#containerList").css("display", "none");
        $("#containerWrite").css("display", "none");
        $("#containerDetail").css("display", "block");
    }

    w.$applibraries = _$applibraries;
})(window);

// Sidebar navigation
var _navigationSidebar = function () {

    // Define default class names and options
    var navClass = 'nav-sidebar',
        navItemClass = 'nav-item',
        navItemOpenClass = 'on',
        navLinkClass = 'nav-link',
        navSubmenuClass = 'nav-group-sub',
        navSlidingSpeed = 250;

    // Configure collapsible functionality
    $('.' + navClass).each(function () {
        $(this).find('.' + navItemClass).has('.' + navSubmenuClass).children('.' + navItemClass + ' > ' + '.' + navLinkClass).not('.disabled').on('click', function (e) {
            e.preventDefault();

            // Simplify stuff
            var $target = $(this)
            $navSidebarMini = $('.sidebar-xs').not('.sidebar-mobile-main').find('.sidebar-main .' + navClass).children('.' + navItemClass);

            // Collapsible
            if ($target.parent('.' + navItemClass).hasClass(navItemOpenClass)) {
                $target.parent('.' + navItemClass).not($navSidebarMini).removeClass(navItemOpenClass).children('.' + navSubmenuClass).slideUp(navSlidingSpeed);
            }
            else {
                $target.parent('.' + navItemClass).not($navSidebarMini).addClass(navItemOpenClass).children('.' + navSubmenuClass).slideDown(navSlidingSpeed);
            }

            // Accordion
            if ($target.parents('.' + navClass).data('nav-type') == 'accordion') {
                $target.parent('.' + navItemClass).not($navSidebarMini).siblings(':has(.' + navSubmenuClass + ')').removeClass(navItemOpenClass).children('.' + navSubmenuClass).slideUp(navSlidingSpeed);
            }
        });
    });

    // Disable click in disabled navigation items
    $(document).on('click', '.' + navClass + ' .disabled', function (e) {
        e.preventDefault();
    });

    // Scrollspy navigation
    $('.nav-scrollspy').find('.' + navItemClass).has('.' + navSubmenuClass).children('.' + navItemClass + ' > ' + '.' + navLinkClass).off('click');
};

document.addEventListener('DOMContentLoaded', function () {
    _navigationSidebar();

    //$(".nav_col").click(function () {
    //    $("#container").addClass("snb_collapsed");
    //});

    //$(".nav_exp").click(function () {
    //    $("#container").removeClass("snb_collapsed");
    //});

    //$(".icon.application").click(function () {
    //    $("aside.right").toggle();
    //});
});

$(document).ready(function () {

    $(".SearchCollapse").click(function () {
        $(".SearchCollapse").hide();
        $(".SearchExpand").show();
        $(".srch_form").hide();
    });

    $(".SearchExpand").click(function () {
        $(".SearchExpand").hide();
        $(".SearchCollapse").show();
        $(".srch_form").show();
    });

    $(".tbEnterkeydown").keydown(function (event) {
        var charCode = (event.which) ? event.which : event.keyCode;
        if (charCode == 13) {
            $(".btnSearch").click();
            return false;
        }
    });

    $(".cbChange").change(function (event) {
        $appgrid.OnLoadData("#jsGrid");
    });

    $(".btnReset").click(function () {
        $("input[type=text],input[type=search]").val("");
        $("select").val("");

        if ((typeof CalendarInit === 'function')) {
            CalendarInit();
        }

        $appgrid.OnLoadData("#jsGrid");
    });

    $(".btnSearch").click(function () {
        $appgrid.OnLoadData("#jsGrid");
    });

    $(".btnClose").click(function () {
        $appcommon.closePopup();
    });

    $(document).on('click', '.btnList', function (e) {
        $applibraries.EnableList();
    });

    $(document).on('click', '.btnAdd', function (e) {
        $applibraries.EnableWrite();
    });

    $(document).on('click', '.btnLineAdd', function (e) {
        $("#jsGrid").jsGrid("clearInsert");
        $("#jsGrid").jsGrid("option", "inserting", true);
    });

    $(document).on('click', '.btnDetail', function (e) {
        $applibraries.EnableWrite();
    });

    // 선택 삭제
    $(document).on('click', '.btnDeletes', function (e) {

        var url = $(this).attr("data-url");
        var target = $(this).attr("data-target");

        var data = [];
        var items = $("#" + target).jsGrid("option", "data");
        for (i = 0; i < items.length; i++) {
            var $row = $("#" + target).jsGrid("rowByItem", items[i]);
            var checked = $row.find("input.chk:checkbox").is(":checked");
            if (checked) data.push(items[i]);
        };

        if (data.length < 1) {
            $appcommon.alert("데이터를 선택하세요.");
        } else {
            $appcommon.confirm("삭제 하시겠습니까?", function () {
                $appcommon.Ajax("POST", data, url, function (result) {
                    $appgrid.OnLoadData("#jsGrid");
                    $appcommon.alert("삭제 되었습니다.");
                });
            });
        }
    });

    $(document).on('click', '.btnDownloads', function (e) {

        var url = $(this).attr("data-url");
        var target = $(this).attr("data-target");

        var data = [];
        var items = $("#" + target).jsGrid("option", "data");
        for (i = 0; i < items.length; i++) {
            var $row = $("#" + target).jsGrid("rowByItem", items[i]);
            var checked = $row.find("input.chk:checkbox").is(":checked");
            if (checked) data.push(items[i]);
        };

        if (data.length < 1) {
            $appcommon.alert("데이터를 선택하세요.");
        } else {
            $appcommon.AjaxFile(data, url);
        }
    });
});