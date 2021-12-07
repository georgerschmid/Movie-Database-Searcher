from bs4 import BeautifulSoup
import requests
import pandas as pd


baseurl = 'https://www.imdb.com'
movielinks = [] #create an empty product link list to store the links

headers = {
	'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/14.1.2 Safari/605.1.15'
}
for page in range(1,1001,50): #we want to go through 10 pages
	r = requests.get(f'https://www.imdb.com/search/title/?genres=sci-fi&start={page}&explore=title_type,genres&ref_=adv_nxt', headers=headers)
	soup = BeautifulSoup(r.content, 'lxml')

	productlist = soup.find_all('div', class_ = 'lister-item-image float-left') #getting all the products on one page


	for item in productlist: 
		for link in item.find_all('a', href=True): #finding the links for each product
			movielinks.append(baseurl + link['href']) #putting it in our empty list




#testlink = 'https://www.imdb.com/title/tt0108778/'

for link in movielinks: #loop through all the links, and get the information on each page
	r = requests.get(link, headers=headers)
	soup = BeautifulSoup(r.content, 'lxml')
	genrelist = []

	try:
		title = soup.find('h1', {'data-testid' : 'hero-title-block__title'}).text
		if title == None:
			title = soup.find('h1', class_ = 'TitleHeader__TitleText-sc-1wu6n3d-0 cLNRlG').text
	except AttributeError:
		pass
	try:
		mtype = soup.find('li', class_ = 'ipc-inline-list__item').text
		if mtype != 'TV Series':
			mtype = 'Movie'
	except AttributeError:
		pass
	try: 
		date = soup.find('a', class_= 'ipc-link ipc-link--baseAlt ipc-link--inherit-color TitleBlockMetaData__StyledTextLink-sc-12ein40-1 rgaOW').text
	except AttributeError:
		pass
	try:
		plot = soup.find('div', class_= 'ipc-overflowText ipc-overflowText--pageSection ipc-overflowText--height-long ipc-overflowText--long ipc-overflowText--base').text
	except AttributeError:
		pass
	try: 
		genre = soup.find('span', class_= 'ipc-chip__text').text
	except AttributeError:
		pass
	
	try:
		image = soup.find('img', class_ = 'ipc-image', src=True)['src']
	except TypeError: 
		pass
	imbdlink = link

		
	movie = {
		'Title' : title, 
		'Type' : mtype,
		'Date' : date,
		'Plot' : plot,
		'Genre' : genre,
		'Image' : image,
		'Link' : imbdlink
		}

	movielist.append(movie) #store the product in the list
	print(movie)

df = pd.DataFrame(movielist) #creates a dataframe
df.to_csv('si-fiscrape.csv')
print(df)
			


