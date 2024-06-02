'use client'

import React from 'react';
import { useFormState } from "react-dom"
import { Input, Textarea } from "@nextui-org/react"
import { FormButton } from '@/app/ui/auth/auth-forms';
import { HotelState, createHotel } from '@/app/actions/hotel-actions';

export default function Page() {
  const initialState: HotelState = {status: false, message: '', errors: {}}
  const [result, dispatch] = useFormState(createHotel, initialState)  
  
  return (
  <section className='section !max-w-lg'>
    <h2 className='h2 text-center'>Создание отеля</h2>
    <form action={dispatch} className='flex flex-col gap-4'>
      <div>
        <label className='mb-2 block' htmlFor="image">Изображение <span className='text-red-500'>*</span></label>
        <input className="input-file" type="file" id="image" name="image" accept='image/*' required />
      </div>
      <Input name="title" label="Название отеля" placeholder='Введите название отеля' isRequired/>
      <Textarea name='description' label="Описание отеля" placeholder='Введите описание отеля' isRequired/>
      <Input name="mapUrl" label="Ссылка на гугл-карту" description="Атрибут src для карты" isRequired/>
      <FormButton title='Создать' className="mx-auto" />
      {!result.status && <p>{result.message}</p>}
    </form>
  </section>
  )
}