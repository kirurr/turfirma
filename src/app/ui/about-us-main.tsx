'use client'

import React from 'react'
import { Accordion, AccordionItem } from '@nextui-org/react'

export default function AboutUs() {
  return (
    <Accordion
      className="sm:w-2/3 w-full mx-auto"
      variant="shadow"
      defaultExpandedKeys={['1']}
    >
      <AccordionItem
        className="p-4 text-start sm:font-semibold"
        startContent={<span className="font-bold sm:text-xl">О нас</span>}
        key={'1'}
      >
        Мы - это компания, которая предлагает интересные и доступные туры в
        России. Мы собираемся предоставить вам интересные и доступные туры в
        России, которые помогут вам улучшить свои навыки и узнать больше о
        стране. Мы также предлагаем вам возможность купить и продавать свои
        туры, чтобы увеличить свой бизнес и увеличить свой доход.
      </AccordionItem>
      <AccordionItem
        className="p-4 sm:font-semibold text-start"
        startContent={
          <span className="font-bold sm:text-xl">Как мы работаем</span>
        }
        key={'2'}
      >
        Мы работаем над нашими турами, чтобы улучшить их качество и доступность.
        Мы используем современные технологии и инструменты, чтобы создавать
        интересные и доступные туры. Мы также работаем над улучшением наших
        условий и условий продажи, чтобы увеличить доход и улучшить условия для
        наших клиентов.
      </AccordionItem>
      <AccordionItem
        className="p-4 sm:font-semibold text-start"
        key={'3'}
        startContent={
          <span className="font-bold sm:text-xl text-start">Уверены в нашей работе</span>
        }
      >
        Мы уверены в нашей работе и нашими возможностями. Мы всегда готовы
        помочь вам в любое время и предоставить информацию о наших турах. Мы
        также готовы предоставить вам интересные и доступные туры в России,
        которые помогут вам улучшить свои навыки и узнать больше о стране.
      </AccordionItem>
    </Accordion>
  )
}
