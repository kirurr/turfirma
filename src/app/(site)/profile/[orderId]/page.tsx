import { auth } from '@/auth'
import { fetchOrdersByUserId, fetchOrdersId } from '@/app/data/orders-data'
import { notFound } from 'next/navigation'
import { fetchTourAndHotels } from '@/app/data/tours-data'
import PaymentForm from '@/app/ui/payment-form'

export async function generateStaticParams() {
  const data = await fetchOrdersId()

  return data.map((id) => ({ orderId: id.id }))
}

export default async function Page({
  params
}: {
  params: { orderId: string }
}) {
  const session = await auth()

  const orders = await fetchOrdersByUserId(session?.user?.user_id)
  const order = orders.find((order) => order.id === params.orderId)
  if (!order) notFound()
  const tourData = await fetchTourAndHotels(order.tour_id)
  const hotelData = tourData.hotels_info?.find(
    (hotel) => hotel.id === order.hotel_id
  )
  return (
    <section className="section !max-w-lg text-center">
      <h1 className="h1">Вы оплачиваете тур:<br />{tourData.title}.</h1>
      <p className="p">Цена {tourData.price} рублей.</p>
      {hotelData && <p className="p">Выбранный отель: {hotelData?.title}.</p>}
      <PaymentForm orderId={order.id} />
    </section>
  )
}
