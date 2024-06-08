import { fetchTourBlobs, fetchTours } from '@/app/data/tours-data'
import { Tour } from '@/app/lib/definitions'
import { formatDateFromPostgreSQL } from '@/app/lib/utils'
import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@nextui-org/react'
import {
  fetchCategoryById,
  fetchCategoryIdByAlias
} from '@/app/data/categories-data'
import { createDays } from '@/app/lib/utils'

export default async function ToursWrapper({
  params,
  searchParams
}: {
  params: { category: string }
  searchParams: { query: string; page?: string }
}) {
  const id = await fetchCategoryIdByAlias(params.category)
  const tours = await fetchTours(
    params.category === 'tours' ? 'tours' : id?.id!,
    searchParams.page ? +searchParams.page : undefined,
    searchParams.query
  )
  return (
    <>
      {tours.length !== 0 ? (
        <ul>
          {tours.map((tour) => (
            <TourItem key={tour.id} tour={tour} params={params} />
          ))}
        </ul>
      ) : (
        <h2 className="h2 text-center mt-4">Туров не найдено</h2>
      )}
    </>
  )
}

async function TourItem({
  tour,
  params
}: {
  tour: Tour
  params: { category: string }
}) {
  const images = await fetchTourBlobs(tour.alias)
  const firstImage = images.find((img) => img.pathname.includes(tour.images[0]))
  const category = await fetchCategoryById(tour.category_id)
  return (
    <li className="flex flex-1 flex-wrap items-center shadow-lg rounded-lg overflow-hidden mb-8">
      <div className="relative w-full lg:w-1/4 min-h-[17rem]">
        <Image
          sizes="(max-width: 768px) 50vw, 33vw"
          className="object-cover"
          alt="tour image"
          fill
          src={firstImage?.url!}
        />
      </div>
      <div className="flex items-center p-4 lg:w-2/4 h-full">
        <div className="h-full flex flex-col gap-4">
          <h2 className="h2 mb-0">{tour.title}</h2>
          <Link
            className="link block size-fit text-lg font-normal"
            href={`/${category?.alias}`}
          >
            #{category?.title}
          </Link>
          <div>
            <p className="text-xl">{tour.description}</p>
          </div>
          <div>
            <p className="text-xl mb-2">
              <strong>Дата: </strong>
              {formatDateFromPostgreSQL(tour.date.toString())}
            </p>
            <p className="text-xl">
              <strong>Продолжительность: </strong>
              {`${tour.duration} ${createDays(tour.duration)}`}
            </p>
          </div>
        </div>
      </div>
      <div className="lg:w-1/4 w-full p-4 h-full flex flex-col gap-4">
        <p className="text-xl">Цена на человека:</p>
        <p className="font-semibold text-xl text-primary-500">
          {tour.price} рублей
        </p>
        <Button
          className="mt-8"
          as={Link}
          href={`${params.category}/${tour.alias}`}
          color="primary"
          size="lg"
        >
          Подробнее
        </Button>
      </div>
    </li>
  )
}
