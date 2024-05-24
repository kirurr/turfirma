'use client'

import { useFormState } from 'react-dom'
import { TourWithHotel } from '@/app/lib/definitions'
import { bookTour } from '@/app/actions/tour-actions'
import Link from 'next/link'

export default function BookForm({
  ids,
  tourData
}: {
  ids: { user_id?: string; tour_alias: string }
  tourData: TourWithHotel
}) {
  const bookTourWithId = bookTour.bind(null, ids)

  const [errorMessage, dispatch] = useFormState(bookTourWithId, undefined)
  return (
    <form action={dispatch}>
      <label htmlFor="hotel_id">выбрать отель</label>
      {tourData.hotels_info && tourData.hotels_info?.length > 0 ? (
        <select name="hotel_id" id="hotel_id" required>
          {tourData.hotels_info.map((hotel) => (
            <option key={hotel.hotel_id} value={hotel.hotel_id}>
              {hotel.hotel_title}
            </option>
          ))}
        </select>
      ) : (
        <p>в этом туре нельзя выбрать отель</p>
      )}
      <button type="submit">забронировать</button>
      {errorMessage && (
        <>
          <span>{errorMessage.message}</span>
          <Link href="/profile">личный кабинет</Link>
        </>
      )}
    </form>
  )
}
