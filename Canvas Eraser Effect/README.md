# Canvas实现橡皮擦效果
![Effect img](https://raw.githubusercontent.com/yovenxu/HTML5/master/Canvas%20Eraser%20Effect/img/effect.png)

###主要使用到的canvas属性
#####globalCompositeOperation
![globalCompositeOperation img](https://raw.githubusercontent.com/yovenxu/HTML5/master/Canvas%20Eraser%20Effect/img/globalCompositeOperation.png)
以上图片的实现js代码如下：

	var gco = [
		"source-atop",
		"source-in",
		"source-out",
		"source-over",
		"destination-atop",
		"destination-in",
		"destination-out",
		"destination-over",
		"lighter",
		"copy",
		"xor"
	];

	for (n=0;n<gco.length;n++) {
		document.write("<div id='p_" + n + "' style='float:left;'>" + gco[n] + ":<br>");
		var c=document.createElement("canvas");
		c.width=120;
		c.height=100;
		document.getElementById("p_" + n).appendChild(c);
		var ctx=c.getContext("2d");    
		ctx.fillStyle="blue";
		ctx.fillRect(10,10,50,50);
		ctx.globalCompositeOperation=gco[n];
		ctx.beginPath();
		ctx.fillStyle="red";
		ctx.arc(50,50,30,0,2*Math.PI);
		ctx.fill();
		document.write("</div>");
	}

使用html5 canvas能实现的效果真的是非常多，只要发挥想象空间，简直就可以实现一个小型的绘图工具。
在这里通过自己的实践，做了个canvas的橡皮擦效果。
橡皮擦的效果主要是使用canvas的globalCompositeOperation=destination-out属性来实现的。
