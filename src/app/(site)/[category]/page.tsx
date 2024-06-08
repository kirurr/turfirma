import { fetchToursPages } from '@/app/data/tours-data'
import { notFound } from 'next/navigation'
import {
  fetchCategories,
  fetchCategoriesBlobs,
  fetchCategoryById,
  fetchCategoryIdByAlias
} from '@/app/data/categories-data'
import Search from '@/app/ui/category/search'
import Pagination from '@/app/ui/category/pagination'
import ToursWrapper from '@/app/ui/category/tours'
import CategoryBreadcumbs from '@/app/ui/category/breadcrumbs'
import { Category } from '@/app/lib/definitions'
import Hero from '@/app/ui/hero'
import { Metadata, ResolvingMetadata } from 'next'
import { Suspense } from 'react'
import { Spinner } from '@nextui-org/react'
import ToursFallback from '@/app/ui/category/tours-fallback'

type Props = {
  params: { category: string }
  searchParams: { [key: string]: string | string[] | undefined }
}

export async function generateMetadata(
  { params, searchParams }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const alias = params.category === 'tours' ? 'tours' : params.category

  const id = await fetchCategoryIdByAlias(alias)
  if (id === null) return { title: 'Все туры' }
  const category = await fetchCategoryById(id.id)
  return { title: category?.title }
}

export async function generateStaticParams() {
  const categories = await fetchCategories(null)
  categories.push({ alias: 'tours' } as Category)

  return categories.map((category) => ({ category: category.alias }))
}

export default async function Page({
  params,
  searchParams
}: {
  params: { category: string }
  searchParams: { query: string; page?: string }
}) {
  const id = await fetchCategoryIdByAlias(params.category)
  const category = await fetchCategoryById(
    params.category === 'tours' ? 'tours' : id?.id!
  )

  if (category === undefined) {
    notFound()
  }

  const pages = await fetchToursPages(
    category === null ? null : category.id,
    searchParams.query
  )

  const title = category === null ? 'Все туры' : category.title
  let image
  if (category !== null) {
    image = (await fetchCategoriesBlobs()).find((blob) =>
      blob.pathname.includes(category!.image)
    )?.url
  }

  return (
    <>
      <Hero
        imageUrl={image}
        title={title}
        isFullHeight={false}
        isButton={false}
        isParagraph={false}
      />
      <section className="section py-8 sm:pb-8">
        <CategoryBreadcumbs category={category} />
        <Search className="mt-8" />
      </section>
      <section className="section pt-4">
        <Suspense fallback={<ToursFallback />}>
          <ToursWrapper params={params} searchParams={searchParams} />
        </Suspense>
        {pages > 1 && (
          <Pagination className="mx-auto my-16 size-fit" totalPages={pages} />
        )}
      </section>
      {category !== null && (
        <section className="section">
          <h2 className="h2">{category.title}</h2>
          <p className="p">{category.description}</p>
        </section>
      )}
    </>
  )
}
