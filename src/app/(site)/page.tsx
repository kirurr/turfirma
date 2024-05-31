import { CategoryList } from '@/app/ui/category/category'

export const revalidate = 3600

export default async function Page() {
  return (
    <>
      <section className="section">
        <h1 className="h1 text-center">главная страница</h1>
      </section>
      <section className="section">
        <h2 className="h2 text-center">категории</h2>
        <CategoryList />
      </section>
    </>
  )
}
