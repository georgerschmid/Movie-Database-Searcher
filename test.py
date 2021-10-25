from whoosh.index import open_dir
from whoosh.qparser import QueryParser
from whoosh.query import *


ix = open_dir("index")

qp =  QueryParser("title", ix.schema).parse("fairy")
with ix.searcher() as s:
    results = s.search(qp)
    print(results[0])
