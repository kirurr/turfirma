import { fetchHotelBlob, fetchHotelById, fetchHotels } from '@/app/data/hotels-data'
import EditHotelForm from '@/app/ui/admin/hotels/edit-hotel-form'
import { notFound } from 'next/navigation'

export async function generateStaticParams() {
  const hotels = await fetchHotels()

  return hotels.map((hotel) => ({ id: hotel.id }))
}

export default async function Page({ params }: { params: { id: string } }) {
  const hotel = await fetchHotelById(params.id)
  if (!hotel) notFound()
  const image = await fetchHotelBlob(params.id)

  return (
    <section className="section">
      <h2 className="h2 text-center">Редактирование отеля {hotel.title}</h2>
      <EditHotelForm
        hotel={hotel}
        image={image.find((i) => i.pathname.includes(hotel.image))!}
      />
    </section>
  )
}
