import { useState } from 'react'
import { StarIcon } from '@heroicons/react/solid'
import { RadioGroup } from '@headlessui/react'
import { CurrencyDollarIcon, GlobeIcon } from '@heroicons/react/outline'
import Link from 'next/link'


function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function Example(props) {


  return (
    <div className="bg-white">
      <div className="pt-6 pb-16 sm:pb-24">
        
        <div className="mt-8 max-w-2xl mx-auto px-4 sm:px-6 lg:max-w-7xl lg:px-8">
          <div className="lg:grid lg:grid-cols-12 lg:auto-rows-min lg:gap-x-8">
            <div className="lg:col-start-8 lg:col-span-5">
              <div className="flex justify-between">
                <h1 className="text-xl font-medium text-gray-900">{props.data.results[0].Title}</h1>
              </div>
            </div>

            {/* Image */}
            <div className="mt-8 lg:mt-0 lg:col-start-1 lg:col-span-7 lg:row-start-1 lg:row-span-3">
              <h2 className="sr-only">Images</h2>
              <div className="w-full aspect-w-1 aspect-h-2 rounded-lg overflow-hidden sm:aspect-w-1 sm:aspect-h-2">
                  <img
                  src={props.data.results[0].Image}
                  className="w-full h-full object-center object-cover group-hover:opacity-75"
                  />
              </div>
            </div>

            <div className="mt-8 lg:col-span-5">
             
                {/* Date */}
                <div>
                  <h2 className="text-sm font-medium text-gray-900">Release Date: {props.data.results[0].Date} </h2>
                </div>

                {/* Genre */}
                <div className="mt-8">
                  <div className="flex items-center justify-between">
                    <h2 className="text-sm font-medium text-gray-900">Genres</h2>
                    <p>{props.data.results[0].Genre}</p>
                  </div>
                </div>

         

              {/* Product details */}
              <div className="mt-10">
                <h2 className="text-sm font-medium text-gray-900">Description</h2>

                <div
                  className="mt-4 prose prose-sm text-gray-500"
                  dangerouslySetInnerHTML={{ __html: props.data.results[0].Plot }}
                />
              </div>

              <div className="mt-8 border-t border-gray-200 pt-8">
                <h2 className="text-sm font-medium text-gray-900">Type</h2>

                <div className="mt-4 prose prose-sm text-gray-500">
                      <p> {props.data.results[0].Type} </p>
                </div>
              </div>

              {/* Policies */}
              <section aria-labelledby="policies-heading" className="mt-10">
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
    </div>
  )
}


export async function getServerSideProps(context) {
  const { query } = context
  console.log(`http://localhost:8000/search/${query.title}`)
  const res = await fetch(`http://localhost:8000/search/${query.title}`)
  const data = await res.json()
  return {
      props:{
          data
      }
  }
}
