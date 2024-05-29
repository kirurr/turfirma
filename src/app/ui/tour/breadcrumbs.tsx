'use client'
import { Category, TourWithHotel } from '@/app/lib/definitions'
import { Breadcrumbs, BreadcrumbItem } from '@nextui-org/react'
import React from 'react'

export default function TourBreadcumbs({
  category,
  tour
}: {
  category: Category
  tour: TourWithHotel
}) {
  return (
    <Breadcrumbs>
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
