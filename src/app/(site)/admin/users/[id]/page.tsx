import { fetchUserById, fetchUsers } from '@/app/data/users-data'
import EditUsersForm from '@/app/ui/admin/users/edit-user-form'
import { notFound } from 'next/navigation'

export async function GenerateStaticParams() {
  const users = await fetchUsers()

  return users.map((user) => ({
    id: user.id
  }))
}

export default async function Page({ params }: { params: { id: string } }) {
  const user = await fetchUserById(params.id)
  if (!user) notFound()
  return (
    <section className="section !max-w-xl">
      <h2 className="h2 text-center">
        Редактирование пользователя {user.name}
      </h2>
      <EditUsersForm userData={user} />
    </section>
  )
}
