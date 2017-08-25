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

var branchingJakvaedar = [
	{
		"type":"mult1",
		"variableName": "8-1-jakvaedar-hugsanir",
		"questionPrompt": "Varðandi þessar jákvæðu hugsanir: Ég áttaði mig ekki á að ég væri byrjuð/byrjaður að hugsa svona.",
		"minResponse": 1 /*minimum numerical value of the scale or multiple choice option*/,
		"maxResponse": 7 /*maximum numerical value of the scale or multiple choice option*/,
		"labels": [
			{"label": "1 Mjög ósammála"},
			{"label": "2 Nokkuð ósammála"},
			{"label": "3 Aðeins ósammála"},
			{"label": "4 Hvorki né"},
			{"label": "5 Aðeins sammála"},
			{"label": "6 Nokkuð sammála"},
			{"label": "7 Mjög sammála"},
		],
	},
	{
		"type":"mult1",
		"variableName": "8-2-jakvaedar-hugsanir",
		"questionPrompt": "Varðandi þessar jákvæðu hugsanir: Ég byrjaði að hugsa svona án þess að ætla mér það.",
		"minResponse": 1 /*minimum numerical value of the scale or multiple choice option*/,
		"maxResponse": 7 /*maximum numerical value of the scale or multiple choice option*/,
		"labels": [
			{"label": "1 Mjög ósammála"},
			{"label": "2 Nokkuð ósammála"},
			{"label": "3 Aðeins ósammála"},
			{"label": "4 Hvorki né"},
			{"label": "5 Aðeins sammála"},
			{"label": "6 Nokkuð sammála"},
			{"label": "7 Mjög sammála"},
		],
	},
	{
		"type":"mult1",
		"variableName": "8-3-jakvaedar-hugsanir",
		"questionPrompt": "Varðandi þessar jákvæðu hugsanir: Þessi hugsunarháttur er dæmigerður fyrir mig í þessum kringumstæðum.",
		"minResponse": 1 /*minimum numerical value of the scale or multiple choice option*/,
		"maxResponse": 7 /*maximum numerical value of the scale or multiple choice option*/,
		"labels": [
			{"label": "1 Mjög ósammála"},
			{"label": "2 Nokkuð ósammála"},
			{"label": "3 Aðeins ósammála"},
			{"label": "4 Hvorki né"},
			{"label": "5 Aðeins sammála"},
			{"label": "6 Nokkuð sammála"},
			{"label": "7 Mjög sammála"},
		],
	}
]

var branchingNeikvaedar = [
	{
		"type":"mult1",
		"variableName": "9-1-neikvaedar-hugsanir",
		"questionPrompt": "Varðandi þessar neikvæðu hugsanir: Ég áttaði mig ekki á að ég væri byrjuð/byrjaður að hugsa svona.",
		"minResponse": 1 /*minimum numerical value of the scale or multiple choice option*/,
		"maxResponse": 7 /*maximum numerical value of the scale or multiple choice option*/,
		"labels": [
			{"label": "1 Mjög ósammála"},
			{"label": "2 Nokkuð ósammála"},
			{"label": "3 Aðeins ósammála"},
			{"label": "4 Hvorki né"},
			{"label": "5 Aðeins sammála"},
			{"label": "6 Nokkuð sammála"},
			{"label": "7 Mjög sammála"},
		],
	},
	{
		"type":"mult1",
		"variableName": "9-2-neikvaedar-hugsanir",
		"questionPrompt": "Varðandi þessar neikvæðu hugsanir: Ég byrjaði að hugsa svona án þess að ætla mér það.",
		"minResponse": 1 /*minimum numerical value of the scale or multiple choice option*/,
		"maxResponse": 7 /*maximum numerical value of the scale or multiple choice option*/,
		"labels": [
			{"label": "1 Mjög ósammála"},
			{"label": "2 Nokkuð ósammála"},
			{"label": "3 Aðeins ósammála"},
			{"label": "4 Hvorki né"},
			{"label": "5 Aðeins sammála"},
			{"label": "6 Nokkuð sammála"},
			{"label": "7 Mjög sammála"},
		],
	},
	{
		"type":"mult1",
		"variableName": "9-3-neikvaedar-hugsanir",
		"questionPrompt": "Varðandi þessar neikvæðu hugsanir: Þessi hugsunarháttur er dæmigerður fyrir mig í þessum kringumstæðum.",
		"minResponse": 1 /*minimum numerical value of the scale or multiple choice option*/,
		"maxResponse": 7 /*maximum numerical value of the scale or multiple choice option*/,
		"labels": [
			{"label": "1 Mjög ósammála"},
			{"label": "2 Nokkuð ósammála"},
			{"label": "3 Aðeins ósammála"},
			{"label": "4 Hvorki né"},
			{"label": "5 Aðeins sammála"},
			{"label": "6 Nokkuð sammála"},
			{"label": "7 Mjög sammála"},
		],
	}
]


/* surveyQuestion Model (This time, written in "JSON" format to interface more cleanly with Mustache) */
/* This is used to input the questions you would like to ask in your experience sampling questionnaire*/
var questionList = [
	// a "mult1" question is for multiple choice questions and for Likert-scale items that only contain 
	// positive values (including 0). Below is what a multiple choice question would look like
	{
		"type":"mult1",
		"variableName": "1-sakbitinn",
		"questionPrompt": "Hversu sakbitin(n) ertu núna?",
		"minResponse": 1 /*minimum numerical value of the scale or multiple choice option*/,
		"maxResponse": 5 /*maximum numerical value of the scale or multiple choice option*/,
		"labels": [
	        {"label": "1 Ekkert"},
	        {"label": "2 Aðeins"},
	        {"label": "3 Nokkuð"},
	        {"label": "4 Mikið"},
	        {"label": "5 Mjög mikið"}
        ]
	},
	{
		"type":"mult1",
		"variableName": "2-pirradur",
		"questionPrompt": "Hversu pirraður/pirruð ertu núna?",
		"minResponse": 1 /*minimum numerical value of the scale or multiple choice option*/,
		"maxResponse": 5 /*maximum numerical value of the scale or multiple choice option*/,
		"labels": [
			{"label": "1 Ekkert"},
			{"label": "2 Aðeins"},
			{"label": "3 Nokkuð"},
			{"label": "4 Mikið"},
			{"label": "5 Mjög mikið"}
		]
	},
	{
		"type":"mult1",
		"variableName": "3-kvidinn",
		"questionPrompt": "Hversu kvíðin(n) ertu núna?",
		"minResponse": 1 /*minimum numerical value of the scale or multiple choice option*/,
		"maxResponse": 5 /*maximum numerical value of the scale or multiple choice option*/,
		"labels": [
        	{"label": "1 Ekkert"},
			{"label": "2 Aðeins"},
			{"label": "3 Nokkuð"},
			{"label": "4 Mikið"},
			{"label": "5 Mjög mikið"}
		]
	},
	{
		"type":"mult1",
		"variableName": "4-spenntur",
		"questionPrompt": "Hversu uppspennt(ur) ertu núna?",
		"minResponse": 1 /*minimum numerical value of the scale or multiple choice option*/,
		"maxResponse": 5 /*maximum numerical value of the scale or multiple choice option*/,
		"labels": [
			{"label": "1 Ekkert"},
			{"label": "2 Aðeins"},
			{"label": "3 Nokkuð"},
			{"label": "4 Mikið"},
			{"label": "5 Mjög mikið"}
		]
	},
	{
		"type":"mult1",
		"variableName": "5-gladur",
		"questionPrompt": "Hversu glaður/glöð eða kát(ur) ertu núna?",
		"minResponse": 1 /*minimum numerical value of the scale or multiple choice option*/,
		"maxResponse": 5 /*maximum numerical value of the scale or multiple choice option*/,
		"labels": [
			{"label": "1 Ekkert"},
			{"label": "2 Aðeins"},
			{"label": "3 Nokkuð"},
			{"label": "4 Mikið"},
			{"label": "5 Mjög mikið"}
        ]
	},
	{
		"type":"mult1",
		"variableName": "6-ahugasamur",
		"questionPrompt": "Hversu áhugasamur/áhugasöm ertu núna?",
		"minResponse": 1 /*minimum numerical value of the scale or multiple choice option*/,
		"maxResponse": 5 /*maximum numerical value of the scale or multiple choice option*/,
		"labels": [
			{"label": "1 Ekkert"},
			{"label": "2 Aðeins"},
			{"label": "3 Nokkuð"},
			{"label": "4 Mikið"},
			{"label": "5 Mjög mikið"}
		]
	},
	{
		"type":"mult1",
		"variableName": "7-anaegdur",
		"questionPrompt": "Hversu ánægð/ánægður ertu núna?",
		"minResponse": 1 /*minimum numerical value of the scale or multiple choice option*/,
		"maxResponse": 5 /*maximum numerical value of the scale or multiple choice option*/,
		"labels": [
			{"label": "1 Ekkert"},
			{"label": "2 Aðeins"},
			{"label": "3 Nokkuð"},
			{"label": "4 Mikið"},
			{"label": "5 Mjög mikið"}
		]
	},
	// SPURNINGAR UM JÁKVÆÐAR HUGSANIR
	{
		"type":"mult1",
		"variableName": "8-jakvaedar-hugsanir",
		"questionPrompt": "Varstu með einhverjar jákvæðar hugsanir um sjálfa(n) þig, aðstæður þínar eða framtíð þína rétt fyrir áminninguna?",
		"minResponse": 1 /*minimum numerical value of the scale or multiple choice option*/,
		"maxResponse": 6 /*maximum numerical value of the scale or multiple choice option*/,
		"labels": [
			{"label": "1 Engar jákvæðar hugsanir"},
			{"label": "2 Örlítið jákvæðar"},
			{"label": "3 Dálítið jákvæðar"},
			{"label": "4 Nokkuð jákvæðar"},
			{"label": "5 Mikið jákvæðar"},
			{"label": "6 Mikið jákvæðar"}
		],
		"branching": {
			"2": branchingJakvaedar,
			"3": branchingJakvaedar,
			"4": branchingJakvaedar,
			"5": branchingJakvaedar,
			"6": branchingJakvaedar,
		}
	},
	// SPURNINGAR UM NEIKVÆÐAR HUGSANIR
	{
		"type":"mult1",
		"variableName": "9-neikvaedar-hugsanir",
		"questionPrompt": "Varstu með einhverjar neikvæðar hugsanir um sjálfa(n) þig, aðstæður þínar eða framtíð þína rétt fyrir áminninguna?",
		"minResponse": 1 /*minimum numerical value of the scale or multiple choice option*/,
		"maxResponse": 6 /*maximum numerical value of the scale or multiple choice option*/,
		"labels": [
			{"label": "1 Engar neikvæðar hugsanir"},
			{"label": "2 Örlítið neikvæðar"},
			{"label": "3 Dálítið neikvæðar"},
			{"label": "4 Nokkuð neikvæðar"},
			{"label": "5 Mikið neikvæðar"},
			{"label": "6 Mjög mikið neikvæðar"}
		],
		"branching": {
			"2": branchingNeikvaedar,
			"3": branchingNeikvaedar,
			"4": branchingNeikvaedar,
			"5": branchingNeikvaedar,
			"6": branchingNeikvaedar,
		}
	},
	// SPURNINGAR UM JÁKVÆÐA ATBURÐI
	{
		"type":"mult1",
		"variableName": "10-jakvaedir-atburdir",
		"questionPrompt": "Hefur einhver jákvæður atburður átt sér stað frá því síðast?",
		"minResponse": 1 /*minimum numerical value of the scale or multiple choice option*/,
		"maxResponse": 6 /*maximum numerical value of the scale or multiple choice option*/,
		"labels": [
			{"label": "1 Enginn jákvæður atburður"},
			{"label": "2 Örlítið jákvæður"},
			{"label": "3 Dálítið jákvæður"},
			{"label": "4 Nokkuð jákvæður"},
			{"label": "5 Mikið jákvæður"},
			{"label": "6 Mjög mikið jákvæður"}
		]
	},
	// SPURNINGAR UM NEIKVÆÐA ATBURÐI
	{
		"type":"mult1",
		"variableName": "11-neikvaedir-atburdir",
		"questionPrompt": "Hefur einhver jákvæður atburður átt sér stað frá því síðast?",
		"minResponse": 1 /*minimum numerical value of the scale or multiple choice option*/,
		"maxResponse": 6 /*maximum numerical value of the scale or multiple choice option*/,
		"labels": [
			{"label": "1 Enginn neikvæður atburður"},
			{"label": "2 Örlítið neikvæður"},
			{"label": "3 Dálítið neikvæður"},
			{"label": "4 Nokkuð neikvæður"},
			{"label": "5 Mikið neikvæður"},
			{"label": "6 Mjög mikið neikvæður"}
		]
	},
];
