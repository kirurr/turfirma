'use server'

import { sql } from '@vercel/postgres'
import { revalidatePath } from 'next/cache'

export async function changeOrderStatus(
    orderId: string,
    _prevState: any,
    _formData: FormData,
    status: string = 'paid'
) {
    try {
		await sql`UPDATE orders SET status = ${status} WHERE id = ${orderId};`
        revalidatePath('/profile')
        return {status: true, message: 'оплачено!'}
    } catch (error) {
        console.log(error)
        return {status: false, message: 'ошибка!'}
    }
}
