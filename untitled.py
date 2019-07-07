#!/usr/bin/env python
# -*- mode: Python; tab-width: 4; indent-tabs-mode: nil; -*-
# ex: set tabstop=4
# Please do not change the two lines above. See PEP 8, PEP 263.


import os
import sys
import re


folder = "/Users/penghuailiang/Documents/projects/huailiang.github.io/source/js/jax"


def has_comment(lines):
	result = True
	if not lines[0].strip().startswith("/*************"):
		result = False
	if len(lines) > 18 :
		if not lines[18].strip() == "*/":
			result = False
	else :
		result = False
	return result

def match_comment(file):
	lines = []
	with open(file, 'r') as f:
		lines = f.readlines()
		valid = has_comment(lines)
		if valid:
			print(file, valid, len(lines))	
			lines = lines[19:]

	with open(file, 'w') as f:
		f.writelines(lines)


def get_all_files(dir):
    files_ = []
    list = os.listdir(dir)
    for i in range(0, len(list)):
        path = os.path.join(dir, list[i])
        if os.path.isdir(path):
            files_.extend(get_all_files(path))
        if os.path.isfile(path):
            files_.append(path)
    return files_



files = get_all_files(folder)
for x in files:
	# print x
	match_comment(x)
