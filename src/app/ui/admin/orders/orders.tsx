'use client'

import React, { useEffect, useState } from 'react'
import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Spinner
} from '@nextui-org/react'
import { Order, TourWithHotel, User } from '@/app/lib/definitions'
import { changeOrderStatus, deleteOrder } from '@/app/actions/order-actions'
import { ChevronDown } from '@/app/ui/icons'

export function AdminOrder({
  order,
  user,
  tour
}: {
  order: Order
  user: User
  tour: TourWithHotel
}) {
  const [isLoading, setIsLoading] = useState(false)

  const [prevState, setPrevState] = useState(order)

  if (order.id !== prevState.id || order.status !== prevState.status) {
    setIsLoading(false)
    setPrevState(order)
  }
  return (
    <li className="relative p-2 sm:p-4 my-4 rounded z-0 flex items-center shadow flex-wrap sm:flex-nowrap sm:gap-4">
      {isLoading && (
        <Spinner
          size="lg"
          className="size-full absolute top-0 left-0 z-50 backdrop-blur-sm"
        />
      )}
      <div className="w-full">
        <p className="text-xl sm:mb-0 mb-2">
          <strong className="font-semibold">Тур:</strong> {tour.title}
        </p>
        {tour.hotels_info.length > 0 && (
          <p className="text-xl sm:mb-0 my-2">
            <strong className="font-semibold">Отель:</strong>{' '}
            {
              tour.hotels_info.find((hotel) => hotel.id === order.hotel_id)
                ?.title
            }
          </p>
        )}
      </div>
      <div className="w-full">
        <p className="text-xl">
          <strong className="font-semibold">Пользователь:</strong> {user.name}
        </p>
        <p className="text-xl mt-2">
          <strong className="font-semibold">Почта:</strong> {user.email}
        </p>
      </div>
      <div className="w-full mt-4 sm:m-0 text-center sm:text-end">
        <Dropdown>
          <DropdownTrigger>
            <Button
              color={
                order.status === 'paid'
                  ? 'success'
                  : order.status === 'pending'
                  ? 'default'
                  : 'danger'
              }
              endContent={<ChevronDown fill="currentColor" size={16} />}
              variant="bordered"
            >
              {order.status === 'paid'
                ? 'Оплачен'
                : order.status === 'pending'
                ? 'Забронирован'
                : 'Отменен'}
            </Button>
          </DropdownTrigger>
          <DropdownMenu
            onAction={async (key) => {
              setIsLoading(true)
              await changeOrderStatus(
                order.id,
                undefined,
                undefined,
                key.toString()
              )
            }}
          >
            <DropdownItem key="paid">Оплачен</DropdownItem>
            <DropdownItem key="pending">Забронирован</DropdownItem>
            <DropdownItem key="canceled">Отменен</DropdownItem>
          </DropdownMenu>
        </Dropdown>
        <Button
          className="ml-4"
          variant="bordered"
          color="danger"
          onPress={async () => {
            const accepted = confirm(
              'Удалить заказ? Это действие не может быть отменено.'
            )
            if (accepted) {
              setIsLoading(true)
              await deleteOrder(order.id)
            }
          }}
        >
          Удалить
        </Button>
      </div>
    </li>
  )
}
