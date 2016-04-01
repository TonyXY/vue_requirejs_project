/*************地图**********/
define(["echartsConfig", "chinaJson"], function(MyChart, chinaJson) {
    function LvChart(container) {
        this._map = new BMap.Map(container);
        var point = new BMap.Point(104.404, 38.915);
        this._map.centerAndZoom(point, 5);
        this._map.enableScrollWheelZoom(true);
        this._echartsContainer = null;
        this._geoCoord = [];
        this._mapOffset = [0, 0];
        var mapStyle = [{
            "featureType": "land",
            "elementType": "all",
            "stylers": {
                "color": "#232434"
            }
        }, {
            "featureType": "water",
            "elementType": "all",
            "stylers": {
                "color": "#395161"
            }
        }, {
            "featureType": "green",
            "elementType": "all",
            "stylers": {
                "visibility": "off"
            }
        }, {
            "featureType": "road",
            "elementType": "all",
            "stylers": {
                "visibility": "off"
            }
        }, {
            "featureType": "highway",
            "elementType": "all",
            "stylers": {
                "color": "#0c343d",
                "visibility": "on"
            }
        }, {
            "featureType": "poi",
            "elementType": "all",
            "stylers": {
                "visibility": "off"
            }
        }, {
            "featureType": "boundary",
            "elementType": "all",
            "stylers": {
                "color": "#21c3d1",
                "visibility": "on"
            }
        }, {
            "featureType": "label",
            "elementType": "all",
            "stylers": {
                "visibility": "off"
            }
        }, {
            "featureType": "manmade",
            "elementType": "all",
            "stylers": {
                "visibility": "off"
            }
        }, {
            "featureType": "arterial",
            "elementType": "all",
            "stylers": {
                "color": "#433d3d",
                "visibility": "on"
            }
        }, {
            "featureType": "highway",
            "elementType": "labels.icon",
            "stylers": {
                "visibility": "off"
            }
        }, {
            "featureType": "highway",
            "elementType": "labels.text.fill",
            "stylers": {
                "color": "#666666"
            }
        }, {
            "featureType": "arterial",
            "elementType": "labels",
            "stylers": {
                "visibility": "off"
            }
        }];
        this._map.setMapStyle({
					styleJson :mapStyle
				});
        // MyChart.call(this, container, {}, 0, 1);
    }
    webComm.echarts.util.inherits(LvChart, MyChart);
    LvChart.prototype._setOptionData = function(data) {
        var self = this;

        function Overlay() {}
        Overlay.prototype = new BMap.Overlay();
        Overlay.prototype.initialize = function(map) {

            var size = map.getSize();
            var div = self._echartsContainer = document.createElement('div');
            div.style.position = 'absolute';
            div.style.height = size.height + 'px';
            div.style.width = size.width + 'px';
            div.style.top = 0;
            div.style.left = 0;
            map.getPanes().labelPane.appendChild(div);
            return div;
        };
        Overlay.prototype.draw = function() {};
        var myOverlay = new Overlay();
        myOverlay.initialize(self._map);
        self._map.addOverlay(myOverlay);
        self.chart = webComm.echarts.init(self._echartsContainer); // self._bindEvent();
        // self._addMarkWrap();
        function randomData() {
            return Math.round(Math.random() * 1000);
        }
        webComm.echarts.registerMap('none', {});
        option = {
            title: {
                text: 'iphone销量',
                subtext: '纯属虚构',
                left: 'center'
            },
            tooltip: {
                trigger: 'item'
            },
            legend: {
                orient: 'vertical',
                left: 'left',
                data: ['iphone4', 'iphone5']
            },
            visualMap: {
                min: 0,
                max: 2500,
                left: 'left',
                top: 'bottom',
                text: ['高', '低'], // 文本，默认为数值文本
                calculable: true
            },
            toolbox: {
                show: true,
                orient: 'vertical',
                left: 'right',
                top: 'center',
                feature: {
                    dataView: {
                        readOnly: false
                    },
                    restore: {},
                    saveAsImage: {}
                }
            },
            series: [{
                name: 'iphone4',
                type: 'map',
                map:'china',
                // mapType: 'china',
                label: {
                    normal: {
                        show: true
                    },
                    emphasis: {
                        show: true
                    }
                },
                data: [{
                    name: '北京',
                    value: randomData()
                }, {
                    name: '天津',
                    value: randomData()
                }, {
                    name: '上海',
                    value: randomData()
                }, {
                    name: '重庆',
                    value: randomData()
                }, {
                    name: '河北',
                    value: randomData()
                }, {
                    name: '安徽',
                    value: randomData()
                }, {
                    name: '新疆',
                    value: randomData()
                }, {
                    name: '浙江',
                    value: randomData()
                }, {
                    name: '江西',
                    value: randomData()
                }, {
                    name: '山西',
                    value: randomData()
                }, {
                    name: '内蒙古',
                    value: randomData()
                }, {
                    name: '吉林',
                    value: randomData()
                }, {
                    name: '福建',
                    value: randomData()
                }, {
                    name: '广东',
                    value: randomData()
                }, {
                    name: '西藏',
                    value: randomData()
                }, {
                    name: '四川',
                    value: randomData()
                }, {
                    name: '宁夏',
                    value: randomData()
                }, {
                    name: '香港',
                    value: randomData()
                }, {
                    name: '澳门',
                    value: randomData()
                }]
            }, {
                name: 'iphone5',
                type: 'map',
                mapType: 'none',
                label: {
                    normal: {
                        show: true
                    },
                    emphasis: {
                        show: true
                    }
                },
                data: [{
                    name: '北京',
                    value: randomData()
                }, {
                    name: '天津',
                    value: randomData()
                }, {
                    name: '上海',
                    value: randomData()
                }, {
                    name: '广东',
                    value: randomData()
                }, {
                    name: '台湾',
                    value: randomData()
                }, {
                    name: '香港',
                    value: randomData()
                }, {
                    name: '澳门',
                    value: randomData()
                }]
            }]
        };
        self.setOption(option, true);

        // this.option = option;
        // this.loadStatus = true;
    };
    LvChart.prototype.geoCoord2Pixel = function(geoCoord) {
        var self = this;
        var point = new BMap.Point(geoCoord[0], geoCoord[1]);
        var pos = self._map.pointToOverlayPixel(point);
        return [pos.x, pos.y];
    };
    LvChart.prototype.pixel2GeoCoord = function(pixel) {
        var self = this;
        var point = self._map.overlayPixelToPoint({
            x: pixel[0],
            y: pixel[1]
        });
        return [point.lng, point.lat];
    };
    /**
     * 增加x、y坐标
     *
     * @param {Object} obj  markPoint、markLine data中的项，必须有name
     * @param {Object} geoCoord
     */
    LvChart.prototype._AddPos = function(obj) {
        var self = this;
        var coord = this._geoCoord[obj.name]
        var pos = this.geoCoord2Pixel(coord);
        obj.x = pos[0] - self._mapOffset[0];
        obj.y = pos[1] - self._mapOffset[1];
    };

    LvChart.prototype.setOption = function(option, notMerge) {
        var self = this;
        var series = option.series || {};

        // 记录所有的geoCoord
        for (var i = 0, item; item = series[i++];) {
            var geoCoord = item.geoCoord;
            if (geoCoord) {
                for (var k in geoCoord) {
                    self._geoCoord[k] = geoCoord[k];
                }
            }
        }

        // 添加x、y
        for (var i = 0, item; item = series[i++];) {
            var markPoint = item.markPoint || {};
            var markLine = item.markLine || {};
            var data = markPoint.data;
            if (data && data.length) {
                for (var k in data) {
                    self._AddPos(data[k]);
                }
            }
            data = markLine.data;
            if (data && data.length) {
                for (var k in data) {
                    self._AddPos(data[k][0]);
                    self._AddPos(data[k][1]);
                }
            }
        }
        self.chart.setOption(option, notMerge);
    };
    LvChart.prototype._addMarkWrap = function() {
        var self = this;
        self.chart._addMarkOri = self.chart._addMark;
        console.log(self.chart);

        function _addMark(seriesIdx, markData, markType) {
            var data;
            if (markType == 'markPoint') {
                var data = markData.data;
                if (data && data.length) {
                    for (var k in data) {
                        self._AddPos(data[k]);
                    }
                }
            } else {
                data = markData.data;
                if (data && data.length) {
                    for (var k in data) {
                        self._AddPos(data[k][0]);
                        self._AddPos(data[k][1]);
                    }
                }
            }
            self.chart._addMarkOri(seriesIdx, markData, markType);
        }


        self.chart._addMark = _addMark;
    };
    /**
     * 绑定地图事件的处理方法
     *
     * @private
     */
    LvChart.prototype._bindEvent = function() {
        var self = this;
        self._map.addEventListener('zoomend', _zoomChangeHandler);

        self._map.addEventListener('moving', _moveHandler('moving'));
        self._map.addEventListener('moveend', _moveHandler('moveend'));

        // self._ec.getZrender().on('dragstart', _dragZrenderHandler(true));
        // self._ec.getZrender().on('dragend', _dragZrenderHandler(false));
    }

    /**
     * 地图缩放触发事件
     *
     * @private
     */
    function _zoomChangeHandler() {
        _fireEvent('zoom');
    }
    /**
     * 地图移动、如拖拽触发事件
     *
     * @param {string} type moving | moveend  移动中|移动结束
     * @return {Function}
     * @private
     */
    function _moveHandler(type) {
        return function() {
            // 记录便宜量
            var offsetEle =
                self._echartsContainer.parentNode.parentNode.parentNode;
            self._mapOffset = [-parseInt(offsetEle.style.left) || 0, -parseInt(offsetEle.style.top) || 0];
            self._echartsContainer.style.left = self._mapOffset[0] + 'px';
            self._echartsContainer.style.top = self._mapOffset[1] + 'px';

            _fireEvent(type);
        }
    }

    /**
     * Zrender拖拽触发事件
     *
     * @param {boolean} isStart
     * @return {Function}
     * @private
     */
    function _dragZrenderHandler(isStart) {
        return function() {
            var func = isStart ? 'disableDragging' : 'enableDragging';
            self._map[func]();
        }
    }

    /**
     * 触发事件
     *
     * @param {stirng}  type 事件类型
     * @private
     */
    function _fireEvent(type) {
        var func = self['on' + type];
        if (func) {
            func();
        } else {
            // self.refresh();
        }
    }
    return LvChart;
});
