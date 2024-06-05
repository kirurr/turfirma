import TopNav from '@/app/ui/top-nav'
import { auth } from '@/auth'
import { fetchCategories } from '../data/categories-data'

export const revalidate = 3600

export default async function Layout({
  children
}: {
  children: React.ReactNode
}) {
  const session = await auth()
  const isAuth = session?.user ? true : false
  const isAdmin = session?.user.role === 'admin'
  const categories = await fetchCategories(null)
  return (
    <>
      <TopNav isAuth={isAuth} isAdmin={isAdmin} categories={categories} />
      <main>
        {children}
      </main>
    </>
  )
}
