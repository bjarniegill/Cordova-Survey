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

var groupAminningList = [
	{
		"type":"mult1",
		"variableName": "(11-13)-1-hugsanir-attasig",
		"questionPrompt": "Varðandi þessar hugsanir: Ég áttaði mig ekki á að ég væri byrjuð/byrjaður að hugsa svona.",
		"minResponse": 1 /*minimum numerical value of the scale or multiple choice option*/,
		"maxResponse": 7 /*maximum numerical value of the scale or multiple choice option*/,
		"labels": [
			{"label": "-3 Mjög ósammála"},
			{"label": "-2 Nokkuð ósammála"},
			{"label": "-1 Aðeins ósammála"},
			{"label": "0 Hvorki né"},
			{"label": "+1 Aðeins sammála"},
			{"label": "+2 Nokkuð sammála"},
			{"label": "+3 Mjög sammála"}
        ]
	},
	{
		"type":"mult1",
		"variableName": "(11-13)-2-hugsanir-skjotast",
		"questionPrompt": "Varðandi þessar hugsanir: Þær skutu upp í huga mér án þess að ég ætlaði mér það.",
		"minResponse": 1 /*minimum numerical value of the scale or multiple choice option*/,
		"maxResponse": 7 /*maximum numerical value of the scale or multiple choice option*/,
		"labels": [
			{"label": "-3 Mjög ósammála"},
			{"label": "-2 Nokkuð ósammála"},
			{"label": "-1 Aðeins ósammála"},
			{"label": "0 Hvorki né"},
			{"label": "+1 Aðeins sammála"},
			{"label": "+2 Nokkuð sammála"},
			{"label": "+3 Mjög sammála"}
        ]
	},
	{
		"type":"mult1",
		"variableName": "(11-13)-3-hugsanir-adstaedur",
		"questionPrompt": "Varðandi þessar hugsanir: Þessi hugsanaháttur er dæmigerður fyrir mig í þessum aðstæðum.",
		"minResponse": 1 /*minimum numerical value of the scale or multiple choice option*/,
		"maxResponse": 7 /*maximum numerical value of the scale or multiple choice option*/,
		"labels": [
			{"label": "-3 Mjög ósammála"},
			{"label": "-2 Nokkuð ósammála"},
			{"label": "-1 Aðeins ósammála"},
			{"label": "0 Hvorki né"},
			{"label": "+1 Aðeins sammála"},
			{"label": "+2 Nokkuð sammála"},
			{"label": "+3 Mjög sammála"}
        ]
	},
]

var branchingNeikvaedar = [
	{
		"type":"mult1",
		"variableName": "9-1-neikvaedar-hugsanir",
		"questionPrompt": "Varðandi þessar neikvæðu hugsanir: Ég áttaði mig ekki á að ég væri byrjuð/byrjaður að hugsa svona neikvætt.",
		"minResponse": 1 /*minimum numerical value of the scale or multiple choice option*/,
		"maxResponse": 7 /*maximum numerical value of the scale or multiple choice option*/,
		"labels": [
			{"label": "-3 Mjög ósammála"},
			{"label": "-2 Nokkuð ósammála"},
			{"label": "-1 Aðeins ósammála"},
			{"label": "0 Hvorki né"},
			{"label": "+1 Aðeins sammála"},
			{"label": "+2 Nokkuð sammála"},
			{"label": "+3 Mjög sammála"}
		],
	},
	{
		"type":"mult1",
		"variableName": "9-2-neikvaedar-hugsanir",
		"questionPrompt": "Varðandi þessar neikvæðu hugsanir: Neikvæðu hugsanirnar skutu upp í huga mér án þess að ég ætlaði mér það.",
		"minResponse": 1 /*minimum numerical value of the scale or multiple choice option*/,
		"maxResponse": 7 /*maximum numerical value of the scale or multiple choice option*/,
		"labels": [
			{"label": "-3 Mjög ósammála"},
			{"label": "-2 Nokkuð ósammála"},
			{"label": "-1 Aðeins ósammála"},
			{"label": "0 Hvorki né"},
			{"label": "+1 Aðeins sammála"},
			{"label": "+2 Nokkuð sammála"},
			{"label": "+3 Mjög sammála"}
		],
	},
	{
		"type":"mult1",
		"variableName": "9-3-neikvaedar-hugsanir",
		"questionPrompt": "Varðandi þessar neikvæðu hugsanir: Þessi neikvæði hugsanaháttur er dæmigerður fyrir mig í þessum aðstæðum.",
		"minResponse": 1 /*minimum numerical value of the scale or multiple choice option*/,
		"maxResponse": 7 /*maximum numerical value of the scale or multiple choice option*/,
		"labels": [
			{"label": "-3 Mjög ósammála"},
			{"label": "-2 Nokkuð ósammála"},
			{"label": "-1 Aðeins ósammála"},
			{"label": "0 Hvorki né"},
			{"label": "+1 Aðeins sammála"},
			{"label": "+2 Nokkuð sammála"},
			{"label": "+3 Mjög sammála"}
		],
	}
]


/* surveyQuestion Model (This time, written in "JSON" format to interface more cleanly with Mustache) */
/* This is used to input the questions you would like to ask in your experience sampling questionnaire*/
var questionList = [
	// a "mult1" question is for multiple choice questions and for Likert-scale items that only contain 
	// positive values.

	// SPURNINGAR UM LÍÐAN
	{
		"type":"mult1",
		"variableName": "1-dapur",
		"questionPrompt": "Hversu döpur/dapur eða niðurdregin(n) ertu núna?",
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
		"variableName": "2-sakbitinn",
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
		"variableName": "3-pirradur",
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
		"variableName": "4-kvidinn",
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
		"variableName": "5-uppspenntur",
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
		"variableName": "6-gladur",
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
		"variableName": "7-ahugasamur",
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
		"variableName": "8-anaegdur",
		"questionPrompt": "Hversu ánægð/ánægður ertu núna?",
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
	// SPURNINGAR UM NEIKVÆÐAR HUGSANIR
	{
		"type":"mult1",
		"variableName": "9-neikvaedar-hugsanir",
		"questionPrompt": "Hversu neikvæðar voru hugsanir þínar rétt fyrir áminninguna? ",
		"minResponse": 1 /*minimum numerical value of the scale or multiple choice option*/,
		"maxResponse": 5 /*maximum numerical value of the scale or multiple choice option*/,
		"labels": [
			{"label": "1 Alls ekki neikvæðar"},
			{"label": "2 Örlítið neikvæðar"},
			{"label": "3 Nokkuð neikvæðar"},
			{"label": "4 Töluvert neikvæðar"},
			{"label": "5 Mjög neikvæðar"}
		],
		"branching": {
			"2": branchingNeikvaedar,
			"3": branchingNeikvaedar,
			"4": branchingNeikvaedar,
			"5": branchingNeikvaedar,
		}
	},
	// SPURNINGAR UM JÁKVÆÐAR HUGSANIR
	{
		"type":"mult1",
		"variableName": "10-jakvaedir-hugsanir",
		"questionPrompt": "Hversu jákvæðar voru hugsanir þínar rétt fyrir áminninguna?",
		"minResponse": 1 /*minimum numerical value of the scale or multiple choice option*/,
		"maxResponse": 5 /*maximum numerical value of the scale or multiple choice option*/,
		"labels": [
			{"label": "1 Alls ekki jákvæðar"},
			{"label": "2 Örlítið jákvæðar"},
			{"label": "3 Nokkuð jákvæðar"},
			{"label": "4 Töluvert jákvæðar"},
			{"label": "5 Mjög jákvæðar"}
		]
	},
	// SPURNINGAR UM GRUFL
	{
		"type":"mult1",
		"variableName": "11-aminning-gladur",
		"questionPrompt": "Rétt fyrir áminninguna: Ég var að hugsa um hversu glaður/glöð eða dapur/döpur ég er.",
		"minResponse": 1 /*minimum numerical value of the scale or multiple choice option*/,
		"maxResponse": 7 /*maximum numerical value of the scale or multiple choice option*/,
		"labels": [
			{"label": "-3 Mjög ósammála"},
			{"label": "-2 Nokkuð ósammála"},
			{"label": "-1 Aðeins ósammála"},
			{"label": "0 Hvorki né"},
			{"label": "+1 Aðeins sammála"},
			{"label": "+2 Nokkuð sammála"},
			{"label": "+3 Mjög sammála"}
		],
	},
	{
		"type":"mult1",
		"variableName": "12-aminning-bregdast-vid",
		"questionPrompt": "Rétt fyrir áminninguna: Ég var að hugsa um hvers vegna ég skuli bregðast við eins og ég geri.",
		"minResponse": 1 /*minimum numerical value of the scale or multiple choice option*/,
		"maxResponse": 7 /*maximum numerical value of the scale or multiple choice option*/,
		"labels": [
			{"label": "-3 Mjög ósammála"},
			{"label": "-2 Nokkuð ósammála"},
			{"label": "-1 Aðeins ósammála"},
			{"label": "0 Hvorki né"},
			{"label": "+1 Aðeins sammála"},
			{"label": "+2 Nokkuð sammála"},
			{"label": "+3 Mjög sammála"}
		],
	},
	{
		"type":"mult1",
		"variableName": "13-aminning-lidan",
		"questionPrompt": "Rétt fyrir áminninguna: Ég var að hugsa um hvað það gæti þýtt að mér skuli líða svona.",
		"minResponse": 1 /*minimum numerical value of the scale or multiple choice option*/,
		"maxResponse": 7 /*maximum numerical value of the scale or multiple choice option*/,
		"labels": [
			{"label": "-3 Mjög ósammála"},
			{"label": "-2 Nokkuð ósammála"},
			{"label": "-1 Aðeins ósammála"},
			{"label": "0 Hvorki né"},
			{"label": "+1 Aðeins sammála"},
			{"label": "+2 Nokkuð sammála"},
			{"label": "+3 Mjög sammála"}
		],
	},
	{
		"type":"mult1",
		"variableName": "14-jakvaedur-atburdur",
		"questionPrompt": "Hefur einhver jákvæður atburður átt sér stað frá því síðast?",
		"minResponse": 1 /*minimum numerical value of the scale or multiple choice option*/,
		"maxResponse": 5 /*maximum numerical value of the scale or multiple choice option*/,
		"labels": [
			{"label": "1 Enginn jákvæður atburður"},
			{"label": "2 Örlítið jákvæður"},
			{"label": "3 Nokkuð jákvæður"},
			{"label": "4 Töluvert jákvæður"},
			{"label": "5 Mjög mikið jákvæður"},
		],
	},
	{
		"type":"mult1",
		"variableName": "15-neikvaedur-atburdur",
		"questionPrompt": "Hefur einhver neikvæður atburður átt sér stað frá því síðast?",
		"minResponse": 1 /*minimum numerical value of the scale or multiple choice option*/,
		"maxResponse": 5 /*maximum numerical value of the scale or multiple choice option*/,
		"labels": [
			{"label": "1 Enginn neikvæður atburður"},
			{"label": "2 Örlítið neikvæður"},
			{"label": "3 Nokkuð neikvæður"},
			{"label": "4 Töluvert neikvæður"},
			{"label": "5 Mjög neikvæður"},
		],
	},
];
