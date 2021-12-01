import Layout from "../components/layout";
const genere = [
  { id: 1, name: "Crime" },
  { id: 2, name: "Drama" },
  { id: 3, name: "Mystery" },
  { id: 4, name: "Thriller" },
  { id: 5, name: "Romance" },
  { id: 6, name: "Action" },
  { id: 7, name: "Comedy" },
  { id: 8, name: "Short" },
  { id: 9, name: "Documentary" },
  { id: 10, name: "Adventure" },
  { id: 11, name: "Reality-TV" },
  { id: 12, name: "family" },
  { id: 13, name: "Horror" },
  { id: 14, name: "Sci-fi" },
  { id: 15, name: "Animation" },
  { id: 16, name: "Fantasy" },
  { id: 17, name: "History" },
  { id: 18, name: "Biography" },
  { id: 19, name: "News" },
  { id: 20, name: "Music" },
  { id: 21, name: "Talk-Show" },
  { id: 22, name: "War" },
  { id: 23, name: "Western" },
  { id: 24, name: "Game-Show" },
  { id: 25, name: "sport" },
  { id: 26, name: "film-noir" },
  { id: 27, name: "adult" },
  { id: 28, name: "Musical" },
];

const type = [
  { id: "tv", title: "TV" },
  { id: "movie", title: "Movie" },
  { id: "both", title: "Both" },
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
                    <div className="mt-4 border-t border-b border-gray-200 divide-y divide-gray-200">
                      {genere.map((genere, genereIdx) => (
                        <div
                          key={genereIdx}
                          className="relative flex items-start py-4"
                        >
                          <div className="min-w-0 flex-1 text-sm">
                            <label
                              htmlFor={`genere-${genere.id}`}
                              className="font-medium text-gray-700 select-none"
                            >
                              {genere.name}
                            </label>
                          </div>
                          <div className="ml-3 flex items-center h-5">
                            <input
                              id={`genere-${genere.id}`}
                              name={`genere-${genere.id}`}
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
                            id={type.id}
                            name="type-method"
                            type="radio"
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
                    <div className="mt-1">
                      <input
                        type="year"
                        name="year"
                        id="year"
                        className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                        placeholder="2015"
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="pt-5">
                <div className="flex justify-end">
                  <button
                    type="submit"
                    className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    Search
                  </button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </Layout>
  );
}
