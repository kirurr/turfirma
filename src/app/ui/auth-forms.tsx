'use client'

import { createUser, authenticate } from '@/app/actions/user-actions'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { useFormState } from 'react-dom'

export default function AuthForms() {
  return (
    <div>
      <SignUpForm />
      <SignInForm />
    </div>
  )
}

function SignInForm() {
  const [errorMessage, dispatch] = useFormState(authenticate, undefined)
  return (
    <form action={dispatch}>
      <h2>войти</h2>
      <div>
        <label htmlFor="email-signin">электронная почта</label>
        <input type="email" required name="email" id="email-signin" />
      </div>
      <div>
        <label htmlFor="password-signin">пароль</label>
        <input type="password" required name="password" id="password-signin" />
      </div>
      <button type="submit">войти</button>
      {errorMessage && <span>{errorMessage}</span>}
    </form>
  )
}

function SignUpForm() {
  const initialState: any = { message: null, errors: {} }
  const [createUserState, dispatchCreateUser] = useFormState(
    createUser,
    initialState 
  )

  return (
    <form action={dispatchCreateUser}>
      <h2>регистрация</h2>
      <div>
        <label htmlFor="name-signup">ФИО</label>
        <input id="name-signup" name="name" required type="text" />
      </div>
      <div>
        <label htmlFor="password-signup">пароль</label>
        <input name="password" id="password-signup" type="password" required />
        {createUserState && createUserState.errors &&
          createUserState.errors.password?.map((error: any) => (
            <span key={0}>{error}</span>
          ))}
      </div>
      <div>
        <label htmlFor="email-signup">электронная почта</label>
        <input required name="email" id="email-signup" type="email" />
        {createUserState && createUserState.errors &&
          createUserState.errors.email?.map((error: any) => (
            <span key={0}>{error}</span>
          ))}
      </div>
      <div>
        <label htmlFor="passport-signup">данные паспорта</label>
        <input required name="passport" id="passport-signup" type="text" />
      </div>
      <button type="submit">регистрация </button>
      <p>{createUserState && createUserState?.message}</p>
    </form>
  )
}
