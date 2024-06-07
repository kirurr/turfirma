'use client'

import React from 'react'
import { useFormState } from 'react-dom'
import {
  Input,
  Textarea,
  Select,
  SelectItem,
  DateInput,
  Button
} from '@nextui-org/react'
import { FormButton } from '@/app/ui/auth/auth-forms'
import { Category, HotelWithBlob } from '@/app/lib/definitions'
import Image from 'next/image'
import { TourState, createTour } from '@/app/actions/tour-actions'
import Link from 'next/link'

export default function NewTourForm({
  hotels,
  categories
}: {
  hotels: HotelWithBlob[]
  categories: Category[]
}) {
  const initialState: TourState = { status: false, message: '', errors: {} }
  const [result, dispatch] = useFormState(createTour, initialState)

  return (
    <form action={dispatch} className="flex flex-wrap">
      <div className="w-full sm:w-1/2 flex flex-col gap-4 sm:pr-2">
        <Input name="title" label="Название тура" isRequired />
        <Textarea name="description" label="Описание тура" isRequired />
        <Input name="price" type="number" label="Цена тура" isRequired />
        <Textarea name="program" label="Программа тура" isRequired />
        <div>
          <label className="mb-2 block" htmlFor="image">
            Изображения <span className="text-red-500">*</span>
          </label>
          <input
            className="input-file"
            type="file"
            id="image"
            multiple
            name="image"
            accept="image/*"
            required
          />
        </div>
      </div>
      <div className="w-full sm:w-1/2 flex flex-col gap-4 mt-4 sm:m-0 sm:pl-2">
        <Select
          items={hotels}
          label="Выберите отели"
          name="hotels"
          selectionMode="multiple"
          description="Не обязательно"
        >
          {(hotel) => (
            <SelectItem key={hotel.id} value={hotel.id} textValue={hotel.title}>
              <div className="flex gap-2 items-center py-2">
                <div className="relative aspect-square h-[3rem] overflow-hidden rounded-lg">
                  <Image
                    src={hotel.image.url}
                    alt="Изображение отеля"
                    fill
                    className="object-cover"
                  />
                </div>
                <span className="text-lg">{hotel.title}</span>
              </div>
            </SelectItem>
          )}
        </Select>
        <Select
          items={categories}
          label="Выберите категорию"
          name="category"
          isRequired
        >
          {categories.map((category) => (
            <SelectItem
              key={category.id}
              value={category.id}
              textValue={category.title}
            >
              {category.title}
            </SelectItem>
          ))}
        </Select>
        <Textarea
          isRequired
          name="included"
          label="Что включено в стоимость"
          placeholder="Еда; Страховка; Пиво"
          description="Перечислить через ; "
        />
        <Textarea
          isRequired
          name="excluded"
          placeholder="Страховка; Пиво"
          label="Что не включено в стоимость"
          description="Перечислить через ; "
        />
        <DateInput label="Дата начала" name="date" isRequired />
        <Input
          name="duration"
          type="number"
          label="Продолжительность"
          isRequired
        />
      </div>
      <div className="w-full flex flex-col gap-4 mt-4">
      <div className="w-full flex justify-center gap-2 mt-4">
        <FormButton title="Применить" />
        <Button as={Link} href="/admin/tours" variant="bordered" color="danger">
          Отмена
        </Button>
      </div>
        {!result.status && <p>{result.message}</p>}
      </div>
    </form>
  )
}
