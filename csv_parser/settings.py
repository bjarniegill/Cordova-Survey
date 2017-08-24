import os

# Participant answer filtering.
# Customize this to filter you data.
# This should all be set to "True" unless you are running the "clean_data.py"
# then you can customize this as you see fit.
REMOVE_NOTIFICATIONS_FROM_DATA = True
REMOVE_DUPLICATES_FROM_DATA = True
REMOVE_UNDEFINED_FROM_DATA = True
REMOVE_SURVEY_COMPLETED_FROM_DATA = True
REMOVE_UNIQUE_KEY_FROM_DATA = True
REMOVE_START_TIME_FROM_DATA = True

# Paths to file folders
# If folder structure is not changed you should not have to edit this
CURRENT_DIRECTORY = os.path.dirname(__file__)
PATH_TO_CSV_FILES = os.path.join(CURRENT_DIRECTORY, 'put_csv_files_here')
PATH_TO_CLEANED_DATA = os.path.join(CURRENT_DIRECTORY, 'cleaned_data')
PATH_TO_LONG_FORMAT = os.path.join(CURRENT_DIRECTORY, 'long_format')
PATH_TO_MERGED_LONG_DATA = os.path.join(CURRENT_DIRECTORY, 'merged_long_format')
PATH_TO_START_COMPLETED_COUNTER = os.path.join(CURRENT_DIRECTORY, 'start_completed_counter')

FILE_EXTENSION = '.csv'
