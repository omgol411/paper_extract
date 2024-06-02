import os
import shutil
from pathlib import Path

dir_name = "./all_images"
html_directory = "./papers"
test = os.listdir(html_directory)

for item in test:
    if os.path.isdir(os.path.join(html_directory, item)):
            Path(os.path.join(dir_name, item)).mkdir(parents=True, exist_ok=True)
            for files in os.listdir(os.path.join(html_directory, item)):
                    if files.endswith((".png", ".jpg", ".jpeg", ".gif")):
                            print(files)
                            shutil.copy(os.path.join(html_directory, item, files), os.path.join(dir_name, item))
	# if not item.endswith(".png"):
	# 	try:
	# 		os.remove(os.path.join(dir_name, item))
	# 	except OSError as error:
	# 		print(error)
	# 		shutil.rmtree(os.path.join(dir_name, item))
	# 		print("File path can not be removed")
