import { useState } from "react";
import { StarIcon } from "@heroicons/react/solid";
import { RadioGroup } from "@headlessui/react";
import { CurrencyDollarIcon, GlobeIcon } from "@heroicons/react/outline";
import Link from "next/link";
import { DotsVerticalIcon } from "@heroicons/react/solid";
import Layout from "../components/layout";

const projects = [
  {
    name: "Graph API",
    initials: "GA",
    href: "#",
    members: 16,
    bgColor: "bg-pink-600",
  },
  {
    name: "Component Design",
    initials: "CD",
    href: "#",
    members: 12,
    bgColor: "bg-purple-600",
  },
  {
    name: "Templates",
    initials: "T",
    href: "#",
    members: 16,
    bgColor: "bg-yellow-500",
  },
  {
    name: "React Components",
    initials: "RC",
    href: "#",
    members: 8,
    bgColor: "bg-green-500",
  },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Title(props) {
  return (
    <Layout>
      <div className="py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
          <h1 className="text-2xl font-semibold text-gray-900">Title</h1>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
          <div>
            <div className="pt-6 pb-16 sm:pb-24">
              <div className="mt-8 max-w-2xl mx-auto px-4 sm:px-6 lg:max-w-7xl lg:px-8">
                <div className="lg:grid lg:grid-cols-12 lg:auto-rows-min lg:gap-x-8">
                  <div className="lg:col-start-8 lg:col-span-5">
                    <div className="flex justify-between">
                      <h1 className="text-xl font-medium text-gray-900">
                        {props.data.results[0].Title}
                      </h1>
                    </div>
                  </div>

                  {/* Image */}
                  <div className="mt-8 lg:mt-0 lg:col-start-1 lg:col-span-7 lg:row-start-1 lg:row-span-3">
                    <h2 className="sr-only">Images</h2>
                    <div className="w-full rounded-lg overflow-hidden ">
                      <img
                        src={props.data.results[0].Image}
                        className="w-full h-full object-center object-cover group-hover:opacity-75"
                      />
                    </div>
                  </div>

                  <div className="mt-8 lg:col-span-5">
                    {/* Date */}
                    <div>
                      <h2 className="text-sm font-medium text-gray-900">
                        Release Date: {props.data.results[0].Date}{" "}
                      </h2>
                    </div>

                    {/* Genre */}
                    <div className="mt-8">
                      <div className="flex items-center justify-between">
                        <h2 className="text-sm font-medium text-gray-900">
                          Genres
                        </h2>
                        <p>{props.data.results[0].Genre}</p>
                      </div>
                    </div>

                    {/* Product details */}
                    <div className="mt-10">
                      <h2 className="text-sm font-medium text-gray-900">
                        Description
                      </h2>

                      <div
                        className="mt-4 prose prose-sm text-gray-500"
                        dangerouslySetInnerHTML={{
                          __html: props.data.results[0].Plot,
                        }}
                      />
                    </div>

                    <div className="mt-8 border-t border-gray-200 pt-8">
                      <h2 className="text-sm font-medium text-gray-900">
                        Type
                      </h2>

                      <div className="mt-4 prose prose-sm text-gray-500">
                        <p> {props.data.results[0].Type} </p>
                      </div>
                    </div>

                    {/* Policies */}
                    <section
                      aria-labelledby="policies-heading"
                      className="mt-10"
                    >
                      <h2 id="policies-heading" className="sr-only">
                        Imbd Link
                      </h2>
                      <Link href={props.data.results[0].Link}>
                        <p>{props.data.results[0].Link}</p>
                      </Link>
                    </section>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <h1>Related {props.data.results[0].Type}</h1>
              <div>
                <h2 className="text-gray-500 text-xs font-medium uppercase tracking-wide">
                  Pinned Projects
                </h2>
                <ul
                  role="list"
                  className="mt-3 grid grid-cols-1 gap-5 sm:gap-6 sm:grid-cols-2 lg:grid-cols-4"
                >
                  {projects.map((project) => (
                    <li
                      key={project.name}
                      className="col-span-1 flex shadow-sm rounded-md"
                    >
                      <div
                        className={classNames(
                          project.bgColor,
                          "flex-shrink-0 flex items-center justify-center w-16 text-white text-sm font-medium rounded-l-md"
                        )}
                      >
                        {project.initials}
                      </div>
                      <div className="flex-1 flex items-center justify-between border-t border-r border-b border-gray-200 bg-white rounded-r-md truncate">
                        <div className="flex-1 px-4 py-2 text-sm truncate">
                          <a
                            href={project.href}
                            className="text-gray-900 font-medium hover:text-gray-600"
                          >
                            {project.name}
                          </a>
                          <p className="text-gray-500">
                            {project.members} Members
                          </p>
                        </div>
                        <div className="flex-shrink-0 pr-2">
                          <button
                            type="button"
                            className="w-8 h-8 bg-white inline-flex items-center justify-center text-gray-400 rounded-full bg-transparent hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                          >
                            <span className="sr-only">Open options</span>
                            <DotsVerticalIcon
                              className="w-5 h-5"
                              aria-hidden="true"
                            />
                          </button>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
              <br />
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export async function getServerSideProps(context) {
  const { query } = context;
  const res = await fetch(`http://localhost:8000/search/${query.title}`);
  const data = await res.json();
  const res1 = await fetch(`http://localhost:8000/search/${query.title}`);
  const data1 = await res1.json();
  return {
    props: {
      data,
      data1,
    },
  };
}
