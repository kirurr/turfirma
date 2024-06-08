import {
  fetchHotels,
  fetchToursWithHotel
} from '@/app/data/hotels-data'
import { Hotel } from '../../../lib/definitions'
import { AdminHotelWrapper } from '@/app/ui/admin/hotels/hotels'
import { Suspense } from 'react'
import { Spinner } from '@nextui-org/react'

export const metadata = {
  title: 'Отели'
}

export default function Page() {
  return (
    <Suspense fallback={<Spinner size='lg' className='size-full' />}>
      <Hotels />
    </Suspense>
  )
}

async function Hotels() {
  const hotels = await fetchHotels()
  return (
    <ul>
      {hotels.map((hotel, index) => (
        <HotelWrapper key={index} hotel={hotel} />
      ))}
    </ul>
  )
}

async function HotelWrapper({ hotel }: { hotel: Hotel }) {
  const toursCount = await fetchToursWithHotel(hotel.id)
  return <AdminHotelWrapper hotel={hotel} toursCount={toursCount} />
}
