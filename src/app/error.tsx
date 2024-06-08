'use client'

import { Button } from '@nextui-org/react'

export default function Error({
  error,
  reset
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  // useEffect(() => {
  //   console.log(error)
  // }, [error])

  return (
    <div className="flex flex-col items-center justify-center text-center h-screen">
      <h1 className="h1">ошибка 500</h1>
      <Button color="primary" onPress={() => reset()}>
        Попробовать снова
      </Button>
    </div>
  )
}
