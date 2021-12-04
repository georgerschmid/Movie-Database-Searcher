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
from whoosh import scoring, query


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


def results2json(results, limit):
    return SearchResults(results=[Item(
            Title=results[x]["Title"],
            Type=results[x]["Type"],
            Date=results[x]["Date"],
            Plot=results[x]["Plot"],
            Genre=results[x]["Genre"],
            Image=results[x]["Image"],
            Link=results[x]["Link"],
        ) for x in range(limit-1)])


@app.post("/")
def read_root():
    return {"Hello": "World"}

    
@app.get("/search/{search}")
def read_root1(search: str):
    q =  QueryParser("Title", ix.schema).parse(search)
    with ix.searcher() as s:
        max = 10
        results = s.search(q, limit = max)
        if(len(results) < max):
            max = len(results)
        data = results2json(results, max)
        
        json_compatible_item_data = jsonable_encoder(data)
        return JSONResponse(content=json_compatible_item_data)


@app.get("/advsearch/{genre}")
def read_root3(genre: str):
    q =  QueryParser("Genre", ix.schema).parse(genre)
    with ix.searcher() as s:
        max = 10
        allow_q = query.Term("Type", "Movie")
        results = s.search(q, filter=allow_q, limit=max)
        print(results.filtered_count)
        if(len(results) < max):
            max = len(results)
        
        data = results2json(results, max)
        json_compatible_item_data = jsonable_encoder(data)
        return JSONResponse(content=json_compatible_item_data)
       