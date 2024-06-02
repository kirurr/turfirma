'use client'

import { useFormState } from 'react-dom'
import { Hotel } from '@/app/lib/definitions'
import { ListBlobResultBlob } from '@vercel/blob'
import { HotelState, updateHotel } from '@/app/actions/hotel-actions'
import { Button, Input, Textarea } from '@nextui-org/react'
import { FormButton } from '../../auth/auth-forms'
import Link from 'next/link'
import Image from 'next/image'

export default function EditHotelForm({
  hotel,
  image
}: {
  hotel: Hotel
  image: ListBlobResultBlob
}) {
  const initialState: HotelState = { status: false, message: '', errors: {} }
  const updateHotelWithPrevData = updateHotel.bind(null, hotel)
  const [result, dispatch] = useFormState(updateHotelWithPrevData, initialState)

  return (
    <form action={dispatch} className="flex flex-col gap-4">
      <div className="flex gap-4">
        <div className="size-full flex flex-col gap-4">
          <Input
            name="title"
            label="Название отеля"
            placeholder="Введите название отеля"
            defaultValue={hotel.title}
            isRequired
          />
          <Textarea
            name="description"
            label="Описание отеля"
            placeholder="Введите описание отеля"
            defaultValue={hotel.description}
            isRequired
          />
          <Input
            name="mapUrl"
            label="Ссылка на гугл-карту"
            description="Атрибут src для карты"
            defaultValue={hotel.map_url}
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
