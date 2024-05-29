'use client'

import React from 'react';
import { CategoryState, createCategory } from "@/app/actions/category-actions"
import { useFormState } from "react-dom"
import { Button, Input, Textarea } from "@nextui-org/react"
import { FormButton } from '@/app/ui/auth/auth-forms';

export default function Page() {
  const initialState: CategoryState = {status: false, message: '', errors: {}}
  const [result, dispatch] = useFormState(createCategory, initialState)  
  
  return (
    <form action={dispatch} className='flex flex-col gap-4'>
      <div>
        <label className='mb-2 block' htmlFor="image">Изображение <span className='text-red-500'>*</span></label>
        <input className="input-file" type="file" id="image" name="image" accept='image/*' required />
      </div>
      <Input name="title" label="Название категории" placeholder='Введите название категории' isRequired/>
      <Textarea name='description' label="Описание категории" placeholder='Введите описание категории' isRequired/>
      <FormButton title='Создать' className="mx-auto" />
      {!result.status && <p>{result.message}</p>}
    </form>
  )
}