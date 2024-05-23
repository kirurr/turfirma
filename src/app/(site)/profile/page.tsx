import { fetchUserByEmail } from '@/app/data/users-data'
import { auth } from '@/auth'

export default async function Page() {
  const session = await auth()
  const userEmail = session?.user.email
  let user
  if (userEmail) user = await fetchUserByEmail(userEmail)

  return (
    <div>
      <h1>profile</h1>
      <p>{user?.name}</p>
    </div>
  )
}
