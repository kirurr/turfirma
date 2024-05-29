import { fetchTourBlobs, fetchTours } from '@/app/data/tours-data'
import { Tour } from '@/app/lib/definitions'
import { formatDateFromPostgreSQL } from '@/app/lib/utils'
import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@nextui-org/react'
import { fetchCategoryIdByAlias } from '@/app/data/categories-data'

export default async function ToursWrapper({
  params,
  searchParams
}: {
  params: { category: string }
  searchParams: { query: string; page?: string }
}) {
  const id = await fetchCategoryIdByAlias(params.category)
  const tours = await fetchTours(
    params.category === 'tours' ? 'tours' : id!,
    searchParams.page ? +searchParams.page : undefined,
    searchParams.query
  )
  return (
    <>
      {tours.length !== 0 ? (
        <ul className="my-16">
          {tours.map((tour) => (
            <TourItem key={tour.id} tour={tour} params={params} />
          ))}
        </ul>
      ) : (
        <h2 className='h2 text-center mt-4'>Туров не найдено</h2>
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
  return (
    <li className="flex flex-1 h-32 items-center shadow-md rounded overflow-hidden mb-8">
      <div className="relative h-full w-40">
        <Image alt="tour image" fill src={firstImage?.url!} />
      </div>
      <div className="flex flex-1 items-center p-4 h-full">
        <div className="h-full">
          <h2 className="h2">{tour.title}</h2>
          <p>Дата: {formatDateFromPostgreSQL(tour.date.toString())}</p>
          <p>Длительность: {tour.duration} день</p>
        </div>
        <div className="h-full">
          <h2 className="h2">Описание</h2>
          <p>{tour.description}</p>
        </div>
        <Button
          className="ml-auto"
          as={Link}
          href={`${params.category}/${tour.alias}`}
					color='primary'
        >
          {' '}
          открыть{' '}
        </Button>
      </div>
    </li>
  )
}
