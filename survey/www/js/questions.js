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

// Questions that will be asked during the setup
var participantSetupList = [
	{
		"type":"text",
		"variableName": "participant_id",
		"questionPrompt": "Please enter your participant ID:"
	}
];


// Questions that will be asked every time the a schedule is triggered
var questionList = [
	/*number each question in this variable starting from 0, so it is easy to reference question items when setting up question logic*/
	/*0*/
	/*snooze question, where selecting "No" snoozes the app for a predetermined amount of time*/
	/*this is a multiple choice question*/
	{
		"type":"mult1",
		"variableName": "Stúrinn",
		"questionPrompt": "Ertu eitthvað stúrinn?",
		"minResponse": 1,
		"maxResponse": 2,
		"labels": [
			{"label": "Yes"},
			{"label": "No"}
		],
		"branching": {
			"1": [
				{
					"type":"mult1",
					"variableName": "bommadur",
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
				{
					"type":"mult1",
					"variableName": "wazzup",
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
			]
		}
	},
	// SPURNINGAR UM LÍÐAN
	/*1*/
	/*a "mult1" question is for multiple choice questions and for Likert-scale items that only contain 
	positive values (including 0). Below is what a multiple choice question would look like*/
	{
		"type":"mult1",
		"variableName": "sad",
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
	/*2*/
	/*a "mult1" question is for multiple choice questions and for Likert-scale items that only contain
	positive values (including 0). Below is what a multiple choice question would look like*/
	{
		"type":"mult1",
		"variableName": "anx",
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
	/*3*/
	/*a "mult1" question is for multiple choice questions and for Likert-scale items that only contain
	positive values (including 0). Below is what a multiple choice question would look like*/
	{
		"type":"mult1",
		"variableName": "glad",
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
		"branching": {
			"2": [
				{
					"type":"mult1",
					"variableName": "glad max",
					"questionPrompt": "Hversu glaður ertu?",
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
				{
					"type":"mult1",
					"variableName": "glad min",
					"questionPrompt": "Hversu lítið glaður ertu?",
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
			]
		}
	},
	/*4*/
	/*a "mult1" question is for multiple choice questions and for Likert-scale items that only contain
	positive values (including 0). Below is what a multiple choice question would look like*/
	{
		"type":"mult1",
		"variableName": "tight",
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
