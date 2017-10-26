/*EXPERIENCESAMPLER LICENSE
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
SOFTWARE.*/

// Activate localStorage
var localStore = window.localStorage;

// SurveyQuestion Model (This time, written in "JSON" format to interface more cleanly with Mustache)
// This is used to input the questions you would like to ask in your experience sampling questionnaire
// imported from questions.js
var surveyQuestions = questionList;
var participantSetup = participantSetupList;
var groupQuestions = groupAminningList;
var currentBranchingQuestionList;

// Information messages displayed in several places through the app
var infoMessages = appMessages;

// This section of code creates the templates for all the question formats
var questionTmpl = "<p>{{{questionText}}}</p><ul>{{{buttons}}}</ul>";
var questionTextTmpl = "{{questionPrompt}}";
var buttonTmpl = "<li><button id='{{id}}' value='{{value}}'>{{label}}</button></li>";
var textTmpl = "<li><textarea cols=50 rows=5 id='{{id}}'></textarea></li><li><button type='submit' value='Enter'>Enter</button></li>";
var checkListTmpl =  "<li><input type='checkbox' id='{{id}}' value='{{value}}'>{{label}}</input></li>";
var instructionTmpl = "<li><button id='{{id}}' value = 'Next'>Next</button></li>";
var sliderTmpl = "<li><input type='range' min='{{min}}' max='{{max}}' value='{{value}}' orient=vertical id='{{id}}' oninput='outputUpdate(value)'></input><output for='{{id}}' id='slider'>50</output><script>function outputUpdate(slidervalue){document.querySelector('#slider').value=slidervalue;}</script></li><li><button type='submit' value='Enter'>Enter</button></li>";
var datePickerTmpl = '<li><input id="{{id}}" data-format="DD-MM-YYYY" data-template="D MMM YYYY" name="date"><br /><br /></li><li><button type="submit" value="Enter">Enter</button></li><script>$(function(){$("input").combodate({firstItem: "name",minYear:2015, maxYear:2016});});</script>';
var dateAndTimePickerTmpl = '<li><input id="{{id}}" data-format="DD-MM-YYYY-HH-mm" data-template="D MMM YYYY  HH:mm" name="datetime24"><br /><br /></li><li><button type="submit" value="Enter">Enter</button></li><script>$(function(){$("input").combodate({firstItem: "name",minYear:2015, maxYear:2016});});</script>';
var timePickerTmpl = '<li><input id="{{id}}" data-format="HH:mm" data-template="HH : mm" name="time"><br /><br /></li><li><button type="submit" value="Enter">Enter</button></li><script>$(function(){$("input").combodate({firstItem: "name"});});</script>';
var lastPageTmpl = "<h3>{{message}}</h3>";
// This line generates the unique key variable. You will not assign the value here, because you want it the value to change
// with each new questionnaire
var uniqueKey;
// If you need to declare any other global variables (i.e., variables to be used in more than one function of ExperienceSampler)
// you should declare them here.
// For example, you might declare your piped text variable or your question branch response variable
// var name /*sample piped text variable*/

var app = {

	isSetup: false,

	// Application Constructor
	initialize: function() {
		this.bindEvents();
	},
	// Bind Event Listeners
	bindEvents: function() {
		document.addEventListener("deviceready", this.onDeviceReady, false);
		document.addEventListener("resume", this.onResume, false);
		document.addEventListener("pause", this.onPause, false);
	},
	// These functions tell the app what to do at different stages of running
	onDeviceReady: function() {
		app.init();
	},

	onResume: function() {
		if (localStore.participant_id === " " || !localStore.participant_id || localStore.participant_id == "undefined") {
			app.init();
		}
		else {
			app.sampleParticipant();
		}
	},

	onPause: function() {
		if (isBranchingQuestion(localStore.current_question)) {
			var questionIndexValues = localStore.current_question.split(":");
			var questionNumber = questionIndexValues[0];
			var answerValue = questionIndexValues[1];
			var branchQuestions = surveyQuestions[questionNumber].branching[answerValue];
			// one is added due to the question being removed when it is asked, not when it is answered.
			nrOfRemovedItemsFromBranchQuestion = branchQuestions.length - (currentBranchingQuestionList.length + 1);
			localStore.removedBranchItems = nrOfRemovedItemsFromBranchQuestion;
		}
		localStore.uniqueKey = uniqueKey;
	},

	// Initialize the whole thing
	init: function() {
		// localStore.clear()
		// The statement below states that if there is no participant id or if the participant id is left blank,
		// ExperienceSampler would present the participant set up questions
		if (localStore.participant_id === " " || !localStore.participant_id || localStore.participant_id == "undefined") {
			uniqueKey = new Date().getTime();
			app.isSetup = true;
			localStore['current_schedule'] = undefined;
			localStore['current_question'] = 0;
			app.renderQuestion(0);
		}
		else {
			app.sampleParticipant();
		}
	},

	// Beginning our app functions
	// The first function is used to specify how the app should display the various questions. You should note which questions
	// should be displayed using which formats before customizing this function
	renderQuestion: function(question_index) {
	/**
	 * Handles rendering question to the display.
	 * @param {Int} question_index: Number of a question in questionList.
	 */
		var question;
		if (app.isSetup) {
			question = participantSetup[question_index];
		}
		else if (typeof question_index === 'string' || question_index instanceof String) {
			question = currentBranchingQuestionList.shift()
		}
		else {
			question = surveyQuestions[question_index];
		}
		var questionPrompt = question.questionPrompt;
		question.questionText = Mustache.render(questionTextTmpl, {questionPrompt: questionPrompt});
		// Now populate the view for this question, depending on what the question type is
		// This part of the function will render different question formats depending on the type specified
		// Another shout-out to Rebecca Grunberg for this amazing improvement to ExperienceSampler
		switch (question.type) {
			case 'mult1': // Rating scales (i.e., small numbers at the top of the screen and larger numbers at the bottom of the screen).
				question.buttons = "";
				var label_count = 0;
				for (var i = question.minResponse; i <= question.maxResponse; i++) {
					var label = question.labels[label_count++].label;
					question.buttons += Mustache.render(
						buttonTmpl,
						{
							id: question.variableName+i,
							value: i,
							label: label
						}
					);
				}
				$("#question").html(Mustache.render(questionTmpl, question)).fadeIn(400);
				$("#question ul li button").click(function() {
					app.recordResponse(this, question_index, question.type);
				});
				break;
			case 'mult2': // Rating scales (i.e., positive numbers at the top of the screen and negative numbers at the bottom of the screen).
				question.buttons = "";
				var label_count = 0;
				for (var j = question.maxResponse; j >= question.minResponse; j--) {
					var label = question.labels[label_count++].label;
					if (label.indexOf('NAME') >= 0){
						label = label.replace("NAME", function replacer() {return name;});
					}
					question.buttons += Mustache.render(
						buttonTmpl,
						{
							id: question.variableName+j,
							value: j,
							label: label
						}
					);
				}
				$("#question").html(Mustache.render(questionTmpl, question)).fadeIn(400);
				$("#question ul li button").click(function() {
					app.recordResponse(this, question_index, question.type);
				});
				break;
			case 'checklist':
				question.buttons = "";
				var label_count = 0;
				var checkboxArray = [];
				for (var i = question.minResponse; i <= question.maxResponse; i++) {
					var label = question.labels[label_count++].label;
					if (label.indexOf('NAME') >= 0) {
						label = label.replace("NAME", function replacer() {return name;});
					}
					question.buttons += Mustache.render(
						checkListTmpl,
						{
							id: question.variableName+i,
							value: i,
							label: label
						}
					);
				}
				question.buttons += "<li><button type='submit' value='Enter'>Enter</button></li>";
				$("#question").html(Mustache.render(questionTmpl, question)).fadeIn(400);
				$("#question ul li button").click( function() {
					checkboxArray.push(question.variableName);
					$.each($("input[type=checkbox]:checked"), function() {
						checkboxArray.push($(this).val());
					});
					app.recordResponse(String(checkboxArray), question_index, question.type);
				});
				break;
			case 'slider':
				question.buttons = Mustache.render(
					sliderTmpl,
					{id: question.variableName+"1"},
					{min: question.minResponse},
					{max: question.maxResponse},
					{value: (question.maxResponse)/2}
				);
				$("#question").html(Mustache.render(questionTmpl, question)).fadeIn(400);
				var slider = [];
				$("#question ul li button").click(function() {
						slider.push(question.variableName);
						slider.push($("input[type=range]").val());
						app.recordResponse(String(slider), question_index, question.type);
				});
				break;
			case 'instructions':
				question.buttons = Mustache.render(instructionTmpl, {id: question.variableName+"1"});
				$("#question").html(Mustache.render(questionTmpl, question)).fadeIn(400);
				var instruction = [];
				$("#question ul li button").click(function() {
					instruction.push(question.variableName);
					instruction.push($(this).val());
					app.recordResponse(String(instruction), question_index, question.type);
				});
				break;
			case 'text': //default to open-ended text
				question.buttons = Mustache.render(textTmpl, {id: question.variableName+"1"});
				$("#question").html(Mustache.render(questionTmpl, question)).fadeIn(400);
				$("#question ul li button").click(function() {
					//If you want to force a response from your participants for
					//open-ended questions, you should uncomment this portion of the code
					if (app.validateResponse($("textarea"))) {
						app.recordResponse($("textarea"), question_index, question.type);
					}
					else {
						alert("Please enter and id.");
					}
				});
				break;
			case 'datePicker':
				question.buttons = Mustache.render(datePickerTmpl, {id: question.variableName+"1"});
				$("#question").html(Mustache.render(questionTmpl, question)).fadeIn(400);
				var date, dateSplit, variableName = [], dateArray = [];
				$("#question ul li button").click(function() {
					date = $("input").combodate('getValue');
					dateArray.push(question.variableName);
					dateArray.push(date);
					app.recordResponse(String(dateArray), question_index, question.type);
				});
				break;
			case 'dateAndTimePicker':
				question.buttons = Mustache.render(dateAndTimePickerTmpl, {id: question.variableName+"1"});
				$("#question").html(Mustache.render(questionTmpl, question)).fadeIn(400);
				var date, dateSplit, variableName = [], dateArray = [];
				$("#question ul li button").click(function() {
					date = $("input").combodate('getValue');
					dateArray.push(question.variableName);
					dateArray.push(date);
					app.recordResponse(String(dateArray), question_index, question.type);
				});
				break;
			case 'timePicker':
				question.buttons = Mustache.render(timePickerTmpl, {id: question.variableName+"1"});
				$("#question").html(Mustache.render(questionTmpl, question)).fadeIn(400);
				var time, timeSplit, variableName = [], timeArray = [];
				$("#question ul li button").click(function() {
					time = $("input").combodate('getValue');
					timeArray.push(question.variableName);
					timeArray.push(time);
					app.recordResponse(String(timeArray), question_index, question.type);
				});
				break;
		}
	},

	renderLastPage: function(pageData, question_index) {
		$("#question").html(Mustache.render(lastPageTmpl, pageData));
		if (app.isSetup) {
			app.isSetup = false;
			app.saveDataLastPage();
		}
		// This part of the code says that if the participant has completed the entire questionnaire,
		// ExperienceSampler should create a completed tag for it.
		// This tag will be used to count the number of completed questionnaires participants have completed
		// at the end of each day
		// The time stamp created here will also be used to create an end time for your restructured data
		else {
			safeAddPartisipantDataToLocalStore(
				localStore,
				uniqueKey + '_' + "completedSurvey"  + "_" + getDateString(),
				1
			);
			localStore["survey_schedules_epoch"] = removeCurrentScheduleEpoch(uniqueKey, localStore["survey_schedules_epoch"]);
			app.saveDataLastPage();
		}
	},

	renderNoCurrentSurveyPage: function(pageData) {
		$("#question").html(Mustache.render(lastPageTmpl, infoMessages['no_questions']));
		if (localStore[SURVEY_DATA_STORAGE_NAME]) {
			app.saveDataLastPage();
		}
	},

	// Record User Responses
	recordResponse: function(button, count, type) {
	/**
	 * Handles recording user response and storing it in local store.
	 * @param {Obj}    button: Value of the response that the user gave.
	 * @param {Int}    count: Number of current question.
	 * @param {String} type: Type of question beaing answered.
	 */
		// Uncomment up to "localStore[uniqueRecord] = response;" to test whether app is recording and sending data correctly (Stage 2 of Customization)
		// This tells ExperienceSampler how to save data from the various formats
		// Record value of text field
		var response, currentQuestion, uniqueRecord;
		if (type == 'text') {
			response = button.val();
			// remove newlines from user input
			response = response.replace(/(\r\n|\n|\r)/g, ""); //encodeURIComponent(); decodeURIComponent()
			currentQuestion = button.attr('id').slice(0,-1);
		}
		else if (type == 'slider') {
			response = button.split(/,(.+)/)[1];
			currentQuestion = button.split(",",1);
		}
		// Record the array
		else if (type == 'checklist') {
			response = button.split(/,(.+)/)[1];
			currentQuestion = button.split(",",1);
		}
		else if (type == 'instructions') {
			response = button.split(/,(.+)/)[1];
			currentQuestion = button.split(",",1);
		}
		// Record value of clicked button
		else if (type == 'mult1') {
			response = button.value;
			// Create a unique identifier for this response
			currentQuestion = button.id.slice(0,-1);
		}
		// Record value of clicked button
		else if (type == 'mult2') {
			response = button.value;
			// Create a unique identifier for this response
			currentQuestion = button.id.slice(0,-1);
		}
		else if (type == 'datePicker') {
			response = button.split(/,(.+)/)[1];
			currentQuestion = button.split(",",1);
		}
		else if (type == 'dateAndTimePicker') {
			response = button.split(/,(.+)/)[1];
			currentQuestion = button.split(",",1);
		}
		else if (type == 'timePicker') {
			response = button.split(/,(.+)/)[1];
			currentQuestion = button.split(",",1);
		}

		// Storing question response
		if (currentQuestion === "participant_id") {
			localStore["participant_id"] = response;
		}
		else {
			uniqueRecord = uniqueKey + "_" + currentQuestion + "_" + getDateString();
			safeAddPartisipantDataToLocalStore(
				localStore,
				uniqueRecord,
				response
			);
		}

		// Group qustion extra answers quick fix
		// Carefull: This is hardcoded due to late feature request
		if (groupQuestions.length > 0) {
			if (count >= 10 && count <= 12) {
				var value = parseInt(response);
				if (value >= 5 && value <= 7) {
					surveyQuestions.splice(13, 0, groupQuestions[0]);
					surveyQuestions.splice(14, 0, groupQuestions[1]);
					surveyQuestions.splice(15, 0, groupQuestions[2]);
					surveyQuestions.splice(16, 0, groupQuestions[3]);
					groupQuestions = [];
				}
			}
		}

		var currentQuestionList;
		var branchingQuestionIndex
		if (app.isSetup) {
			currentQuestionList = participantSetup;
		}
		else {
			currentQuestionList = surveyQuestions;
			// count is a number
			if ( ! isNaN(count)) {
				var branch = currentQuestionList[count].branching;
				// question has branch for given response
				if (branch && branch.hasOwnProperty(response)) {
					branchingQuestionIndex = getBranchingQuestionIndex(count, response);
					currentBranchingQuestionList = branch[response].slice();
				}
			}
			// count is not a number
			else {
				// branching has no more questions
				if (currentBranchingQuestionList.length === 0) {
					currentBranchingQuestionList = undefined;
					count = recoverFromBranching(count);
				}
				// branching has more questions
				else {
					branchingQuestionIndex = count;
				}
			}
		}
		
		if (branchingQuestionIndex) {
			$("#question").fadeOut(400, function () {
				$("#question").html("");
				localStore.current_question = branchingQuestionIndex;
				app.renderQuestion(branchingQuestionIndex);
			});
		}
		else {
			if (count < currentQuestionList.length-1) {
				$("#question").fadeOut(400, function () {
					$("#question").html("");
					localStore.current_question = count+1;
					app.renderQuestion(count+1);
				});
			}
			else {
				if (app.isSetup) {
					app.scheduleNotifs();
				}
				app.renderLastPage(infoMessages['questions_finished'], count);
			}
		}
	},

	sampleParticipant: function() {
		if (isBranchingQuestion(localStore.current_question)) {
			if (localStore.removedBranchItems) {
				var branchQuestions = fetchBranchFromQuestions(surveyQuestions, localStore.current_question);
				for (var i = 0; i < parseInt(localStore.removedBranchItems); i++) {
					branchQuestions.shift();
				}
			}
		}
		currentBranchingQuestionList = branchQuestions;
		localStore.removedBranchItems = "";
		var scheduleEpoch;
		if (localStore['survey_schedules_epoch']) {
			scheduleEpoch = partisipantCanAnswer(JSON.parse(localStore['survey_schedules_epoch']));	
		}
		if (scheduleEpoch) {
			uniqueKey = scheduleEpoch;
			// true if this is a new survey
			if (parseInt(localStore.current_schedule) !== scheduleEpoch) {
				localStore.current_schedule = scheduleEpoch;
				localStore.current_question = 0;
				safeAddPartisipantDataToLocalStore(
					localStore,
					uniqueKey + "_" + "startTime"  + "_" + getDateString(),
					1
				);
			}
			uniqueKey = scheduleEpoch;
			localStore.uniqueKey = uniqueKey;
			app.renderQuestion(safeGetIntFromLocalStorage(localStore.current_question));
		}
		else {
			app.renderNoCurrentSurveyPage()
		}
	},

	// uncomment this function to test data saving function (Stage 2 of Customization)
	saveDataLastPage:function() {
		safeAddPartisipantDataToLocalStore(localStore, 'participant_id', localStore.participant_id);
		safeAddPartisipantDataToLocalStore(localStore, 'uniqueKey', localStore.uniqueKey);
		console.log("save last data"); 
		console.log(localStore[SURVEY_DATA_STORAGE_NAME]);
		$.ajax({
			type: SURVEY_DATA_SAVE_PROTOCOL,
			url: SURVEY_DATA_SAVE_URL,
			data: JSON.parse(localStore[SURVEY_DATA_STORAGE_NAME]),
			crossDomain: true,
			success: function (result) {
				delete localStore[SURVEY_DATA_STORAGE_NAME];
				$("#question").html("<h3>" + infoMessages["save_success"].message + "</h3>");
			},
			error: function (request, error) {
				console.log(error);
				$("#question").html("<h3>" + infoMessages["save_fail"].message + "</h3><br><button>" + infoMessages["resend_button"].message + "</button>");
				$("#question button").click(function () { app.saveDataLastPage(); });
			}
		});
	},

	// Local Notifications Javascript
	scheduleNotifs:function() {
		var millisecondTimeBuffer = Math.floor((SURVEY_TIME_BUFFER * 60000) / 2);
		var baseTime = getSurveyStartBaseTime();
		var dailyTimeSpan = getDailyTimeSpan();

		var timeSpanInterval = Math.floor(dailyTimeSpan / SURVEYS_DONE_PER_DAY);
		var surveyTimes = [];
		var notificationCounter = 1;

		for (var day = 0; day < SURVEY_DURATION_IN_DAYS; day++) {
			for (var interval = 0; interval < SURVEYS_DONE_PER_DAY; interval++) {
				var timeIntervalStart = interval * timeSpanInterval;
				var timeInteralEnd = (interval * timeSpanInterval) + timeSpanInterval;

				timeIntervalStart += millisecondTimeBuffer;
				timeInteralEnd -= millisecondTimeBuffer;

				randomTime = getRandomArbitrary(timeIntervalStart, timeInteralEnd);

				var scheduledSurveyDate = new Date(baseTime.getTime());
				scheduledSurveyDate.setDate(baseTime.getDate() + day);
				var randomisedSurveyDate = new Date(scheduledSurveyDate.getTime() + randomTime);
				console.log(randomisedSurveyDate.toString());
				
				safeAddPartisipantDataToLocalStore(
					localStore,
					'notification_' + notificationCounter,
					localStore.participant_id + "_" + notificationCounter + "_" + randomisedSurveyDate
				);
				
				cordova.plugins.notification.local.schedule({
					id: notificationCounter,
					at: randomisedSurveyDate,
					text: infoMessages["survey_schedule_display_message"].message,
					title: infoMessages["survey_schedule_title_message"].message
				});
				
				surveyTimes.push(randomisedSurveyDate.getTime());
				notificationCounter++;
			}
		}
		localStore['survey_schedules_epoch'] = JSON.stringify(surveyTimes);
	},

	// This function forces participants to respond to an open-ended question if they have left it blank
	validateResponse: function(data) {
		var text = data.val();
		if (text === "") {
			return false;
		} else {
			return true;
		}
	},
};
