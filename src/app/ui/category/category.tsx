import {
  fetchCategoriesBlobs,
  fetchCategories
} from '@/app/data/categories-data'
import Link from 'next/link'
import { Button } from '@nextui-org/react'
import Image from 'next/image'

export async function CategoryList() {
  const blobs = await fetchCategoriesBlobs()
  const toursImg = blobs.find((blob) => blob.pathname.includes('tours'))
  const categories = await fetchCategories()
  return (
    <ul className="grid grid-cols-3 grid-rows-2 gap-8">
      <CategoryItem
        img={toursImg?.url!}
        title={'Все туры'}
        alias={'tours'}
      />
      {categories.map((category) => {
        const img = blobs.find((blob) => blob.pathname.includes(category.image))
        return (
          <CategoryItem
            img={img?.url!}
            key={category.id}
            title={category.title}
            alias={category.alias}
          />
        )
      })}
    </ul>
  )
}

function CategoryItem({
  img,
  title,
  alias
}: {
  img: string
  title: string
  alias: string
}) {
  return (
    <li className="flex flex-col relative">
      <div className="relative w-full h-60 mb-4">
        <Image src={img} style={{objectFit: 'cover'}} fill alt="image"/>
      </div>
      <Button as={Link} href={alias} color="primary">
        {title}
      </Button>
    </li>
  )
}
