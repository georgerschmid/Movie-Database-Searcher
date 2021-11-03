from os import link
from typing import Type
from whoosh.index import create_in
from whoosh.fields import *
import os.path
import json


schema = Schema(
    Title=TEXT(stored=True),
    Type=TEXT(stored=True),
    Date=TEXT(stored=True),
    Plot=TEXT(stored=True),
    Genre=KEYWORD(stored=True),
    Image=TEXT(stored=True),
    Link=TEXT(stored=True)
)

if not os.path.exists("index"):
    os.mkdir("index")
ix = create_in("index", schema)

writer = ix.writer()
f = open("finalMasterdb.json")
db = json.load(f)

for shows in db:
    writer.add_document(
        Title=shows["Title"],
        Type=shows["Type"],
        Date=shows["Date"],
        Plot=shows["Plot"],
        Genre=shows["Genre"],
        Image=shows["Image"],
        Link=shows["Link"]
    )
writer.commit()