import { sql } from '@vercel/postgres'
import { User } from '@/app/lib/definitions'

export async function fetchUserById(id: string) {
    try {
        const user = await sql<User>`SELECT * FROM users WHERE id = ${id}`
        return user.rows[0]
    } catch (error) {
        console.log(error)
        throw new Error('failed to fetch user by id')
    }
}

