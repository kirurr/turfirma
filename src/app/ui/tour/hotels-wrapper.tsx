'use client'

import { Hotel } from '@/app/lib/definitions'
import { Accordion, AccordionItem } from '@nextui-org/react'
import Image from 'next/image'

export default function HotelsWrapper({ hotels }: { hotels: Hotel[] }) {
  return (
    <Accordion>
      {hotels.map((hotel, index) => (
        <AccordionItem key={index} title={hotel.title}>
          {hotel.description}
          <div className='relative h-20 w-20'>
            <Image alt='изображение отеля' src={hotel.image} fill />
          </div>
        </AccordionItem>
      ))}
    </Accordion>
  )
}

function HotelItem({ hotel }: { hotel: Hotel }) {
  return <p>{hotel.description}</p>
}
