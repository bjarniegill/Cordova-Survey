var getCurrentDate = function(timeStamp=null) {
	var date;
	if (timeStamp) {
		date = new Date(timeStamp);
	}
	else {
		date = new Date();
	}
	var year = date.getFullYear();
	var month = date.getMonth();
	var day = date.getDate(); 
	var hour = date.getHours(); 
	var min = date.getMinutes(); 
	var sec = date.getSeconds();
	var millisec = date.getMilliseconds();

	return year + "_" + month + "_" + day + "_" + hour + "_" + min + "_" + sec + "_" + millisec;
}
