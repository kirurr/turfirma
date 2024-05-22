import Link from 'next/link'
import { fetchCategories } from '@/app/data/categories-data'
import AuthForms from '@/app/ui/auth-forms'
import SignOutForm from '@/app/ui/sign-out-button'
import { auth } from '@/auth'


export default async function Page() {
  const categories = await fetchCategories()
	const session = await auth()
	if (session?.user) {
		console.log(session)
	}

  return (
    <main>
			{session?.user && ( <span>{session.user.name}</span>)}
			<AuthForms />
      <SignOutForm />
      <h1>главная страница</h1>
      <p>категории</p>
      <ul>
        <li>
          <p>все туры</p>
          <Link href="tours">open</Link>
        </li>
        {categories.map((category) => (
          <li key={category.id}>
            <p>{category.title}</p>
            <Link href={category.alias}>open</Link>
          </li>
        ))}
      </ul>
    </main>
  )
}
