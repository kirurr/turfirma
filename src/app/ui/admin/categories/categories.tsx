'use client'

import React, { useState } from 'react'
import { Button, Spinner, Tooltip } from '@nextui-org/react'
import Link from 'next/link'

import { Category } from '@/app/lib/definitions'
import { deleteCategory } from '@/app/actions/category-actions'

export function CategoriesWrapper({
  categories,
  toursPerCategory
}: {
  categories: Category[]
  toursPerCategory: { id: string; toursCount: string }[]
}) {
  return (
    <ul>
      {categories.map((category, index) => {
        const toursCount = toursPerCategory.find(
          (tour) => tour.id === category.id
        )
        return (
          <CategoriesItem
            key={index}
            category={category}
            toursCount={+toursCount?.toursCount!}
          />
        )
      })}
    </ul>
  )
}

function CategoriesItem({
  category,
  toursCount
}: {
  category: Category
  toursCount: number
}) {
  const [isLoading, setIsLoading] = useState(false)
  const [prevState, setPrevState] = useState(category)

  if (category.id !== prevState.id) {
    setIsLoading(false)
    setPrevState(category)
  }
  return (
    <li className="relative p-4 my-4 shadow rounded flex items-center">
      {isLoading && (
        <Spinner
          size="lg"
          className="size-full absolute top-0 left-0 z-50 backdrop-blur-sm"
        />
      )}
      <div className="size-full">
        <p className="text-xl">
          <strong className="font-semibold">Название: </strong>
          {category.title}
        </p>
      </div>
      <div className="size-full text-center">
        {toursCount > 0 ? (
          <p className="text-xl">
            <strong className="font-semibold">
              Количество туров: {toursCount}
            </strong>
          </p>
        ) : (
          ''
        )}
      </div>
      <div className="size-full text-end">
        <Button
          as={Link}
          href={`categories/${category.alias}`}
          color="primary"
          className=""
        >
          Редактировать
        </Button>
        {toursCount > 0 ? (
          <Tooltip
            showArrow={true}
            content="Нельзя удалить категорию, в которой есть туры."
            closeDelay={1000}
          >
            <Button className="ml-4" variant="bordered">
              Удалить
            </Button>
          </Tooltip>
        ) : (
          <Button
            onPress={async () => {
              const shure = confirm(
                `Удалить категорию: ${category.title}? Это действие отменить нельзя.`
              )
              if (shure) {
                setIsLoading(true)
                await deleteCategory(category)
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
