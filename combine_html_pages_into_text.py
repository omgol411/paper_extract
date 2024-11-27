from bs4 import BeautifulSoup
import os
import shutil

# this code extracts all the text from html files in papers directory

class DisectPaper:

    def __init__(self):
        self.html_directory = "./papers"
        self.image_dir = "./all_images"
        self.forbidden_names = [
            "logo", "banner", "icon", "button", "avatar", "thumbnail",
            "Mastadon", "traininggrants", "cover", "facebook", "twitter",
            "wechat", "picture3", "registernow", "cover"
        ]
        self.name_papers = self.list_files(self.html_directory, '.html')
        self.num_papers = len(next(os.walk(self.html_directory))[2])

    def list_files(self, dir, filetype):
        r = []
        for filename in os.listdir(dir):
            if filename.endswith(filetype):
                r.append(filename.partition(".")[0])
        return r

    def give_me_text(self, html_file, output):
        file1 = open(html_file,"r",encoding="utf-8")
        soup = BeautifulSoup(file1, 'html.parser')

        try:
            # paper_title = soup.title.contents[0].strip()
            paper_title = os.path.basename(html_file).split(".")[0]
            print(paper_title)

            output.write("paper-title: "+paper_title+' \n')
            tag = soup.body # get all text content of paper

            for string in tag.strings:
                if string and string.strip():
                    output.write(string)

            output.write(300*"-"+"\n\n")

        except AttributeError as error:
            print(error)
            print(str(html_file))
            return ""

    def give_me_images(self, html_folder, image_dir):
        if os.path.isdir(html_folder):
            print(html_folder)
            paper_image_dir = os.path.join(image_dir, html_folder)
            os.makedirs(paper_image_dir, exist_ok=True)

            for files in os.listdir(html_folder):
                if files.endswith((".png", ".jpg", ".jpeg", ".gif")):
                    if not any(forbidden in files.lower() for forbidden in self.forbidden_names):
                        print(files)
                        shutil.copy(os.path.join(html_folder, files), paper_image_dir)

def main():
    papers = DisectPaper()
    output = open("all_papers.txt","w",encoding="utf-8")
    for i, paper in enumerate(papers.name_papers):
        paper_path = os.path.join(papers.html_directory, paper+".html")
        paper_dir = os.path.join(papers.html_directory, paper+"_files")

        papers.give_me_text(paper_path, output)
        papers.give_me_images(paper_dir, papers.image_dir)

        print("paper number: ", i+1, " out of ", papers.num_papers)

    output.close()

if __name__ == "__main__":
    main()