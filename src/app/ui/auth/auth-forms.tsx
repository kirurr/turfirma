'use client'

import {
  createUser,
  authenticate,
  UserState
} from '@/app/actions/user-actions'
import { useFormState, useFormStatus } from 'react-dom'
import React, { useEffect, useState } from 'react'
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Input
} from '@nextui-org/react'
import { useRouter } from 'next/navigation'

export function SignInModal({ isOpen, onOpen, onOpenChange, onClose }: any) {
  const initialState = { status: false, message: '' }
  const [result, dispatch] = useFormState(authenticate, initialState)
  const [errorState, setErrorState] = useState(initialState)
  const router = useRouter()

  useEffect(() => {
    if (result.status) {
      onClose()
      router.refresh()
    } else {
      setErrorState({ status: true, message: result.message })
    }
  }, [result, onClose, router])

  function removeError() {
    setErrorState({ status: false, message: '' })
  }

  return (
    <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
      <ModalContent>
        {(onClose) => (
          <>
            <form action={dispatch}>
              <ModalHeader>Войти</ModalHeader>
              <ModalBody>
                <Input
                  type="email"
                  name="email"
                  label="Электронная почта"
                  required
                  autoFocus
                  isInvalid={errorState.status}
                  onChange={removeError}
                />
                <Input
                  type="password"
                  name="password"
                  label="Пароль"
                  required
                  isInvalid={errorState.status}
                  onChange={removeError}
                />
                <p>{errorState.message}</p>
              </ModalBody>
              <ModalFooter>
                <FormButton title="Войти" />
                <Button onClick={onClose} variant="bordered">
                  Отмена
                </Button>
              </ModalFooter>
            </form>
          </>
        )}
      </ModalContent>
    </Modal>
  )
}
export function SignUpModal({ isOpen, onOpen, onOpenChange, onClose }: any) {
  const initialState: UserState = { message: '', errors: undefined }
  const [state, dispatch] = useFormState(createUser, initialState)
  const [errorState, setErrorState] = useState(initialState)

  const router = useRouter()
  useEffect(() => {
    if (!state.errors) {
      onClose()
      router.refresh()
    } else {
      setErrorState({ message: state.message, errors: state.errors })
    }
  }, [state, onClose, router])

  function removeError() {
    setErrorState({ message: '', errors: undefined })
  }

  return (
    <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
      <ModalContent>
        {(onClose) => (
          <>
            <form action={dispatch}>
              <ModalHeader>Зарегистрироваться</ModalHeader>
              <ModalBody>
                <Input
                  name="name"
                  isRequired
                  type="text"
                  label="ФИО"
                  autoFocus
                  isInvalid={errorState.errors?.name !== undefined}
                  errorMessage={
                    errorState.errors?.name && errorState.errors?.name[0]
                  }
                  onChange={removeError}
                />
                <Input
                  name="password"
                  isRequired
                  type="password"
                  label="Пароль"
                  isInvalid={errorState.errors?.password !== undefined}
                  description={'Пароль должен быть длиннее 6 символов.'}
                  errorMessage={
                    errorState.errors?.password &&
                    errorState.errors?.password[0]
                  }
                  onChange={removeError}
                />
                <Input
                  name="email"
                  isRequired
                  type="email"
                  label="Электронная почта"
                  isInvalid={errorState.errors?.email !== undefined}
                  errorMessage={
                    errorState.errors?.email && errorState.errors?.email[0]
                  }
                  onChange={removeError}
                />
                <Input
                  name="passport"
                  isRequired
                  type="text"
                  label="Данные паспорта"
                  isInvalid={errorState.errors?.passport !== undefined}
                  errorMessage={
                    errorState.errors?.passport &&
                    errorState.errors?.passport[0]
                  }
                  onChange={removeError}
                />
                <p>{errorState.message}</p>
              </ModalBody>
              <ModalFooter>
                <FormButton title="Зарегистрироваться" />
                <Button onClick={onClose} variant="bordered">
                  Отмена
                </Button>
              </ModalFooter>
            </form>
          </>
        )}
      </ModalContent>
    </Modal>
  )
}

export function FormButton({
  title,
  color = 'primary',
  variant = 'solid',
  className,
  isBig = false
}: {
  title: string
  color?:
    | 'primary'
    | 'default'
    | 'secondary'
    | 'success'
    | 'warning'
    | 'danger'
    | undefined
  variant?:
    | 'solid'
    | 'bordered'
    | 'light'
    | 'flat'
    | 'faded'
    | 'shadow'
    | 'ghost'
    | undefined,
    className?: string,
    isBig?: boolean
}) {
  const { pending } = useFormStatus()
  return (
    <Button className={`${className} ${isBig && 'text-xl'}`} size={isBig ? 'lg' : 'md'} type="submit" color={color} variant={variant} isLoading={pending}>
      {title}
    </Button>
  )
}
