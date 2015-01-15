# Canvas实现橡皮擦效果
![Effect img](https://raw.githubusercontent.com/yovenxu/HTML5/master/Canvas-Eraser-Effect/img/effect.png)

####主要使用到的canvas属性：globalCompositeOperation
globalCompositeOperation 属性设置或返回如何将一个源（新的）图像绘制到目标（已有）的图像上。
源图像 = 您打算放置到画布上的绘图。
目标图像 = 您已经放置在画布上的绘图。
默认值为：source-over。
![globalCompositeOperation img](https://raw.githubusercontent.com/yovenxu/HTML5/master/Canvas-Eraser-Effect/img/globalCompositeOperation.png)
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

html5 canvas可以实现的效果还有很多，我们想象发挥的空间还很大。
