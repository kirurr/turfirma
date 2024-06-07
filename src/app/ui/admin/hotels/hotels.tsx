'use client'

import { deleteHotel } from '@/app/actions/hotel-actions'
import { Hotel } from '@/app/lib/definitions'
import { Button, Spinner, Tooltip } from '@nextui-org/react'
import Link from 'next/link'
import { useState } from 'react'

export function AdminHotelWrapper({
  hotel,
  toursCount
}: {
  hotel: Hotel
  toursCount: number
}) {
  const [isLoading, setIsLoading] = useState(false)
  const [prevState, setPrevState] = useState(hotel)

  if (hotel.id !== prevState.id) {
    setIsLoading(false)
    setPrevState(hotel)
  }
  return (
    <li className="relative p-2 sm:p-4 my-4 rounded z-0 flex items-center shadow gap-4">
      {isLoading && (
        <Spinner
          size="lg"
          className="size-full absolute top-0 left-0 z-50 backdrop-blur-sm"
        />
      )}
      <div className="sm:w-2/4 w-full text-balance">
        <p className="font-semibold text-xl mb-2">{hotel.title}</p>
        {toursCount > 0 && (
          <p className="block sm:hidden font-semibold text-xl">Туров: {toursCount}</p>
        )}
        <p className="text-xl hidden sm:block">
          <strong className="font-semibold">Описание:</strong>{' '}
          {hotel.description}
        </p>
      </div>
      <div className="w-1/4 hidden sm:block">
        {toursCount > 0 && (
          <p className="font-semibold text-xl mb-2">Туров: {toursCount}</p>
        )}
      </div>
      <div className="w-full flex flex-col gap-2 items-center justify-center sm:w-1/4 h-full text-end">
        <Button as={Link} href={`hotels/${hotel.id}`} color="primary">
          Редактировать
        </Button>
        {toursCount > 0 ? (
          <Tooltip
            showArrow={true}
            content="Нельзя удалить отель, который привязан к туру."
            closeDelay={1000}
          >
            <Button
              className="sm:ml-4"
              variant="bordered"
              disableRipple
              disableAnimation
            >
              Удалить
            </Button>
          </Tooltip>
        ) : (
          <Button
            onPress={async () => {
              const shure = confirm(
                `Удалить отель: ${hotel.title}? Это действие отменить нельзя.`
              )
              if (shure) {
                setIsLoading(true)
                await deleteHotel(hotel.id, hotel.image)
              }
            }}
            className="sm:ml-4"
            color="danger"
            variant="bordered"
          >
            Удалить
          </Button>
        )}
      </div>
    </li>
  )
}
