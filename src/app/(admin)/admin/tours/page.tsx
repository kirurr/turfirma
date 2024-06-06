import { fetchOrdersCountByTourId } from '@/app/data/orders-data'
import { fetchAllTours } from '@/app/data/tours-data'
import { Tour } from '@/app/lib/definitions'
import { AdminToursWrapper } from '@/app/ui/admin/tours/tours'
import { Button } from '@nextui-org/react'
import Link from 'next/link'

export default async function Page() {
  const tours = await fetchAllTours()
  return (
    <>
      <section className="section text-center">
        <h2 className="h2 text-center">Туры</h2>
        <Button color="primary" as={Link} href="tours/new">
          Добавить
        </Button>
      </section>
      <section className="section">
        {tours.map((tour, index) => (
          <TourWrapper key={index} tour={tour} />
        ))}
      </section>
    </>
  )
}

async function TourWrapper({ tour }: { tour: Tour }) {
  const orders = await fetchOrdersCountByTourId(tour.id)
  return <AdminToursWrapper tour={tour} orders={orders} />
}
