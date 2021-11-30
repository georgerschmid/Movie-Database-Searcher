from flask import Flask, render_template, url_for, request
import whoosh
from whoosh.index import create_in
from whoosh.index import open_dir
from whoosh.fields import *
from whoosh.qparser import QueryParser
from whoosh.qparser import MultifieldParser
from whoosh import qparser
import csv
import os


app = Flask(__name__)
@app.route('/', methods=['GET', 'POST'])
def index():
	return render_template('welcome_page.html')

@app.route('/results/', methods=['GET', 'POST'])
def results(): 
	global mySearcher
	if request.method == 'POST':
		data = request.form
	else:
		data = request.args

	query = data.get('searchterm')

	title, image = mySearcher.search(query)

	return render_template('results.html', query = query, results=zip(title, image))

class MyWhooshSearcher(object):
	"""docstring for MyWhooshSearcher"""
	def __init__(self):
		super(MyWhooshSearcher, self).__init__()

	def index(self):
		schema = Schema(title = KEYWORD(stored=True), 
			type = TEXT(stored=True), 
			date = TEXT(stored=True), 
			plot = TEXT(stored=True),
			genre = KEYWORD(stored = True), 
			image = TEXT(stored=True), 
			url = ID(stored=True))
		if not os.path.exists("indexdir"):
			os.mkdir("indexdir")
		ix = create_in("indexdir", schema)
		data = self.openfile()
		writer = ix.writer()

		for element in data:
			writer.add_document(title = element[0], 
								type = element[1],
								date = element[2],
								plot = element[3],
								genre = element[4],
								image = element[5],
								url = element[6])
		writer.commit()

		self.ix = ix

	def openfile(self):
		with open('finalMasterdb.csv', newline='') as file:
			reader = csv.reader(file)
			data = list(reader)

		return data


	def search(self, query, k):
		tupleList = ['title', 'type', 'date', 'plot', 'genre', 'image', 'url']
		resultTuple = list()

		with self.ix.searcher() as searcher:
			parser = MultifieldParser(tupleList, schema=self.ix.schema)
			resultQuery = parser.parse(query)
			results = searcher.search(resultQuery, limit=None)

			for hit in results:
				buildTuple = (hit['title'], hit['image'], hit['url'])
				resultTuple.append(buildTuple)
		return resultTuple


if __name__ == '__main__':
	global mySearcher
	mySearcher = MyWhooshSearcher()
	mySearcher.index()
	app.run(debug=True)


















