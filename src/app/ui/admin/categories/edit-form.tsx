'use client'

import { CategoryState, updateCategory } from '@/app/actions/category-actions'
import { Category } from '@/app/lib/definitions'
import { Button, Input, Textarea } from '@nextui-org/react'
import { useFormState } from 'react-dom'
import { FormButton } from '@/app/ui/auth/auth-forms'
import { ListBlobResultBlob } from '@vercel/blob'
import Image from 'next/image'
import Link from 'next/link'

export default function EditForm({
  category,
  images
}: {
  category: Category
  images: ListBlobResultBlob[]
}) {
  const initialState: CategoryState = {
    status: false,
    message: '',
    errors: {}
  }
  const updateCategoryWithPrevData = updateCategory.bind(null, category)
  const [result, dispatch] = useFormState(
    updateCategoryWithPrevData,
    initialState
  )
  const image = images.find((image) => image.pathname.includes(category.image))
  return (
    <form action={dispatch} className="flex flex-col gap-4">
      <div className="flex gap-4">
        <div className="size-full flex flex-col gap-4">
          <Input
            name="title"
            label="Название категории"
            placeholder="Введите название категории"
            defaultValue={category.title}
            isRequired
          />
          <Textarea
            name="description"
            label="Описание категории"
            placeholder="Введите описание категории"
            defaultValue={category.description}
            isRequired
          />
          <div className="">
            <FormButton title="Применить" />
            <Button
              as={Link}
              href="/admin/categories"
              color="danger"
              className="ml-4"
              variant="bordered"
            >
              Отмена
            </Button>
          </div>
        </div>
        <div>
          <p className="p">Текущее изображение:</p>
          <div className="relative h-[20rem] w-[30rem] overflow-hidden rounded-lg mb-4">
            <Image
              src={image?.url!}
              fill
              alt="Изображение категории"
              className="object-cover"
            />
          </div>
          <div className="w-full">
            <input
              className="input-file"
              type="file"
              id="image"
              name="image"
              accept="image/*"
            />
            <p className="my-4">
              Внимание! При загрузки нового изображения старое будет удалено.
            </p>
          </div>
        </div>
      </div>
      {!result.status && <p>{result.message}</p>}
    </form>
  )
}
