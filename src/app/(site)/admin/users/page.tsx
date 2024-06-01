import { fetchOrdersByUserId } from '@/app/data/orders-data'
import { fetchUsers } from '@/app/data/users-data'
import { User } from '@/app/lib/definitions'
import { AdminUserWrapper } from '@/app/ui/admin/users/users'

export default async function Page() {
  const users = await fetchUsers()
  return (
    <>
      <section className="section">
        <h2 className="h2 text-center">Пользователи</h2>
      </section>
      <section className="section">
        <ul>
          {users.map((user, index) => (
            <UserWrapper key={index} user={user} />
          ))}
        </ul>
      </section>
    </>
  )
}

async function UserWrapper({ user }: { user: User }) {
  const ordersCount = (await fetchOrdersByUserId(user.id)).length
  return <AdminUserWrapper user={user} ordersCount={ordersCount} />
}
