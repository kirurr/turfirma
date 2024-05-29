import { CategoryList } from '@/app/ui/category/category'

export const revalidate = 3600

export default async function Page() {
  return (
    <>
      <h1 className="h1 text-center">главная страница</h1>
      <h2 className="h2 text-center">категории</h2>
      <CategoryList />
    </>
  )
}
