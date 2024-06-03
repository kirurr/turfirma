import { fetchCategories } from '@/app/data/categories-data'
import { fetchHotels, fetchHotelsBlobs } from '@/app/data/hotels-data'
import {
  fetchAllTours,
  fetchTourAndHotels,
  fetchTours
} from '@/app/data/tours-data'
import { HotelWithBlob } from '@/app/lib/definitions'
import EditTourForm from '@/app/ui/admin/tours/edit-tour-form'

export async function generateStaticParams() {
  const tours = await fetchAllTours()

  return tours.map((tour) => ({ id: tour.id }))
}

export default async function Page({ params }: { params: { id: string } }) {
  const [hotels, hotelsImages, categories, tour] = await Promise.all([
    fetchHotels(),
    fetchHotelsBlobs(),
    fetchCategories(null),
    fetchTourAndHotels(params.id)
  ])
  const hotelsWithImages = hotels.map((hotel) => {
    const image = hotelsImages.find((image) =>
      image.pathname.includes(`${hotel.id}/${hotel.image}`)
    )
    return { ...hotel, image: image }
  }) as HotelWithBlob[]

  return (
    <EditTourForm
      tour={tour}
      hotels={hotelsWithImages}
      categories={categories}
    />
  )
}
