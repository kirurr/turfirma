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

export const dynamicParams = false

export async function generateStaticParams() {
  const tours = await fetchToursForParams()
  const categories = await fetchCategories(null)

  const result = tours.map((tour) => {
    const category = categories.find(
      (category) => category.id === tour.category_id
    )
    return {tour: tour.alias, category: category?.alias}
  })
  return result
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
      <TourBreadcumbs category={category as Category} tour={tour} />
      <section className="grid grid-cols-3">
        <h1 className="h1 text-center col-span-3">{tour.title}</h1>
        <TourSlider
          className="size-full min-h-80 col-span-2 row-span-2"
          images={images as ListBlobResultBlob[]}
        />
        <div className="row-span-2">
          <p>цена {tour.price} рублей</p>
          <p>дата {formatDateFromPostgreSQL(tour.date)}</p>
          <p>продолжительность {tour.duration} день</p>
          <div>
            {signedIn ? (
              <Button href={`${tour.alias}/book`} as={Link} color="primary">
                Забронировать
              </Button>
            ) : (
              <p>для покупки тура авторизируйтесь</p>
            )}
          </div>
        </div>

        {tour?.hotels_info?.length !== 0 ? (
          <TourHotels hotels={tour.hotels_info!} />
        ) : (
          <div>
            <h2>отелей нет</h2>
          </div>
        )}
        <div>
          <h2 className="h2">Описание тура</h2>
          <p>{tour.description}</p>
        </div>
        <div>
          <h2 className="h2">Программа тура</h2>
          <p>{tour.program}</p>
        </div>
      </section>
    </>
  )
}
