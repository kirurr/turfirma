import { fetchToursPages } from '@/app/data/tours-data'
import { notFound } from 'next/navigation'
import { fetchCategories, fetchCategoryById, fetchCategoryIdByAlias } from '@/app/data/categories-data'
import Search from '@/app/ui/category/search'
import Pagination from '@/app/ui/category/pagination'
import ToursWrapper from '@/app/ui/category/tours'
import CategoryBreadcumbs from '@/app/ui/category/breadcrumbs'
import { Category } from '@/app/lib/definitions'

export async function generateStaticParams() {
  const categories = await fetchCategories(null)
  categories.push({alias: 'tours'} as Category)
  
  return categories.map(category => ({category: category.alias}))
} 

export default async function Page({
  params,
  searchParams
}: {
  params: { category: string }
  searchParams: { query: string; page?: string }
}) {
  const id = await fetchCategoryIdByAlias(params.category)
  const category = await fetchCategoryById(params.category === 'tours' ? 'tours' : id!)

  if (category === undefined) {
    notFound()
  }

  const pages = await fetchToursPages(
    category === null ? null : category.id,
    searchParams.query
  )
  const title = category === null ? 'tours' : category.title

  return (
    <>
      <CategoryBreadcumbs category={category} />
      <h1 className="h1 text-center">{title}</h1>
      <Search />
      <ToursWrapper params={params} searchParams={searchParams} />
      {pages > 1 && (
        <Pagination className="mx-auto size-fit" totalPages={pages} />
      )}
    </>
  )
}
