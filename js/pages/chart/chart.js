define([],function(){
    var page = {};
    page.init = function(){
        require(["chart/exampleChart"], function(LvChart) {
            var chartObj = new LvChart('exampleChart');
            //此处可以换成ajax请求接口数据
            var data = [];
            for (var i = 0; i <= 360; i++) {
                var t = i / 180 * Math.PI;
                var r = Math.sin(2 * t) * Math.cos(2 * t);
                data.push([r, i]);
            }
            chartObj._setOptionData(data);
            chartObj.getDataBack();
        });
    };
    return page;
});
