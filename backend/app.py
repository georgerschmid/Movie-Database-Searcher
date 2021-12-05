import json
import whoosh
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
from whoosh import scoring, query, qparser
from whoosh.fields import *


ix = open_dir("index")


app = FastAPI()
app.mount("/static", StaticFiles(directory="static"), name="static")
templates = Jinja2Templates(directory="templates")

class ShowType(str, Enum):
    MOVIE = "TV Series"
    TVSHOW = "Movie"
   

class Item(BaseModel):
    Title: str
    Type:str
    Date:str
    Plot: str
    Genre:str
    Image: str
    Link: str

class SearchResults(BaseModel):
    results: List[Item]

class adv(BaseModel):
    Crime: Optional[str] = None
    Drama: Optional[str] = None
    Mystery: Optional[str] = None
    Thriller: Optional[str] = None
    Romance: Optional[str] = None
    Action: Optional[str] = None
    Comedy: Optional[str] = None
    Short: Optional[str] = None
    Documentary: Optional[str] = None
    Adventure: Optional[str] = None
    RealityTV: Optional[str] = None
    Family: Optional[str] = None
    Horror: Optional[str] = None
    Scifi: Optional[str] = None
    Animation: Optional[str] = None
    Fantasy: Optional[str] = None
    History: Optional[str] = None
    Biography: Optional[str] = None
    News: Optional[str] = None
    Music: Optional[str] = None
    TalkShow: Optional[str] = None
    Musical: Optional[str] = None
    War: Optional[str] = None
    Western: Optional[str] = None
    GameShow: Optional[str] = None
    Sport: Optional[str] = None
    FilmNoir: Optional[str] = None
    Adult: Optional[str] = None
    movie: Optional[str] = None
    tv:Optional[str] = None
    year1: Optional[str] = None
    year2: Optional[str] = None

def results2json(results, limit):
    return SearchResults(results=[Item(
            Title=results[x]["Title"],
            Type=results[x]["Type"],
            Date=results[x]["Date"],
            Plot=results[x]["Plot"],
            Genre=results[x]["Genre"],
            Image=results[x]["Image"],
            Link=results[x]["Link"],
        ) for x in range(limit)])


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

@app.get("/relatedsearch/{search}")
def read_root2(search: str):
    q =  QueryParser("Title", ix.schema).parse(search)
    with ix.searcher() as s:
        max = 1
        results = s.search(q, limit = max)
        if(len(results) < max):
            max = len(results)
        G = QueryParser("Genre", ix.schema).parse(results[0]["Genre"])
        D = QueryParser("Date", ix.schema).parse(results[0]["Date"])
        T = QueryParser("Type", ix.schema).parse(results[0]["Type"])
        with ix.searcher() as d:
            max = 500
            gresults = d.search(G, limit=max)
            tresults = d.search(T, limit=max)
            dresults = d.search(D, limit=max)
            gresults.upgrade(tresults)
            gresults.upgrade(dresults)
            if(len(gresults) < max):
                max = len(gresults)
            else:
                max = 10
            data = results2json(gresults, max)
            json_compatible_item_data = jsonable_encoder(data)
            return JSONResponse(content=json_compatible_item_data)


@app.post("/advsearch/")
def read_root3(item: adv):
    catGenre = ""
    catType = ""
    catDate = ""
    if(item.Crime == "on"):
        catGenre = catGenre + " " + "Crime"
    if(item.Drama == "on"):
        catGenre = catGenre + " " + "Drama"
    if(item.Mystery == "on"):
        catGenre = catGenre + " " + "Mystery"
    if(item.Thriller == "on"):
        catGenre = catGenre + " " + "Thriller"
    if(item.Romance == "on"):
        catGenre = catGenre + " " + "Romance"
    if(item.Action == "on"):
        catGenre = catGenre + " " + "Action"
    if(item.Comedy == "on"):
        catGenre = catGenre + " " + "Comedy"
    if(item.Short == "on"):
        catGenre = catGenre + " " + "Short"
    if(item.Documentary == "on"):
        catGenre = catGenre + " " + "Documentary"
    if(item.Adventure == "on"):
        catGenre = catGenre + " " + "Adventure"
    if(item.RealityTV == "on"):
        catGenre = catGenre + " " + "RealityTV"
    if(item.Family == "on"):
        catGenre = catGenre + " " + "Family"
    if(item.Horror == "on"):
        catGenre = catGenre + " " + "Horror"
    if(item.Scifi == "on"):
        catGenre = catGenre + " " + "Scifi"
    if(item.Animation == "on"):
        catGenre = catGenre + " " + "Animation"
    if(item.Fantasy == "on"):
        catGenre = catGenre + " " + "Fantasy"
    if(item.History == "on"):
        catGenre = catGenre + " " + "History"
    if(item.Biography == "on"):
        catGenre = catGenre + " " + "Biography"
    if(item.News == "on"):
        catGenre = catGenre + " " + "News"
    if(item.Music == "on"):
        catGenre = catGenre + " " + "Music"
    if(item.TalkShow == "on"):
        catGenre = catGenre + " " + "TalkShow"
    if(item.War == "on"):
        catGenre = catGenre + " " + "War"
    if(item.Western == "on"):
        catGenre = catGenre + " " + "Western"
    if(item.GameShow == "on"):
        catGenre = catGenre + " " + "GameShow"
    if(item.Sport == "on"):
        catGenre = catGenre + " " + "Sport"
    if(item.FilmNoir == "on"):
        catGenre = catGenre + " " + "FilmNoir"
    if(item.Adult == "on"):
        catGenre = catGenre + " " + "Adult"
    if(item.Musical == "on"):
        catGenre = catGenre + " " + "Musical"
    
    if(item.tv == "on" and item.movie == "on"):
        catType = "TV Series Movie"
    elif(item.tv == "on"):
        catType = "TV Series"
    elif(item.movie == "on"):
        catType = "Movie"
    else:
        catType = "TV Series Movie"
   
    try:
        a = item.year1
        one = int(a)
        b = item.year2
        two = int(b)

        while(one <= two):
            catDate = catDate + " " + str(one)
            one += 1
    except:
        print("numbers where not entered")
    genre =  QueryParser("Genre", ix.schema, group=qparser.OrGroup).parse(catGenre)
    type = QueryParser("Type", ix.schema, group=qparser.OrGroup).parse(catType)
    date = QueryParser("Date", ix.schema, group=qparser.OrGroup).parse(catDate)
    with ix.searcher() as s:
        max = 1000
        gresults = s.search(genre, limit=max)
        tresults = s.search(type, limit=max)
        dresults = s.search(date, limit=max)
        gresults.upgrade(tresults)
        gresults.upgrade(dresults)
        if(len(gresults) < max):
            max = len(gresults)
        else:
            max = 100
        data = results2json(gresults, max)
        json_compatible_item_data = jsonable_encoder(data)
        return JSONResponse(content=json_compatible_item_data)
       