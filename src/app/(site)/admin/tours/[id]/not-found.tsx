'use client'

import { useRouter } from 'next/navigation'
import { Button } from '@nextui-org/react'

export default function Page() {
  const router = useRouter()

  return (
    <section className='section text-center'>
      <h1 className='h1 mb-8'>Такого тура нет :(</h1>
      <Button color='primary' size='lg' onPress={() => router.back()}>Назад</Button>
    </section>
  )
}
