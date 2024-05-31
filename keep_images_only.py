import os
import shutil

dir_name = ".\\all_images\\Biomolecules Free Full-Text Actin Bundles Dynamics and Architecture_files"
test = os.listdir(dir_name)


for item in test:
	if not item.endswith(".png"):
		try:
			os.remove(os.path.join(dir_name, item))
		except OSError as error:
			print(error)
			shutil.rmtree(os.path.join(dir_name, item))
			print("File path can not be removed")
