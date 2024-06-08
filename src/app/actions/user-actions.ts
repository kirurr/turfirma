'use server'

import { sql } from '@vercel/postgres'
import { z } from 'zod'
import bcrypt from 'bcryptjs'
import { signIn } from '@/auth'
import { AuthError } from 'next-auth'
import { revalidatePath } from 'next/cache'
import { User } from '@/app/lib/definitions'
import { redirect } from 'next/navigation'

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
    role: z.enum(['user', 'admin'])
})

const CreateUser = UserSchema.omit({ id: true, role: true })

export type UserState = {
    message?: string
    errors?: {
        passport?: string[]
        name?: string[]
        email?: string[]
        password?: string[]
    }
    status?: boolean
}

export async function createUser(_initialState: UserState, formData: FormData) {
    const data = Object.fromEntries(formData.entries())
    const validatedFields = CreateUser.safeParse(data)

    if (!validatedFields.success) {
        return {
            message: 'Ошибка! Проверьте правильность полей.',
            errors: validatedFields.error.flatten().fieldErrors
        } as UserState
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
        return { message: 'Произошла ошибка. Попробуйте позже.', errors: {} }
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

export async function deleteUser(id: string) {
    try {
        await sql`DELETE FROM users WHERE id = ${id}`
        revalidatePath('/', 'layout')
        return { message: 'Успешно' }
    } catch (error) {
        console.log(error)
        return { message: 'Произошла ошибка. Попробуйте позже.', errors: {} }
    }
}

const UpdateUser = UserSchema.omit({ id: true, password: true })

export async function updateUser(
    prevData: User,
    _prevState: UserState,
    formData: FormData
) {
    const validatedFields = UpdateUser.safeParse(
        Object.fromEntries(formData.entries())
    )

    if (!validatedFields.success) {
        return {
            status: false,
            message: 'Ошибка. Проверьте правильность полей.',
            errors: validatedFields.error.flatten().fieldErrors
        } as UserState
    }

    const { name, email, passport, role } = validatedFields.data

    try {
        await sql`UPDATE users SET 
        (name, email, passport, role) = (${name}, ${email}, ${passport}, ${role})
        WHERE id = ${prevData.id}`
    } catch (error) {
        console.log(error)
        return {
            status: false,
            message: 'Ошибка. Попробуйте позже.',
            errors: {}
        }
    }
    revalidatePath('/', 'layout')
    redirect('/admin/users')
}
