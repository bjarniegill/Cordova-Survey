from datetime import datetime
from os.path import isfile, join
import sys

from clean_data import clean_data, write_to_clean_data_file
from shared_parser_functions import (
	get_and_remove_participant_id_from_data,
	list_file_paths,
	datetime_now,
	read_data_from_file
)
from notification_service import SurveyNumberToIdMatcher

import settings


def reconstruct_data_in_long_format(data):
	participant_id = get_and_remove_participant_id_from_data(data)
	long_format = list()
	for question, answer in data:
		split_question = question.split('_')
		survey_unique_key = split_question[0]
		try:
			question_name = split_question[1]
		except Exception as e:
			print "There is likely that a part of the field is missing from the following data:"
			print answer
			sys.exit()
		date_int_list = [int(item) for item in split_question[2:-1]]
		# This is due to JavaScript counting months from zero
		date_int_list[1] += 1
		date = datetime(*date_int_list)
		long_format.append([participant_id, survey_unique_key, question_name, answer, date])

	sorted_long_format = sorted(long_format, key=lambda tup: tup[4])
	return sorted_long_format


def write_to_long_format_file(data, now):
	file_name = now + ' ' + data[0][0]
	file_path = join(settings.PATH_TO_LONG_FORMAT, file_name + settings.FILE_EXTENSION)
	long_file = open(file_path, 'w+')
	output_data = ''
	for item in data:
		item[4] = str(item[4])
		str_formatted = '{}{}'.format(','.join(item), '\r\n')
		output_data += str_formatted
		long_file.write(str_formatted)
	long_file.close()
	return output_data


def write_to_merge_file(data, now):
	file_name = now + ' merged_data'
	file_path = join(settings.PATH_TO_MERGED_LONG_DATA, file_name + settings.FILE_EXTENSION)
	if isfile(file_path):
		merge_file = open(file_path, 'a')
	else:
		merge_file = open(file_path, 'w+')
	merge_file.write(data)
	merge_file.close()


def do_it(now):
	file_path_list = list_file_paths(settings.PATH_TO_CSV_FILES)
	for file_path in file_path_list:
		sys.stdout.write('.')
		sys.stdout.flush()
		data = read_data_from_file(file_path)
		cleaned_data = clean_data(data)
		write_to_clean_data_file(cleaned_data, file_path, now)
		long_format_data = reconstruct_data_in_long_format(cleaned_data)
		try:
			survey_matcher = SurveyNumberToIdMatcher()
			survey_matcher.get_notifications_from_data(data)
			updated_long_format_data = survey_matcher.updated_answers_with_survey_number(long_format_data)
			output_data = write_to_long_format_file(updated_long_format_data, now)
		except ValueError as e:
			print ''
			print e.message
			print file_path
			output_data = write_to_long_format_file(long_format_data, now)
		write_to_merge_file(output_data, now)


if __name__ == '__main__':
	now = datetime_now()
	do_it(now)
