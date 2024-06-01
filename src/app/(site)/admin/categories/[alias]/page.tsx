import {
  fetchCategories,
  fetchCategoriesBlobs,
  fetchCategoryById,
  fetchCategoryIdByAlias
} from '@/app/data/categories-data'
import { Category } from '@/app/lib/definitions'
import { notFound } from 'next/navigation'
import EditForm from '@/app/ui/admin/categories/edit-form'

export async function generateStaticParams() {
  const categories = await fetchCategories(null)

  return categories.map((category) => ({ alias: category.alias }))
}

export default async function Page({ params }: { params: { alias: string } }) {
  const id = await fetchCategoryIdByAlias(params.alias)
  if (!id) notFound()
  const category = (await fetchCategoryById(id.id!)) as Category
  if (!category) notFound()
  const images = await fetchCategoriesBlobs()

  return (
    <section className="section">
      <h2 className="h2 text-center !mb-8">
        Редактирование категории: {category.title}
      </h2>
      <EditForm images={images} category={category} />
    </section>
  )
}
