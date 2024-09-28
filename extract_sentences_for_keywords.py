# this code finds sentences in all the text extracted from journal articles with user provided keywords
import re
import string
from termcolor import colored
from docx import Document
from docx.enum.text import WD_COLOR_INDEX
import os

keyword_dir = "./keyword_dir"
# add your keywords here
proteins = [
    "Pkp2",
    "PG",
    "plakoglobin",
    "plakophilin 2",
    "desmoplakin",
    "desmoglein 2",
    "desmocollin 2",
    "Dsg2",
    "Dsc2",
    "Pg",
    "Dp",
]
key_words = [
    # "bind to",
    # "interact with",
    # "associate with",
    # "co-localize",
    # "co-localise",
    # "forms a complex",
    # "interact",
]
matches = (
    proteins +
    key_words
)

# highlight the matching text
def prRed(sentence, matches):
    for wds in matches:
        sentence = sentence.replace(wds.lower(),"\033[44;33m{}\033[00m".format(wds))
    return sentence

# https://stackoverflow.com/questions/8733233/filtering-out-certain-bytes-in-python
def valid_xml_char_ordinal(c):
        codepoint = ord(c)
        return (
                0x20 <= codepoint <= 0xD7FF or
                codepoint in (0x9, 0xA, 0xD) or
                0xE000 <= codepoint <= 0xFFFD or
                0x10000 <= codepoint <= 0x10FFFF
                )

class HowToSearch:
    def __init__(self, papers_dict):
        self.papers_dict = papers_dict

    def method1(self):
        pattern = r'^[' + string.punctuation + ']+'
        for key, value in self.papers_dict.items():
            document = Document()
            document.add_heading('sentences with keywords', level=1)
            save_path = os.path.join(keyword_dir, key+".docx")
            j = 0
            for sentence in value:
                if any(x in sentence for x in matches):
                    each_line = sentence.split(" ")
                    while("" in each_line):
                        each_line.remove("")
                    if re.search(pattern, " ".join(each_line)) is None:
                        j += 1
                        sent = " ".join(each_line).lower()
                        cleaned_sent = ''.join(c for c in sent if valid_xml_char_ordinal(c))
                        sent = prRed(sent, matches)
                        print(j, ". ", sent)
                        print(" ")
                        document.add_paragraph(str(j)+". "+cleaned_sent)

            document.save(save_path)

def get_sentences_from_text(paper_text):
    sentences = []
    lines = [line.rstrip() for line in paper_text.readlines()]
    for line in lines:
        for sentence in line.split("."):
            sentences.append(sentence)
    return sentences

def get_dict_of_papers(sentences):
    papers_dict = {}
    temp_list = []
    for i, sentence in enumerate(sentences):
        if "paper-title: " in sentence:
            paper_title = sentence.split("paper-title: ")[1]
        else:
            if i < len(sentences)-1:
                if "paper-title: " in sentences[i+1]:
                    temp_list.append(sentence)
                    papers_dict[paper_title] =  temp_list
                    temp_list = []
                else:
                    temp_list.append(sentence)
            elif i == len(sentences)-1:
                temp_list.append(sentence)
                papers_dict[paper_title] =  temp_list
    return papers_dict

if __name__ == "__main__":
    paper_text = open("all_papers.txt","r",encoding="utf-8")
    sentences = get_sentences_from_text(paper_text)
    papers_dict = get_dict_of_papers(sentences)
    os.makedirs(keyword_dir, exist_ok=True)
    HowToSearch(papers_dict).method1()