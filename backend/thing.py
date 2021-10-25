import json 
from fastapi import FastAPI, Request, Response
from fastapi.encoders import jsonable_encoder
from fastapi.responses import JSONResponse, HTMLResponse
from fastapi.staticfiles import StaticFiles
from fastapi.templating import Jinja2Templates

from pydantic import BaseModel
from typing import Optional, List
from enum import Enum

from whoosh.index import open_dir
from whoosh.qparser import QueryParser
from whoosh.query import *

ix = open_dir("index")


app = FastAPI()
app.mount("/static", StaticFiles(directory="static"), name="static")
templates = Jinja2Templates(directory="templates")

class AnimeStatus(str, Enum):
    TV = "TV"
    MOVIE = "MOVIE"
    OVA = "OVA"
    ONA = "ONA"
    SPECIAL = "SPECIAL"
    UNKNOWN = "UNKNOWN"

class AnimeType(str, Enum):
    FINISHED = "FINISHED"
    ONGOING = "ONGOING"
    UPCOMING = "UPCOMING"
    UNKNOWN = "UNKNOWN"

class Item(BaseModel):
    title:str
    picture:str
    animetype:str
    episodes:int
    status:str
    tags:List[str]

class SearchResults(BaseModel):
    results: List[Item]


def results2json(results):
    return SearchResults(results=[Item(
            title=results[x]["title"],
            picture=results[x]["picture"],
            animetype=results[x]["type"],
            episodes=results[x]["episodes"],
            status=results[x]["status"],
            tags=results[x]["tags"],
        ) for x in range(len(results))])


@app.get("/")
def read_root():
    return {"Hello": "World"}

@app.get("/search/{field}/{search}")
def read_root(field:str, search: str):
    q =  QueryParser(field, ix.schema).parse(search)
    with ix.searcher() as s:
        results = s.search(q, limit=None)
        data = results2json(results)
        json_compatible_item_data = jsonable_encoder(data)
        return JSONResponse(content=json_compatible_item_data)
    

