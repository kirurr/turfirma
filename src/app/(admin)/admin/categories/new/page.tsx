'use client'

import React from 'react'
import { CategoryState, createCategory } from '@/app/actions/category-actions'
import { useFormState } from 'react-dom'
import { Button, Input, Textarea } from '@nextui-org/react'
import { FormButton } from '@/app/ui/auth/auth-forms'
import Link from 'next/link'

export default function Page() {
  const initialState: CategoryState = { status: false, message: '', errors: {} }
  const [result, dispatch] = useFormState(createCategory, initialState)

  return (
    <form action={dispatch} className="flex flex-col gap-4 w-2/3 mx-auto">
      <Input
        name="title"
        label="Название категории"
        placeholder="Введите название категории"
        isRequired
      />
      <Textarea
        name="description"
        label="Описание категории"
        placeholder="Введите описание категории"
        isRequired
      />
      <div>
        <label className="mb-2 block" htmlFor="image">
          Изображение <span className="text-red-500">*</span>
        </label>
        <input
          className="input-file"
          type="file"
          id="image"
          name="image"
          accept="image/*"
          required
        />
      </div>
      <div className="flex items-center justify-center gap-4">
        <FormButton title="Создать" />
        <Button
          variant="bordered"
          color="danger"
          as={Link}
          href="/admin/categories"
        >
          Отмена
        </Button>
      </div>
      {!result.status && <p>{result.message}</p>}
    </form>
  )
}
