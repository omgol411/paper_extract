import os
import re
import string

# Create a regex pattern to match a string
# that starts with one or more special characters
pattern = r'^[' + string.punctuation + ']+'

paper_dir = "/home/iiser/Omkar/all_papers_txt/all_papers.txt"

all_papers_file = open(paper_dir,"r",encoding="utf-8")
lines = [line.rstrip() for line in all_papers_file]

#matches = ["filamin","actinin","fimbrin", "fascin"]
#matches = ["contractile ring"]
matches = ["gibberish"]
paper_content = [''.join(lines)]
sentences = paper_content[0].split(".") #sentences is a list of strings splitted by .
i = 0
for item in sentences: #item is string
	if all(x in item for x in matches):
		each_line = item.split(" ")
		while("" in each_line):
			each_line.remove("")
		# Check if string starts with special characters
		if re.search(pattern, " ".join(each_line)) is None:
			i+=1
			print(i," "," ".join(each_line))

all_papers_file.close()
		
