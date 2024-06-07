'use client'

import * as React from 'react'

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious
} from '@/components/ui/carousel'
import { ListBlobResultBlob } from '@vercel/blob'
import Image from 'next/image'
import Autoplay from 'embla-carousel-autoplay'

export default function TourSlider({
  images,
  className
}: {
  images: ListBlobResultBlob[]
  className?: string
}) {
  const isMultipleImages = images.length > 1
  return (
    <Carousel
      className={`${className} max-w-full rounded-lg mx-auto`}
      opts={{ loop: true }} plugins={[Autoplay({ delay: 4000 })]}
    >
      <CarouselContent className="rounded-lg">
        {images.map((image, index) => (
          <CarouselItem className="rounded-lg" key={index}>
            <div className="relative aspect-video rounded-lg overflow-hidden">
              <Image
                src={image.url}
                alt={image.pathname}
                className="object-cover"
                fill
              />
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      {isMultipleImages && (
        <>
          <CarouselPrevious className="hidden sm:flex" />
          <CarouselNext className="hidden sm:flex" />
        </>
      )}
    </Carousel>
  )
}
