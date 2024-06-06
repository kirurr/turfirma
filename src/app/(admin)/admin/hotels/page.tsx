import { fetchHotelBlob, fetchHotels, fetchToursWithHotel } from "@/app/data/hotels-data"
import { Hotel } from '../../../lib/definitions';
import { AdminHotelWrapper } from "@/app/ui/admin/hotels/hotels";
import { Button } from "@nextui-org/react";
import Link from "next/link";

export default async function Page() {
  const hotels = await fetchHotels()
  return (
    <>
      <section className="section text-center">
        <h2 className="h2">Отели</h2>
        <Button color="primary" as={Link} href="hotels/new" >
          Добавить
        </Button>
      </section>
      <section className="section">
        <ul>
          {hotels.map((hotel, index) => (
            <HotelWrapper key={index} hotel={hotel} />
          ))}
        </ul>
      </section>
    </>
  )
}

async function HotelWrapper({ hotel }: { hotel: Hotel }) {
  const toursCount = await fetchToursWithHotel(hotel.id)
  return <AdminHotelWrapper hotel={hotel}  toursCount={toursCount} />
}