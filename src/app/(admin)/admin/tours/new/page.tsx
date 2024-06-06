import { fetchCategories } from '@/app/data/categories-data'
import { fetchHotels, fetchHotelsBlobs } from '@/app/data/hotels-data'
import { HotelWithBlob } from '@/app/lib/definitions'
import NewTourForm from '@/app/ui/admin/tours/new-tour-form'

export default async function Page() {
  const [hotels, hotelsImages, categories] = await Promise.all([
    fetchHotels(),
    fetchHotelsBlobs(),
    fetchCategories(null)
  ])
  const hotelsWithImages = hotels.map((hotel) => {
    const image = hotelsImages.find((image) =>
      image.pathname.includes(`${hotel.id}/${hotel.image}`)
    )
    return { ...hotel, image: image }
  }) as HotelWithBlob[]
  return <NewTourForm hotels={hotelsWithImages} categories={categories} />
}
