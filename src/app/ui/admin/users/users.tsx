'use client'

import { Review, User } from '@/app/lib/definitions'
import { Spinner, Button, Tooltip } from '@nextui-org/react'
import { useState } from 'react'
import Link from 'next/link'
import { deleteUser } from '@/app/actions/user-actions'

export function AdminUserWrapper({
  user,
  ordersCount,
  reviews
}: {
  user: User
  ordersCount: number
  reviews: Review[]
}) {
  const [isLoading, setIsLoading] = useState(false)
  const [prevState, setPrevState] = useState(user)

  if (user.id !== prevState.id) {
    setIsLoading(false)
    setPrevState(user)
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
        <p className="text-xl font-semibold">{user.name}</p>
        <p className="text-xl hidden sm:block my-2 font-semibold">{user.email}</p>
        <p className="text-xl mt-2 font-semibold">
          {user.role === 'admin' ? 'Администратор' : 'Пользователь'}
        </p>
      </div>
      <div className="hidden sm:block w-1/4">
        {ordersCount > 0 && (
          <p className="font-semibold text-xl mb-2">Заказов: {ordersCount}</p>
        )}
        {reviews.length > 0 && (
          <p className="font-semibold text-xl mb-2">
            Отзывов: {reviews.length}
          </p>
        )}
      </div>
      <div className="w-full flex flex-col gap-2 items-center justify-center sm:block sm:w-1/4 h-full text-end">
        <Button as={Link} href={`users/${user.id}`} color="primary">
          Редактировать
        </Button>
        {ordersCount > 0 || reviews.length > 0 ? (
          <Tooltip
            showArrow={true}
            content="Нельзя удалить пользователя, у которого есть заказы или отзывы."
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
                `Удалить пользователя: ${user.name}? Это действие отменить нельзя.`
              )
              if (shure) {
                setIsLoading(true)
                await deleteUser(user.id)
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
