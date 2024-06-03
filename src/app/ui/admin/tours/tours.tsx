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
  return (
    <li className="relative p-4 my-4 rounded z-0 flex items-center shadow gap-4">
      {isLoading && (
        <Spinner
          size="lg"
          className="size-full absolute top-0 left-0 z-50 backdrop-blur-sm"
        />
      )}
      <div className="w-2/4">
        <p className="text-xl">
          <strong className="font-semibold">Название: </strong>
          {tour.title}
        </p>
        <p className="text-xl my-2">
          <strong className="font-semibold">Описание: </strong>
          {tour.description}
        </p>
        {tour.hotels_ids?.length! > 0 ? (
          <p className="text-xl">
            <strong className="font-semibold">Количество отелей: </strong>
            {tour.hotels_ids?.length}
          </p>
        ) : (
          <p className="text-xl font-semibold">В этом туре нет отелей</p>
        )}
      </div>
      <div className="w-1/4">
        {orders > 0 && (
          <p className="font-semibold text-xl mb-2">
            Количество туров: {orders}
          </p>
        )}
        <p className="text-xl mb-2">
          <strong className="font-semibold">Дата: </strong>
          {formatDateFromPostgreSQL(tour.date)}
        </p>
        <p className="text-xl mb-2">
          <strong className="font-semibold">Цена: </strong>
          {tour.price} рублей
        </p>
      </div>
      <div className="w-1/4 h-full text-end">
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
              className="ml-4"
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
                deleteTour(tour.id, tour.alias)
              }
            }}
            className="ml-4"
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
