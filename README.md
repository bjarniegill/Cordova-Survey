# Cordova-Survey
For setup and more details see http://www.experiencesampler.com/
This app([ExperienceSampler](https://github.com/sabrinathai/ExperienceSampler)) is based on the app created by [Sabrina Thai](https://github.com/sabrinathai). It has be partially rewritten


This app([ExperienceSampler](https://github.com/sabrinathai/ExperienceSampler)) is based on the app created by [Sabrina Thai](https://github.com/sabrinathai). It has been partially rewritten to reduce the amount of coding need to be able to get the app working.

### What has changed?
The app now has a [settings.js](https://github.com/bjarniegill/Cordova-Survey/blob/master/survey/www/js/settings.js) and a [questions.js](https://github.com/bjarniegill/Cordova-Survey/blob/master/survey/www/js/questions.js) file. Those files should be the only files that need to be changed in order to setup the app according the needs of the questionnaires.
There is no snooze. Participants have a fixed time frame to answer the questions.
Participants can exit the app and come back and continue answering the questions(if they are within the given time frame).

#### Randomized schedule(see settings file)
A survey can be broken up into x amount of days.
Each day has a time window in which the questions can be asked.
That time window can be broken into y amount of even sections.
Within a section there will be set a random time to schedule the app to ask the participant the questions.

### Setting up platform
Add platform:
```cordova platform add ios/android```
Remove platform:
```cordova platform remove ios/android```
Install plugins by executing the survey folder:
```bash add-plugins.sh```
