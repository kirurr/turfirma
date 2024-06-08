'use client'

import React from 'react'
import { useFormState } from 'react-dom'
import { TourWithHotel } from '@/app/lib/definitions'
import { CreateOrderState, createOrder } from '@/app/actions/tour-actions'
import { Button, Select, SelectItem } from '@nextui-org/react'
import Link from 'next/link'

export default function BookForm({
  ids,
  tourData
}: {
  ids: { user_id?: string; tour_id: string }
  tourData: TourWithHotel
}) {
  const bookTourWithId = createOrder.bind(null, ids)

  const inititalState: CreateOrderState = {
    status: false,
    message: '',
    errors: {}
  }
  const [errorMessage, dispatch] = useFormState(bookTourWithId, inititalState)
  return (
    <form action={dispatch} className="flex flex-col gap-4">
      {tourData.hotels_info && tourData.hotels_info?.length > 0 ? (
        <Select
          name="hotel_id"
          label="Выберите отель"
          defaultSelectedKeys={new Set([tourData.hotels_info[0].id])}
          isRequired
        >
          {tourData.hotels_info.map((hotel) => (
            <SelectItem key={hotel.id} value={hotel.id}>
              {hotel.title}
            </SelectItem>
          ))}
        </Select>
      ) : (
        <>
          <input name="hotel_id" value="no_hotel" readOnly className="hidden" />
          <p className="text-center text-xl"></p>
        </>
      )}
      <Button color="primary" type="submit">
        Забронировать
      </Button>
      {errorMessage?.status && (
        <div className="text-center">
          <p className="p font-semibold mt-4">{errorMessage.message}</p>
          <Link className="link text-xl" href="/profile">
            Личный кабинет
          </Link>
        </div>
      )}
    </form>
  )
}
