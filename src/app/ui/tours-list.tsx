import { fetchCategoryById } from '../data/categories-data'
import { fetchPopularTours, fetchTourBlobs } from '../data/tours-data'
import Image from 'next/image'
import Link from 'next/link'
import { Category } from '@/app/lib/definitions'
import { Button, Divider } from '@nextui-org/react'
import { createDays } from '../lib/utils';

export default async function ToursList() {
  const tours = await fetchPopularTours()
  return (
    <ul className="grid grid-cols-1 auto-rows-auto lg:grid-cols-3 gap-8 py-8">
      {tours.map((tour) => (
        <TourItem key={tour.id} tour={tour} />
      ))}
    </ul>
  )
}

async function TourItem({
  tour
}: {
  tour: {
    id: string
    title: string
    alias: string
    order_count: number
    category_id: string
    duration: number
    price: number
    description: string
  }

}) {
  const image = await fetchTourBlobs(tour.alias)
  const category = (await fetchCategoryById(tour.category_id)) as Category
  return (
    <li className="flex flex-col rounded-lg shadow-lg focus-within:outline-primary-500 focus-within:outline focus-within:outline-offset-2">
      <Link
        href={`/${category.alias}/${tour.alias}`}
        className="block size-full focus-visible:outline-none"
      >
        <div className="relative size-full md:min-h-[20rem] lg:min-h-[15rem] rounded-t-lg overflow-hidden">
          <Image
            src={image[0].url}
            alt={tour.title}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>
      </Link>
      <div className="p-2 flex flex-col text-start">
        <div className="flex items-center">
          <Link
            href={`/${category.alias}/${tour.alias}`}
            className="focus-visible:outline-none"
          >
            <h3 className="h3 text-2xl mb-1 hover:text-primary-500 transition-all">
              {tour.title}
            </h3>
          </Link>
          <span className="font-semibold ml-auto text-2xl text-primary-500">
            {tour.price} ₽
          </span>
        </div>
        <div className="flex mb-4">
          <p>
            <Link
              href={`/${category.alias}`}
              className="hover:text-primary-500 transition-all focus-visible:outline-primary-500 outline-2  rounded-lg text-lg"
            >
              #{category.title}
            </Link>
          </p>
          <p className="text-lg ml-auto">{`${tour.duration} ${createDays(tour.duration)}`}</p>
        </div>
        <Divider />
        <p className="text-xl mt-4 mb-8">{tour.description}</p>
        <Button
          color="primary"
          as={Link}
          href={`/${category.alias}/${tour.alias}`}
          className="w-2/3 mx-auto text-lg"
        >
          Подробнее
        </Button>
      </div>
    </li>
  )
}
