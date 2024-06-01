import { fetchOrdersByUserId } from '@/app/data/orders-data'
import { fetchUserByEmail } from '@/app/data/users-data'
import { User, type Order } from '@/app/lib/definitions'
import { auth } from '@/auth'
import { fetchTourAndHotels } from '@/app/data/tours-data'
import SignOutForm from '@/app/ui/auth/sign-out-button'
import OrdersAccordion from '@/app/ui/profile/orders-accordion'
import { Divider } from '@nextui-org/react'

export default async function Page() {
  const session = await auth()
  const userEmail = session?.user.email
  const user = await fetchUserByEmail(userEmail!)

  const orders = await fetchOrdersByUserId(user?.id)

  return (
    <>
      <section className="section !pb-0">
        <h1 className="h1 text-center">Личный кабинет</h1>
        <div className="my-8">
          <h2 className="h2">{user?.name}</h2>
          <p className="p">
            <strong className="font-semibold">Электронная почта: </strong>
            {user?.email}
          </p>
          <p className="p">
            <strong className="font-semibold">Данные паспорта: </strong>
            {user?.passport}
          </p>
        </div>
        <SignOutForm />
        <Divider className='my-16'/>
      </section>
      <section className="section !pt-0">
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
