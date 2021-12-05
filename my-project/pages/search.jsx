import Layout from "../components/layout";
import Link from 'next/link'
const genere = [
  { id: "Crime", name: "Crime" },
  { id: "Drama", name: "Drama" },
  { id: "Mystery", name: "Mystery" },
  { id: "Thriller", name: "Thriller" },
  { id: "Romance", name: "Romance" },
  { id: "Action", name: "Action" },
  { id: "Comedy", name: "Comedy" },
  { id: "Short", name: "Short" },
  { id: "Documentary", name: "Documentary" },
  { id: "Adventure", name: "Adventure" },
  { id: "RealityTV", name: "Reality-TV" },
  { id: "Family", name: "Family" },
  { id: "Horror", name: "Horror" },
  { id: "Scifi", name: "Sci-fi" },
  { id: "Animation", name: "Animation" },
  { id: "Fantasy", name: "Fantasy" },
  { id: "History", name: "History" },
  { id: "Biography", name: "Biography" },
  { id: "News", name: "News" },
  { id: "Music", name: "Music" },
  { id: "TalkShow", name: "Talk-Show" },
  { id: "War", name: "War" },
  { id: "Western", name: "Western" },
  { id: "GameShow", name: "Game-Show" },
  { id: "Sport", name: "sport" },
  { id: "FilmNoir", name: "Film-Noir" },
  { id: "Adult", name: "Adult" },
  { id: "Musical", name: "Musical" },
];

const type = [
  { id: "tv", title: "TV" },
  { id: "movie", title: "Movie" },
];

export default function Search() {
  return (
    <Layout>
      <div className="py-6">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 md:px-8">
          <h1 className="text-2xl font-semibold text-gray-900">
            Advanced Search
          </h1>
        </div>
        <div className="max-w-4xl mx-auto px-4 py-4 sm:px-6 md:px-8">
          <form className="space-y-8 divide-y divide-gray-200">
            <div className="space-y-8 divide-y divide-gray-200 sm:space-y-5">
              <div>
                <div className="mt-6 sm:mt-5 space-y-6 sm:space-y-5">
                  <fieldset>
                    <legend className="text-lg font-medium text-gray-900">
                      Generes
                    </legend>
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                      {genere.map((genere, genereIdx) => (
                        <div
                          key={genereIdx}
                          className="relative flex items-start py-4"
                        >
                          <div className="min-w-0 flex-1 text-sm">
                            <label
                              htmlFor={`${genere.id}`}
                              className="font-medium text-gray-700 select-none"
                            >
                              {genere.name}
                            </label>
                          </div>
                          <div className="ml-3 flex items-center h-5">
                            <input
                              id={`${genere.id}`}
                              name={`${genere.id}`}
                              type="checkbox"
                              className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </fieldset>

                  <div>
                    <h3 className="text-lg leading-6 font-medium text-gray-900">
                      Type
                    </h3>
                    <p className="mt-1 max-w-2xl text-sm text-gray-500">
                      Movie, Tv or Both?
                    </p>
                  </div>

                  <fieldset className="mt-4">
                    <legend className="sr-only">Type</legend>
                    <div className="space-y-4">
                      {type.map((type) => (
                        <div key={type.id} className="flex items-center">
                          <input
                            id={`${type.id}`}
                            name={`${type.id}`}
                            type="checkbox"
                            defaultChecked={type.id === "both"}
                            className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300"
                          />
                          <label
                            htmlFor={type.id}
                            className="ml-3 block text-sm font-medium text-gray-700"
                          >
                            {type.title}
                          </label>
                        </div>
                      ))}
                    </div>
                  </fieldset>

                  <div>
                    <label
                      htmlFor="year"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Year
                    </label>
                    <div>
                      <input
                        type="year1"
                        name="year1"
                        id="year1"
                        className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                        placeholder="2015"
                      />
                      <p>to</p>
                      <input
                        type="year2"
                        name="year2"
                        id="year2"
                        className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                        placeholder="2020"
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="pt-5">
                <div className="flex justify-end">
                <form className="w-full flex md:ml-0" action="advresults" method="POST">
                  <button
                    type="submit"
                    className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    Search
                  </button>
                  </form>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </Layout>
  );
}

export async function getServerSideProps(context) {
  const { query } = context;

  const res = await fetch(`http://localhost:8000/advsearch/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(query),
  });
  const data = await res.json();
  return {
    props: {
      data,
    },
  };
}
