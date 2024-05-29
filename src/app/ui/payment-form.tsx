'use client'
import { useFormState } from 'react-dom'
import Link from 'next/link'
import { changeOrderStatus } from '@/app/actions/order-actions'
import { Button, Input } from '@nextui-org/react'

export default function PaymentForm({ orderId }: { orderId: string }) {
  const changeOrderStatusWithId = changeOrderStatus.bind(null, orderId)
  const [state, dispatch] = useFormState(changeOrderStatusWithId, undefined)
  return (
    <form action={dispatch}>
      <Input isRequired required label="Номер карты" />
      <Button color="primary" className='my-4' type="submit">
        Оплатить
      </Button>
      <div>
        {state?.status ? (
          <>
            <p className="p">{state.message}</p>
            <Link href="/profile">Личный кабинет</Link>
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
