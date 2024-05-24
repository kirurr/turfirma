'use server'

import { sql } from '@vercel/postgres'
import { revalidatePath } from 'next/cache'

export async function sendReview(
    userId: string,
    _prevState: any,
    formData: FormData
) {
    const { title, content, isPositive } = Object.fromEntries(
        formData.entries()
    )
    try {
		//
        // не забыть убрать is_accepted и true!!!!!!!!!!
		//
        await sql`
			INSERT INTO reviews (user_id, title, content, is_positive, is_accepted) 
			VALUES (${userId}, ${title.toString()}, ${content.toString()}, ${isPositive.toString()}, true);
		`
        revalidatePath('/reviews')
        return { status: true, message: 'ваш отзыв отправлен на проверку!' }
    } catch (error) {
        console.log(error)
        return { status: false, message: 'ошибка!' }
    }
}
