from datetime import datetime
from os import listdir
from os.path import isfile, join


def list_file_paths(path):
	return [join(path, f) for f in listdir(path) if isfile(join(path, f)) and f[0] != '.']

def read_data_from_file(path):
	data = open(path, 'r').read()
	data_list = data.split('\r\n')
	return [tuple(line.split(',')) for line in data_list]

def now():
	return datetime.now().strftime("%Y_%m_%d %H-%M-%S")

def get_participant_id(data):
	participant_id = [line for line in data if line[0] == 'participant_id'][0]
	return participant_id[1]

def get_and_remove_participant_id_from_data(data):
	participant_id_index = [i for i, item in enumerate(data) if item[0] == 'participant_id'][0]
	return data.pop(int(participant_id_index))[1]

def pprint(data):
	import pprint
	pp = pprint.PrettyPrinter(indent=4)
	pp.pprint(data)
