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
import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure
} from '@nextui-org/react'
import { Fullscreen } from 'lucide-react'
import { Button as CarouselButton } from '@/components/ui/button'
import { useState } from 'react'

export default function TourSlider({
  images,
  className
}: {
  images: ListBlobResultBlob[]
  className?: string
}) {
  const [imageState, setImageState] = useState('')
  const { isOpen, onOpen, onOpenChange } = useDisclosure()
  const isMultipleImages = images.length > 1

  function handleModalOpen(imageUrl: string) {
    setImageState(imageUrl)
    onOpen()
  }
  return (
    <>
      <Carousel
        className={`${className} max-w-full rounded-lg mx-auto`}
        opts={{ loop: true }}
        plugins={[Autoplay({ delay: 4000 })]}
      >
        <CarouselContent className="rounded-lg">
          {images.map((image, index) => {
            return (
              <CarouselItem className="rounded-lg" key={index}>
                <div className="relative aspect-video rounded-lg overflow-hidden">
                  <Image
                    src={image.url}
                    alt={image.pathname}
                    className="object-cover"
                    fill
                  />
                  <CarouselButton
                    size="icon"
                    variant="outline"
                    className="absolute top-2 right-2 h-8 w-8 text-2xl"
                    onClick={() => handleModalOpen(image.url)}
                  >
                    <Fullscreen className="" />
                  </CarouselButton>
                </div>
              </CarouselItem>
            )
          })}
        </CarouselContent>
        {isMultipleImages && (
          <>
            <CarouselPrevious className="hidden sm:flex" />
            <CarouselNext className="hidden sm:flex" />
          </>
        )}
      </Carousel>
      <FullscreenModal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        imageUrl={imageState}
      />
    </>
  )
}

function FullscreenModal({
  isOpen,
  onOpenChange,
  imageUrl
}: {
  isOpen: boolean
  onOpenChange: () => void
  imageUrl: string
}) {
  return (
    <Modal
      size="full"
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      className="bg-secondary-color/40 backdrop-blur-sm"
    >
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader></ModalHeader>
            <ModalBody className='relative'>
              <Image
                src={imageUrl}
                alt="Полноэкранное изображение"
                className="object-contain"
                fill
                sizes="100vw"
              />
            </ModalBody>
            <ModalFooter className="flex flex-col items-center justify-center">
              <Button
                className="backdrop-blur-sm text-text-secondary"
                variant="bordered"
                onPress={onClose}
              >
                Закрыть
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  )
}
