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
          startContent={<span className="text-xl font-semibold">{hotel.title}</span>}
          textValue={hotel.description}
        >
          <HotelItem hotel={hotel} />
        </AccordionItem>
      ))}
    </Accordion>
  )
}

function HotelItem({ hotel }: { hotel: Hotel }) {
  return (
    <div className="p-2 flex flex-wrap">
      <p className="mb-4 text-lg w-1/2">
        {hotel.description}
      </p>
      <div className="relative h-36 w-1/2">
        <Image
          alt="изображение отеля"
          className="object-contain"
          src={hotel.image}
          fill
        />
      </div>
      <div className="w-full mt-4">
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
