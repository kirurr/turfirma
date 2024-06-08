'use client'

import { useRouter } from 'next/navigation'
import { Button } from '@nextui-org/react'

export default function Page() {
  const router = useRouter()

  return (
    <main className="flex flex-col items-center justify-center text-center h-screen">
      <h1 className="h1 text-center">Такого тура нет :(</h1>
      <Button onClick={() => router.back()} color="primary">
        Назад
      </Button>
    </main>
  )
}
