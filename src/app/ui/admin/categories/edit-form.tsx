'use client'

import { CategoryState, updateCategory } from "@/app/actions/category-actions"
import { Category } from "@/app/lib/definitions"
import { Button, Input, Textarea } from "@nextui-org/react"
import { useFormState } from "react-dom"
import { FormButton } from "../../auth/auth-forms"

export default function EditForm({category }: {category: Category}) {

  const initialState: CategoryState = {
    status: false,
    message: '',
    errors: {}
  }
  const updateCategoryWithPrevData = updateCategory.bind(null, category)
  const [result, dispatch] = useFormState(updateCategoryWithPrevData, initialState)
  return (
    <form action={dispatch} className="flex flex-col gap-4">
      <div>
        <label className="mb-2 block" htmlFor="image">
          Изображение <span className="text-red-500"></span>
        </label>
        <input
          className="input-file"
          type="file"
          id="image"
          name="image"
          accept="image/*"
        />
        <p className="my-4">Внимание! При загрузки нового изображения старое будет удалено.</p>
      </div>
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
      <div className="mx-auto">
      <FormButton title="Применить" />
      <Button color="danger" className="ml-4" variant="bordered">
        Отмена
      </Button>
      </div>
      {!result.status && <p>{result.message}</p>}
    </form>
  )}