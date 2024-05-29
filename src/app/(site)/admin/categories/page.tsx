import { fetchCategories } from '@/app/data/categories-data'
import { fetchTourCountByCategory } from '@/app/data/tours-data'
import { CategoriesWrapper } from '@/app/ui/admin/categories/categories'
import { Button } from '@nextui-org/react'
import Link from 'next/link'

export default async function Page() {
  const categories = await fetchCategories(null)
  const toursPerCategory = await Promise.all(categories.map(async (category) => {
    const toursCount = await fetchTourCountByCategory(category.id)
    return {id: category.id, toursCount: toursCount }
  }))
  return (
    <>
      <section className="section text-center">
        <h2 className="h2 text-center">Категории</h2>
        <Button color="primary" as={Link} href="categories/new" className='' >
          Добавить
        </Button>
      </section>
      <section className="section">
        <CategoriesWrapper categories={categories} toursPerCategory={toursPerCategory} />
      </section>
    </>
  )
}
