import { fetchOrdersByUserId } from '@/app/data/orders-data'
import Link from 'next/link'
import { fetchUserByEmail } from '@/app/data/users-data'
import { type Order } from '@/app/lib/definitions'
import { auth } from '@/auth'
import { fetchTourAndHotels } from '@/app/data/tours-data'

export default async function Page() {
  const session = await auth()
  const userEmail = session?.user.email
  let user
  if (userEmail) user = await fetchUserByEmail(userEmail)

  const orders = await fetchOrdersByUserId(user?.id)

  return (
    <div>
      <h1>profile</h1>
      <p>{user?.name}</p>
      {orders.length !== 0 ? (
        <>
          <h2>заказы:</h2>
          <ul>
            {orders &&
              orders.map((order) => <Order key={order.id} order={order} />)}
          </ul>
        </>
      ) : (
        <h2>у вас нет заказов</h2>
      )}
    </div>
  )
}

async function Order({ order }: { order: Order }) {
  const data = await fetchTourAndHotels(order.tour_alias)
  const hotelData = data.hotels_info?.find(
    (hotel) => hotel.hotel_id === order.hotel_id
  )
  return (
    <li>
      <h3>{data.tour_title}</h3>
      {hotelData ? (
        <div>
          <h2>отель: {hotelData?.hotel_title}</h2>
        </div>
      ) : (
        <></>
      )}
      <Link href={`tours/${data.tour_alias}`}>открыть страницу тура</Link>
      {order.status === 'pending' && (
        <Link href={`profile/${order.id}`}>внести оплату</Link>
      )}
      {order.status === 'paid' && <p>заказ оплачен</p>}
      {order.status === 'canceled' && <p>отменен</p>}
    </li>
  )
}
