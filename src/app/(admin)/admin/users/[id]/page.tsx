import { fetchUserById, fetchUsers } from '@/app/data/users-data'
import EditUsersForm from '@/app/ui/admin/users/edit-user-form'
import { notFound } from 'next/navigation'

export async function generateStaticParams() {
  const users = await fetchUsers()

  return users.map((user) => ({
    id: user.id
  }))
}

export default async function Page({ params }: { params: { id: string } }) {
  const user = await fetchUserById(params.id)
  if (!user) notFound()
  return <EditUsersForm userData={user} />
}
