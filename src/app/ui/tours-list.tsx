import { fetchCategoryById } from '../data/categories-data'
import { fetchPopularTours, fetchTourBlobs } from '../data/tours-data'
import Image from 'next/image'
import Link from 'next/link'
import { Category } from '../lib/definitions'
import { formatDateFromPostgreSQL } from '../lib/utils'
import { Button } from '@nextui-org/react'

export default async function ToursList() {
  const tours = await fetchPopularTours()
  return (
    <ul className="grid grid-cols-3 gap-8 py-8">
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
    date: string
    duration: number
    price: number
  }
}) {
  const image = await fetchTourBlobs(tour.alias)
  const category = (await fetchCategoryById(tour.category_id)) as Category
  return (
    <li className="flex flex-col rounded-lg overflow-hidden shadow">
      <Link
        href={`/${category.alias}/${tour.alias}`}
        className="block size-full"
      >
        <div className="relative size-full min-h-[15rem] rounded-t-lg">
          <Image
            src={image[0].url}
            alt={tour.title}
            fill
            className="object-cover"
            sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
          />
        </div>
      </Link>
      <div className="p-2 flex flex-col text-start">
        <div className="flex items-center">
          <Link href={`/${category.alias}/${tour.alias}`}>
            <h3 className="h3 !text-2xl !m-0 hover:text-primary-500 transition-all">
              {tour.title}
            </h3>
          </Link>
          <span className="font-semibold ml-auto text-xl">{tour.price} ₽</span>
        </div>
          <p>
            <Link
              href={`/${category.alias}`}
              className="hover:text-primary-500 transition-all"
            >
              #{category.title}
            </Link>
          </p>
        <div className="flex flex-wrap my-6">
          <p className="font-semibold p mb-4 w-1/2 text-nowrap">
            Количество заказов: {tour.order_count}
          </p>
          <p className="font-semibold p !m-0 w-1/2 text-end">
            Дата: {formatDateFromPostgreSQL(tour.date)}
          </p>
          <p className="font-semibold p !m-0">
            Продолжительность: {tour.duration} день
          </p>
        </div>
        <Button
          color="primary"
          as={Link}
          variant="bordered"
          href={`/${category.alias}/${tour.alias}`}
        >
          Подробнее
        </Button>
      </div>
    </li>
  )
}
