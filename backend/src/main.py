from sentence_transformers import SentenceTransformer, util
import torch
from utils import *


# Query sentences:
queries = ['how to approximate matrix']

embedded = False 
while not embedded:
    try:
        corpus_embeddings = torch.load('../dataset/CS514/corpus/data')
        dict = json.load(open('../dataset/CS514/corpus/dict'))
        embedded = True
    except:
        createEmbed()
print("finished")

embedder = SentenceTransformer('all-mpnet-base-v2')
# Find the closest 5 sentences of the corpus for each query sentence based on cosine similarity
top_k = min(5, len(corpus_embeddings))
for query in queries:
    query_embedding = embedder.encode(query, convert_to_tensor=True)

    # We use cosine-similarity and torch.topk to find the highest 5 scores
    cos_scores = util.cos_sim(query_embedding, corpus_embeddings)[0]
    top_results = torch.topk(cos_scores, k=top_k)

    print("\n\n======================\n\n")
    print("Query:", query)
    print("\nTop 5 most similar sentences in corpus:")

    for score, idx in zip(top_results[0], top_results[1]):
        print(dict[str(idx.item())], "(Score: {:.4f})".format(score))

    """
    # Alternatively, we can also use util.semantic_search to perform cosine similarty + topk
    hits = util.semantic_search(query_embedding, corpus_embeddings, top_k=5)
    hits = hits[0]      #Get the hits for the first query
    for hit in hits:
        print(corpus[hit['corpus_id']], "(Score: {:.4f})".format(hit['score']))
    """
