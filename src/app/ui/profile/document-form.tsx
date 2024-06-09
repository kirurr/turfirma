'use client'

import { useFormState } from 'react-dom'
import { Order, TourWithHotel, User } from '@/app//lib/definitions'
import { generateTourDocument } from '@/app/actions/order-actions'
import { FormButton } from '@/app/ui/auth/auth-forms'
import Link from 'next/link'

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
        <>
          <form action={dispatch}>
            <FormButton title="Получить документ по туру" />
          </form>
          {state.message && <p className="p">{state.message}</p>}
        </>
      ) : (
        <Link
          className="link"
          target="_blank"
          href={state.message}
          download={`document-${tourData.alias}.pdf`}
        >
          Скачать документ
        </Link>
      )}
    </>
  )
}
