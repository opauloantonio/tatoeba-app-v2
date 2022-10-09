# This script will leverage Inkscape cli to generate PNG files for the flags

import os
import subprocess
from datetime import datetime

today = datetime.now().date()
svg_folder_name = f'svg-icons-{today}'
png_folder_name = f'png-icons-{today}'

if not os.path.exists(png_folder_name):
    os.mkdir(png_folder_name)

svg_icon_names = os.listdir(svg_folder_name)

for index, svg_icon_name in enumerate(svg_icon_names):
    png_file_name = svg_icon_name.replace('.svg', '.png')
    command = f'inkscape {svg_folder_name}/{svg_icon_name} -o {png_folder_name}/{png_file_name}'
    subprocess.Popen(command)
    print(f'Converting icon {index + 1} of {len(svg_icon_names)}', end='\r')

print()
