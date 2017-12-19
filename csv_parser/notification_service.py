from datetime import datetime, timedelta


class SurveyNumberToIdMatcher(object):

    def __init__(self):
        self.notification_matcher = dict()
        self.unique_answer_uids = []
        self.notification_number_date_list = []
        self.current_survey_number = None
        self.current_survey_id = None

    def get_notifications_from_data(self, data):
        notification_list = []
        for item in data:
            if item[0].startswith("notification"):
                notification_list.append(item)

        if not notification_list:
            raise ValueError('No notifications present in file:')

        self.extract_notification_number_and_date(notification_list)

    def datetime_string_to_datetime(self, date):
        parsed_date = str.join(' ', date.split(' ')[1:5])
        return datetime.strptime(parsed_date, "%b %d %Y %H:%M:%S")

    def extract_notification_number_and_date(self, notification_list):
        unsorted_notification_id_date_list = []
        for item in notification_list:
            split_notification_info = item[1].split('_')
            notification_number = split_notification_info[1]
            notification_date = split_notification_info[2]
            unsorted_notification_id_date_list.append(
                (notification_number,
                 self.datetime_string_to_datetime(notification_date))
            )
        self.notification_number_date_list = sorted(
            unsorted_notification_id_date_list, key=lambda tup: int(tup[0])
        )

    def extract_answer_information(self, answers):
        uid_list = [answer[1] for answer in answers]
        self.unique_answer_uids = list(set(uid_list))

    def generate_matcher_data(self):
        self.notification_matcher = dict()
        for answer_uid in self.unique_answer_uids:
            answer_date = datetime.fromtimestamp(int(answer_uid[:-3]))
            for notification in self.notification_number_date_list:
                if (answer_date <= (notification[1] + timedelta(minutes=15))
                        and answer_date >= notification[1]):
                    self.notification_matcher[answer_uid] = notification[0]

    def match_survey_number_with_answer(self, survey_uid):
        return self.notification_matcher[survey_uid]

    def add_survey_number_to_answers(self, answers):
        updated_answers = []
        for answer in answers:
            survey_number = self.match_survey_number_with_answer(answer[1])
            updated_answers.append(answer + [survey_number])

        return updated_answers

    def updated_answers_with_survey_number(self, formatted_answers):
        self.extract_answer_information(formatted_answers)
        self.generate_matcher_data()

        return self.add_survey_number_to_answers(formatted_answers)

"""
from clean_data import clean_data
from run_me_for_all_the_things import reconstruct_data_in_long_format
from shared_parser_functions import read_data_from_file


def do_it():
    path = '/Users/bjarniegill/Dev/Cordova-Survey/csv_parser/put_csv_files_here/Database - 2.csv'
    data = read_data_from_file(path)
    cleaned_data = clean_data(data)
    formatted_answers = reconstruct_data_in_long_format(cleaned_data)

    survey_matcher = SurveyNumberToIdMatcher()
    survey_matcher.get_notifications_from_data(data)
    updated_answers = survey_matcher.updated_answers_with_survey_number(formatted_answers)

    for item in updated_answers:
        print item

if __name__ == '__main__':
    do_it()
    # (participant_id, survey_unique_key, question_name, answer, date)
"""