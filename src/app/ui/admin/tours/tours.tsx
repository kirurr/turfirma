'use client'

import { Tour } from '@/app/lib/definitions'
import { Button, Spinner, Tooltip } from '@nextui-org/react'
import Link from 'next/link'
import { useState } from 'react'
import { formatDateFromPostgreSQL } from '@/app/lib/utils'
import { deleteTour } from '@/app/actions/tour-actions'

export function AdminToursWrapper({
  tour,
  orders
}: {
  tour: Tour
  orders: number
}) {
  const [isLoading, setIsLoading] = useState(false)
  const [prevState, setPrevState] = useState(tour)

  if (tour.id !== prevState.id) {
    setIsLoading(false)
    setPrevState(tour)
  }

  return (
    <li className="relative p-2 sm:p-4 my-4 rounded z-0 flex items-center shadow gap-4">
      {isLoading && (
        <Spinner
          size="lg"
          className="size-full absolute top-0 left-0 z-50 backdrop-blur-sm"
        />
      )}
      <div className="w-2/4">
        <p className="text-xl mb-2 font-semibold text-balance">{tour.title}</p>
        {tour.hotels_ids?.length! > 0 ? (
          <p className="text-xl hidden sm:block">
            <strong className="font-semibold">Количество отелей: </strong>
            {tour.hotels_ids?.length}
          </p>
        ) : (
          <p className="text-xl font-semibold hidden sm:block">
            В этом туре нет отелей
          </p>
        )}
        {orders > 0 && (
          <p className="font-semibold text-xl mt-2 hidden sm:block">
            Количество заказов: {orders}
          </p>
        )}
      </div>
      <div className="w-1/4 hidden sm:block">
        <p className="text-xl mb-2">
          <strong className="font-semibold">Дата: </strong>
          {formatDateFromPostgreSQL(tour.date)}
        </p>
        <p className="text-xl mb-2">
          <strong className="font-semibold">Цена: </strong>
          {tour.price} рублей
        </p>
      </div>
      <div className="sm:w-1/4 sm:block flex flex-col gap-2 items-center justify-center h-full text-end">
        <Button as={Link} href={`tours/${tour.id}`} color="primary">
          Редактировать
        </Button>
        {orders > 0 ? (
          <Tooltip
            showArrow={true}
            content="Нельзя удалить тур, у которого есть заказы."
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
                `Удалить тур: ${tour.title}? Это действие отменить нельзя.`
              )
              if (shure) {
                setIsLoading(true)
                await deleteTour(tour.id, tour.alias)
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
