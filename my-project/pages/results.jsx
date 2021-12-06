import Link from "next/link";
import Layout from "../components/layout";
import {
  ArrowNarrowLeftIcon,
  ArrowNarrowRightIcon,
} from "@heroicons/react/solid";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

function results(props) {
  return (
    <Layout>
      <div className="py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
          <h1 className="text-2xl font-semibold text-gray-900">Results</h1>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
          <div className="max-w-2xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
            <div className="grid grid-cols-1 gap-y-10 sm:grid-cols-2 gap-x-6 lg:grid-cols-4 xl:gap-x-8">
              {props.data.results.slice(0,50).map(({ Title, Image, Date }) => (
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

export default results;

export async function getServerSideProps(context) {
  const { query } = context;
  const res = await fetch(`http://localhost:8000/search/${query.search}`);
  const data = await res.json();
  return {
    props: {
      data,
    },
  };
}
