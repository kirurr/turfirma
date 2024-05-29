import { fetchOrdersByUserId } from '@/app/data/orders-data'
import { fetchUserByEmail } from '@/app/data/users-data'
import { User, type Order } from '@/app/lib/definitions'
import { auth } from '@/auth'
import { fetchTourAndHotels } from '@/app/data/tours-data'
import SignOutForm from '@/app/ui/auth/sign-out-button'
import OrdersAccordion from '@/app/ui/profile/orders-accordion'

export default async function Page() {
  const session = await auth()
  const userEmail = session?.user.email
  const user = await fetchUserByEmail(userEmail!)

  const orders = await fetchOrdersByUserId(user?.id)

  return (
    <>
      <section className="section">
        <h1 className="h1 text-center">Личный кабинет</h1>
        <h2 className="h2">{user?.name}</h2>
        <p className="p">Электронная почта: {user?.email}</p>
        <p className="p">Данные паспорта: {user?.passport}</p>
        <SignOutForm />
      </section>
      <section className="section">
        {orders.length > 0 ? (
          <>
            <h2 className="h2">Ваши заказы:</h2>
            <OrdersWrapper orders={orders} user={user} />
          </>
        ) : (
          <h2 className="h2">У вас нет заказов.</h2>
        )}
      </section>
    </>
  )
}

async function OrdersWrapper({
  orders,
  user
}: {
  orders: Order[]
  user: User
}) {
  const toursData = await Promise.all(
    orders.map(async (order) => await fetchTourAndHotels(order.tour_id))
  )
  return <OrdersAccordion user={user} orders={orders} tours={toursData} />
}
