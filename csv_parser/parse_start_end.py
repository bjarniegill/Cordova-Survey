from os.path import isfile, join

from shared_parser_functions import (
	get_participant_id, 
	list_file_paths, 
	now,
	read_data_from_file
)

import settings


def count_start(data):
	return len([line for line in data if 'startTime' in line[0]])

def count_completed(data):
	return len([line for line in data if 'completed_completedSurvey' in line[0]])

def format_counter_data(start_counter, completed_counter, participant_id):
	start_data = '{},started,{}\r\n'.format(participant_id, start_counter)
	completed_data = '{},completed,{}\r\n'.format(participant_id, completed_counter)
	return start_data, completed_data

def write_counters_to_file(start_data, completed_data):
	file_name = now + ' start_completed_counter'
	file_path = join(settings.PATH_TO_START_COMPLETED_COUNTER, file_name + settings.FILE_EXTENSION)
	if isfile(file_path):
		counter_file = open(file_path, 'a')
	else:
		counter_file = open(file_path, 'w+')
	counter_file.write(start_data)
	counter_file.write(completed_data)
	counter_file.close()

def do_it(now):
	file_path_list = list_file_paths(settings.PATH_TO_CSV_FILES)
	for file_path in file_path_list:
		data = read_data_from_file(file_path)
		participant_id = get_participant_id(data)
		start_count = count_start(data)
		completed_count = count_completed(data)
		start_data, completed_data = format_counter_data(
			start_count, 
			completed_count, 
			participant_id
		)
		write_counters_to_file(start_data, completed_data)

if __name__ == '__main__':
	now = now()
	do_it(now)