'use client'
import { useRouter } from 'next/navigation'

export default function Page() {
  const router = useRouter()
  return (
    <>
      <h1>нет такого заказа :(</h1>
      <button onClick={() => router.back()}>назад</button>
    </>
  )
}
