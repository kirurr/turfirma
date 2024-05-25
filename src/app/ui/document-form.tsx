'use client'

import { useFormState } from 'react-dom'
import { Order, TourWithHotel, User } from '../lib/definitions'
import { generateTourDocument } from '../actions/order-actions'

export default function DocumentForm({
  orderData,
  tourData,
  userData
}: {
  orderData: Order
  tourData: TourWithHotel
  userData: User
}) {
  const prevState: { status: boolean; message: string } = {
    status: false,
    message: ''
  }
  const generateTourDocumentWithData = generateTourDocument.bind(null, {
    orderData,
    tourData,
    userData
  })
  const [state, dispatch] = useFormState(
    generateTourDocumentWithData,
    prevState
  )
  return (
    <>
      {!state.status ? (
        <form action={dispatch}>
          <button type="submit">получить документ по туру</button>
        </form>
      ) : (
        <a
          href={state.message}
          download={`document-${tourData.tour_alias}.pdf`}
        >
          скачать документ
        </a>
      )}
    </>
  )
}
