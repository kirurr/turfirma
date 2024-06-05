import {
  fetchCategoriesBlobs,
  fetchCategories
} from '@/app/data/categories-data'
import Link from 'next/link'
import Image from 'next/image'
import { fetchAllTours, fetchTourCountByCategory } from '@/app/data/tours-data'
import { Category } from '@/app/lib/definitions'
import { Chip } from '@nextui-org/react'

export async function CategoryList() {
  const blobs = await fetchCategoriesBlobs()
  const toursImg = blobs.find((blob) => blob.pathname.includes('tours'))
  const categories = await fetchCategories()
  return (
    <ul className="grid grid-cols-3 grid-rows-2 gap-8 py-8">
      <CategoryItem
        img={toursImg?.url!}
        categoryData={
          { id: 'tours', title: 'Все туры', alias: 'tours' } as Category
        }
      />
      {categories.map((category) => {
        const img = blobs.find((blob) => blob.pathname.includes(category.image))
        return (
          <CategoryItem
            img={img?.url!}
            key={category.id}
            categoryData={category}
          />
        )
      })}
    </ul>
  )
}

async function CategoryItem({
  img,
  categoryData
}: {
  img: string
  categoryData: Category
}) {
  let categoryTours
  if (categoryData.id === 'tours')
    categoryTours = (await fetchAllTours()).length
  else categoryTours = await fetchTourCountByCategory(categoryData.id)

  return (
    <li className="relative shadow h-[16rem] rounded-lg flex flex-col justify-end items-start hover:-translate-y-5 transition-all group ">
      <Image
        src={img}
        className="object-cover category-wrapper rounded-lg select-none pointer-events-none"
        fill
        alt="image"
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
      />
      <div className="bg-gradient-to-b rounded-lg from-transparent via-transparent to-secondary-color absolute size-full z-10"></div>
      <Link
        href={`/${categoryData.alias}`}
        className="size-full absolute z-50 rounded-lg focus-visible:outline-2 outline-primary-500 outline-offset-4"
      ></Link>
      <div className="p-2 flex items-center gap-4 border-2 absolute ml-4 mb-4 z-10 border-gray-50/10 rounded-lg backdrop-blur-sm">
        <h3 className="h3 text-text-secondary !m-0 group-hover:text-primary-500 transition-all">
          {categoryData.title}
        </h3>
        <Chip
          variant="bordered"
          size="sm"
          className="border-text-secondary text-text-secondary mt-[0.2rem] group-hover:text-primary-500 transition-all group-hover:border-primary-500"
        >
          Количество туров: {categoryTours}
        </Chip>
      </div>
    </li>
  )
}
