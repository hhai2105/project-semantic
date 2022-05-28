from utils import *
from sentence_transformers import SentenceTransformer, util
import torch
import sys
import numpy as np

corpus_embeddings = []
dict = {}
f = open(sys.argv[1], "r")
query = sys.argv[3]
directory = sys.argv[2]
first = True
for embedName in f.read().splitlines():
    if first:
        fileEmbed = torch.load(directory + embedName)
        corpus_embeddings = fileEmbed
        first = False
    else:
        fileEmbed = torch.load(directory + embedName)
        corpus_embeddings= torch.cat((corpus_embeddings, fileEmbed), 0 )
    for i in range(len(fileEmbed)):
        dict[str(len(corpus_embeddings) - len(fileEmbed) + i)] = (embedName, i)

embedder = SentenceTransformer('all-MiniLM-L6-v2')
query_embedding = embedder.encode(query, convert_to_tensor=True)

cos_scores = util.cos_sim(query_embedding, corpus_embeddings)[0]
top_k = min(20, len(corpus_embeddings))
top_results = torch.topk(cos_scores, k=top_k)

for score, idx in zip(top_results[0], top_results[1]):
    print(dict[str(idx.item())], "(Score: {:.4f})".format(score))
