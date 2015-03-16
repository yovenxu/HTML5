# 移动端图片轮播Slider

####关键点：
1. 利用translate3d的GPU加速；
2. 轮播时只控制可视范围内的三张图片。

####使用方式：
引入Slider.js后，执行

	new Slider({
		'dom': document.getElementById('J_slider_wrap'),
		'list': [
        	{ width : 914, height : 609, img : '3.jpg' },
        	{ width : 680, height : 510, img : '4.jpg' },
       		{ width : 500, height : 598, img : '5.jpg' },
        	{ width : 915, height : 634, img : '6.jpg' },
        	{ width : 610, height : 915, img : '7.jpg' },
        	{ width : 915, height : 610, img : '8.jpg' },
        	{ width : 800, height : 1280, img : '9.jpg' }
    	]
	});
	
