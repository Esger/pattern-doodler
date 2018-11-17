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
	var doodlearray = []; // Array with x,y coordinates of drawn points
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

	// Empty the arrays to get ready for restart.
	function initarray() {
		doodlearray = [];
	}
	
	// Put new pair of values in array
	function Celxy(x, y) {
		this.x = x;
		this.y = y; 
	}
		
	// Draw the array with doodlearray
	function drawdoodle() {
		var count;
		ctx.beginPath();
		ctx.moveTo(doodlearray[0].x, doodlearray[0].y);
		for (count in doodlearray) {
			if (doodlearray.length > 1) {
				ctx.lineTo(doodlearray[count].x, doodlearray[count].y);
			} 
		}
		ctx.stroke();
	}
		
	// Record array with mouse coordinates
	$('#thetoroid').mousemove(function (event) {
		var xsector, ysector, ix, iy;
		mouseX = Math.floor((event.offsetX?(event.offsetX):event.pageX - this.offsetLeft));
		mouseY = Math.floor((event.offsetY?(event.offsetY):event.pageY - this.offsetTop));
		if (pendown && oncanvas(mouseX, mouseY)) {
			doodlearray[doodlearray.length] = new Celxy(mouseX, mouseY);
			drawdoodle();
		} else {
			doodlearray = [];
		}
			/*ctx.save();
			xsector = Math.floor(mouseX / patsize);
			ysector = Math.floor(mouseY / patsize);
			for (iy = 0; iy < patcount; iy++) {
				for (ix = 0; ix < patcount; ix++) {
					ctx.translate(patsize * (ix - xsector), patsize * (iy = - ysector));
					drawdoodle();
				}
			}
			ctx.restore();*/
	});
	 		
	// Set pendown to drawing mode;
	$('#thetoroid').mousedown(function (event) {
		pendown = true;
		initarray();
		$(this).addClass('pendown'); // crosshair cursor class
	});

	// Set pendown off;
	$('#thetoroid').mouseup(function (event) {
		pendown = false;
		$(this).removeClass();
	});

	// Clear the canvas (in order to draw manually on it)
	function clearlife() {
		initarray();
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