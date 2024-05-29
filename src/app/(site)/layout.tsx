import TopNav from '@/app/ui/top-nav'
import { auth } from '@/auth'


export default async function Layout({ children }: { children: React.ReactNode }) {
	const session = await auth()
	const isAuth = session?.user ? true : false
  const isAdmin = session?.user.role === 'admin'
  return (
    <>
			<header>
				<TopNav isAuth={isAuth} isAdmin={isAdmin}/>
			</header>
      <main className='w-1/2 mx-auto'>
        {children}
      </main>
    </>
  )
}