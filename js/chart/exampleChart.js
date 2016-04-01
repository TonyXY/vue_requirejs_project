/*************极坐标图**********/
define(["echartsConfig"], function(MyChart) {
    function LvChart(container) {
        MyChart.call(this, container, {}, 0, 1);
    }
    webComm.echarts.util.inherits(LvChart, MyChart);
    LvChart.prototype._setOptionData = function(data) {
        var option = {
            title: {
                text: '极坐标双数值轴'
            },
            legend: {
                data: ['line']
            },
            polar: {
                center: ['50%', '54%']
            },
            tooltip: {
                trigger: 'axis',
                axisPointer: {
                    type: 'cross'
                }
            },
            angleAxis: {
                type: 'value',
                startAngle: 0
            },
            radiusAxis: {
                min: 0
            },
            series: [{
                coordinateSystem: 'polar',
                name: 'line',
                type: 'line',
                showSymbol: false,
                data: data
            }],
            animationDuration: 2000
        };
        this.option = option;
        this.loadStatus = true;
    };
    return LvChart;
});
