'use client'

import { AdminLink } from '@/app/lib/definitions'
import { checkForActiveLink } from '@/app/lib/utils'
import { Button } from '@nextui-org/react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function Label({ links }: { links: AdminLink[] }) {
  const pathname = usePathname()

  const splittedHref = pathname.split('/')

  let href
  if (splittedHref.length > 3) href = splittedHref[2]
  else href = splittedHref.at(-1) as string

  const isNew = pathname.includes('new')
  const isEdit = pathname.split('/').length === 4 && !pathname.includes('new')
  return (
    <section className="relative col-start-2 text-2xl flex items-center justify-center p-2">
      {href.includes('categories') && (
        <CategoriesLabel isNew={isNew} isEdit={isEdit} />
      )}
      {href.includes('hotels') && <HotelsLabel isNew={isNew} isEdit={isEdit} />}
      {href.includes('orders') && (
        <h1 className="text-2xl font-bold">Заказы</h1>
      )}
      {href.includes('admin') && (
        <h1 className="text-2xl font-bold">Панель администратора</h1>
      )}
      {href.includes('reviews') && <ReviewsLabel isEdit={isEdit} />}
      {href.includes('tours') && <ToursLabel isNew={isNew} isEdit={isEdit} />}
      {href.includes('users') && <UsersLabel isEdit={isEdit} />}
    </section>
  )
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
      <h1 className="text-2xl font-bold">
        {isNew && 'Новая категория'}
        {isEdit && 'Редактирование категории'}
        {!isNew && !isEdit && 'Категории'}
      </h1>
      {!isNew && !isEdit && (
        <Button
          as={Link}
          href="categories/new"
          color="primary"
          className="absolute top-40% right-[1.5rem]"
        >
          Создать
        </Button>
      )}
    </>
  )
}
