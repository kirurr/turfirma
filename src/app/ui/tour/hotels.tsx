import { fetchHotelBlob } from '@/app/data/hotels-data'
import { Hotel } from '@/app/lib/definitions'
import HotelsWrapper from '@/app/ui/tour/hotels-wrapper'

export default async function TourHotels({
  hotels,
}: {
  hotels: Hotel[]
  className?: string
}) {
  const newHotelsArray = await Promise.all(
    hotels.map(async (hotel) => {
      const blob = await fetchHotelBlob(hotel.id)
      const image = blob.find((image) => image.pathname.includes(hotel.image))
      hotel.image = image?.url!
      return hotel
    })
  )
  return (
      <HotelsWrapper hotels={newHotelsArray} />
  )
}
