// ###########################
// Time variables for schedule
// ###########################
const SURVEY_DURATION_IN_DAYS = 1;
const SURVEYS_DONE_PER_DAY = 1;
// in days
const SURVEY_WAIT_PERIOD_BEFOR_START = 0;
// 24 hour format(int)
const SURVEY_START_HOUR = 22;
const SURVEY_START_MINUTE = 35;
const SURVEY_END_HOUR = 22;
const SURVEY_END_MINUTE = 36;
// To prevent surveys from overlaping due to the random
// factor, it might be a good idea to set a time buffer
// that reduces the chance of another survey starting before
// a previous has finished.
// minutes
const SURVEY_TIME_BUFFER = 0;


// #######################
// Scheduling message text
// #######################
const SURVEY_SCHEDULE_TITLE_MESSAGE = "Daily Survey";
const SURVEY_SCHEDULE_DISPLAY_MESSAGE = "Time for your next Dialy Survey!";

// millisec
// 4320000 = 72 min
// 86400000 = 1 day
