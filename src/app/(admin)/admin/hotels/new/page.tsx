'use client'

import React from 'react'
import { useFormState } from 'react-dom'
import { Button, Input, Textarea } from '@nextui-org/react'
import { FormButton } from '@/app/ui/auth/auth-forms'
import { HotelState, createHotel } from '@/app/actions/hotel-actions'
import Link from 'next/link'

export default function Page() {
  const initialState: HotelState = { status: false, message: '', errors: {} }
  const [result, dispatch] = useFormState(createHotel, initialState)

  return (
    <form action={dispatch} className="flex flex-col gap-4 w-full sm:w-2/3 mx-auto">
      <Input
        name="title"
        label="Название отеля"
        placeholder="Введите название отеля"
        isRequired
      />
      <Textarea
        name="description"
        label="Описание отеля"
        placeholder="Введите описание отеля"
        isRequired
      />
      <Input
        name="mapUrl"
        label="Ссылка на гугл-карту"
        description="Атрибут src для карты"
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
          href="/admin/hotels"
        >
          Отмена
        </Button>
      </div>
      {!result.status && <p>{result.message}</p>}
    </form>
  )
}
