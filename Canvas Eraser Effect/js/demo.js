(function () {
	function canvasEraser() {
		var canvas = document.getElementById('J_canvas');
		var context = canvas.getContext('2d');
		var drawwing = false;
		var positionX = [];
		var positionY = [];
		var dragRecord = [];
		var radius = 10; //笔触大小

		if ('ontouchstart' in document) {
			$(document)
				.on('touchstart', '#J_canvas', start)
				.on('touchmove', '#J_canvas', move)
				.on('touchend', '#J_canvas', end);
		}
		else {
			$(document)
				.on('mousedown', '#J_canvas', start)
				.on('mousemove', '#J_canvas', move)
				.on('mouseup', '#J_canvas', end);
		}

		curtain();

		//笔触开始
		function start (e) {
			var x = e.pageX - this.offsetLeft;
			var y = e.pageY - this.offsetTop;
			drawwing = true;

			addActPosition(x, y, false);
			redraw();
		}

		//笔触移动
		function move (e) {
			if (drawwing) {
				addActPosition(e.pageX - this.offsetLeft, e.pageY - this.offsetTop, true);
				redraw();
			}
		}

		//笔触收起
		function end (e) {
			drawwing = false;
		}

		//涂层效果
		function curtain (bgColor) {
			if (bgColor) {
				context.fillStyle = bgColor;
				context.fillRect(0, 0, canvas.width, canvas.height);
			}
			else {
				var shitImg = document.getElementById('J_shit');

				//这里需要注意确保图片已载入完毕才能进行绘制
				context.drawImage(shitImg, 0, 0);
			}
		}

		//记录移动轨迹
		function addActPosition (x, y, dragging) {
			positionX.push(x);
			positionY.push(y);
			dragRecord.push(dragging);
		}

		//绘制笔触移动轨迹
		function redraw () {
			//设置笔画的叠加效果为类似橡皮擦的效果
			context.globalCompositeOperation = 'destination-out';
			context.strokeStyle = "rgba(0,0,0,1)";
			context.lineWidth = radius;
			context.lineJoin = 'round';

			for (var i = 0, len = positionX.length; i < len; i++) {
				context.beginPath();

				if (dragRecord[i] && i) {
					context.moveTo(positionX[i-1], positionY[i-1]);
				}
				else {
					context.moveTo(positionX[i]-1, positionY[i]);
				}

				context.lineTo(positionX[i], positionY[i]);
				context.closePath();
				context.stroke();
			}
		}
	}

	window.onload = canvasEraser;
})();