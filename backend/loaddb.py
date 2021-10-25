from whoosh.index import create_in
from whoosh.fields import *
import os.path
import json


schema = Schema(
    title=TEXT(stored=True),
    picture=TEXT(stored=True),
    type=KEYWORD(stored=True),
    episodes=NUMERIC(stored=True),
    status=KEYWORD(stored=True),
    tags=KEYWORD(stored=True)
)

if not os.path.exists("index"):
    os.mkdir("index")
ix = create_in("index", schema)

writer = ix.writer()
f = open("anime-offline-database.json")
db = json.load(f)

for anime in db["data"]:
    writer.add_document(
        title=anime["title"],
        picture=anime["picture"],
        type=anime["type"],
        episodes=anime["episodes"],
        status=anime["status"],
        tags=anime["tags"]
    )
writer.commit()