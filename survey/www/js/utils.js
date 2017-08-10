/*
The MIT License (MIT)

Copyright (c) 2014-2015 Sabrina Thai & Elizabeth Page-Gould

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
*/

var addLeadingZero = function(value) {
	if (value.toString().length < 2) {
		return "0" + value;
	}
	return value.toString();
}

var getDateString = function(timeStamp=null) {
	var date;
	if (timeStamp) {
		date = new Date(timeStamp);
	}
	else {
		date = new Date();
	}
	var year = date.getFullYear();
	var month = addLeadingZero(date.getMonth());
	var day = addLeadingZero(date.getDate());
	var hour = addLeadingZero(date.getHours());
	var min = addLeadingZero(date.getMinutes());
	var sec = addLeadingZero(date.getSeconds());
	var millisec = date.getMilliseconds();

	return year + "_" + month + "_" + day + "_" + hour + "_" + min + "_" + sec + "_" + millisec;
}

var getBranchingQuestionIndex = function(count, response)  {
	var index;
	if (typeof count === 'string' || count instanceof String) {
		return index;
	}
	return count + ":" + response;
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

var isBranchingQuestion = function(value) {
	if (typeof value === 'string' || value instanceof String) {
		if (value.indexOf(":") > -1) {
			return true;
		}
	}
	return false;
}

var fetchBranchFromQuestions = function(questionList, branchQuestion) {
	var questionIndexValues = branchQuestion.split(":");
	var questionNumber = questionIndexValues[0];
	var answerValue = questionIndexValues[1];

	return questionList[questionNumber].branching[answerValue].slice();
}

var removeCurrentScheduleEpoch = function(uniqueKey, scheduleList) {
	var parsedList = JSON.parse(scheduleList);
	var index = parsedList.indexOf(uniqueKey)
	if (index > -1) {
		parsedList.splice(index, 1);
	}
	return JSON.stringify(parsedList);
}
