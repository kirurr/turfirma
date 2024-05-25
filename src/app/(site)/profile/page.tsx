import { fetchOrdersByUserId } from '@/app/data/orders-data'
import DocumentForm from '@/app/ui/document-form'
import Link from 'next/link'
import { fetchUserByEmail } from '@/app/data/users-data'
import { User, type Order } from '@/app/lib/definitions'
import { auth } from '@/auth'
import { fetchTourAndHotels } from '@/app/data/tours-data'

export default async function Page() {
  const session = await auth()
  const userEmail = session?.user.email
  let user: User | any
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
              orders.map((order) => (
                <Order key={order.id} order={order} user={user} />
              ))}
          </ul>
        </>
      ) : (
        <h2>у вас нет заказов</h2>
      )}
    </div>
  )
}

async function Order({ order, user }: { order: Order; user: User }) {
  const tourData = await fetchTourAndHotels(order.tour_alias)
  const hotelData = tourData.hotels_info?.find(
    (hotel) => hotel.hotel_id === order.hotel_id
  )
  return (
    <li>
      <h3>{tourData.tour_title}</h3>
      {hotelData ? (
        <div>
          <h2>отель: {hotelData?.hotel_title}</h2>
        </div>
      ) : (
        <></>
      )}
      <Link href={`tours/${tourData.tour_alias}`}>открыть страницу тура</Link>
      {order.status === 'pending' && (
        <Link href={`profile/${order.id}`}>внести оплату</Link>
      )}
      {order.status === 'paid' && (
        <>
          <p>заказ оплачен</p>
          <DocumentForm orderData={order} tourData={tourData} userData={user} />
        </>
      )}
      {order.status === 'canceled' && <p>отменен</p>}
    </li>
  )
}
