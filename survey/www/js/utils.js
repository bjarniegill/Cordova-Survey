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

var getSurveyStartBaseTime = function() {
	var now = new Date();
	var surveyBaseTime = new Date();
	surveyBaseTime.setDate(now.getDate() + SURVEY_WAIT_PERIOD_BEFOR_START);
	surveyBaseTime.setHours(SURVEY_START_HOUR);
	surveyBaseTime.setMinutes(SURVEY_START_MINUTE);
	surveyBaseTime.setSeconds(0);
	surveyBaseTime.setMilliseconds(0);

	return surveyBaseTime;
}

var getDailyTimeSpan = function() {
	var date1 = new Date();
	var date2 = new Date(date1.getTime());

	date1.setHours(SURVEY_START_HOUR);
	date1.setMinutes(SURVEY_START_MINUTE);
	date2.setHours(SURVEY_END_HOUR);
	date2.setMinutes(SURVEY_END_MINUTE);

	return Math.abs(date2 - date1);
}

var getRandomArbitrary = function(min, max) {
	return Math.random() * (max - min) + min;
}

var partisipantCanAnswer = function(scheduleTimes) {
	for (var i = 0; i < scheduleTimes.length; i++) {
		var startTime = scheduleTimes[i];
		var currentTime = new Date().getTime();
		var endTime = startTime + (SURVEY_TIME_ALLOWED_TO_ANSWER * 60000);
		
		if (currentTime >= startTime && currentTime <= endTime) {
			return startTime;
		}
	}
	return false;
}

var safeAddPartisipantDataToLocalStore = function(storage, key, value) {
	var tmpStorage;
	if (storage.hasOwnProperty(SURVEY_DATA_STORAGE_NAME)) {
		tmpStorage = JSON.parse(storage[SURVEY_DATA_STORAGE_NAME]);
	}
	else {
		tmpStorage = {};
	}
	tmpStorage[key] = value
	storage[SURVEY_DATA_STORAGE_NAME] = JSON.stringify(tmpStorage);
}

var safeGetIntFromLocalStorage = function(value) {
	if ( ! isNaN(value)) {
		return parseInt(value);
	}
	return value;
}
