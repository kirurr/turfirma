'use client'

import { Hotel } from '@/app/lib/definitions'
import { Accordion, AccordionItem } from '@nextui-org/react'
import Image from 'next/image'

export default function HotelsWrapper({ hotels }: { hotels: Hotel[] }) {
  return (
    <Accordion variant="bordered">
      {hotels.map((hotel, index) => (
        <AccordionItem
          key={index}
          className="text-xl"
          startContent={<span className="font-semibold">Название отеля:</span>}
          title={hotel.title}
        >
          <HotelItem hotel={hotel} />
        </AccordionItem>
      ))}
    </Accordion>
  )
}

function HotelItem({ hotel }: { hotel: Hotel }) {
  return (
    <div className="p-2 grid grid-cols-2 gap-4">
      <p className="mb-4 text-lg">
        <span className="font-semibold">Описание отеля:</span>{' '}
        {hotel.description}
      </p>
      <div className="relative h-36 aspect-video ">
        <Image
          alt="изображение отеля"
          className="object-cover"
          src={hotel.image}
          fill
        />
      </div>
      <div className="col-span-2">
        <iframe
          src={hotel.map_url}
          width="100%"
          height="300"
          style={{ border: '0' }}
          loading="lazy"
        ></iframe>
      </div>
    </div>
  )
}
