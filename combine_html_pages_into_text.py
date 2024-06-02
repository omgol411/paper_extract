from bs4 import BeautifulSoup
import os
import re
import string

# this code extracts all the text from html files in papers directory
# paths are according to windows OS
html_directory = "./papers"
output = open("all_papers.txt","w",encoding="utf-8")

num_papers = len(next(os.walk(html_directory))[2])
namepapers = sorted(os.listdir(html_directory))
name_papers = []
for filename in namepapers:
	if filename.endswith('.html'):
		fname = os.path.join(html_directory, filename)
		name_papers.append(str(fname))
#print(name_papers)

for i in range(1,num_papers+1):
	file1 = open(str(name_papers[i-1]),"r",encoding="utf-8")
	soup = BeautifulSoup(file1, 'html.parser')
	try:
		paper_title = soup.title.contents[0].strip()
		print(paper_title)
		output.write("paper-title: "+paper_title+' \n')
		tag = soup.body # get all text content of paper
		for string in tag.strings:
			if string and string.strip():
				output.write(string)
		output.write(300*"-"+"\n\n")
	except AttributeError as error:
		print(error)
		print(str(name_papers[i-1]))
