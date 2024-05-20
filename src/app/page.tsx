import Link from 'next/link'
import { fetchCategories } from './data/categories-data'


export default async function Page() {
  const categories = await fetchCategories()
  return (
    <main>
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
