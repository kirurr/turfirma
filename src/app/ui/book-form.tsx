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
  const isHotels = tourData.hotels_info !== undefined

  const inititalState: CreateOrderState = {status: false, message: '', errors: {}}
  const [errorMessage, dispatch] = useFormState(bookTourWithId, inititalState)
  return (
    <form action={dispatch}>
      {tourData.hotels_info && tourData.hotels_info?.length > 0 ? (
        <Select name="hotel_id" label='Выберите отель' isRequired>
          {tourData.hotels_info.map((hotel) => (
            <SelectItem key={hotel.id} value={hotel.id}>
              {hotel.title}
            </SelectItem>
          ))}
        </Select>
      ) : (
      <>
        <input name='hotel_id' value='no_hotel' readOnly className='hidden' />
        <p>в этом туре нельзя выбрать отель</p>
      </>
      )}
      <Button color='primary' type="submit">Забронировать</Button>
      {errorMessage?.status && (
        <div>
          <p>{errorMessage.message}</p>
          <Link href="/profile" >Личный кабинет</Link>
        </div>
      )}
    </form>
  )
}