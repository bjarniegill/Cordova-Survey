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
const SURVEY_DURATION_IN_DAYS = 1;
const SURVEYS_DONE_PER_DAY = 1;
// in days
const SURVEY_WAIT_PERIOD_BEFOR_START = 0;
// 24 hour format(int)
const SURVEY_START_HOUR = 3;
const SURVEY_START_MINUTE = 12;
const SURVEY_END_HOUR = 3;
const SURVEY_END_MINUTE = 13;
// To prevent surveys from overlaping due to the random
// factor, it might be a good idea to set a time buffer
// that reduces the chance of another survey starting before
// a previous has finished.
// minutes
const SURVEY_TIME_BUFFER = 0;
const SURVEY_TIME_ALLOWED_TO_ANSWER = 60;

// #######################
// Scheduling message text
// #######################
const SURVEY_SCHEDULE_TITLE_MESSAGE = "Daily Survey";
const SURVEY_SCHEDULE_DISPLAY_MESSAGE = "Time for your next Dialy Survey!";

// #####################
// Data storage settings
// #####################
const SURVEY_DATA_STORAGE_NAME = 'survey_data';

// ####################
// Data saving protocol
// ####################
// If you are using the google option, the type should be 'get'
// If you are using the server option, the type should be 'post'
const SURVEY_DATA_SAVE_PROTOCOL = 'get';
// Be aware that this url also needs to go into index.html in the top meta tag
const SURVEY_DATA_SAVE_URL = "https://script.google.com/macros/s/AKfycbze3LDQEa32kdodAUwHjMMp1HgAQTXjaYtGd6Bj7giFFjEyHkR_/exec";


// millisec
// 60000 = 1 min
// 4320000 = 72 min
// 86400000 = 1 day
