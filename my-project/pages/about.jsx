import Layout from '../components/layout'


export default function Home() {

  return (
    <Layout>
      <div className="py-6">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
              <h1 className="text-2xl font-semibold text-gray-900">About</h1>
            </div>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
              <br />
              <p>BingeHUb is a Movie and TV show search engine. There are two was to search either the basic search by usin gthe search bar 
                at the top of every page or by clicking advanced search on the left sidebar for more searching capibility. To see the description 
                of the searched Movie or Tv show click on the image to bring up a description page. On the description page it will give you
                you all the inbformation you need about the Movie or Tv show and at the bottom of the page you will be given some related 
                results that you might also find interesting.</p>
            </div>
          </div>
    </Layout>
  )
}
