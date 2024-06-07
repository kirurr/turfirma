'use client'

import React from 'react'
import { Input, Select, SelectItem } from '@nextui-org/react'
import { FormButton } from '@/app/ui/auth/auth-forms'
import { Category } from '@/app/lib/definitions'
import { useRouter } from 'next/navigation'

export default function MainSearch({ categories }: { categories: Category[] }) {
  const params = new URLSearchParams()
  const { replace } = useRouter()

  function handleSearch(formData: FormData) {
    let { query, category } = Object.fromEntries(formData)
    if (!category) category = 'tours'
    params.set('query', query.toString())
    replace(`/${category}?${params.toString()}`)
  }
  return (
    <form
      action={handleSearch}
      className="sm:w-2/3 flex flex-col sm:flex-row items-center gap-4"
    >
      <Input label="Поиск" name="query" />
      <Select label="Категория" name="category">
        {categories.map((category) => (
          <SelectItem key={category.alias} value={category.alias}>
            {category.title}
          </SelectItem>
        ))}
      </Select>
      <FormButton isBig={true} title="Поиск" />
    </form>
  )
}
