from os.path import join

from shared_parser_functions import (
	list_file_paths,
	datetime_now,
	read_data_from_file
)
import settings


def clean_data(data):
	if settings.REMOVE_NOTIFICATIONS_FROM_DATA:
		data = [line for line in data if not 'notification' in line[0]]
	if settings.REMOVE_UNDEFINED_FROM_DATA:
		data = [line for line in data if not 'undefined' in line[0] and not 'undefined' in line[1]]
	if settings.REMOVE_SURVEY_COMPLETED_FROM_DATA:
		data = [line for line in data if not 'completedSurvey' in line[0]]
	if settings.REMOVE_UNIQUE_KEY_FROM_DATA:
		data = [line for line in data if not 'uniqueKey' in line[0]]
	if settings.REMOVE_START_TIME_FROM_DATA:
		data = [line for line in data if not 'startTime' in line[0]]
	if settings.REMOVE_DUPLICATES_FROM_DATA:
		data = list(set(data))
	return data


def write_to_clean_data_file(data, file_path, now):
	file_name = now + ' ' + file_path.split('/')[-1].split('.')[0]
	file_path = join(settings.PATH_TO_CLEANED_DATA, file_name + settings.FILE_EXTENSION)
	clean_file = open(file_path, 'w+')
	for item in data:
		clean_file.write(','.join(item) + '\r\n')
	clean_file.close()


def do_it(now):
	file_path_list = list_file_paths(settings.PATH_TO_CSV_FILES)
	for file_path in file_path_list:
		data = read_data_from_file(file_path)
		cleaned_data = clean_data(data)
		write_to_clean_data_file(cleaned_data, file_path, now)

if __name__ == '__main__':
	now = datetime_now()
	do_it(now)
