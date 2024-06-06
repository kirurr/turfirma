'use client'
import {
  Carousel,
  CarouselContent,
  CarouselItem
} from '@/components/ui/carousel'
import * as React from 'react'
import { Review, User } from '../lib/definitions'
import Autoplay from 'embla-carousel-autoplay'

export default function ReviewsCarousel({
  reviews,
  users
}: {
  reviews: Review[]
  users: User[]
}) {
  return (
    <Carousel plugins={[Autoplay({ delay: 4000 })]} opts={{ loop: true }}>
      <CarouselContent>
        {reviews.map((review, index) => {
          const user = users.find((user) => user.id === review.user_id) as User
          return (
            <CarouselItem key={index}>
              <h3 className="mb-2 font-bold text-3xl">{review.title}</h3>
              <p className="text-2xl">{review.content}</p>
              <p className="text-lg">{user.name}</p>
            </CarouselItem>
          )
        })}
      </CarouselContent>
    </Carousel>
  )
}
