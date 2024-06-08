import { fetchOrdersByUserId } from '@/app/data/orders-data'
import { fetchReveiwsByUser } from '@/app/data/reviews-data'
import { fetchUsers } from '@/app/data/users-data'
import { User } from '@/app/lib/definitions'
import { AdminUserWrapper } from '@/app/ui/admin/users/users'
import { Spinner } from '@nextui-org/react'
import { Suspense } from 'react'

export const metadata = {
  title: 'Пользователи'
}

export default function Page() {
  return (
    <Suspense fallback={<Spinner size="lg" className="size-full" />}>
      <Users />
    </Suspense>
  )
}

async function Users() {
  const users = await fetchUsers()
  return (
    <ul>
      {users.map((user, index) => (
        <UserWrapper key={index} user={user} />
      ))}
    </ul>
  )
}

async function UserWrapper({ user }: { user: User }) {
  const ordersCount = (await fetchOrdersByUserId(user.id)).length
  const reviews = await fetchReveiwsByUser(user.id)
  return <AdminUserWrapper user={user} ordersCount={ordersCount} reviews={reviews} />
}
