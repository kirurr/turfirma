import { fetchCategories } from '@/app/data/categories-data'
import { fetchHotels } from '@/app/data/hotels-data'
import { fetchNotPaidOrders, fetchOrders } from '@/app/data/orders-data'
import {
  fetchAllReviews,
  fetchNotAcceptedReviews
} from '@/app/data/reviews-data'
import { fetchAllTours } from '@/app/data/tours-data'
import { fetchUsers } from '@/app/data/users-data'
import { Button, Divider, Spinner } from '@nextui-org/react'
import Link from 'next/link'
import { Suspense } from 'react'

export default function Page() {
  return (
    <Suspense fallback={<Spinner size="lg" className="size-full" />}>
      <Main />
    </Suspense>
  )
}

async function Main() {
  const [
    orders,
    notAcceptedReviews,
    notPaidOrders,
    users,
    tours,
    hotels,
    reviews,
    categories
  ] = await Promise.all([
    fetchOrders(),
    fetchNotAcceptedReviews(),
    fetchNotPaidOrders(),
    fetchUsers(),
    fetchAllTours(),
    fetchHotels(),
    fetchAllReviews(),
    fetchCategories(null)
  ])
  return (
    <div className="text-center flex flex-col lg:items-center items-baseline sm:grid grid-cols-2 grid-rows-[max-content_max-content] size-fit">
      <div className="row-span-2 w-full sm:w-auto">
        <h2 className="h2 mb-4">Статистика</h2>
        <p className="p font-semibold">Категории: {categories.length}</p>
        <p className="p font-semibold">Туры: {tours.length}</p>
        <p className="p font-semibold">Отели: {hotels.length}</p>
        <p className="p font-semibold">Пользователи: {users.length}</p>
        <p className="p font-semibold">Отзывы: {reviews.length}</p>
        <p className="p font-semibold">Заказы: {orders.length}</p>
        <Divider className='my-8 block sm:hidden' />
      </div>
      <div>
        {notAcceptedReviews.length > 0 ? (
          <>
            <h2 className="h2 mb-4">
              Не принятые отзывы: {notAcceptedReviews.length}
            </h2>
            <Button as={Link} href="admin/reviews" color="primary">
              Просмотреть отзывы
            </Button>
          </>
        ) : (
          <h2 className="h2 mb-4">Нет не принятых отзывов</h2>
        )}
        <Divider className='my-8 block sm:hidden' />
      </div>
      <div>
        {notPaidOrders.length > 0 ? (
          <>
            <h2 className="h2 mb-4">
              Не оплаченные заказы: {notPaidOrders.length}
            </h2>
            <Button as={Link} href="admin/orders" color="primary">
              Просмотреть заказы
            </Button>
          </>
        ) : (
          <h2 className="h2 mb-4">Нет не оплаченных заказов</h2>
        )}
      </div>
    </div>
  )
}
