define(['pages/map/mapStyle'], function(mapStyle) {
    var page = {};
    var BMapLoad = 0;
    window.MapCallback = function() {
        // require(["chart/mapChart"], function(LvChart) {
        //     var chartObj = new LvChart('exampleChart');
        //     var data = [];
        //     chartObj._setOptionData(data);
        // });
        if (!BMapLoad) {
            BMapLoad = 1;
        }
        var map = new BMap.Map('exampleChart');
        var point = new BMap.Point(104.404, 38.915);
        map.centerAndZoom(point, 5);
        map.enableScrollWheelZoom(true);
        map.setMapStyle({
            styleJson: mapStyle
        });
        require(["chart/exampleChart"], function(LvChart) {
            var chartObj = new LvChart('testChart');
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
        setTimeout(function() {
            Vue.http.get('/js/json/map_data.json', [], []).then(function(response) {
                console.log(response);
                // success callback
            }, function(response) {
                console.log(response);
                // error callback
            });
        }, 3000);
    };
    page.init = function() {
        if (!BMapLoad) { //异步加载百度js
            var obj = this,
                script = document.createElement("script");
            script.type = "text/javascript";
            script.src = "http://api.map.baidu.com/api?v=2.0&ak=WYGikjauut0wKnjEAeYO1QAK&callback=MapCallback";
            document.body.appendChild(script);
        } else {
            window.MapCallback();
        }
    };
    return page;
});
