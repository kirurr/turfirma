'use client'

import { UserState, updateUser } from '@/app/actions/user-actions'
import { User } from '@/app/lib/definitions'
import { Button, Input, Radio, RadioGroup } from '@nextui-org/react'
import { useFormState } from 'react-dom'
import { FormButton } from '../../auth/auth-forms'
import Link from 'next/link'

export default function EditUserForm({ userData }: { userData: User }) {
  const initialState: UserState = {
    status: false,
    message: '',
    errors: {}
  }
  const updateUserWithPrevData = updateUser.bind(null, userData)
  const [result, dispatch] = useFormState(updateUserWithPrevData, initialState)
  return (
    <form action={dispatch} className="flex flex-col gap-4">
      <div className="flex gap-4">
        <div className="size-full flex flex-col gap-4">
          <Input
            name="name"
            label="ФИО"
            placeholder="Иванов Иван Иванович"
            defaultValue={userData.name}
            isRequired
          />
          <Input
            name="email"
            label="Электронная почта"
            type="email"
            placeholder="example@example.com"
            defaultValue={userData.email}
            isRequired
          />
          <Input
            name="passport"
            label="Данные паспорта"
            placeholder="0000 000000"
            defaultValue={userData.passport}
            isRequired
          />
          <RadioGroup
            label="Роль"
            name="role"
            isRequired
            defaultValue={userData.role}
          >
            <Radio value="user">Пользователь</Radio>
            <Radio value="admin">Администратор</Radio>
          </RadioGroup>
          <div className="">
            <FormButton title="Применить" />
            <Button
              as={Link}
              href="/admin/users"
              color="danger"
              className="ml-4"
              variant="bordered"
            >
              Отмена
            </Button>
          </div>
        </div>
      </div>
      {!result?.status && <p>{result?.message}</p>}
    </form>
  )
}
