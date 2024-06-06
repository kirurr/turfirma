'use client'

import { useRouter } from 'next/navigation'
import { Button } from '@nextui-org/react'

export default function Page() {
  const router = useRouter()

  return (
    <div className="text-center">
      <h2 className="h2 my-8">Такого пользователя нет :(</h2>
      <Button color="primary" onPress={() => router.back()}>
        Назад
      </Button>
    </div>
  )
}
