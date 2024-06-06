import { fetchOrdersCountByTourId } from '@/app/data/orders-data'
import { fetchAllTours } from '@/app/data/tours-data'
import { Tour } from '@/app/lib/definitions'
import { AdminToursWrapper } from '@/app/ui/admin/tours/tours'
import { Spinner } from '@nextui-org/react'
import { Suspense } from 'react'

export default function Page() {
  return (
    <Suspense fallback={<Spinner size="lg" className="size-full" />}>
      <Tours />
    </Suspense>
  )
}

async function Tours() {
  const tours = await fetchAllTours()
  return (
    <>
      {tours.map((tour, index) => (
        <TourWrapper key={index} tour={tour} />
      ))}
    </>
  )
}

async function TourWrapper({ tour }: { tour: Tour }) {
  const orders = await fetchOrdersCountByTourId(tour.id)
  return <AdminToursWrapper tour={tour} orders={orders} />
}
