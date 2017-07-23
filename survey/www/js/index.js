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
// questionList is imported from question.js
var surveyQuestions = questionList;

// These are the messages that are displayed at the end of the questionnaire
var lastPage = [
	// input your last-page message
	{
		message: "End of questionnaire message"
	},
	// input snooze last-page message
	{
		message: "Snooze message"
	}
];

// Populate the view with data from surveyQuestion model*/
// Making mustache templates
// This line determines the number of questions in your participant setup
// Shout-out to Rebecca Grunberg for this great feature!
var NUMSETUPQS = participantSetup.length;
// This line tells ExperienceSampler which question in surveyQuestions is the snooze question
// If you choose not to use the snooze option, just comment it out
var SNOOZEQ = 0;
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

	onResume: function() { app.sampleParticipant(); },

	onPause: function() { app.pauseEvents(); },

	// Initialize the whole thing
	init: function() {
		localStore.clear()
		// First, we assign a value to the unique key when we initialize ExperienceSampler
		uniqueKey = new Date().getTime();
		// The statement below states that if there is no participant id or if the participant id is left blank,
		// ExperienceSampler would present the participant set up questions
		if (localStore.participant_id === " " || !localStore.participant_id || localStore.participant_id == "undefined") {
			app.renderQuestion(-NUMSETUPQS);
			// ####################
			// CREATE SCHEDULE HERE
			// ####################
		}
		// otherwise ExperienceSampler should just save the unique key and display the first question in survey questions
		else {
			localStore.uniqueKey = uniqueKey;
			localStore[uniqueKey + "_" + "startTime"  + "_" + getDateString()] = 1;
			app.renderQuestion(0);
		}
		localStore.snoozed = 0;
	},

	// Beginning our app functions
	// The first function is used to specify how the app should display the various questions. You should note which questions
	// should be displayed using which formats before customizing this function
	renderQuestion: function(question_index) {
	/**
	 * Handles rendering question to the display.
	 * @param {Int} question_index: Number of a question in questionList.
	 * @param {Dict} questionDict: Stores a dictionary with questions.
	 */
		var question;
		if (question_index <= -1) {
			question = participantSetup[question_index + NUMSETUPQS];
		}
		else {
			question = surveyQuestions[question_index];
		}
		var questionPrompt = question.questionPrompt;
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
		// This section should be implemented if you choose to use a snooze feature
		// It tells ExperienceSampler that if the participant has chosen to snooze the app,
		// the app should save a snooze value of 1 (this value will be used to reset the unique key, so that
		// this data is does not have the same unique key as the subsequent questionnaire)
		/*if ( question_index == SNOOZEQ ) {
			app.snoozeNotif();
			localStore.snoozed = 1;
			app.saveData();
		}*/
		// If you choose to implement the snooze function, uncomment the else in the statement below
		/*else*/ if ( question_index == -1) {
			app.saveDataLastPage();
		}
		// This part of the code says that if the participant has completed the entire questionnaire,
		// ExperienceSampler should create a completed tag for it.
		// This tag will be used to count the number of completed questionnaires participants have completed
		// at the end of each day
		// The time stamp created here will also be used to create an end time for your restructured data
		else {
			localStore[uniqueKey + '.' + "completed" + "_" + "completedSurvey"  + "_" + getDateString()] = 1;
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
			//Create a unique identifier for this response
			currentQuestion = button.id.slice(0,-1);
		}
		// Record value of clicked button
		else if (type == 'mult2') {
			response = button.value;
			//Create a unique identifier for this response
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

		// ################################################################
		// Should return here and rest put into a "store response" function
		// ################################################################

		if (count <= -1) {
			uniqueRecord = currentQuestion
		}
		else {
			uniqueRecord = uniqueKey + "_" + currentQuestion + "_" + getDateString();
		}
		// Save this to local storage
		localStore[uniqueRecord] = response;

		// Question Logic Statements
		// Stage 3 of Customization
		// if your questionnaire has two branches based on the absence or presence of a phenomenon, you will need the next statement
		// this statement allows you to record whether the phenomenon was absent or present so you can specify which branch the participant should complete when
		// the questionnaire splits into the two branches
		// if not then you do not need the next statement and should leave it commented out
		//if (count == 0) {phenomenonPresence = response;}
		// if you have piped text, you would assign your response variable here
		// where X is the question index number of the question you ask for response you would like to pipe
		// In this example, we just use name to consist with our earlier variables
				//if (count ==6) {name = response;}
		if (count <= -1) {
			console.log(uniqueRecord);
		}
		//		//The line below states that if the app is on the last question of participant setup, it should schedule all the notifications
		//		//then display the default end of survey message, and then record which notifications have been scheduled.
		//		//You will test local notifications in Stage 4 of customizing the app
		if (count == -1) {
			app.scheduleNotifs();
			app.renderLastPage(lastPage[0], count);
			app.scheduledNotifs();
		}
		// Identify the next question to populate the view
		// the next statement is about the snooze function
		// This statement says that if the participant says they are currently unable to complete the questionnaire now,
		// the app will display the snooze end of survey message. You can customize the snooze function in Stage 4 of Customization
		else if (count == SNOOZEQ && response == 0) {
			app.renderLastPage(lastPage[1], count);
		}
		// The statement below tells the survey under what conditions should participants be shown one branch of the questionnaire as opposed to the other
		// Remember each question logic requires at least two lines of code
		// Replace X with the question number where the questionnaire splits into two branches
		// Replace Y with the response associated with the presence of the phenomenon and A with the number of the question participants should be presented with
		// Replace Z with the response associated with the absence of the phenomenon and B with the number of the question participants should be presented with
		// The code that preceded the app.renderQuestion function is just telling ExperienceSampler that the previous question should fade out
		// You can choose not implement this feature; however, we have made the question fade in feature a default function of ExperienceSampler (another shout-out to
		// to Rebecca Grunberg for the great idea), and it looks more aesthetically pleasing if the fade in is accompanied by a fade out
		// phenomenonPresence
		// ########
		// REFACTOR
		// ########
		else if (count == 6 & response < 10 && response == 2) {$("#question").fadeOut(400, function () {$("#question").html("");app.renderQuestion(10);});}
		else if (count == 6 & response < 10 && response == 1) {$("#question").fadeOut(400, function () {$("#question").html("");app.renderQuestion(7);});}
		else if (count == 10 & response < 10 && response == 2) {$("#question").fadeOut(400, function () {$("#question").html("");app.renderQuestion(14);});}
		else if (count == 10 & response < 10 && response == 1) {$("#question").fadeOut(400, function () {$("#question").html("");app.renderQuestion(11);});}
		else if (count == 14 & response < 10 && response == 2) {$("#question").fadeOut(400, function () {$("#question").html("");app.renderQuestion(16);});}
		else if (count == 14 & response < 10 && response == 1) {$("#question").fadeOut(400, function () {$("#question").html("");app.renderQuestion(15);});}
		else if (count == 16 & response < 10 && response == 2) {$("#question").fadeOut(400, function () {$("#question").html("");app.renderQuestion(18);});}
		else if (count == 16 & response < 10 && response == 1) {$("#question").fadeOut(400, function () {$("#question").html("");app.renderQuestion(17);});}
		// The next two statements illustrate the structure that all other question logic statements will follow
		// They are similar to the ones regarding the absence and presence of the phenomenon, except this time the critical condition is the response chosen
		// The first statement says if the question number is X and the response is less than Y, display question number Z
		// In that statement, replace X with the question number where the question logic occurs, Y with the specific response value that will trigger the question logic,
		// and Z with the question number that should be displayed if response Y is chosen
		// The second statement, says if the question number is X and the response is not equal to Y, display question number A
		// Remember that to do question logic for one question, you need to have AT LEAST two conditional statements about what to do if the trigger response is chosen, AND
		// what to do if the trigger response is NOT chosen.
		// else if (count == X && response == Y) {$("#question").fadeOut(400, function () {$("#question").html("");app.renderQuestion(Z);});}
		// else if (count == X && response !== Y) {$("#question").fadeOut(400, function () {$("#question").html("");app.renderQuestion(A);});}


		// Uncomment the "/*else*/" below only when customizing question logic (Stage 3), so that the app will just proceed to the next question in the JSON database
		// DO NOT uncomment the "/*else*/" below when testing whether questions are being displayed in the right format (Stage 1) OR if you have no question logic
		// in your questionnaire
		else if (count < surveyQuestions.length-1) {
			$("#question").fadeOut(400, function () {
				$("#question").html("");
				app.renderQuestion(count+1);
			});
		}
		else {
			app.renderLastPage(lastPage[0], count);
		};
	},

	// Prepare for Resume and Store Data
	// Time stamps the current moment to determine how to resume
	pauseEvents: function() {
		localStore.pause_time = new Date().getTime();
		localStore.uniqueKey = uniqueKey;
		app.saveData();
	},

	sampleParticipant: function() {
		var current_moment = new Date();
		var current_time = current_moment.getTime();
		// change X to the amount of time the participant is locked out of the app for in milliseconds
		// e.g., if you want to lock the participant out of the app for 10 minutes, replace X with 600000
		// If you don't have a snooze feature, remove the "|| localStore.snoozed == 1"
		if ((current_time - localStore.pause_time) > X || localStore.snoozed == 1) {
			uniqueKey = new Date().getTime();
			localStore.snoozed = 0;
			localStore[uniqueKey + "_" + "startTime"  + "_" + getDateString(uniqueKey)] = 1;
			app.renderQuestion(0);
		}
		else {
			uniqueKey = localStore.uniqueKey;
		}
		app.saveData();
	},

	// uncomment this function to test data saving function (Stage 2 of Customization)
	saveDataLastPage:function() {
		 $.ajax({
			// If you are using the google option, the type should be 'get'
			// If you are using the server option, the type should be 'post'
			type: 'get',
			url: 'https://script.google.com/macros/s/AKfycbxqiKfNSZxNAtQ0JJ2ujCqjZIOnSYiLMXOBOB82Y_ySxiqxWFLE/exec',
			data: localStore,
			crossDomain: true,
			success: function (result) {
				var pid = localStore.participant_id;
				var snoozed = localStore.snoozed;
				var uniqueKey = localStore.uniqueKey;
				var pause_time = localStore.pause_time;
				localStore.clear();
				localStore.participant_id = pid;
				localStore.snoozed = snoozed;
				localStore.uniqueKey = uniqueKey;
				localStore.pause_time = pause_time;
				$("#question").html("<h3>Your responses have been recorded. Thank you for completing this survey.</h3>");
			},

			error: function (request, error) {
				console.log(error);
				$("#question").html("<h3>Please try resending data. If problems persist, please contact the researchers (uoft.dailylifestudy@gmail.com).</h3><br><button>Resend data</button>");
				$("#question button").click(function () {app.saveDataLastPage();});
			}
		});
	},

	// Uncomment this function to test data saving function (Stage 2 of Customization)
	saveData:function() {
		$.ajax({
			// If you are using the google option, the type should be 'get'
			// If you are using the server option, the type should be 'post'
			type: 'get',
			url: 'https://script.google.com/macros/s/AKfycbxqiKfNSZxNAtQ0JJ2ujCqjZIOnSYiLMXOBOB82Y_ySxiqxWFLE/exec',
			data: localStore,
			crossDomain: true,
			success: function (result) {
				var pid = localStore.participant_id
				var snoozed = localStore.snoozed;
				var uniqueKey = localStore.uniqueKey;
				localStore.clear();
				localStore.participant_id = pid;
				localStore.snoozed = snoozed;
				localStore.uniqueKey = uniqueKey;
			},
			error: function (request, error) {console.log(error);}
		});
	},

	// Local Notifications Javascript
	// Stage 5 of Customization
	// This code is for a interval-contingent design where all participants answer the questionnaire at the same time
	// (i.e., not customized to their schedule)
	scheduleNotifs:function() {
	//	//Section 1 - Declaring necessary variables
	//	//need an interval variable,
		var interval;

		//var First_interval: 0 to 4 320 000; /*(number of milliseconds in 72 minutes)*/
		//var Second_interval = 4 380 000 to 8 640 000; /*(This selects a time 73 to 144 minutes after 10AM)*/
		//var Third_interval = 8 700 000 to 12 960 000; /*(This selects a time 145 to 216 minutes after 10AM)*/
		//var Fourth_interval = 13 020 000 to 17 280 000; /*(This selects a time 217 to 288 minutes after 10AM)*/
		//var Fifth_interval = 17 340 000 to 21 600 000; /*(This selects a time 289 to 360 minutes after 10AM)*/
		//var Sixth_interval = 21 660 000 to 25 920 000; /*(This selects a time 361 to 432 minutes after 10AM)*/
		//var Seventh_interval = 25 980 000 to 30 240 000; /*(This selects a time 433 to 504 minutes after 10AM)*/
		//var Eighth_interval = 30 300 000 to 34 560 000; /*(This selects a time 505 to 576 minutes after 10AM)*/
		//var Ninth_interval = 34 620 001 to 38 880 000; /*(This selects a time 577 to 648 minutes after 10AM)*/
		//var Tenth_interval = 38 940 000 to 43 200 000; /*(This selects a time 649 to 720 minutes after 10AM)*/

		var First_interval = random.nextInt(4320000 - 0 + 1) + 0; /*(number of milliseconds in 72 minutes)*/
		var Second_interval = random.nextInt(8640000 - 4380000 + 1) + 4380000; /*(This selects a time 73 to 144 minutes after 10AM)*/
		var Third_interval = random.nextInt(12960000 - 8700000 + 1) + 8700000; /*(This selects a time 145 to 216 minutes after 10AM)*/
		var Fourth_interval = random.nextInt(17280000 - 13020000 + 1) + 13020000; /*(This selects a time 217 to 288 minutes after 10AM)*/
		var Fifth_interval = random.nextInt(21600000 - 17340000 + 1) + 17340000; /*(This selects a time 289 to 360 minutes after 10AM)*/
		var Sixth_interval = random.nextInt(25920000 - 21660000 + 1) + 21660000; /*(This selects a time 361 to 432 minutes after 10AM)*/
		var Seventh_interval = random.nextInt(30240000 - 25980000 + 1) + 25980000; /*(This selects a time 433 to 504 minutes after 10AM)*/
		var Eighth_interval = random.nextInt(34560000 - 30300000 + 1) + 30300000; /*(This selects a time 505 to 576 minutes after 10AM)*/
		var Ninth_interval = random.nextInt(38880000 - 34620001 + 1) + 34620001; /*(This selects a time 577 to 648 minutes after 10AM)*/
		var Tenth_interval = random.nextInt(4320000 - 38940000 + 1) + 38940000; /*(This selects a time 649 to 720 minutes after 10AM)*/




		// a variable for the notification id
		var a, b, c, d, e, f, g, h, i, j;
		// one to represent each of new dates to be calculated for each signal
		var date1, date2, date3, date4, date5, date6, date7, date8, date9, date10;
		// Then you need a variable to represent the amount of time from now until the first signal
		var nextDiaryLag
		// Then you can declare any values that you might use more than once such as the number of milliseconds in a day
		var day = 86400000;
		// You'll also need to get time the app is being installed
		var now = new Date().getTime();
		// Now you can use the date object approach to set the time of the first signal
		// in this example, we will set it to 8PM
		var startDate = new Date();
		var startDay = startDate.getDate();
		var startTime = startDate.setDate((startDay+1), 10,0,0,0);
		// Now calculate the amount of time between installation time and the first signal
		nextDiaryLag = parseInt(startTime) - parseInt(now);

		// Section 2 to 5 go inside the for loop
		// Set X to the length of your experience sampling period (i.e., how many days you will
		// be collecting data from your participants)
		for (i = 0; i < 6; i++){

		// Section 2 - Calculate time intervals
		// For this design you just calculate how many milliseconds until the first signal and then add multiples of the
		// number of milliseconds in day to this so that it fires everyday of your experience sampling data collection period
		 interval = nextDiaryLag + day*i;
		// now convert this interval into a new date object that the plugin can use to schedule your notification
			date1 = new Date(now + interval);
			date2 = ("Second_interval_" + string(i+1)) + day*i; //gæti þetta virkað?
			date3 = Third_interval + day*i;
			date4 = Fourth_interval + day*i;
			date5 = Fifth_interval + day*i;
			date6 = Sixth_interval + day*i;
			date7 = Seventh_interval + day*i;
			date8 = Eighth_interval + day*i;
			date9 = Ninth_interval + day*i;
			date10 = Tenth_interval + day*i;

			//date1 = new Date(now + interval);
			//date2 = Second_interval + day*i;
			//date3 = Third_interval + day*i;
			//date4 = Fourth_interval + day*i;
			//date5 = Fifth_interval + day*i;
			//date6 = Sixth_interval + day*i;
			//date7 = Seventh_interval + day*i;
			//date8 = Eighth_interval + day*i;
			//date9 = Ninth_interval + day*i;
			//date10 = Tenth_interval + day*i;

			//Section 3 - Creating Unique Ids - create a unique notification id so notifications don't overwrite each other
			//set it to the counter value to ensure it is unique
			a = i;
			b = i;
			c = i;
			d = i;
			e = i;
			f = i;
			g = i;
			h = i;
			i = i;
			j = i;


			// Section 4 - Scheduling the notification
			// Now put all these properties into the scheduling function of the plugin
			cordova.plugins.notification.local.schedule({icon: 'ic_launcher', id: a, at: date1, text: 'Time for your next Diary Survey!', title: 'Daily Survey'});

			// Section 5 - Recording notifications
			// Now you want to record your notifications to make sure that they have been scheduled
			// You can also calculate response latencies if you with these values later if you want
			localStore['notification_' + a] = localStore.participant_id + "_" + a + "_" + date1;
		}
	},

	// This code is for signal-contingent designs with varying time intervals between notifications
	// scheduleNotifs:function() {
	// Section 1 - Declaring necessary variables
	// Declares the number of intervals between the notifications for each day (i.e., if beeping participants 6 times, declare 6 intervals)
	//var interval1, interval2, interval3, interval4, interval5, interval6, interval7, interval8, interval9, interval10;

	// Declares a variable to represent the id of each notification for the day
	// Declare as many letters as you have intervals (i.e., 6 intervals, declare 6 ids)
	//var a, b, c, d, e, f, g, h, i, j;

	// Declare a variable to represent new date to be calculated for each beep
	// That is, if there are 6 intervals, declare 6 new dates
	//var date1, date2, date3, date4, date5, date6, date7, date8, date9, date10;

	// The statement below declares the start and end time of the daily data collection period
	// These variables are not necessary if the start and end time of the daily data collection period do not vary across the experience
	// sampling data collection period
	//var currentMaxHour, currentMaxMinute, currentMinHour, currentMinMinute, nextMinHour, nextMinMinute;

	// The next three lines create variables for the present time when the notifications are being scheduled
	//var dateObject = new Date();
	//var now = dateObject.getTime();
	//var dayOfWeek = dateObject.getDay(), currentHour = dateObject.getHours(), currentMinute = dateObject.getMinutes();

	// The next variables represent the amount of time between the end of the data collection to the start of the next one (nightlyLag),
	// the interval between the scheduling time and the start of the first data collection period (currentLag), the maximum amount of time
	// in the data collection period (maxInterval), and the time between until the end of the next data collection period (in our case
	// dinner time; dinnerInterval)
	//var currentLag, maxInterval, dinnerInterval;

	// These represents the participants time values
	//var weekendDinnerTime = localStore.weekendDinnerTime.split(":");
	//var weekendWakeTime = localStore.weekendWakeTime.split(":");
	//var weekdayDinnerTime = localStore.weekdayDinnerTime.split(":");
	//var weekdayWakeTime = localStore.weekdayWakeTime.split(":");

	// Then you can declare any values that you might use more than once such as the number of milliseconds in a day
	//var day = 86400000;
	//var minDiaryLag = 6300000;
	//var randomDiaryLag = 1800000;
	//var minDiaryLagAfterDinner = 5400000;

	// This is a loop that repeats this block of codes for the number of days there are in the experience sampling period
	// Replace X with the number of days in the experience sampling period (e.g., collecting data for 7 days, replace X with 7)
	// Note that iOS apps can only have 64 unique notifications, so you should keep that in mind if you are collecting data
	// for more than longer periods of time
	//     for (i = 0; i < X; i++)
	//     {
	// 		//The code below (up to "else { nightlyLag = ...}" is only necessary if you allow the daily data collection period to vary across
	// 		//weekdays and weekends
	//         var alarmDay = dayOfWeek + 1 + i;
	//         if (alarmDay > 6) {alarmDay = alarmDay-7;}
	//         //enter time weekendDinnerTime hour and then enter weekendDinnerTime minute
	//    			if (alarmDay > 6) {alarmDay = alarmDay - 7;}
	//    			if (alarmDay == 0 || alarmDay == 6) {
	//    				currentMaxHour = weekendDinnerTime[0];
	//    				currentMaxMinutes = weekendDinnerTime[1];
	//    				currentMinHour = weekendWakeTime[0];
	//    				currentMinMinutes = weekendWakeTime[1];
	//    				if (alarmDay == 0) {
	//    					nextMinHour = weekdayWakeTime[0];
	//    					nextMinMinutes = weekdayWakeTime[1];
	//    				}
	//    				else {
	//    					nextMinHour = weekendWakeTime[0];
	//    					nextMinMinutes = weekendWakeTime[1];
	//    				}
	//    				currentLag = (((((24 - parseInt(currentHour) + parseInt(weekendWakeTime[0]))*60) - parseInt(currentMinute) + parseInt(weekendWakeTime[1]))*60)*1000);
	//
	//    			}
	//    			else {
	//    				currentMaxHour = weekdayDinnerTime[0];
	//    				currentMaxMinutes = weekdayDinnerTime[1];
	//    				currentMinHour = weekdayWakeTime[0];
	//    				currentMinMinutes = weekdayWakeTime[1];
	//    				if (alarmDay == 5) {
	//    					nextMinHour = weekendWakeTime[0];
	//    					nextMinMinutes = weekendWakeTime[1];
	//    				}
	//    				else {
	//    					nextMinHour = weekdayWakeTime[0];
	//    					nextMinMinutes = weekdayWakeTime[1];
	//    				}
	//                 currentLag = (((((24 - parseInt(currentHour) + parseInt(weekdayWakeTime[0]))*60) - parseInt(currentMinute) + parseInt(weekdayWakeTime[1]))*60)*1000);
	//    			}
	//    			if (alarmDay == 5 || alarmDay == 0) {nightlyLag = currentLag;}
	//    			else {
	//             	nightlyLag= (((((24 - parseInt(currentHour) + parseInt(nextMinHour))*60) - parseInt(currentMinute) + parseInt(nextMinMinutes))*60)*1000);
	//    			}

	//         //The maxInterval is the number of milliseconds between wakeup time and dinner time
	//         maxInterval = (((((parseInt(currentMaxHour) - parseInt(currentMinHour))*60) + parseInt(currentMaxMinute) - parseInt(currentMinMinute))*60)*1000);
	// 			//This part of the code calculates how much time there should be between the questionnaires
	// 			//Change X to the minimum amount of time that should elapse between beeps in seconds
	// 			//Change Y to the amount of additional time in seconds that should elapse to reach the maximum amount of time
	// 			//The part of the code that accompanies Y randomly generates a number that allows for notifications to occur randomly between X and X+Y after the previous beep
	// 			//That is, X + Y = maximum amount of time that can elapse between beeps
	//
	// 			//If designing an interval-based design, delete "Math.round(Math.random()*Y)+" and replace X with the amount of time in seconds between each beep
	//    			interval1 = parseInt(currentLag) + (parseInt(Math.round(Math.random()*randomDiaryLag)+minDiaryLag)) + day*i;
	//    			interval2 = interval1 + (parseInt(Math.round(Math.random()*randomDiaryLag)+minDiaryLag));
	//    			interval3 = interval2 + (parseInt(Math.round(Math.random()*randomDiaryLag)+minDiaryLag));
	//    			interval4 = interval3 + (parseInt(Math.round(Math.random()*randomDiaryLag)+minDiaryLag));
	//    			interval5 = interval4 + (parseInt(Math.round(Math.random()*randomDiaryLag)+minDiaryLag));
	//         		interval6 = interval5 + (parseInt(Math.round(Math.random()*randomDiaryLag)+minDiaryLag));

	//
	// 			//This part of the code calculates a unique ID for each notification
	//         a = 101+(parseInt(i)*100);
	//         b = 102+(parseInt(i)*100);
	//         c = 103+(parseInt(i)*100);
	//         d = 104+(parseInt(i)*100);
	//         e = 105+(parseInt(i)*100);
	//         f = 106+(parseInt(i)*100);

	//
	// 			//This part of the code calculates the time when the notification should be sent by adding the time interval to the current date and time
	//         date1 = new Date(now + interval1);
	//         date2 = new Date(now + interval2);
	//         date3 = new Date(now + interval3);
	//         date4 = new Date(now + interval4);
	//         date5 = new Date(now + interval5);
	//         date6 = new Date(now + interval6);

	//
	// 			//This part of the code schedules the notifications
	//         	cordova.plugins.notification.local.schedule([
	//         		{icon: 'ic_launcher', id: a, at: date1, text: 'Time for your next Diary Survey!', title: 'Diary Surveys'},
	//         		{icon: 'ic_launcher', id: b, at: date2, text: 'Time for your next Diary Survey!', title: 'Diary Surveys'},
	//         		{icon: 'ic_launcher', id: c, at: date3, text: 'Time for your next Diary Survey!', title: 'Diary Surveys'},
	//         		{icon: 'ic_launcher', id: d, at: date4, text: 'Time for your next Diary Survey!', title: 'Diary Surveys'},
	//         		{icon: 'ic_launcher', id: e, at: date5, text: 'Time for your next Diary Survey!', title: 'Diary Surveys'},
	//         		{icon: 'ic_launcher', id: f, at: date6, text: 'Time for your next Diary Survey!', title: 'Diary Surveys'}]);

	// 			//This part of the code records when the notifications are scheduled for and sends it to the server
	//         	localStore['notification_' + i + '_1'] = localStore.participant_id + "_" + a + "_" + date1;
	//         	localStore['notification_' + i + '_2'] = localStore.participant_id + "_" + b + "_" + date2;
	//         	localStore['notification_' + i + '_3'] = localStore.participant_id + "_" + c + "_" + date3;
	//         	localStore['notification_' + i + '_4'] = localStore.participant_id + "_" + d + "_" + date4;
	//         	localStore['notification_' + i + '_5'] = localStore.participant_id + "_" + e + "_" + date5;
	//         	localStore['notification_' + i + '_6'] = localStore.participant_id + "_" + f + "_" + date6;
	//     }
	// },

	// Stage 4 of Customization
	// Uncomment lines inside the snoozeNotif function to test the snooze scheduling notification function
	// Replace X with the number of seconds you want the app to snooze for (e.g., 10 minutes is 600 seconds)
	// You can also customize the Title of the message, the snooze message that appears in the notification
	snoozeNotif:function() {
	//     var now = new Date().getTime(), snoozeDate = new Date(now + X*1000);
	//     var id = '99';
	//     cordova.plugins.notification.local.schedule({
	//                                          icon: 'ic_launcher',
	//                                          id: id,
	//                                          title: 'Title of message',
	//                                          text: 'Snooze message',
	//                                          at: snoozeDate,
	//                                          });
	},
	// This function forces participants to respond to an open-ended question if they have left it blank
	validateResponse: function(data) {
		var text = data.val();
	//         console.log(text);
		if (text === "") {
			return false;
		} else {
			return true;
		}
	},
};
