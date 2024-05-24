'use server'

import { sql } from '@vercel/postgres'
import { revalidatePath } from 'next/cache';

export async function bookTour(
    ids: { user_id?: string; tour_alias: string },
    _prevState: any,
    formData: FormData
) {
    const { user_id, tour_alias } = ids
    let hotel_id = formData.get('hotel_id')
	if(hotel_id === null) hotel_id = null
	else hotel_id = hotel_id.toString()

    try {
        const query = await sql`INSERT INTO orders (user_id, tour_alias, hotel_id)
		VALUES (${user_id}, ${tour_alias}, ${hotel_id?.toString()})`
		revalidatePath('/profile')
		return {message: 'успешно! заказ можно посмотреть в вашем личнмо кабинете'}
    } catch (error) {
        console.log(error)
		return {message: 'ошибка'}
    }
}
