'use client'

import React from 'react'
import Image from 'next/image'
import { ListBlobResultBlob } from '@vercel/blob'

export default function TourSlider({
  images,
	className
}: {
  images: ListBlobResultBlob[]
	className?: string
}) {
  return (
    <div className={`${className} flex overflow-x-scroll snap-x snap-mandatory`}>
      {images.map((image, index) => (
        <div className="relative h-full w-full flex-shrink-0 snap-start" key={index}>
          <Image className='object-cover' fill src={image.url} alt="tour image" />
        </div>
      ))}
    </div>
  )
}
