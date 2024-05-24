'use client'
import { useFormState } from 'react-dom'
import Link from 'next/link'
import { changeOrderStatus } from '@/app/actions/order-actions'

export default function PaymentForm({ orderId }: { orderId: string }) {
  const changeOrderStatusWithId = changeOrderStatus.bind(null, orderId)
  const [state, dispatch] = useFormState(changeOrderStatusWithId, undefined)
  return (
    <form action={dispatch}>
      <div>
        <label htmlFor="card">номер карты</label>
        <input id="card" type="text" required />
      </div>
      <button type="submit">оплатить</button>
      <div>
        {state?.status ? (
          <>
            <span>{state.message}</span>
            <Link href="/profile">личный кабинет</Link>
          </>
        ) : (
          <>
            <span>{state?.message}</span>
          </>
        )}
      </div>
    </form>
  )
}
