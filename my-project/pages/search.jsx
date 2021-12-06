import Layout from "../components/layout";
import Link from "next/link";
import { useEffect, useState } from "react";

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
  { id: "RealityTV", name: "RealityTV" },
  { id: "Family", name: "Family" },
  { id: "Horror", name: "Horror" },
  { id: "Scifi", name: "Scifi" },
  { id: "Animation", name: "Animation" },
  { id: "Fantasy", name: "Fantasy" },
  { id: "History", name: "History" },
  { id: "Biography", name: "Biography" },
  { id: "News", name: "News" },
  { id: "Music", name: "Music" },
  { id: "TalkShow", name: "TalkShow" },
  { id: "War", name: "War" },
  { id: "Western", name: "Western" },
  { id: "GameShow", name: "GameShow" },
  { id: "Sport", name: "Sport" },
  { id: "FilmNoir", name: "FilmNoir" },
  { id: "Adult", name: "Adult" },
  { id: "Musical", name: "Musical" },
];

const type = [
  { id: "tv", title: "TV" },
  { id: "movie", title: "Movie" },
];

function Form(event) {
  const [Searched, setSearched] = useState(false);
  const [searchResults, setSearchResults] = useState();
  async function gib(event){

    const body = JSON.stringify({
      Crime: event.target.Crime.checked,
      Drama: event.target.Drama.checked,
      Mystery: event.target.Mystery.checked,
      Thriller: event.target.Thriller.checked,
      Romance: event.target.Romance.checked,
      Action: event.target.Action.checked,
      Comedy: event.target.Comedy.checked,
      Short: event.target.Short.checked,
      Documentary: event.target.Documentary.checked,
      Adventure: event.target.Adventure.checked,
      RealityTV: event.target.RealityTV.checked,
      Family: event.target.Family.checked,
      Horror: event.target.Horror.checked,
      Scifi: event.target.Scifi.checked,
      Animation: event.target.Animation.checked,
      Fantasy: event.target.Fantasy.checked,
      History: event.target.History.checked,
      Biography: event.target.Biography.checked,
      News: event.target.News.checked,
      Music: event.target.Music.checked,
      TalkShow: event.target.TalkShow.checked,
      War: event.target.War.checked,
      Western: event.target.Western.checked,
      GameShow: event.target.GameShow.checked,
      Sport: event.target.Sport.checked,
      FilmNoir: event.target.FilmNoir.checked,
      Adult: event.target.Adult.checked,
      Musical: event.target.Musical.checked,
      tv: event.target.tv.checked,
      movie: event.target.movie.checked,
      year1: event.target.year1.value,
      year2: event.target.year2.value,
    });

    const res = await fetch(`http://localhost:8000/advsearch/`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: body,
    });
    const data = await res.json();
    setSearchResults(data);
    setSearched(true);

  }
  const handleSubmit = async event => {
    event.preventDefault();
    gib(event)
    
  };


  

  if (Searched) {
    return (
      <Layout>
        <div className="py-6">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
            <h1 className="text-2xl font-semibold text-gray-900">Results</h1>
          </div>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
            <div className="max-w-2xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
              <div className="grid grid-cols-1 gap-y-10 sm:grid-cols-2 gap-x-6 lg:grid-cols-3 xl:gap-x-8">
                {searchResults.results.map(({ Title, Image, Date }) => (
                  <Link key={Title} href={Title} className="group">
                    <a>
                      <div className="w-full aspect-w-1 aspect-h-2 rounded-lg overflow-hidden sm:aspect-w-2 sm:aspect-h-3">
                        <img
                          src={Image}
                          className="w-full h-full object-center object-cover group-hover:opacity-75"
                        />
                      </div>

                      <div className="mt-4 flex items-center justify-between text-base font-medium text-gray-900">
                        <h3>{Title}</h3>
                        <p>Release: {Date}</p>
                      </div>
                    </a>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
    <form
      onSubmit={handleSubmit}
    >
      <div className="py-6">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 md:px-8">
          <h1 className="text-2xl font-semibold text-gray-900">
            Advanced Search
          </h1>
        </div>
        <div className="max-w-4xl mx-auto px-4 py-4 sm:px-6 md:px-8">
          <div className="space-y-8 divide-y divide-gray-200">
            <div className="space-y-8 divide-y divide-gray-200 sm:space-y-5">
              <div>
                <div className="mt-6 sm:mt-5 space-y-6 sm:space-y-5">
                  <fieldset>
                    <legend className="text-lg font-medium text-gray-900">
                      Generes
                    </legend>
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-4">
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
                      Select Movie, Tv or Both?
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
                  <button
                    type="submit"
                    className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    Search
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </form>
    </Layout>
  );
}

export default function Search() {
  return <Form />;
}
