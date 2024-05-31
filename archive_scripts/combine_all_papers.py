import os

html_directory = "/home/iiser/Omkar/all_papers_txt/all_html"
output_dir = "/home/iiser/Omkar/all_papers_txt/all_papers.txt"

num_papers = len(next(os.walk(html_directory))[2])
name_papers = sorted(os.listdir(html_directory))

all_papers_file = open(output_dir,"w",encoding="utf-8")

for i in range(1,num_papers+1):
	file1 = open(str(os.path.join(html_directory,name_papers[i-1])),"r",encoding="utf-8")
	lines = file1.readlines()
	all_papers_file.writelines(lines)
	print(name_papers[i-1])
	file1.close()

all_papers_file.close()
