'use client'

import { User } from '@/app/lib/definitions'
import { Spinner, Button, Tooltip } from '@nextui-org/react'
import { useState } from 'react'
import Link from 'next/link'
import { deleteUser } from '@/app/actions/user-actions'

export function AdminUserWrapper({
  user,
  ordersCount
}: {
  user: User
  ordersCount: number
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
        <p className="text-xl mb-2">
          <strong className="font-semibold">ФИО:</strong> {user.name}
        </p>
        <p className="text-xl">
          <strong className="font-semibold">Электронная почта:</strong>{' '}
          {user.email}
        </p>
      </div>
      <div className="w-1/4">
        {ordersCount > 0 && (
          <p className="font-semibold text-xl mb-2">
            Количество заказов: {ordersCount}
          </p>
        )}
        <p className="text-xl">
          <strong className="font-semibold">Роль:</strong>{' '}
          {user.role === 'admin' ? 'Администратор' : 'Пользователь'}
        </p>
      </div>
      <div className="w-1/4 h-full text-end">
        <Button as={Link} href={`users/${user.id}`} color="primary">
          Редактировать
        </Button>
        {ordersCount > 0 ? (
          <Tooltip
            showArrow={true}
            content="Нельзя удалить пользователя, у которого есть заказы."
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
                `Удалить пользователя: ${user.name}? Это действие отменить нельзя.`
              )
              if (shure) {
                setIsLoading(true)
                await deleteUser(user.id)
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
