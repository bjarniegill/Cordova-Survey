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

// ###########################
// Time variables for schedule
// ###########################
// For how many days should the survey last
const SURVEY_DURATION_IN_DAYS = 6;
// How many times a day should a participant be asked
const SURVEYS_DONE_PER_DAY = 10;
// After the setup is finish, how many days should 
// the app wait until starting the survey?
const SURVEY_WAIT_PERIOD_BEFOR_START = 1;
// The time frame to ask questions each day
// 24 hour format(integer, no leading zero)
const SURVEY_START_HOUR = 10;
const SURVEY_START_MINUTE = 0;
const SURVEY_END_HOUR = 22;
const SURVEY_END_MINUTE = 0;
// Shorten the time frame that the survey schedule can be created on(each interval per day)
// To prevent surveys from overlaping due to the random
// factor, it might be a good idea to set a time buffer
// that reduces the chance of another survey starting before
// a previous has finished.
// minutes
const SURVEY_TIME_BUFFER = 0;
// How many minutes does the participant have to finish each survey
const SURVEY_TIME_ALLOWED_TO_ANSWER = 15;

// ####################
// Data saving protocol
// ####################
// If you are using the google option, the type should be 'get'
// If you are using the server option, the type should be 'post'
const SURVEY_DATA_SAVE_PROTOCOL = 'get';
// URL to the google script
// **BE AWARE** that this url also needs to go into index.html in the top meta tag
const SURVEY_DATA_SAVE_URL = "https://script.google.com/macros/s/AKfycbxWy25vHz2W7caorDOVEV1xbaWM2TGKWyuIVn72uBXUTRAGF_c/exec";

// #########################
// Messages to user from app
// #########################
var appMessages = {
	// Displayed when user has answered all questions
	"questions_finished": { message: "Könnun lokið." },
	// Displayed when cannot answer any questions
	"no_questions": { message: "Engar nýjar snjallsímakannanir hafa borist eða tíminn til að svara síðustu könnun hefur runnið út. Vertu vakandi fyrir næstu!" },
	// Displayed when data is sent successfully
	"save_success": { message: "Svör þín hafa verið skráð. Takk fyrir að svara." },
	// Displayed when data send fails
	"save_fail": { message: "Ekki tókst að senda svör þín. Vinsamlegst reyndu að senda aftur. Ef þessi skilaboð koma endurtekið upp látið okkur vita í gegnum netfangið khh17@hi.is" },
	// Text for the "resend data" button
	"resend_button": { message: "Endursenda gögn" },
	// Title of the scheduling messaga that is displayed to the user
	"survey_schedule_title_message": { message: "Rannsókn"},
	// body of the scheduling message that is displayed to the user
	"survey_schedule_display_message": { message: "Kominn tími á næstu snjallsímakönnun!"}
};


// #### Variables below this line moste likely dont need to be changed ####

// #####################
// Data storage settings
// #####################
const SURVEY_DATA_STORAGE_NAME = 'survey_data';
