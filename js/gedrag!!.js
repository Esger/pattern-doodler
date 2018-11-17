// JavaScript Document
// You may specify partial version numbers, such as "1" or "1.3",
//  with the same result. Doing so will automatically load the 
//  latest version matching that partial revision pattern 
//  (i.e. both 1 and 1.3 would load 1.3.1 today).
google.load("jquery", "1.3.1");

google.setOnLoadCallback(function () {
// Place init code here instead of $(document).ready()
// JavaScript Document
	var canvas = document.getElementById('thetoroid'); // The canvas where your doodle is drawn
	var ctx = canvas.getContext('2d');
	var mouseX, mouseY;
	var pendown = false;
	var patcount = 4;
	var patsize = Math.floor(canvas.width / patcount);
	var oncanvas = function (x, y) {
		if ((x > 1) && (x < canvas.width - 2) && (y > 1) && (y < canvas.height - 2)) {
			return true;
		} else {
			return false;
		}
	};
		
	// Erase the canvas
	function clearspace() {
		ctx.fillStyle = "rgb(255, 255, 255)";
		ctx.fillRect(0, 0, canvas.width, canvas.height);
		ctx.strokeStyle = "rgb(128, 128, 0)";
		ctx.lineWidth = "2";
	}

	// Record array with mouse coordinates
	$('#thetoroid').mousemove(function (event) {
		var ix, iy;
		mouseX = Math.floor((event.offsetX?(event.offsetX):event.pageX - this.offsetLeft));
		mouseY = Math.floor((event.offsetY?(event.offsetY):event.pageY - this.offsetTop));
		if (pendown && oncanvas(mouseX, mouseY)) {
			ctx.lineTo(mouseX, mouseY);
			ctx.stroke();
		} else {
			pendown = false;
			ctx.beginPath();
			ctx.moveTo(mouseX, mouseY);
		}
		ctx.save();
		for (iy = 0; iy < patcount; iy++) {
			for (ix = 0; ix < patcount; ix++) {
				ctx.translate(patsize * ix, patsize * iy);
			}
		}
		ctx.restore();
	});
	 		
	// Set pendown to drawing mode;
	$('#thetoroid').mousedown(function (event) {
		pendown = true;
		$(this).addClass('pendown'); // crosshair cursor class
		mouseX = Math.floor((event.offsetX?(event.offsetX):event.pageX - this.offsetLeft));
		mouseY = Math.floor((event.offsetY?(event.offsetY):event.pageY - this.offsetTop));
		ctx.beginPath();
		ctx.moveTo(mouseX, mouseY);
	});

	// Set pendown off;
	$('#thetoroid').mouseup(function (event) {
		pendown = false;
		$(this).removeClass();
	});

	// Clear the canvas (in order to draw manually on it)
	function clearlife() {
		clearspace();
		drawspace();
	}
	$('#clearbutton').click(function () {
		clearlife();
	});
		
	// Toggle text on or off
	$('#texttoggler').click(function () {
		$('#story').toggle('slow');
	});
		
	clearspace();
});