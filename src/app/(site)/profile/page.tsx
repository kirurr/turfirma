import { fetchOrdersByUserId } from '@/app/data/orders-data'
import { fetchUserByEmail } from '@/app/data/users-data'
import { User, type Order } from '@/app/lib/definitions'
import { auth } from '@/auth'
import { fetchTourAndHotels } from '@/app/data/tours-data'
import SignOutForm from '@/app/ui/auth/sign-out-button'
import OrdersAccordion from '@/app/ui/profile/orders-accordion'
import Hero from '@/app/ui/hero'

export const metadata = {
  title: 'Личный кабинет',
}

export default async function Page() {
  const session = await auth()
  const userEmail = session?.user.email
  const user = await fetchUserByEmail(userEmail!)

  const orders = await fetchOrdersByUserId(user?.id)

  return (
    <>
      <Hero
        isParagraph={false}
        isButton={false}
        isFullHeight={false}
        title="Личный кабинет"
      />
      <section className="section items-start flex lg:flex-row flex-col gap-4 py-8">
        <div className="w-full">
          <h2 className="h2 text-center lg:text-start">{user?.name}</h2>
          <p className="p">
            <strong className="font-semibold">Электронная почта: </strong>
            {user?.email}
          </p>
          <p className="p mb-8">
            <strong className="font-semibold">Данные паспорта: </strong>
            {user?.passport}
          </p>
          <div className='text-center w-full lg:w-auto lg:text-start'>
            <SignOutForm />
          </div>
        </div>
        <div className="w-full py-8 lg:py-0">
          {orders.length > 0 ? (
            <>
              <h2 className="h2 text-center">Ваши заказы:</h2>
              <OrdersWrapper orders={orders} user={user} />
            </>
          ) : (
            <h2 className="h2">У вас нет заказов.</h2>
          )}
        </div>
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
