import Link from 'next/link'
import { fetchTours } from '@/app/data/tours-data'
import { formatDateFromPostgreSQL } from '@/app/lib/utils'
import { notFound } from 'next/navigation'
import { fetchCategoryByAlias } from '@/app/data/categories-data'
import Search from '@/app/ui/search'

export default async function Page({
  params,
  searchParams
}: {
  params: { category: string }
  searchParams: { query: string }
}) {
  const category = await fetchCategoryByAlias(params.category)

  if (!category) {
    notFound()
  }
  const tours = await fetchTours(params.category, searchParams.query)

  return (
    <main>
      <Search />
      <h1>{category.title}</h1>
			{tours.length !== 0 ? (
			<ul>
				{tours.map((tour) => (
					<li key={tour.id}>
						<p>{tour.title}</p>
						<p>{formatDateFromPostgreSQL(tour.date.toString())}</p>
						<Link href={`${params.category}/${tour.alias}`}>открыть</Link>
					</li>
				))}
			</ul>
			) : (
				<h2>Туров не найдено</h2>
			)}
    </main>
  )
}
