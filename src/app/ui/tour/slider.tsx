'use client'

import * as React from "react"

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import { ListBlobResultBlob } from "@vercel/blob"
import Image from "next/image"

export default function TourSlider({images, className}: {images: ListBlobResultBlob[], className?: string}) {
  return (
    <Carousel className={`${className} max-w-full rounded-lg mx-auto`} opts={{ loop: true }}>
      <CarouselContent className="rounded-lg">
        {images.map((image) => (
          <CarouselItem className="rounded-lg" key={image.pathname}>
            <div className="relative aspect-video rounded-lg overflow-hidden">
              <Image src={image.url} alt={image.pathname} className="object-cover" fill/>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  )
}
