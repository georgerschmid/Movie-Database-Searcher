import json
from os import link 
from fastapi import FastAPI, Request, Response
from fastapi.encoders import jsonable_encoder
from fastapi.responses import JSONResponse, HTMLResponse
from fastapi.staticfiles import StaticFiles
from fastapi.templating import Jinja2Templates

from pydantic import BaseModel
from typing import Optional, List, Type
from enum import Enum
from starlette.responses import PlainTextResponse

from whoosh.index import open_dir
from whoosh.qparser import QueryParser
from whoosh.query import *
from whoosh import scoring

ix = open_dir("index")


app = FastAPI()
app.mount("/static", StaticFiles(directory="static"), name="static")
templates = Jinja2Templates(directory="templates")

class ShowType(str, Enum):
    MOVIE = "TV Series"
    TVSHOW = "Movie"
   

class Item(BaseModel):
    Title:str
    Type:str
    Date:str
    Plot:str
    Genre:str
    Image:str
    Link:str

class SearchResults(BaseModel):
    results: List[Item]


def results2json(results):
    return SearchResults(results=[Item(
            Title=results[x]["Title"],
            Type=results[x]["Type"],
            Date=results[x]["Date"],
            Plot=results[x]["Plot"],
            Genre=results[x]["Genre"],
            Image=results[x]["Image"],
            Link=results[x]["Link"],
        ) for x in range(len(results))])


@app.post("/")
def read_root():
    return {"Hello": "World"}

@app.post("/search/{field}/{search}")
def read_root(field:str, search: str):
    q =  QueryParser(field, ix.schema).parse(search)
    with ix.searcher(weighting=scoring.TF_IDF()) as s:
        results = s.search(q, limit=10)
        data = results2json(results)
        json_compatible_item_data = jsonable_encoder(data)
        return JSONResponse(content=json_compatible_item_data)
    
@app.post("/search/{search}")
def read_root1(search: str):
    q =  QueryParser("Tilte", ix.schema).parse(search)
    with ix.searcher() as s:
        results = s.search(q, limit=10)
        data = results2json(results)
        json_compatible_item_data = jsonable_encoder(data)
        return JSONResponse(content=json_compatible_item_data)
