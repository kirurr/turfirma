'use client'

import React from 'react'
import { useFormState } from 'react-dom'
import Link from 'next/link'
import { changeOrderStatus } from '@/app/actions/order-actions'
import { Input } from '@nextui-org/react'
import { FormButton } from './auth/auth-forms'

export default function PaymentForm({ orderId }: { orderId: string }) {
  const changeOrderStatusWithId = changeOrderStatus.bind(null, orderId)
  const [state, dispatch] = useFormState(changeOrderStatusWithId, undefined)
  return (
    <form action={dispatch}>
      <Input isRequired required label="Номер карты" />
      <FormButton className="my-4" title="Оплатить" />
      <div>
        {state && state?.status ? (
          <>
            <p className="p font-semibold mt-4">{state.message}</p>
            <Link className="link text-xl" href="/profile">
              Личный кабинет
            </Link>
          </>
        ) : (
          <>
            <p className="p">{state?.message}</p>
          </>
        )}
      </div>
    </form>
  )
}
