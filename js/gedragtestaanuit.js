// JavaScript Document
// You may specify partial version numbers, such as "1" or "1.3",
//  with the same result. Doing so will automatically load the 
//  latest version matching that partial revision pattern 
//  (i.e. both 1 and 1.3 would load 1.3.1 today).
google.load("jquery", "1.7");
 
google.setOnLoadCallback(function () {
// Place init code here instead of $(document).ready()
	var canvas = document.getElementById('thetoroid'); // The canvas where your doodle is drawn
	var ctx = canvas.getContext('2d');
	var mouseX = 0, mouseY = 0;
	var doodle = [];
	var pendown = false;
	var patcount = $('form #repetitions').val();
	var patsize = Math.floor(canvas.width / patcount);
	var patstyle = 'mirror';
	var pensize = $('form #linewidth').val();
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
		ctx.lineWidth = $('form #linewidth').val();
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
		var ix, iy;
				
		function drawcopy() {
			var count;
			
			ctx.beginPath();
			ctx.moveTo(doodle[0].x, doodle[0].y);
			for (count in doodle) {
				ctx.lineTo(doodle[count].x, doodle[count].y);
				ctx.stroke();
			}
			ctx.closePath();
		}
				
		for (iy = 1 - patcount; iy < patcount; iy++) {
			for (ix = 1 - patcount; ix < patcount; ix++) {
				ctx.save();
				ctx.translate(ix * patsize, iy * patsize);
				drawcopy();
				ctx.restore();
			}
		}
		//doodle.shift();
	}
	
	// Set pendown to drawing mode and record starting point;
	$('#thetoroid').on('click', function (event) {
		mouseX = Math.floor((event.offsetX?(event.offsetX):event.pageX - this.offsetLeft));
		mouseY = Math.floor((event.offsetY?(event.offsetY):event.pageY - this.offsetTop));
		doodle = [];
		doodle[0] = new Celxy(mouseX, mouseY);
		pendown = !pendown;
		if (pendown) {
			$(this).addClass('pendown'); // crosshair cursor class
		} else {
			$(this).removeClass('pendown'); // crosshair cursor class
		}
	});
 
	// Record array with mouse coordinates
	$('#thetoroid').mousemove(function (event) {
		mouseX = Math.floor((event.offsetX?(event.offsetX):event.pageX - this.offsetLeft));
		mouseY = Math.floor((event.offsetY?(event.offsetY):event.pageY - this.offsetTop));
		if (pendown) {
			doodle[doodle.length] = new Celxy(mouseX, mouseY);
			drawcopies();
			doodle.shift();
		}
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