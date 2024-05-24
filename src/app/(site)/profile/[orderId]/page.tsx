import { auth } from '@/auth'
import { fetchOrdersByUserId } from '@/app/data/orders-data'
import { notFound } from 'next/navigation'
import { fetchTourAndHotels } from '@/app/data/tours-data'
import PaymentForm from '@/app/ui/payment-form'

export default async function Page({
  params
}: {
  params: { orderId: string }
}) {
  const session = await auth()

  const orders = await fetchOrdersByUserId(session?.user?.user_id)
  const order = orders.find((order) => order.id === params.orderId)
  if (!order) notFound()
  const tourData = await fetchTourAndHotels(order.tour_alias)
  const hotelData = tourData.hotels_info?.find(
    (hotel) => hotel.hotel_id === order.hotel_id
  )
  return (
    <>
      <h2>вы оплачиваете тур {tourData.tour_title}</h2>
      <p>цена {tourData.tour_price} рублей</p>
      {hotelData && <p>выбранный отель: {hotelData?.hotel_title}</p>}
			<PaymentForm orderId={order.id}/>
    </>
  )
}
