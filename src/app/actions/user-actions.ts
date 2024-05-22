'use server'

import { sql } from '@vercel/postgres'
import { z } from 'zod'
import bcrypt from 'bcryptjs'
import { signIn } from '@/auth'
import { AuthError } from 'next-auth'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

const UserSchema = z.object({
    id: z.string(),
    passport: z.string(),
    name: z.string(),
    email: z.string().email({ message: 'некорректная почта' }),
    password: z
        .string()
        .min(6, { message: 'пароль должен быть длиннее 6 символов' }),
    is_admin: z.boolean()
})

const CreateUser = UserSchema.omit({ id: true, is_admin: true })

export type CreateUserState = {
    message?: string | null
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
            message: 'ошибка, проверьте правильность полей',
            errors: validatedFields.error.flatten().fieldErrors
        }
    }
    let { passport, name, email, password } = validatedFields.data
    const hashPassword = bcrypt.hashSync(password, 10)
    try {
        const isExist = await sql`SELECT * FROM users WHERE email = ${email}`
        if (isExist.rows.length !== 0) {
            return {
                message: 'такой пользователь уже существует',
                errors: { email: ['такой пользователь уже сущестует'] }
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
        return { message: 'успешно' }
    } catch (error) {
        console.log(error)
        throw error
    }
}

export async function authenticate(
    _prevState?: string,
    formData?: FormData,
    data?: { email: string; password: string }
) {
    try {
        if (data) {
            const newFormData = new FormData()
            newFormData.append('email', data.email)
            newFormData.append('password', data.password)
            await signIn('credentials', newFormData)
        } else {
            await signIn('credentials', formData)
        }
    } catch (error) {
        if (error instanceof AuthError) {
            switch (error.type) {
                case 'CredentialsSignin':
                    return 'неправильная почта или пароль'
                default:
                    return 'Something went wrong.'
            }
        }
        throw error
    }
}
