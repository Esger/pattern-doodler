// JavaScript Document
// You may specify partial version numbers, such as "1" or "1.3",
//  with the same result. Doing so will automatically load the 
//  latest version matching that partial revision pattern 
//  (i.e. both 1 and 1.3 would load 1.3.1 today).
google.load("jquery", "1.3.1");
 
google.setOnLoadCallback(function () {
// Place init code here instead of $(document).ready()
	var canvas = document.getElementById('thetoroid'); // The canvas where your doodle is drawn
	var ctx = canvas.getContext('2d');
	var mouseX = 0, mouseY = 0;
	var doodle = [];
	var pendown = false;
	var patcount = 4;
	var patsize = Math.floor(canvas.width / patcount);
	var patstyle = 'mirror';
	var pensize = 2;
	var edges = 'round';
	
	var oncanvas = function (x, y) {
		if ((x > 1) && (x < canvas.width - 1) && (y > 1) && (y < canvas.height - 1)) {
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
		ctx.lineWidth = '2';
		ctx.lineCap = 'round';
		ctx.lineJoin = 'round';
	}
	
	// Put new pair of values in array
	function Celxy(x, y) {
		this.x = x;
		this.y = y; 
	}
		
	// Draw copies of the drawn doodle
	function drawcopies() {
		var ix, iy, count;
		var doodlelength = doodle.length;
		var todraw = [];
				
		function drawcopy() {
			
			var passedborder = function (thisx, nextx, thisy, nexty) {
				var dx = Math.abs(thisx - nextx),
					dy = Math.abs(thisy - nexty),
					maxd = canvas.width * 0.9;
				if ((dx > maxd) || (dy > maxd)) {
					return true;
				} else {
					return false;
				}
			}, count;
			
			ctx.beginPath();
			ctx.moveTo(todraw[0].x, todraw[0].y);
			for (count = 0; count < todraw.length - 2; count++) {
				if (passedborder(todraw[count].x, todraw[count + 1].x, todraw[count].y, todraw[count + 1].y)) {
					ctx.closePath();
					ctx.moveTo(todraw[count + 1].x, todraw[count + 1].y);
					ctx.beginPath();
				} else {
					ctx.lineTo(todraw[count + 1].x, todraw[count + 1].y);
					ctx.stroke();
				}
			}
		}
		
		//Mirror rows
		function mirrorx() {
			var firstpointx = todraw[0].x,
			dx;
			for (count in todraw) {
				dx = 2 * (firstpointx - todraw[count].x);
				todraw[count].x += dx;
			}
		}
		
		for (iy = 0; iy < patcount; iy++) {
			for (ix = 0; ix < patcount; ix++) {
				todraw = [];
				for (count in doodle) {
					todraw[count] = new Celxy((doodle[count].x + ix * patsize) % canvas.width, (doodle[count].y + iy * patsize) % canvas.height);
				}
				if (todraw.length > 1) {
					if ((patstyle === 'mirror') && (iy % 2 === 1)) {
						mirrorx();
					}
					drawcopy();
				}
			}
		}
	}
	
	// Delete doodle coordinates already drawn
	function cleanup(anArray) {
		if (doodle.length > 10) {
			doodle.shift(5);
		}
	}
 
	// Record array with mouse coordinates
	$('#thetoroid').mousemove(function (event) {
		mouseX = Math.floor((event.offsetX?(event.offsetX):event.pageX - this.offsetLeft));
		mouseY = Math.floor((event.offsetY?(event.offsetY):event.pageY - this.offsetTop));
		if (pendown && oncanvas(mouseX, mouseY)) {
			doodle[doodle.length] = new Celxy(mouseX, mouseY);
			drawcopies();
			//cleanup(doodle);
		} else {
			doodle = [];
		}
	});
	 		
	// Set pendown to drawing mode;
	$('#thetoroid').mousedown(function (event) {
		mouseX = Math.floor((event.offsetX?(event.offsetX):event.pageX - this.offsetLeft));
		mouseY = Math.floor((event.offsetY?(event.offsetY):event.pageY - this.offsetTop));
		doodle[0] = new Celxy(mouseX, mouseY);
		pendown = true;
		$(this).addClass('pendown'); // crosshair cursor class
	});
 
	// Set pendown off;
	$('#thetoroid').mouseup(function (event) {
		pendown = false;
		$(this).removeClass();
	});
 
 	// Set the number of repetitions of the pattern
	$('form #repetitions').blur(function () {
		patcount = $(this).val();
		patsize = Math.floor(canvas.width / patcount);
	});
			
 	// Set the number of repetitions of the pattern
	$('form #linewidth').blur(function () {
		ctx.lineWidth = $(this).val();
	});
			
 	// Set the pattern style
	$('form #patstyle').blur(function () {
		patstyle = $(this).val();
	});
			
	// Clear the canvas
	$('#clearbutton').click(function () {
		clearspace();
	});
		
	// Toggle text on or off
	$('#texttoggler').click(function () {
		$('#story').toggle('slow');
	});
		
	clearspace();
});