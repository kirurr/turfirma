'use server'

import { sql } from '@vercel/postgres'
import { revalidatePath } from 'next/cache'
import { z } from 'zod'
import { redirect } from 'next/navigation'

const ReviewSchema = z.object({
    id: z.string(),
    user_id: z.string(),
    title: z.string().trim().min(1),
    content: z.string().trim().min(1),
    isPositive: z.enum(['true', 'false']),
    isAccepted: z.enum(['true', 'false'])
})

const SendReview = ReviewSchema.omit({
    id: true,
    isAccepted: true,
    user_id: true
})

export async function sendReview(
    userId: string,
    _prevState: any,
    formData: FormData
) {
    const validatedFIelds = SendReview.safeParse(
        Object.fromEntries(formData.entries())
    )
    if (!validatedFIelds.success) {
        return {
            status: false,
            message: 'Ошибка, проверьте правильность полей.',
            errors: validatedFIelds.error.flatten().fieldErrors
        }
    }
    const { title, content, isPositive } = validatedFIelds.data
    try {
        await sql`
			INSERT INTO reviews (user_id, title, content, is_positive) 
			VALUES (${userId}, ${title.toString()}, ${content.toString()}, ${isPositive.toString()});
		`
        revalidatePath('/', 'layout')
        return {
            status: true,
            message: 'Успешно! Ваш отзыв отправлен на проверку.'
        }
    } catch (error) {
        console.log(error)
        return { status: false, message: 'Ошибка. Попробуйте позже.' }
    }
}

const UpdateReview = ReviewSchema.omit({ id: true, user_id: true })

export async function updateReview(
    id: string,
    _prevState: any,
    formData: FormData
) {
    const validatedFields = UpdateReview.safeParse(
        Object.fromEntries(formData.entries())
    )
    if (!validatedFields.success) {
        return {
            status: false,
            message: 'Ошибка. Проверьте правильность полей.',
            errors: validatedFields.error.flatten().fieldErrors
        }
    }
    const { title, content, isPositive, isAccepted } = validatedFields.data
    try {
        await sql`UPDATE reviews SET (title, content, is_positive, is_accepted) = (${title}, ${content}, ${isPositive}, ${isAccepted}) WHERE id = ${id} `
    } catch (error) {
        console.log(error)
        return {
            status: false,
            message: 'Что-то пошло не так, повторите попытку позже.',
            errors: {}
        }
    }
    revalidatePath('/', 'layout')
    redirect('/admin/reviews/')
}

export async function deleteReview(id: string) {
    try {
        await sql`DELETE FROM reviews WHERE id = ${id}`
    } catch (error) {
        console.log(error)
        throw new Error('failed to delete review')
    }
    revalidatePath('/', 'layout')
    redirect('/admin/reviews/')
}
