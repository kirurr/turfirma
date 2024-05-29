'use client'

import { useRouter } from 'next/navigation'
import { Button } from '@nextui-org/react'

export default function Page() {
  const router = useRouter()

  return (
    <main>
      <h1 className='h1 text-center'>Такой категории нет :(</h1>
      <Button color='primary' onPress={() => router.back()}>Назад</Button>
    </main>
  )
}
