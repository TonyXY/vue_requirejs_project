//配置页面加载模块参数
require.config({
    /*加载等待时间*/
    waitSeconds: 0,
    //添加加载异步加载CSS的插件
    map: {
        '*': {
            'css': 'lib/css.min'
        }
    },
    //配置Javascript文件映射路径
    paths: {
        jquery: 'lib/jquery.min',
        echarts: 'lib/echarts.min',
        text: 'lib/text',
        chinaJson: 'lib/china',
        vue: 'lib/vue.min',
        VueValidator: 'lib/vue-validator.min',//Vue.js 官方路由，与 Vue.js 内核深度整合 https://github.com/vuejs/vue-router
        VueRouter: 'lib/vue-router.min',//表单验证插件 https://github.com/vuejs/vue-validator
        VueRsource: 'lib/vue-resource.min',//通过 XMLHttpRequest 或 JSONP 发起请求并处理响应 https://github.com/vuejs/vue-resource
        echartsConfig: 'chart/echartsConfig'
    },
    shim: {
        /*模块依赖关系 demo*/
        echartsConfig: {
            deps: ['echarts']
        }
    }
});

if (typeof jQBrowser != 'undefined') {
    if (jQBrowser.name == 'msie' && jQBrowser.versionNumber <= 8) {
        var k = confirm('您的浏览器版本太旧，网页不再支持老版本浏览器，是否跳转到建议页面？')
        if (k) {
            window.location.href = 'np.html';
        }
    }
}
var webComm = {};
require(['VueRouter','VueValidator','VueRsource'], function(VueRouter,VueValidator) {
    Vue.use(VueValidator);
    Vue.http.options.root = '/root';
    Vue.http.headers.common['Authorization'] = 'Basic YXBpOnBhc3N3b3Jk';
    Vue.component('app-header', {
        template: "#app-header",
        props: ['header']
    });
    Vue.component('app-footer', {
        template: "#app-footer",
        props: ['footer']
    });
    var router = new VueRouter();
    new Vue({
        el:'#app',
        data: {
            header:'header111',
            footer:'footer121'
        }
    });

    var App = Vue.extend({});
    //获取当前页面组件
    function getPageComponent(pageName) {
        return function(resolve) {
            var url = pageName;
            if(pageName.indexOf('/')=='-1'){
                url = pageName + '/' + pageName;
            }
            //异步获取组件
            require(['text!pages/' + url + '.tpl'], function(template) {
                resolve({
                    template: template
                });
            });
        };
    }
    //配置路由
    router.map({
        '/svg': {
            component: getPageComponent('svg'),
            //配置子路由
            subRoutes: {
                '/barss': {
                    component: getPageComponent('svg/barss')
                }
            }
        },
        '/chart': {
            component: getPageComponent('chart')
        },
        '/map': {
            component: getPageComponent('map')
        }
    });
    router.afterEach(function(transition) {
        var pageName = transition.to.path.substring(1);
        var url = pageName;
        if(pageName.indexOf('/')=='-1'){
            url = pageName + '/' + pageName;
        }
        require(['pages/' + url], function(page) {
            page.init();
        });
    });
    //重定向初始页面
    router.redirect({
        '/': '/svg'
    });
    //开始应用
    router.start(App, '#app');
});
