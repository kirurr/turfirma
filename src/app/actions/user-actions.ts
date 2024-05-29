'use server'

import { sql } from '@vercel/postgres'
import { z } from 'zod'
import bcrypt from 'bcryptjs'
import { signIn } from '@/auth'
import { AuthError } from 'next-auth'

const UserSchema = z.object({
    id: z.string(),
    passport: z.string().trim().min(1, 'Введите данные паспорта.'),
    name: z.string().trim().min(1, 'Введите ваше ФИО.'),
    email: z
        .string()
        .trim()
        .email({ message: 'Некорректная почта.' })
        .min(1, 'Введите вашу почту.'),
    password: z
        .string()
        .trim()
        .min(6, { message: 'Пароль должен быть длиннее 6 символов.' }),
    is_admin: z.boolean()
})

const CreateUser = UserSchema.omit({ id: true, is_admin: true })

export type CreateUserState = {
    message?: string
    errors?: {
        passport?: string[]
        name?: string[]
        email?: string[]
        password?: string[]
    }
}

export async function createUser(
    _initialState: CreateUserState,
    formData: FormData
) {
    const data = Object.fromEntries(formData.entries())
    const validatedFields = CreateUser.safeParse(data)

    if (!validatedFields.success) {
        return {
            message: 'Ошибка! Проверьте правильность полей.',
            errors: validatedFields.error.flatten().fieldErrors
        } as CreateUserState
    }
    let { passport, name, email, password } = validatedFields.data
    const hashPassword = bcrypt.hashSync(password, 10)
    try {
        const isExist = await sql`SELECT * FROM users WHERE email = ${email}`
        if (isExist.rows.length !== 0) {
            return {
                message: 'Ошибка! Проверьте правильность полей.',
                errors: { email: ['Такой пользователь уже сущестует'] }
            }
        }

        await sql`
			INSERT INTO users (passport, name, email, password) 
			VALUES (${passport}, ${name}, ${email}, ${hashPassword});
		`

        await authenticate(undefined, undefined, {
            email: email,
            password: password
        })
        return { message: 'Успешно' }
    } catch (error) {
        console.log(error)
        return {message: 'Произошла ошибка. Попробуйте позже.', errors: {}}
    }
}

export async function authenticate(
    _prevState?: { status: boolean; message: string },
    formData?: FormData,
    data?: { email: string; password: string }
) {
    try {
        if (data) {
            await signIn('credentials', {
                email: data.email,
                password: data.password,
                redirect: false
            })
        } else {
            const email = formData?.get('email')
            const password = formData?.get('password')
            await signIn('credentials', {
                email: email,
                password: password,
                redirect: false
            })
        }
        return { status: true, message: 'Успешно' }
    } catch (error) {
        if (error instanceof AuthError) {
            switch (error.type) {
                case 'CredentialsSignin':
                    return {
                        status: false,
                        message: 'Неправильная почта или пароль'
                    }
                default:
                    return { status: false, message: 'Что-то пошло не так.' }
            }
        }
        throw error
    }
}
