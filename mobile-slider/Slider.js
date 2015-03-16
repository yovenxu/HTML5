/*
// 移动图片slider
//
// @author: yy <yoven.xu@vipshop.com>
//
//  - 原生javascript实现
//  - 可以在支持touchstart的浏览器使用
*/

(function () {
    function Slider (opts) {
        this.wrap = opts.dom;
        this.list = opts.list;

        //初始化计算
        this.init();

        //dom渲染
        this.renderDom();

        //事件绑定
        this.bindDom();
    }

    //初始化需要进行的数值计算
    Slider.prototype.init = function () {
        this.winWidth = window.innerWidth;
        this.winHeight = window.innerHeight;

        //屏幕的高宽比例
        this.radio = this.winHeight / this.winWidth;
        this.idx = 0;
    };

    //图片列表的渲染
    Slider.prototype.renderDom = function () {
        var wrap = this.wrap;
        var winWidth = this.winWidth;
        var winHeight = this.winHeight;
        var radio = this.radio;
        var data = this.list;
        var len = data.length;
        var htmlContent = [];
        var imgSide = '';

        htmlContent.push('<ul>');
        for (var i = 0; i < len; i++) {
            var item = data[i];

            if (item) {
                //以高度为屏幕高度等比例展示图片
                if (item.height/item.width > radio) {
                    imgSide = 'height="' + winHeight + '"';
                }
                else {
                    imgSide = 'width="' + winWidth + '"';
                }

                htmlContent.push(
                    //translate3d可以利用上GPU加速让页面的性能有更好的表现
                    '<li style="-webkit-transform:translate3d(',
                    i * winWidth,
                    'px, 0, 0);">',
                    '<img src="',
                    item.img,
                    '" ',
                    imgSide,
                    ' />',
                    '</li>'
                );
            }
        }
        htmlContent.push('</ul>');

        //全屏展示
        wrap.style.height = winHeight + 'px';
        wrap.innerHTML = htmlContent.join('');
    };

    //滑动事件的绑定
    Slider.prototype.bindDom = function () {
        var self = this;
        var wrap = this.wrap;
        var winWidth = this.winWidth;
        var lis = wrap.getElementsByTagName('li');

        //触摸开始
        var startHandler = function (evt) {
            self.startX = evt.touches[0].pageX;
            self.offsetX = 0;
            self.startTime = +new Date(); 
        };

        //触摸移动
        var moveHandler = function (evt) {
            evt.preventDefault();
            self.offsetX = evt.touches[0].pageX - self.startX;

            //只移动可能会展示到用户面前的三张图片
            var i = self.idx - 1;
            var m = i + 3;

            for (; i < m; i++) {
                if (lis[i]) {
                    lis[i].style.webkitTransition = 'none';
                    lis[i].style.webkitTransform = 'translate3d('+ 
                    ((i - self.idx) * winWidth + self.offsetX)
                    +'px, 0, 0)';
                }
            }
        };

        //触摸结束
        var endHandler = function (evt) {
            var boundary = winWidth / 6;
            var endTime = +new Date();

            //判断如果用户的触摸动作很快，则把触发上/下一张的缓动距离减小
            if (endTime - self.startTime < 800) {
                boundary = 50;
            }

            //上一张
            if (self.offsetX >= boundary) {
                self.go('-1');
            }
            //下一张
            else if (self.offsetX < -boundary) {
                self.go('+1');
            }
            //不足缓动距离则回到原图片
            else {
                self.go('0');
            }
        };

        wrap.addEventListener('touchstart', startHandler);
        wrap.addEventListener('touchmove', moveHandler);
        wrap.addEventListener('touchend', endHandler);
    };

    //滑动事件的执行函数
    Slider.prototype.go = function (n) {
        var idx = this.idx;
        var winWidth = this.winWidth;
        var lis = this.wrap.getElementsByTagName('li');
        var cidx;
        var len = lis.length;
        var transition = '-webkit-transform 0.2s ease-out';

        if (typeof n === 'number') {
            cidx = n;
        }
        else if (typeof n === 'string') {
            cidx = idx + (+n)
        }

        if (cidx > len - 1) {
            cidx = len - 1;
        }
        else if (cidx < 0) {
            cidx = 0;
        }

        this.idx = cidx;

        lis[cidx].style.webkitTransition = transition;
        lis[cidx].style.webkitTransform = 'translate3d(0,0,0)';

        if (lis[cidx - 1]) {
            lis[cidx - 1].style.webkitTransition = transition;
            lis[cidx - 1].style.webkitTransform = 'translate3d(-'+ winWidth +'px, 0, 0)';
        }

        if (lis[cidx + 1]) {
            lis[cidx + 1].style.webkitTransition = transition;
            lis[cidx + 1].style.webkitTransform = 'translate3d('+ winWidth +'px, 0, 0)';
        }
    };

    window.Slider = Slider;
})();