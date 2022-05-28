from pdfminer.pdfinterp import PDFResourceManager, PDFPageInterpreter
from pdfminer.converter import TextConverter
from pdfminer.layout import LAParams
from pdfminer.pdfpage import PDFPage
from sentence_transformers import SentenceTransformer, util
import PyPDF2
from io import StringIO
import json
import torch
import fitz
from base64 import b64decode
import os

def pdf_to_txt_list(file_path):
    # https://stackoverflow.com/questions/28246161/pdfminer-export-pages-as-list-of-strings
    # Returns a list of strings, one for each page in the PDF file.
    rsrcmgr = PDFResourceManager()
    retstr = StringIO()
    laparams = LAParams()
    device = TextConverter(rsrcmgr, retstr, laparams=laparams)
    # Create a PDF interpreter object.
    interpreter = PDFPageInterpreter(rsrcmgr, device)
    # Process each page contained in the document.

    # A list for all each page's text
    pages_text = []

    with open(file_path, 'rb') as fp:
        for page in PDFPage.get_pages(fp):
            # Get (and store) the "cursor" position of stream before reading from PDF
            # On the first page, this will be zero
            read_position = retstr.tell()

            # Read PDF page, write text into stream
            interpreter.process_page(page)

            # Move the "cursor" to the position stored
            retstr.seek(read_position, 0)

            # Read the text (from the "cursor" to the end)
            page_text = retstr.read()

            # Add this page's text to a convenient list
            pages_text.append(page_text)
        
    return pages_text


def pdf_to_img_list(file_name, pages, target_directory):
    if not os.path.exists(target_directory):
        os.makedirs(target_directory)
    # https://stackoverflow.com/questions/46184239/extract-a-page-from-a-pdf-as-a-jpeg
    saved_files = []
    doc = fitz.open(file_name)
    name = os.path.splitext(os.path.basename(file_name))[0]
    for i in pages:
        try:
            page = doc.load_page(i-1)
        except ValueError:
            print(f"Page {i} does not exist in {file_name}")
        zoom = 2
        mat = fitz.Matrix(zoom, zoom)
        pix = page.get_pixmap(matrix=mat)
        save_name = f"{name}_{i}.jpg"
        pix.save(os.path.join(target_directory, save_name))
        saved_files.append(save_name)
        
    return saved_files

def convert():
    directory = '../dataset/CS514/'
    converted = '../dataset/CS514/converted/'
    try: 
        os.mkdir(converted)
    except:
        pass

    for filename in os.listdir(directory):
        if filename.endswith(".pdf"):
            print(f"{filename}\n")
            pageArr = pdf_to_txt_list(directory + filename)
            openfile = open(converted + filename.split(".")[0], 'w')
            for page in pageArr:
                page = " ".join(page.split("\n"))
                openfile.write(page)
                openfile.write("\n")

def createCorpus():
    directory = '../dataset/CS514/converted/'
    corpus = []
    dict = {}
    for filename in os.listdir(directory):
        print(filename)
        f = open(directory + filename, 'r')
        pages = f.readlines()
        for index in range(len(pages)):
            corpus.append(pages[index])
            dict[len(corpus) - 1] = (filename, index)
    return corpus, dict

def createEmbed():
    corpusFolder = '../dataset/CS514/corpus/'
    try: 
        os.mkdir(corpusFolder)
    except:
        pass
    embedder = SentenceTransformer('all-MiniLM-L6-v2')
    corpus, dict = createCorpus()
    corpus_embeddings = embedder.encode(corpus, convert_to_tensor=True)
    torch.save(corpus_embeddings, '../dataset/CS514/corpus/data')
    try:
        file = open('../dataset/CS514/corpus/dict', "w")
        json.dump(dict,file)
    except:
        pass

def convertFile(filename):
    pageArr = pdf_to_txt_list(filename)
    bufferFile = open(filename.split(".")[0], 'w')
    for page in pageArr:
        page = " ".join(page.split("\n"))
        bufferFile.write(page)
        bufferFile.write("\n")
    return filename


def vectorize(filename):
    pages = pdf_to_txt_list(filename)
    embedder = SentenceTransformer('all-MiniLM-L6-v2')
    embedded = embedder.encode(pages, convert_to_tensor=True)
    print(torch.save(embedded, filename.split(".")[0]+".pt"))

createCorpus()
