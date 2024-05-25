import { sql } from '@vercel/postgres'
import { User } from '@/app/lib/definitions'

export async function fetchUserByEmail(email: string) {
    try {
        const user = await sql<User>`SELECT * FROM users WHERE email = ${email}`
        return user.rows[0]
    } catch (error) {
        console.log(error)
        throw new Error('failed to fetch user by email')
    }
}

