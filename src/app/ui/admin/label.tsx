'use client'

import { Button } from '@nextui-org/react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function Label() {
  const pathname = usePathname()

  const splittedHref = pathname.split('/')

  let href
  if (splittedHref.length > 3) href = splittedHref[2]
  else href = splittedHref.at(-1) as string

  const isNew = pathname.includes('new')
  const isEdit = pathname.split('/').length === 4 && !pathname.includes('new')

  switch (href) {
    case 'tours':
      return <ToursLabel isNew={isNew} isEdit={isEdit} />
    case 'hotels':
      return <HotelsLabel isNew={isNew} isEdit={isEdit} />
    case 'orders':
      return <h1 className="text-2xl font-bold">Заказы</h1>
    case 'users':
      return <UsersLabel isEdit={isEdit} />
    case 'categories':
      return <CategoriesLabel isNew={isNew} isEdit={isEdit} />
    default:
      return <h1 className="text-2xl font-bold">Панель администратора</h1>
  }
}

function UsersLabel({ isEdit }: { isEdit: boolean }) {
  return (
    <h1 className="text-2xl font-bold">
      {isEdit && 'Редактирование пользователя'}
      {!isEdit && 'Пользователи'}
    </h1>
  )
}

function ToursLabel({ isNew, isEdit }: { isNew: boolean; isEdit: boolean }) {
  return (
    <>
      <h1 className="text-2xl font-bold">
        {isNew && 'Новый тур'}
        {isEdit && 'Редактирование тура'}
        {!isNew && !isEdit && 'Туры'}
      </h1>
      {!isNew && !isEdit && (
        <Button
          as={Link}
          href="tours/new"
          color="primary"
          className="absolute top-40% right-[1.5rem]"
        >
          Создать
        </Button>
      )}
    </>
  )
}
function ReviewsLabel({ isEdit }: { isEdit: boolean }) {
  return (
    <h1 className="text-2xl font-bold">
      {isEdit && 'Редактирование отеля'}
      {!isEdit && 'Отели'}
    </h1>
  )
}

function HotelsLabel({ isNew, isEdit }: { isNew: boolean; isEdit: boolean }) {
  return (
    <>
      <h1 className="text-2xl font-bold">
        {isNew && 'Новый отель'}
        {isEdit && 'Редактирование отеля'}
        {!isNew && !isEdit && 'Отели'}
      </h1>
      {!isNew && !isEdit && (
        <Button
          as={Link}
          href="hotels/new"
          color="primary"
          className="absolute top-40% right-[1.5rem]"
        >
          Создать
        </Button>
      )}
    </>
  )
}

function CategoriesLabel({
  isNew,
  isEdit
}: {
  isNew: boolean
  isEdit: boolean
}) {
  return (
    <>
      <h1 className="sm:text-2xl text-xl font-bold">
        {isNew && 'Новая категория'}
        {isEdit && 'Редактирование категории'}
        {!isNew && !isEdit && 'Категории'}
      </h1>
      {!isNew && !isEdit && (
        <Button
          as={Link}
          href="categories/new"
          color="primary"
          className="sm:absolute sm:top-39% sm:right-[1.5rem]"
        >
          Создать
        </Button>
      )}
    </>
  )
}
