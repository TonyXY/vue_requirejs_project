define(function(require) {
	webComm.echarts = require("echarts");
	webComm.echarts.registerTheme('myTheme',{
		color: ['#e87c25','#60c0dd', '#f3a43b', '#3374c3','#fad860', '#44525d','#b5c334', '#c1232b','#9bca63','#c4ccd3'],
        animationEasing: "linear",
        animationDuration: 1e3
	});
	var chartArr = [];
	window.onresize = function() {
		webComm.echarts.util.each(chartArr,function(chart,idx){
			chart.resize();
		});
    };
    function MyChart(dom_id, option, flag, initFlag) {
        this.dom_id = dom_id; //渲染的位置id
        this.option = option; //chart option
        this.loading_flag = flag; //显示过渡效果标志 --0:不显示, 1:显示
        this.chart = '';
        this.loadStatus = false; //是否根据新数据重置了option
        initFlag && this.init();
    }
    MyChart.prototype.init = function() {
        this.chart = webComm.echarts.init(document.getElementById(this.dom_id),'myTheme');
    };

    MyChart.prototype.resetOption = function() {
        this.chart = webComm.echarts.init(document.getElementById(this.dom_id),'myTheme');
        this.chart.setOption(this.option);
        this.bindEvents();
        var _self = this;
    	chartArr.push(_self.chart);
    };

    MyChart.prototype.dispose = function() {
        this.chart && this.chart.dispose();
    };

    MyChart.prototype.bindEvents = function() { //绑定相关事件
    };

    MyChart.prototype.eConsole = function(param) {
        //console.log(param);
    };

    MyChart.prototype.showLoading = function() { // 开始加载数据,显示过渡效果
        if (this.loading_flag) {
            this.chart.showLoading({
                text: '数据读取中...',
                effect: 'whirling',
                maskColor:'rgba(0,0,0,0)'
            });
        }
    };

    MyChart.prototype.getDataBack = function() { //获取数据后,关闭过渡效果,重绘chart
        var _self = this;
        if (this.loading_flag) {
        	this.showLoading();
            setTimeout(function(){
                _self.chart.hideLoading();
                _self.resetOption();
            }, 500);
        }else{
            _self.resetOption();
        }
    };
    return MyChart;
});
