from utils import *
from sentence_transformers import SentenceTransformer, util
import torch
import sys

corpus_embeddings = []
dict = {}
f = open(sys.argv[1], "r")
query = sys.argv[2]

for embedName in f.readlines():
    embededFile = torch.load(embedName)
    for index in range(len(embededFile)):
        corpus_embeddings.append(embededFile[index])
        dict[len(corpus_embeddings) - 1] = (embedName, index)


embedder = SentenceTransformer('all-MiniLM-L6-v2')
query_embedding = embedder.encode(query, convert_to_tensor=True)


cos_scores = util.cos_sim(query_embedding, corpus_embeddings)[0]
top_k = min(5, len(corpus_embeddings))
top_results = torch.topk(cos_scores, k=top_k)

print("\n\n======================\n\n")
print("Query:", query)
print("\nTop 5 most similar sentences in corpus:")

for score, idx in zip(top_results[0], top_results[1]):
    print(dict[str(idx.item())], "(Score: {:.4f})".format(score))