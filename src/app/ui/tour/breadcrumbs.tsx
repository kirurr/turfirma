'use client'
import { Category, TourWithHotel } from '@/app/lib/definitions'
import { Breadcrumbs, BreadcrumbItem } from '@nextui-org/react'
import React from 'react'

export default function TourBreadcumbs({
  category,
  tour,
  className
}: {
  category: Category
  tour: TourWithHotel,
  className?: string
}) {
  return (
    <Breadcrumbs className={className} size='lg'>
      <BreadcrumbItem href="/">Главная</BreadcrumbItem>
      {category === null ? (
        <BreadcrumbItem href="/tours">Все туры</BreadcrumbItem>
      ) : (
        <BreadcrumbItem href={`/${category.alias}`}>
          {category.title}
        </BreadcrumbItem>
      )}
      <BreadcrumbItem>{tour.title}</BreadcrumbItem>
    </Breadcrumbs>
  )
}
