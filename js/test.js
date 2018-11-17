// JavaScript Document
// You may specify partial version numbers, such as "1" or "1.3",
//  with the same result. Doing so will automatically load the 
//  latest version matching that partial revision pattern 
//  (i.e. both 1 and 1.3 would load 1.3.1 today).
google.load("jquery", "1.3.1");

google.setOnLoadCallback(function () {
// Place init code here instead of $(document).ready()
// JavaScript Document
	var i;
	var doodle = [[],[]];
	
	for (i = 0; i < 10; i++) {
		doodle[i][0] = i;
		doodle[i][1] = i * 2;
	}
});