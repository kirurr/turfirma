import { fetchOrders } from '@/app/data/orders-data'
import { fetchTourAndHotels } from '@/app/data/tours-data'
import { fetchUserById } from '@/app/data/users-data'
import { Order } from '@/app/lib/definitions'
import { AdminOrder } from '@/app/ui/admin/orders/orders'

export default async function Page() {
  const orders = (await fetchOrders()).sort((a, b) => {
    if (a.status === 'paid') return -1
    if (b.status === 'paid') return 1
    return 0
  })

  return (
    <>
      <section className="section">
        <h2 className="h2 text-center">Заказы</h2>
      </section>
      <section>
        {orders.length > 0 ? (
          <ul>
            {orders.map((order, index) => (
              <OrderWrapper key={index} order={order} />
            ))}
          </ul>
        ) : (
          <h2 className="h2 text-center">Еще нет заказов</h2>
        )}
      </section>
    </>
  )
}

async function OrderWrapper({ order }: { order: Order }) {
  const tourData = await fetchTourAndHotels(order.tour_id)
  const userData = await fetchUserById(order.user_id)
  return <AdminOrder order={order} tour={tourData} user={userData} />
}
