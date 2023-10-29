(function (w) {
    var _$appchart = {};

    _$appchart.PIE = function (option) {
        var pie;
        var pie_basic = document.getElementById(option.element);
        // Charts configuration
        if (pie_basic) {
            // Initialize chart
            pie = echarts.init(pie_basic);
            // Options
            pie.setOption({
                // Colors
                color: option.color,
                // Global text styles
                textStyle: {
                    fontFamily: 'Roboto, Arial, Verdana, sans-serif',
                    fontSize: 13
                },
                // Add title
                title: {
                    text: option.title,
                    subtext: '',
                    left: 'center',
                    textStyle: {
                        fontSize: 14,
                        fontWeight: 500,
                        color: '#000'
                    },
                    subtextStyle: {
                        fontSize: 11,
                        color: '#000'
                    }
                },
                // Add tooltip
                //tooltip: {
                //    trigger: 'item',
                //    backgroundColor: 'rgba(255,255,255,0.9)',
                //    padding: [10, 15],
                //    textStyle: {
                //        color: '#222',
                //        fontSize: 13,
                //        fontFamily: 'Roboto, sans-serif'
                //    },
                //    formatter: "{a} <br/>{b}: {c} ({d}%)"
                //},
                tooltip: {
                    trigger: 'item',
                    backgroundColor: 'rgba(0,0,0,0.75)',
                    padding: [10, 15],
                    textStyle: {
                        fontSize: 13,
                        fontFamily: 'Roboto, sans-serif'
                    },
                    formatter: "{a} <br/>{b}: {c} ({d}%)"
                },
                // Add legend
                legend: {
                    orient: 'vertical',
                    top: 'top',
                    left: 0,
                    data: option.legend,
                    itemHeight: 6,
                    itemWidth: 6,
                    textStyle: {
                        color: '#444'
                    }
                },
                // Add series
                series: [{
                    name: option.seriesname,
                    type: 'pie',
                    radius: '50%',
                    center: ['50%', '57.5%'],
                    itemStyle: {
                        normal: {
                            borderWidth: 1,
                            borderColor: '#ddd'
                        }
                    },
                    data: option.series
                }]
            });
        }

        window.addEventListener('resize', function (event) {
            pie.resize();
        });
    };

    _$appchart.Columns = function (option) {

        var columns;
        var columns_basic_element = document.getElementById(option.element);

        // Charts configuration
        if (columns_basic_element) {
            // Initialize chart
            columns = echarts.init(columns_basic_element);
            // Options
            columns.setOption({
                // Define colors
                color: ['#58bbee', '#75c181', '#f77b6b', '#f8a13f', '#4f8ad2'],
                // Global text styles
                textStyle: {
                    fontFamily: 'Roboto, Arial, Verdana, sans-serif',
                    fontSize: 13
                },
                // Chart animation duration
                animationDuration: 750,
                // Setup grid
                grid: {
                    left: 0,
                    right: 40,
                    top: 35,
                    bottom: 0,
                    containLabel: true
                },
                // Add legend
                //legend: {
                //    data: ['Evaporation', 'Precipitation'],
                //    itemHeight: 8,
                //    itemGap: 20,
                //    textStyle: {
                //        padding: [0, 5],
                //        color: '#444'
                //    }
                //},
                // Add tooltip
                tooltip: {
                    trigger: 'axis',
                    backgroundColor: 'rgba(255,255,255,0.9)',
                    padding: [10, 15],
                    textStyle: {
                        color: '#222',
                        fontSize: 13,
                        fontFamily: 'Roboto, sans-serif'
                    }
                },
                // Horizontal axis
                xAxis: [{
                    type: 'category',
                    data: option.legend, //['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
                    axisLabel: {
                        color: '#000'
                    },
                    axisLine: {
                        lineStyle: {
                            color: 'rgba(255,255,255,0.25)'
                        }
                    },
                    splitLine: {
                        show: true,
                        lineStyle: {
                            color: 'rgba(255,255,255,0.1)',
                            type: 'dashed'
                        }
                    }
                }],
                // Vertical axis
                yAxis: [{
                    type: 'value',
                    axisLabel: {
                        color: '#000'
                    },
                    axisLine: {
                        lineStyle: {
                            color: 'rgba(255,255,255,0.25)'
                        }
                    },
                    splitLine: {
                        lineStyle: {
                            color: 'rgba(255,255,255,0.1)'
                        }
                    },
                    splitArea: {
                        show: true,
                        areaStyle: {
                            color: ['rgba(255,255,255,0.01)', 'rgba(0,0,0,0.01)']
                        }
                    }
                }],
                // Axis pointer
                axisPointer: [{
                    lineStyle: {
                        color: 'rgba(255,255,255,0.25)'
                    }
                }],
                // Add series
                series: [
                    {
                        name: option.title,
                        type: 'bar',
                        data: option.series,
                        itemStyle: {
                            normal: {
                                label: {
                                    show: true,
                                    position: 'top',
                                    textStyle: {
                                        fontWeight: 500
                                    }
                                }
                            }
                        },
                        markLine: {
                            data: [{ type: 'average', name: 'Average' }]
                        }
                    }
                ]
            });

            Window.onresize += function () {
                columns_basic.resize()
            }
        }

        window.addEventListener('resize', function (event) {
            columns.resize();
        });
    };

    _$appchart.AreaZoom = function (option) {

        var area_zoom;
        var area_zoom_element = document.getElementById(option.element);

        // Zoom option
        if (area_zoom_element) {
            // Initialize chart
            area_zoom = echarts.init(area_zoom_element);
            // Options
            area_zoom.setOption({

                // Define colors
                color: ['#58bbee', '#75c181', '#f77b6b', '#f8a13f'],

                // Global text styles
                textStyle: {
                    fontFamily: 'Roboto, Arial, Verdana, sans-serif',
                    fontSize: 13
                },

                // Chart animation duration
                animationDuration: 750,

                // Setup grid
                grid: {
                    left: 0,
                    right: 40,
                    top: 35,
                    bottom: 60,
                    containLabel: true
                },

                // Add legend
                legend: {
                    data: ['Account'],
                    itemHeight: 8,
                    itemGap: 20
                },

                // Add tooltip
                tooltip: {
                    trigger: 'axis',
                    backgroundColor: 'rgba(0,0,0,0.75)',
                    padding: [10, 15],
                    textStyle: {
                        fontSize: 13,
                        fontFamily: 'Roboto, sans-serif'
                    }
                },

                // Horizontal axis
                xAxis: [{
                    type: 'category',
                    boundaryGap: false,
                    axisLabel: {
                        color: '#333'
                    },
                    axisLine: {
                        lineStyle: {
                            color: '#999'
                        }
                    },
                    data: option.legend
                }],

                // Vertical axis
                yAxis: [{
                    type: 'value',
                    axisLabel: {
                        formatter: '{value} ',
                        color: '#333'
                    },
                    axisLine: {
                        lineStyle: {
                            color: '#999'
                        }
                    },
                    splitLine: {
                        lineStyle: {
                            color: '#eee'
                        }
                    },
                    splitArea: {
                        show: true,
                        areaStyle: {
                            color: ['rgba(250,250,250,0.1)', 'rgba(0,0,0,0.01)']
                        }
                    }
                }],

                // Zoom control
                dataZoom: [
                    {
                        type: 'inside',
                        //start: 33,
                        //end: 75
                        start: 10,
                        end: 90
                    },
                    {
                        show: true,
                        type: 'slider',
                        start: 33,
                        end: 75,
                        height: 40,
                        bottom: 0,
                        borderColor: '#ccc',
                        fillerColor: 'rgba(0,0,0,0.05)',
                        handleStyle: {
                            color: '#585f63'
                        }
                    }
                ],

                // Add series
                series: [
                    {
                        name: 'Account',
                        type: 'line',
                        smooth: true,
                        symbolSize: 6,
                        areaStyle: {
                            normal: {
                                opacity: 0.25
                            }
                        },
                        itemStyle: {
                            normal: {
                                borderWidth: 2
                            }
                        },
                        data: option.series
                    }
                ]
            });
        }

        window.addEventListener('resize', function (event) {
            area_zoom.resize();
        });
    };

    _$appchart.BarsStacked = function (option) {

        var chart;
        var chartElement = document.getElementById(option.element);

        // Stacked bar chart
        if (chartElement) {
            // Initialize chart
            chart = echarts.init(chartElement);
            // Options
            chart.setOption({

                // Global text styles
                textStyle: {
                    fontFamily: 'Roboto, Arial, Verdana, sans-serif',
                    fontSize: 13
                },

                // Chart animation duration
                animationDuration: 750,

                // Setup grid
                grid: {
                    left: 0,
                    right: 30,
                    top: 35,
                    bottom: 0,
                    containLabel: true
                },

                // Add legend
                legend: {
                    data: ['Visitor', 'Access Users'],
                    itemHeight: 7,
                    itemGap: 20,
                    textStyle: {
                        padding: [0, 5]
                    }
                },

                // Add tooltip
                tooltip: {
                    trigger: 'axis',
                    backgroundColor: 'rgba(0,0,0,0.75)',
                    padding: [10, 15],
                    textStyle: {
                        fontSize: 13,
                        fontFamily: 'Roboto, sans-serif'
                    },
                    axisPointer: {
                        type: 'shadow',
                        shadowStyle: {
                            color: 'rgba(0,0,0,0.025)'
                        }
                    }
                },

                // Horizontal axis
                xAxis: [{
                    type: 'value',
                    axisLabel: {
                        color: '#333'
                    },
                    axisLine: {
                        lineStyle: {
                            color: '#999'
                        }
                    },
                    splitLine: {
                        show: true,
                        lineStyle: {
                            color: '#eee',
                            type: 'dashed'
                        }
                    }
                }],

                // Vertical axis
                yAxis: [{
                    type: 'category',
                    data: option.legend,
                    axisLabel: {
                        color: '#333'
                    },
                    axisLine: {
                        lineStyle: {
                            color: '#999'
                        }
                    },
                    splitLine: {
                        show: true,
                        lineStyle: {
                            color: ['#eee']
                        }
                    },
                    splitArea: {
                        show: true,
                        areaStyle: {
                            color: ['rgba(250,250,250,0.1)', 'rgba(0,0,0,0.015)']
                        }
                    }
                }],

                // Add series
                series: [
                    {
                        name: 'Access Users',
                        type: 'bar',
                        stack: 'Total',
                        barWidth: 20,
                        itemStyle: {
                            normal: {
                                color: '#ABE9E9',
                                label: {
                                    show: true,
                                    position: 'insideRight',
                                    padding: [0, 10],
                                    fontSize: 12,
                                    formatter: function (params) {
                                        if (params.value == "0") {
                                            return "";
                                        }
                                        return params.value;
                                    }
                                }
                            }
                        },
                        data: option.series1
                    },
                    {
                        name: 'Visitor',
                        type: 'bar',
                        stack: 'Total',
                        itemStyle: {
                            normal: {
                                color: '#2ec7c9',
                                label: {
                                    show: true,
                                    position: 'insideRight',
                                    padding: [0, 10],
                                    fontSize: 12,
                                    formatter: function (params) {
                                        if (params.value == "0") {
                                            return "";
                                        }
                                        return params.value;
                                    }
                                }
                            }
                        },
                        data: option.series2
                    }
                ]
            });
        }

        window.addEventListener('resize', function (event) {
            chart.resize();
        });
    };

    _$appchart.AreaZoomLine = function (option) {

        var area_zoom;
        var area_zoom_element = document.getElementById(option.element);
        
        // Zoom option
        if (area_zoom_element) {
            // Initialize chart
            area_zoom = echarts.init(area_zoom_element);
            // Options
            area_zoom.setOption({

                // Define colors
                color: ['#58bbee', '#75c181', '#f77b6b', '#f8a13f'],

                // Global text styles
                textStyle: {
                    fontFamily: 'Roboto, Arial, Verdana, sans-serif',
                    fontSize: 13
                },
                //Save Image
                toolbox: {
                    feature: {
                        saveAsImage: {
                            name: 'Device_' + Date.parse(new Date()) / 1000,
                            title: 'Save'
                        }
                    }
                },

                // Chart animation duration
                animationDuration: 750,

                // Setup grid
                grid: {
                    left: 0,
                    right: 40,
                    top: 35,
                    bottom: 60,
                    containLabel: true
                },

                // Add legend
                legend: {
                    data: [option.title],
                    itemHeight: 8,
                    itemGap: 30
                },

                // Add tooltip
                tooltip: {
                    trigger: 'axis',
                    backgroundColor: 'rgba(0,0,0,0.75)',
                    padding: [10, 15],
                    textStyle: {
                        fontSize: 13,
                        fontFamily: 'Roboto, sans-serif'
                    }
                },

                // Horizontal axis
                xAxis: [{
                    type: 'category',
                    boundaryGap: false,
                    axisLabel: {
                        color: '#333'
                    },
                    axisLine: {
                        lineStyle: {
                            color: '#999'
                        }
                    },
                    data: option.legend
                }],

                // Vertical axis
                yAxis: [{
                    type: 'value',
                    axisLabel: {
                        formatter: '{value} ',
                        color: '#333'
                    },
                    axisLine: {
                        lineStyle: {
                            color: '#999'
                        }
                    },
                    splitLine: {
                        lineStyle: {
                            color: '#eee'
                        }
                    },
                    splitArea: {
                        show: true,
                        areaStyle: {
                            color: ['rgba(250,250,250,0.1)', 'rgba(0,0,0,0.01)']
                        }
                    }
                }],

                // Zoom control
                dataZoom: [
                    {
                        type: 'inside',
                        start: 0,
                        end: 100
                    },
                    {
                        show: true,
                        type: 'slider',
                        start: 33,
                        end: 75,
                        height: 40,
                        bottom: 0,
                        borderColor: '#ccc',
                        fillerColor: 'rgba(0,0,0,0.05)',
                        handleStyle: {
                            color: '#585f63'
                        }
                    }
                ],

                // Add series
                series: [
                    {
                        name: option.title,
                        type: 'line',
                        smooth: true,
                        symbolSize: 6,
                        areaStyle: {
                            normal: {
                                opacity: 0.25
                            }
                        },
                        itemStyle: {
                            normal: {
                                borderWidth: 2
                            }
                        },
                        label: {
                            normal: {
                                show: true,
                                position: 'top'
                            }
                        },
                        data: option.series
                    }
                ]
            });
        }

        window.addEventListener('resize', function (event) {
            area_zoom.resize();
        });
    };

    _$appchart.LineChart = function (option) {

        var line;
        var line_basic_element = document.getElementById(option.element);
        // Charts configuration
        if (line_basic_element) {
            // Initialize chart
            line = echarts.init(line_basic_element);
            line.clear();

            // Options
            line.setOption({
                // Define colors
                color: ['#58bbee', '#75c181', '#f77b6b', '#f8a13f', '#4f8ad2'],
                // Global text styles
                textStyle: {
                    fontFamily: 'Roboto, Arial, Verdana, sans-serif',
                    fontSize: 13
                },
                // Add legend
                legend: {
                    data: option.legend,
                    itemHeight: 8,
                    itemGap: 30
                },
                // Chart animation duration
                animationDuration: 750,
                // Setup grid
                grid: {
                    left: 0,
                    right: 40,
                    top: 35,
                    bottom: 60,
                    containLabel: true
                },

                // saveAsImage
                toolbox: {
                    feature: {
                        saveAsImage: {
                            name: 'Device_' + Date.parse(new Date()) / 1000,
                            title: 'Save'
                        }
                    }
                },

                // Add tooltip
                tooltip: {
                    trigger: 'axis',
                    backgroundColor: 'rgba(255,255,255,0.9)',
                    padding: [10, 15],
                    textStyle: {
                        color: '#222',
                        fontSize: 13,
                        fontFamily: 'Roboto, sans-serif'
                    }
                },
                // Horizontal axis
                xAxis: [{
                    type: 'category',
                    boundaryGap: false,
                    axisLabel: {
                        color: '#333'
                    },
                    axisLine: {
                        lineStyle: {
                            color: '#999'
                        }
                    },
                    data: option.xlegend
                }],

                // Vertical axis
                yAxis: [{
                    type: 'value',
                    axisLabel: {
                        formatter: '{value} ',
                        color: '#333'
                    },
                    axisLine: {
                        lineStyle: {
                            color: '#999'
                        }
                    },
                    splitLine: {
                        lineStyle: {
                            color: '#eee'
                        }
                    },
                    splitArea: {
                        show: true,
                        areaStyle: {
                            color: ['rgba(250,250,250,0.1)', 'rgba(0,0,0,0.01)']
                        }
                    }
                }],
                // Axis pointer
                axisPointer: [{
                    lineStyle: {
                        color: 'rgba(255,255,255,0.25)'
                    }
                }],
                // Zoom control
                dataZoom: [
                    {
                        type: 'inside',
                        start: 0,
                        end: 100
                    },
                    {
                        show: true,
                        type: 'slider',
                        start: 33,
                        end: 75,
                        height: 40,
                        bottom: 0,
                        borderColor: '#ccc',
                        fillerColor: 'rgba(0,0,0,0.05)',
                        handleStyle: {
                            color: '#585f63'
                        }
                    }
                ],
                // Add series
                series: option.seriesData
            });
            
            
            Window.onresize += function () {
                line.resize()
            }
        }

        window.addEventListener('resize', function (event) {
            line.resize();
        });
    };

    _$appchart.LineChartMulti = function (option, isPush) {

        var line;
        var line_basic_element = document.getElementById(option.element);
        // Charts configuration
        if (line_basic_element) {
            // Initialize chart
            line = echarts.init(line_basic_element);

            // Options
            if (!isPush) {
                line.setOption({
                    // Define colors
                    color: ['#58bbee', '#75c181', '#f77b6b', '#f8a13f', '#4f8ad2'],
                    // Global text styles
                    textStyle: {
                        fontFamily: 'Roboto, Arial, Verdana, sans-serif',
                        fontSize: 11
                    },
                    // Add legend
                    legend: {
                        show: option.legendShow,
                        data: option.legend,
                        padding: [0, 0, 0, 0],
                        itemHeight: 8,
                        itemGap: 2
                    },
                    // Chart animation duration
                    animationDuration: 750,
                    // Setup grid
                    grid: {
                        left: 0,
                        right: 40,
                        top: 35,
                        bottom: 60,
                        containLabel: true
                    },

                    // Add tooltip
                    tooltip: {
                        trigger: 'axis',
                        backgroundColor: 'rgba(255,255,255,0.9)',
                        padding: [10, 15],
                        textStyle: {
                            color: '#222',
                            fontSize: 13,
                            fontFamily: 'Roboto, sans-serif'
                        }
                    },
                    // Horizontal axis
                    xAxis: [{
                        type: 'category',
                        boundaryGap: false,
                        axisLabel: {
                            color: '#333'
                        },
                        axisLine: {
                            lineStyle: {
                                color: '#999'
                            }
                        },
                        data: option.xlegend
                    }],

                    // Vertical axis
                    yAxis: [{
                        type: 'value',
                        min: 0,
                        //max: 100,
                        axisLabel: {
                            formatter: '{value}',
                            color: '#333'
                        },
                        axisLine: {
                            lineStyle: {
                                color: '#999'
                            }
                        },
                        splitLine: {
                            lineStyle: {
                                color: '#eee'
                            }
                        },
                        splitArea: {
                            show: true,
                            areaStyle: {
                                color: ['rgba(250,250,250,0.1)', 'rgba(0,0,0,0.01)']
                            }
                        }
                    }],
                    // Axis pointer
                    axisPointer: [{
                        lineStyle: {
                            color: 'rgba(255,255,255,0.25)'
                        }
                    }],
                    // Zoom control
                    dataZoom: [
                        {
                            type: 'inside',
                            start: 0,
                            end: 100
                        },
                        {
                            show: true,
                            type: 'slider',
                            start: 33,
                            end: 75,
                            height: 40,
                            bottom: 0,
                            borderColor: '#ccc',
                            fillerColor: 'rgba(0,0,0,0.05)',
                            handleStyle: {
                                color: '#585f63'
                            }
                        }
                    ],
                    // Add series
                    series: option.seriesData
                });
            }
            else {
                //Push
                line.setOption({
                    xAxis: [{
                        data: option.xlegend
                    }],
                    series: option.seriesData
                });
            }

            Window.onresize += function () {
                line.resize()
            }
        }

        window.addEventListener('resize', function (event) {
            line.resize();
        });
    };

    _$appchart.BarsBasic = function (option) {

        var bars_basic_element = document.getElementById(option.element);
        if (bars_basic_element) {
            var bars_basic = echarts.init(bars_basic_element);
            bars_basic.setOption({
                textStyle: {
                    fontFamily: 'Roboto, Arial, Verdana, sans-serif',
                    fontSize: 13
                },

                animationDuration: 750,

                grid: {
                    left: 0,
                    right: 30,
                    top: 35,
                    bottom: 0,
                    containLabel: true
                },

                // Add legend
                legend: {
                    data: option.legend,
                    itemHeight: 8,
                    itemGap: 20
                },

                // Add tooltip
                tooltip: {
                    trigger: 'axis',
                    backgroundColor: 'rgba(0,0,0,0.75)',
                    padding: [10, 15],
                    textStyle: {
                        fontSize: 13,
                        fontFamily: 'Roboto, sans-serif'
                    },
                    axisPointer: {
                        type: 'shadow',
                        shadowStyle: {
                            color: 'rgba(0,0,0,0.025)'
                        }
                    }
                },

                // Horizontal axis
                yAxis: [{
                    type: 'value',
                    boundaryGap: [0, 0.01],
                    axisLabel: { color: '#333' },
                    axisLine: { lineStyle: { color: '#999' } },
                    splitLine: { show: true, lineStyle: { color: '#eee', type: 'dashed' } }
                }],

                // Vertical axis
                xAxis: [{
                    type: 'category',
                    data: option.xAxis,
                    axisLabel: { color: '#333' },
                    axisLine: { lineStyle: { color: '#999' } },
                    splitLine: { show: true, lineStyle: { color: ['#eee'] } },
                    splitArea: { show: true, areaStyle: { color: ['rgba(250,250,250,0.1)', 'rgba(0,0,0,0.015)'] }}
                }],

                // Add series
                series: option.series
            });
        }

        // Resize function
        var triggerChartResize = function () {
            bars_basic_element && bars_basic.resize();
        };

        // On sidebar width change
        var sidebarToggle = document.querySelector('.sidebar-control');
        sidebarToggle && sidebarToggle.addEventListener('click', triggerChartResize);

        // On window resize
        var resizeCharts;
        window.addEventListener('resize', function () {
            clearTimeout(resizeCharts);
            resizeCharts = setTimeout(function () {
                triggerChartResize();
            }, 200);
        });
    };

    _$appchart.AreaStacked = function (option) {

        var area_stacked_element = document.getElementById(option.element);

        if (area_stacked_element) {

            var area_stacked = echarts.init(area_stacked_element);
            area_stacked.setOption({
                color: option.color,

                textStyle: {
                    fontFamily: 'Roboto, Arial, Verdana, sans-serif',
                    fontSize: 13
                },

                animationDuration: 750,

                grid: {
                    left: 0,
                    right: 40,
                    top: 35,
                    bottom: 0,
                    containLabel: true
                },

                legend: {
                    data: option.legend,
                    itemHeight: 8,
                    itemGap: 20
                },

                tooltip: {
                    trigger: 'axis',
                    backgroundColor: 'rgba(0,0,0,0.75)',
                    padding: [10, 15],
                    textStyle: {
                        fontSize: 13,
                        fontFamily: 'Roboto, sans-serif'
                    }
                },

                xAxis: [{
                    type: 'category',
                    boundaryGap: false,
                    data: option.xAxis,
                    axisLabel: {
                        color: '#333'
                    },
                    axisLine: {
                        lineStyle: {
                            color: '#999'
                        }
                    },
                    splitLine: {
                        show: true,
                        lineStyle: {
                            color: '#eee',
                            type: 'dashed'
                        }
                    }
                }],

                yAxis: [{
                    type: 'value',
                    axisLabel: {
                        color: '#333'
                    },
                    axisLine: {
                        lineStyle: {
                            color: '#999'
                        }
                    },
                    splitLine: {
                        lineStyle: {
                            color: '#eee'
                        }
                    },
                    splitArea: {
                        show: true,
                        areaStyle: {
                            color: ['rgba(250,250,250,0.1)', 'rgba(0,0,0,0.01)']
                        }
                    }
                }],

                // Add series
                series: option.series
            });
        }

        window.addEventListener('resize', function (event) {
            area_stacked.resize();
        });
    };

    _$appchart.AreaBasic = function (option) {

        var area_basic_element = document.getElementById(option.element);

        if (area_basic_element) {

            var area_basic = echarts.init(area_basic_element);
            area_basic.setOption({

                color: option.color,

                textStyle: {
                    fontFamily: 'Roboto, Arial, Verdana, sans-serif',
                    fontSize: 13
                },

                animationDuration: 750,

                grid: {
                    left: 0,
                    right: 40,
                    top: 35,
                    bottom: 0,
                    containLabel: true
                },

                legend: {
                    data: option.legend,
                    itemHeight: 8,
                    itemGap: 20
                },

                tooltip: {
                    trigger: 'axis',
                    backgroundColor: 'rgba(0,0,0,0.75)',
                    padding: [10, 15],
                    textStyle: {
                        fontSize: 13,
                        fontFamily: 'Roboto, sans-serif'
                    }
                },

                xAxis: [{
                    type: 'category',
                    boundaryGap: false,
                    data: option.xAxis,
                    axisLabel: {
                        color: '#333'
                    },
                    axisLine: {
                        lineStyle: {
                            color: '#999'
                        }
                    },
                    splitLine: {
                        show: true,
                        lineStyle: {
                            color: '#eee',
                            type: 'dashed'
                        }
                    }
                }],

                yAxis: [{
                    type: 'value',
                    axisLabel: {
                        color: '#333'
                    },
                    axisLine: {
                        lineStyle: {
                            color: '#999'
                        }
                    },
                    splitLine: {
                        lineStyle: {
                            color: '#eee'
                        }
                    },
                    splitArea: {
                        show: true,
                        areaStyle: {
                            color: ['rgba(250,250,250,0.1)', 'rgba(0,0,0,0.01)']
                        }
                    }
                }],

                series: option.series
            });
        }


        //
        // Resize charts
        //

        // Resize function
        var triggerChartResize = function () {
            area_basic_element && area_basic.resize();
        };

        // On sidebar width change
        var sidebarToggle = document.querySelector('.sidebar-control');
        sidebarToggle && sidebarToggle.addEventListener('click', triggerChartResize);

        // On window resize
        var resizeCharts;
        window.addEventListener('resize', function () {
            clearTimeout(resizeCharts);
            resizeCharts = setTimeout(function () {
                triggerChartResize();
            }, 200);
        });
    };

    w.$appchart = _$appchart;
})(window);