# This script will download all svg files for the flags in language_data.json
# and save them inside a svg-icons folder

import os
import json
import subprocess
from datetime import datetime

today = datetime.now().date()
folder_name = f'svg-icons-{today}'

with open('language_data.json', encoding='utf-8') as f:
    languages = json.loads(f.read())

if not os.path.isdir(folder_name):
    os.mkdir(folder_name)

for index, language in enumerate(languages):
    code = language['code']
    link = language['svg_url']
    file_name = f'{folder_name}/{code}.svg'
    command = f'powershell.exe wget {link} -O {file_name}'

    if not os.path.exists(file_name):
        subprocess.Popen(command)
