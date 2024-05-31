'use client'
import { Category } from '@/app/lib/definitions'
import { Breadcrumbs, BreadcrumbItem } from '@nextui-org/react'
import React from 'react'

export default function CategoryBreadcumbs({
  category
}: {
  category: Category | null
}) {
  return (
    <Breadcrumbs size='lg'>
      <BreadcrumbItem href="/">Главная</BreadcrumbItem>
      <BreadcrumbItem>{category === null ? 'Все туры': category.title}</BreadcrumbItem>
    </Breadcrumbs>
  )
}
