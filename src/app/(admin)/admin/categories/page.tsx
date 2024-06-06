import { fetchCategories } from '@/app/data/categories-data'
import { fetchTourCountByCategory } from '@/app/data/tours-data'
import { CategoriesWrapper } from '@/app/ui/admin/categories/categories'
import { Suspense } from 'react'
import { Spinner } from '@nextui-org/react'

export default function Page() {
  return (
    <Suspense fallback={<Spinner size='lg' className='size-full' />}>
      <Categories />
    </Suspense>
  )
}

async function Categories() {
  const categories = await fetchCategories(null)
  const toursPerCategory = await Promise.all(
    categories.map(async (category) => {
      const toursCount = await fetchTourCountByCategory(category.id)
      return { id: category.id, toursCount: toursCount }
    })
  )
  return (
    <CategoriesWrapper
      categories={categories}
      toursPerCategory={toursPerCategory}
    />
  )
}
