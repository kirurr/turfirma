'use client'

import Image from 'next/image'
import clsx from 'clsx'
import { Button } from '@nextui-org/react'
import Link from 'next/link'

export default function Hero({
  imageUrl = '/header.jpg',
  title = 'Турфирма Travel',
  isParagraph = true,
  isFullHeight = true,
  isButton = true
}: {
  imageUrl?: string
  title?: string
  isParagraph?: boolean
  isFullHeight?: boolean
  isButton?: boolean
}) {
  return (
    <section
      className={clsx(
        'relative w-full flex justify-center items-center',
        isFullHeight ? 'h-[calc(100vh-14rem)]' : 'h-[calc(100vh-40rem)]'
      )}
    >
      <div className="flex flex-col items-center justify-center relative size-full text-center">
        <Image
          priority
          sizes="100vw"
          src={imageUrl}
          alt="Изображение на главной странице"
          fill
          className="object-cover select-none pointer-events-none"
          quality={100}
        />
        <div className="relative w-fit p-4 rounded-lg backdrop-blur-sm border-gray-50/10 border-2">
          <h1 className="font-bold text-6xl block text-text-secondary">
            {title}
          </h1>
          {isParagraph && (
            <p className="text-xl text-text-secondary mt-8">
              Не следует, однако забывать, что укрепление и развитие структуры
              обеспечивает.
            </p>
          )}
        </div>
        {isButton && (
          <Button
            as={Link}
            href="/tours"
            size="lg"
            color="primary"
            className="mt-8 text-xl"
          >
            Посмотреть туры
          </Button>
        )}
      </div>
    </section>
  )
}
