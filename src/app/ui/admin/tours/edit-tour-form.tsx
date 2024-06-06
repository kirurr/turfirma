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
import { Category, HotelWithBlob, TourWithHotel } from '@/app/lib/definitions'
import Image from 'next/image'
import { TourState, updateTour } from '@/app/actions/tour-actions'
import { parseDate } from '@internationalized/date'
import Link from 'next/link'

export default function EditTourForm({
  hotels,
  categories,
  tour
}: {
  hotels: HotelWithBlob[]
  categories: Category[]
  tour: TourWithHotel
}) {
  const initialState: TourState = { status: false, message: '', errors: {} }
  const updateTourWithPrevData = updateTour.bind(null, tour)
  const [result, dispatch] = useFormState(updateTourWithPrevData, initialState)

  const date = parseDate(new Date(tour.date).toISOString().split('T')[0])

  return (
    <form action={dispatch} className="flex flex-wrap">
      <div className="w-1/2 flex flex-col gap-4 pr-2">
        <Input
          name="title"
          label="Название тура"
          isRequired
          defaultValue={tour.title}
        />
        <Textarea
          name="description"
          label="Описание тура"
          isRequired
          defaultValue={tour.description}
        />
        <Input
          name="price"
          type="number"
          label="Цена тура"
          isRequired
          defaultValue={tour.price.toString()}
        />
        <Textarea
          name="program"
          label="Программа тура"
          isRequired
          defaultValue={tour.program}
        />
        <div>
          <label className="mb-2 block" htmlFor="image">
            Изображения
          </label>
          <input
            className="input-file"
            type="file"
            id="image"
            multiple
            name="image"
            accept="image/*"
          />
          <p className="text-md mt-2">
            Внимание! При загрузке новых изображений, предыдущие будут удалены.
          </p>
        </div>
      </div>
      <div className="w-1/2 flex flex-col gap-4 pl-2">
        <Select
          items={hotels}
          label="Выберите отели"
          name="hotels"
          selectionMode="multiple"
          description="Не обязательно"
          selectedKeys={tour.hotels_info.map((hotel) => hotel.id)}
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
          selectedKeys={new Set([tour.category_id])}
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
          defaultValue={tour.included.join('; ')}
        />
        <Textarea
          isRequired
          name="excluded"
          placeholder="Страховка; Пиво"
          label="Что не включено в стоимость"
          description="Перечислить через ; "
          defaultValue={tour.excluded.join('; ')}
        />
        <DateInput
          label="Дата начала"
          name="date"
          isRequired
          defaultValue={date}
        />
        <Input
          name="duration"
          type="number"
          label="Продолжительность"
          isRequired
          defaultValue={tour.duration.toString()}
        />
      </div>
      <div className="w-full flex justify-center gap-2 mt-4">
        <FormButton title="Применить" />
        <Button as={Link} href="/admin/tours" variant="bordered" color="danger">
          Отмена
        </Button>
      </div>
        {!result.status && <p>{result.message}</p>}
    </form>
  )
}
