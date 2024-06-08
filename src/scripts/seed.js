const { db } = require('@vercel/postgres')
const { users } = require('../app/lib/placeholder-data.js')

async function seedTours(client) {
    await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`

    try {
        await client.sql`
            CREATE TABLE IF NOT EXISTS tours (
            id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
            title VARCHAR(255) NOT NULL,
            alias VARCHAR(255) NOT NULL UNIQUE,
            category_id UUID NOT NULL,
            description TEXT NOT NULL,
            date DATE NOT NULL,
            program TEXT NOT NULL,
            images TEXT[] NOT NULL,
            included TEXT[] NOT NULL,
            excluded TEXT[] NOT NULL,
            hotels_ids UUID[] NOT NULL,
            duration INTEGER NOT NULL,
            price INTEGER NOT NULL
            );`
        console.log('tours table created!')
    } catch (error) {
        console.log(error)
        throw error
    }
}

async function seedCategories(client) {
    await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`

    try {
        await client.sql`
		CREATE TABLE IF NOT EXISTS categories (
		id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
		title VARCHAR(255) NOT NULL,
		alias VARCHAR(255) NOT NULL UNIQUE,
		description TEXT NOT NULL,
		image TEXT NOT NULL
		);`
        console.log('category table created!')
    } catch (error) {
        console.log(error)
        throw error
    }
}

async function seedUsers(client) {
    await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`

    try {
        await client.sql`
		CREATE TABLE IF NOT EXISTS users (
		id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
		passport TEXT NOT NULL,
		name TEXT NOT NULL,
		email TEXT NOT NULL UNIQUE,
		password TEXT NOT NULL,
		role TEXT DEFAULT 'user'
		);`
        console.log('users table created!')

        await Promise.all(
            users.map(async (user) => {
                return client.sql`
					INSERT INTO users VALUES (
						${user.id}, ${user.passport}, ${user.name}, ${user.email}, ${user.password}, ${user.role}
					) ON CONFLICT (id) DO NOTHING;
				`
            })
        )
        console.log('users inserted!')
    } catch (error) {
        console.log(error)
        throw error
    }
}

async function seedHotels(client) {
    await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`

    try {
        await client.sql`
		CREATE TABLE IF NOT EXISTS hotels (
		id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
		title TEXT NOT NULL,
		description TEXT NOT NULL,
		image TEXT NOT NULL UNIQUE,
		map_url TEXT NOT NULL);`
        console.log('hotels table created!')
    } catch (error) {
        console.log(error)
        throw error
    }
}

async function seedOrders(client) {
    await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`

    try {
        await client.sql`
			CREATE TABLE IF NOT EXISTS orders (
			id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
			user_id UUID NOT NULL,
			tour_id UUID NOT NULL,
			hotel_id UUID,
			status TEXT NOT NULL DEFAULT 'pending'
			);`
        console.log('orders table created!')
    } catch (error) {
        console.log(error)
        throw error
    }
}

async function seedReviews(client) {
    await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`

    try {
        await client.sql`
			CREATE TABLE IF NOT EXISTS reviews (
			id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
			user_id UUID NOT NULL,
			title TEXT NOT NULL,
			content TEXT NOT NULL,
			is_positive BOOLEAN NOT NULL,
			is_accepted BOOLEAN NOT NULL DEFAULT FALSE
			);`
        console.log('reviews table created!')
    } catch (error) {
        console.log(error)
        throw error
    }
}

async function main() {
    const client = await db.connect()

    await Promise.all([
        seedTours(client),
        seedCategories(client),
        seedUsers(client),
        seedHotels(client),
        seedOrders(client),
        seedReviews(client)
    ])

    await client.end()
}

main().catch((error) => console.log(error))
