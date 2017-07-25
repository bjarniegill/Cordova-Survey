var getDateString = function(timeStamp=null) {
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

var getBranchingQuestion = function(count, response, branchList)  {
	var index;
	if (typeof count === 'string' || count instanceof String) {
		index = count + "_" + response;
	}
	else {
		index = count + ":" + response;
	}
	if (branchList[index]) {
		return index;
	}
	else {
		return;
	}
}

var recoverFromBranching = function(count) {
	return parseInt(count.split(":")[0]);
}
