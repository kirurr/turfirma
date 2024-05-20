'use client'

import { useRouter } from 'next/navigation'

export default function Page() {
  const router = useRouter()

  return (
    <main>
      <h1>такой категории нет :(</h1>
      <button onClick={() => router.back()}>назад</button>
    </main>
  )
}
