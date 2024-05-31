import {
  fetchTourAndHotels,
  fetchTourBlobs,
  fetchTourIdByAlias,
  fetchToursForParams
} from '@/app/data/tours-data'
import { notFound } from 'next/navigation'
import { auth } from '@/auth'
import TourBreadcumbs from '@/app/ui/tour/breadcrumbs'
import { fetchCategories, fetchCategoryById } from '@/app/data/categories-data'
import { Category } from '@/app/lib/definitions'
import TourSlider from '@/app/ui/tour/slider'
import { ListBlobResultBlob } from '@vercel/blob'
import { formatDateFromPostgreSQL } from '@/app/lib/utils'
import TourHotels from '@/app/ui/tour/hotels'
import Link from 'next/link'
import { Button } from '@nextui-org/react'

export async function generateStaticParams() {
  const tours = await fetchToursForParams()
  const categories = await fetchCategories(null)

  const result = tours.map((tour) => {
    const category = categories.find(
      (category) => category.id === tour.category_id
    )
    return { tour: tour.alias, category: category?.alias }
  })
  const toursResult = tours.map((tour) => ({
    tour: tour.alias,
    category: 'tours'
  }))
  return result.concat(toursResult)
}

export default async function Page({
  params
}: {
  params: { tour: string; category: string }
}) {
  const id = await fetchTourIdByAlias(params.tour)
  if (!id) notFound()
  const tour = await fetchTourAndHotels(id)

  const category = await fetchCategoryById(tour.category_id)

  const session = await auth()
  const signedIn = session?.user ? true : false

  const blobs = await fetchTourBlobs(tour.alias)
  const images = tour.images.map((image) =>
    blobs.find((blob) => blob.pathname.includes(image))
  )
  return (
    <>
      <article className="grid grid-cols-3 section gap-8">
        <TourBreadcumbs
          category={category as Category}
          tour={tour}
          className="col-span-3"
        />
        <TourSlider
          images={images as ListBlobResultBlob[]}
          className="col-span-2 size-full"
        />
        <section className="flex flex-col gap-4">
          <h1 className="text-3xl font-bold">{tour.title}</h1>
          <p className="text-xl">
            <strong>Дата:</strong> {formatDateFromPostgreSQL(tour.date)}
          </p>
          <p className="text-xl">
            <strong>Продолжительность:</strong> {tour.duration} день
          </p>
          <p className="text-xl">
            <strong>Цена с человека:</strong> {tour.price} рублей
          </p>
          {signedIn ? (
            <Button
              href={`${tour.alias}/book`}
              as={Link}
              color="primary"
              size="lg"
              className="w-full mt-4"
            >
              Забронировать
            </Button>
          ) : (
            <p className="p">Для покупки тура войдите</p>
          )}
        </section>
        <section className="col-span-2">
          <h2 className="h2">Описание тура</h2>
          <p className="p">{tour.description}</p>
        </section>
        <section className="row-span-3">
          <div className="mb-7">
            <h2 className="h2">Что включено в стоимость:</h2>
            <ul className="list-inside list-disc">
              {tour.included.map((item, index) => (
                <li className="text-xl mt-2" key={index}>
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="h2">Что не включено в стоимость:</h2>
            <ul className="list-inside list-disc">
              {tour.excluded.map((item, index) => (
                <li className="text-xl mt-2" key={index}>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </section>
        <section className="col-span-2">
          <h2 className="h2">Программа тура</h2>
          <p className="p">{tour.program}</p>
        </section>
        <section className="col-span-2">
          {tour.hotels_info.length > 0 ? (
            <>
              <h2 className="h2">Проживание</h2>
              <TourHotels hotels={tour.hotels_info} />
            </>
          ) : (
            <h2 className="h2">В этом туре нельзя выбрать проживание</h2>
          )}
        </section>
      </article>
    </>
  )
}
