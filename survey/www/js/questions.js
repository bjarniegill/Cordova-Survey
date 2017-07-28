/*
	Question branching setup example.
	example of a key: 2:1_1
	first number: number of question
	second number: value of answer from question
	third number: value of branch answer

	var exampleBranching = {
		"2:1: {
			"type":"text",
			"variableName": "participant_id",
			"questionPrompt": "Please enter your participant ID:"
		},
		if branched question is answered with 1 then this question will be triggered
		"2:1_1: {
			"type":"text",
			"variableName": "participant_id",
			"questionPrompt": "Please enter your participant ID:"
		}
	}
*/
var questionBranchingList = {
	"2:1": {
		"type":"mult1",
		"variableName": "Seventeen",
		"questionPrompt": "Ertu eitthvað bömmaður?",
		"minResponse": 1 /*minimum numerical value of the scale or multiple choice option*/,
		"maxResponse": 5 /*maximum numerical value of the scale or multiple choice option*/,
		"labels": [
			{"label": "1 Örlítið"},
			{"label": "2 Dálítið"},
			{"label": "3 Nokkuð"},
			{"label": "4 Mikið"},
			{"label": "5 Mjög mikið"}
		],
	},
	"2:1_1": {
		"type":"mult1",
		"variableName": "Seventeen",
		"questionPrompt": "Wazzap dog?",
		"minResponse": 1 /*minimum numerical value of the scale or multiple choice option*/,
		"maxResponse": 5 /*maximum numerical value of the scale or multiple choice option*/,
		"labels": [
			{"label": "1 Örlítið"},
			{"label": "2 Dálítið"},
			{"label": "3 Nokkuð"},
			{"label": "4 Mikið"},
			{"label": "5 Mjög mikið"}
		],
	}

};

// Questions to set up participant notifications so that notifications are customized to participant's schedule
var participantSetupList = [
	{
		"type":"text",
		"variableName": "participant_id",
		"questionPrompt": "Please enter your participant ID:"
	}
];

var questionList = [
	/*number each question in this variable starting from 0, so it is easy to reference question items when setting up question logic*/
	/*0*/
	/*snooze question, where selecting "No" snoozes the app for a predetermined amount of time*/
	/*this is a multiple choice question*/
	{
		"type":"mult1",
		"variableName": "snooze",
		"questionPrompt": "Are you able to take the survey now?",
		"minResponse": 0,
		"maxResponse": 1,
		"labels": [
	        {"label": "No"},
	        {"label": "Yes"}
        ],
	},
	/*1*/
	/*"instructions" or descriptive texts only need 3 properties. You simply need to type in your instructions
	or descriptive texts in the questionPrompt section*/
	{
		"type":"instructions",
		"variableName": "One",
		"questionPrompt": "Hér koma stuttar leiðbeiningar",
	},
	// SPURNINGAR UM LÍÐAN
	/*2*/
	/*a "mult1" question is for multiple choice questions and for Likert-scale items that only contain 
	positive values (including 0). Below is what a multiple choice question would look like*/
	{
		"type":"mult1",
		"variableName": "Two",
		"questionPrompt": "Hversu döpur/dapur eða niðurdregin(n) ertu núna?",
		"minResponse": 1 /*minimum numerical value of the scale or multiple choice option*/,
		"maxResponse": 5 /*maximum numerical value of the scale or multiple choice option*/,
		"labels": [
	        {"label": "1 Ekkert"},
	        {"label": "2 Aðeins"},
	        {"label": "3 Nokkuð"},
	        {"label": "4 Mikið"},
	        {"label": "5 Mjög mikið"}
        ],
	},
	/*3*/
	/*a "mult1" question is for multiple choice questions and for Likert-scale items that only contain
	positive values (including 0). Below is what a multiple choice question would look like*/
	{
		"type":"mult1",
		"variableName": "Three",
		"questionPrompt": "Hversu kvíðin(n) ertu núna?",
		"minResponse": 1 /*minimum numerical value of the scale or multiple choice option*/,
		"maxResponse": 5 /*maximum numerical value of the scale or multiple choice option*/,
		"labels": [
			{"label": "1 Ekkert"},
			{"label": "2 Aðeins"},
			{"label": "3 Nokkuð"},
			{"label": "4 Mikið"},
			{"label": "5 Mjög mikið"}
		],
	}
]

/* surveyQuestion Model (This time, written in "JSON" format to interface more cleanly with Mustache) */
/* This is used to input the questions you would like to ask in your experience sampling questionnaire*/
var questionList_1 = [
	/*number each question in this variable starting from 0, so it is easy to reference question items when setting up question logic*/
	/*0*/
	/*snooze question, where selecting "No" snoozes the app for a predetermined amount of time*/
	/*this is a multiple choice question*/
	{
		"type":"mult1",
		"variableName": "snooze",
		"questionPrompt": "Are you able to take the survey now?",
		"minResponse": 0,
		"maxResponse": 1,
		"labels": [
	        {"label": "No"},
	        {"label": "Yes"}
        ],
	},
	/*1*/
	/*"instructions" or descriptive texts only need 3 properties. You simply need to type in your instructions
	or descriptive texts in the questionPrompt section*/
	{
		"type":"instructions",
		"variableName": "One",
		"questionPrompt": "Hér koma stuttar leiðbeiningar",
	},
	// SPURNINGAR UM LÍÐAN
	/*2*/
	/*a "mult1" question is for multiple choice questions and for Likert-scale items that only contain 
	positive values (including 0). Below is what a multiple choice question would look like*/
	{
		"type":"mult1",
		"variableName": "Two",
		"questionPrompt": "Hversu döpur/dapur eða niðurdregin(n) ertu núna?",
		"minResponse": 1 /*minimum numerical value of the scale or multiple choice option*/,
		"maxResponse": 5 /*maximum numerical value of the scale or multiple choice option*/,
		"labels": [
	        {"label": "1 Ekkert"},
	        {"label": "2 Aðeins"},
	        {"label": "3 Nokkuð"},
	        {"label": "4 Mikið"},
	        {"label": "5 Mjög mikið"}
        ],
	},
	/*3*/
	/*a "mult1" question is for multiple choice questions and for Likert-scale items that only contain
	positive values (including 0). Below is what a multiple choice question would look like*/
	{
		"type":"mult1",
		"variableName": "Three",
		"questionPrompt": "Hversu kvíðin(n) ertu núna?",
		"minResponse": 1 /*minimum numerical value of the scale or multiple choice option*/,
		"maxResponse": 5 /*maximum numerical value of the scale or multiple choice option*/,
		"labels": [
			{"label": "1 Ekkert"},
			{"label": "2 Aðeins"},
			{"label": "3 Nokkuð"},
			{"label": "4 Mikið"},
			{"label": "5 Mjög mikið"}
		],
	},
	/*4*/
	/*a "mult1" question is for multiple choice questions and for Likert-scale items that only contain
	positive values (including 0). Below is what a multiple choice question would look like*/
	{
		"type":"mult1",
		"variableName": "Four",
		"questionPrompt": "Hversu glaður/glöð eða kát(ur) ertu núna?",
		"minResponse": 1 /*minimum numerical value of the scale or multiple choice option*/,
		"maxResponse": 5 /*maximum numerical value of the scale or multiple choice option*/,
		"labels": [
        	{"label": "1 Ekkert"},
			{"label": "2 Aðeins"},
			{"label": "3 Nokkuð"},
			{"label": "4 Mikið"},
			{"label": "5 Mjög mikið"}
		],
	},
	/*5*/
	/*a "mult1" question is for multiple choice questions and for Likert-scale items that only contain
	positive values (including 0). Below is what a multiple choice question would look like*/
	{
		"type":"mult1",
		"variableName": "Five",
		"questionPrompt": "Hversu uppspennt(ur) ertu núna?",
		"minResponse": 1 /*minimum numerical value of the scale or multiple choice option*/,
		"maxResponse": 5 /*maximum numerical value of the scale or multiple choice option*/,
		"labels": [
			{"label": "1 Ekkert"},
			{"label": "2 Aðeins"},
			{"label": "3 Nokkuð"},
			{"label": "4 Mikið"},
			{"label": "5 Mjög mikið"}
		],
	},
	/*6*/
	{
		"type":"mult1",
		"variableName": "Six",
		"questionPrompt": "Varstu með einhverjar neikvæðar hugsanir um sjálfa(n) þig eða framtíð þína rétt fyrir áminninguna?",
		"minResponse": 1 /*minimum numerical value of the scale or multiple choice option*/,
		"maxResponse": 2 /*maximum numerical value of the scale or multiple choice option*/,
		"labels": [
			{"label": "Já"},
			{"label": "Nei"}
        ],
	},
	/*7*/
	{
		"type":"mult1",
		"variableName": "Seven",
		"questionPrompt": "Hversu neikvæðar voru þessar hugsanir?",
		"minResponse": 1 /*minimum numerical value of the scale or multiple choice option*/,
		"maxResponse": 5 /*maximum numerical value of the scale or multiple choice option*/,
		"labels": [
			{"label": "1 Örlítið"},
			{"label": "2 Dálítið"},
			{"label": "3 Nokkuð"},
			{"label": "4 Mikið"},
			{"label": "5 Mjög mikið"}
		],
	},
	/*8*/
	{
		"type":"mult1",
		"variableName": "Eight",
		"questionPrompt": "Ég áttaði mig ekki á að ég væri byrjuð/byrjaður að hugsa svona",
		"minResponse": 1 /*minimum numerical value of the scale or multiple choice option*/,
		"maxResponse": 7 /*maximum numerical value of the scale or multiple choice option*/,
		"labels": [
			{"label": "1 Mjög ósammála"},
			{"label": "2 Nokkuð ósammála "},
			{"label": "3 Aðeins ósammála"},
			{"label": "4 Hvorki né"},
			{"label": "5 Aðeins sammála"},
			{"label": "6 Nokkuð sammála"},
			{"label": "7 Mjög sammála"}
		],
	},
	/*9*/
	{
		"type":"mult1",
		"variableName": "Nine",
		"questionPrompt": "Ég byrjaði að hugsa svona án þess að ætla mér það",
		"minResponse": 1 /*minimum numerical value of the scale or multiple choice option*/,
		"maxResponse": 7 /*maximum numerical value of the scale or multiple choice option*/,
		"labels": [
			{"label": "1 Mjög ósammála"},
			{"label": "2 Nokkuð ósammála "},
			{"label": "3 Aðeins ósammála"},
			{"label": "4 Hvorki né"},
			{"label": "5 Aðeins sammála"},
			{"label": "6 Nokkuð sammála"},
			{"label": "7 Mjög sammála"}
		],
	},
	//SPURNINGAR UM JÁKVÆÐAR HUGSANIR
	/*10*/
	{
		"type":"mult1",
		"variableName": "Ten",
		"questionPrompt": "Varstu með einhverjar jákvæðar hugsanir um sjálfa(n) þig eða framtíð þína rétt fyrir áminninguna?",
		"minResponse": 1 /*minimum numerical value of the scale or multiple choice option*/,
		"maxResponse": 2 /*maximum numerical value of the scale or multiple choice option*/,
		"labels": [
			{"label": "Já"},
			{"label": "Nei"}
		],
	},
	/*11*/
	{
		"type":"mult1",
		"variableName": "Eleven",
		"questionPrompt": "Hversu jákvæðar voru þessar hugsanir?",
		"minResponse": 1 /*minimum numerical value of the scale or multiple choice option*/,
		"maxResponse": 5 /*maximum numerical value of the scale or multiple choice option*/,
		"labels": [
			{"label": "1 Örlítið"},
			{"label": "2 Dálítið"},
			{"label": "3 Nokkuð"},
			{"label": "4 Mikið"},
			{"label": "5 Mjög mikið"}
		],
	},
	/*12*/
	{
		"type":"mult1",
		"variableName": "Twelve",
		"questionPrompt": "Ég áttaði mig ekki á að ég væri byrjuð/byrjaður að hugsa svona",
		"minResponse": 1 /*minimum numerical value of the scale or multiple choice option*/,
		"maxResponse": 7 /*maximum numerical value of the scale or multiple choice option*/,
		"labels": [
			{"label": "1 Mjög ósammála"},
			{"label": "2 Nokkuð ósammála "},
			{"label": "3 Aðeins ósammála"},
			{"label": "4 Hvorki né"},
			{"label": "5 Aðeins sammála"},
			{"label": "6 Nokkuð sammála"},
			{"label": "7 Mjög sammála"}
		],
	},
	/*13*/
	{
		"type":"mult1",
		"variableName": "Thirteen",
		"questionPrompt": "Ég byrjaði að hugsa svona án þess að ætla mér það",
		"minResponse": 1 /*minimum numerical value of the scale or multiple choice option*/,
		"maxResponse": 7 /*maximum numerical value of the scale or multiple choice option*/,
		"labels": [
			{"label": "1 Mjög ósammála"},
			{"label": "2 Nokkuð ósammála "},
			{"label": "3 Aðeins ósammála"},
			{"label": "4 Hvorki né"},
			{"label": "5 Aðeins sammála"},
			{"label": "6 Nokkuð sammála"},
			{"label": "7 Mjög sammála"}
		],
	},
	//SPURNINGAR UM JÁKVÆÐA ATBURÐI
	/*14*/
	{
		"type":"mult1",
		"variableName": "Fourteen",
		"questionPrompt": "Hefur einhver jákvæður atburður átt sér stað frá því síðast?",
		"minResponse": 1 /*minimum numerical value of the scale or multiple choice option*/,
		"maxResponse": 2 /*maximum numerical value of the scale or multiple choice option*/,
		"labels": [
			{"label": "Já"},
			{"label": "Nei"}
		],
	},
	/*15*/
	{
		"type":"mult1",
		"variableName": "Fifteen",
		"questionPrompt": "Hversu jákvæður fannst þér atburðurinn vera?",
		"minResponse": 1 /*minimum numerical value of the scale or multiple choice option*/,
		"maxResponse": 5 /*maximum numerical value of the scale or multiple choice option*/,
		"labels": [
			{"label": "1 Örlítið"},
			{"label": "2 Dálítið"},
			{"label": "3 Nokkuð"},
			{"label": "4 Mikið"},
			{"label": "5 Mjög mikið"}
		],
	},
	//SPURNINGAR UM NEIKVÆÐA ATBURÐI
	/*16*/
	{
		"type":"mult1",
		"variableName": "sixteen",
		"questionPrompt": "Hefur einhver neikvæður atburður átt sér stað frá því síðast?",
		"minResponse": 1 /*minimum numerical value of the scale or multiple choice option*/,
		"maxResponse": 2 /*maximum numerical value of the scale or multiple choice option*/,
		"labels": [
			{"label": "Já"},
			{"label": "Nei"}
		],
	},
	/*17*/
	{
		"type":"mult1",
		"variableName": "Seventeen",
		"questionPrompt": "Hversu neikvæður fannst þér atburðurinn vera?",
		"minResponse": 1 /*minimum numerical value of the scale or multiple choice option*/,
		"maxResponse": 5 /*maximum numerical value of the scale or multiple choice option*/,
		"labels": [
			{"label": "1 Örlítið"},
			{"label": "2 Dálítið"},
			{"label": "3 Nokkuð"},
			{"label": "4 Mikið"},
			{"label": "5 Mjög mikið"}
		],
	},
	/*18*/

	{
		"type":"instructions",
		"variableName": "Eighteen",
		"questionPrompt": "Hér koma þakkarorð",
	},
	/*input additional questions*/
];
