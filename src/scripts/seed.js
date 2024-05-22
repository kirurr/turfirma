const { db } = require('@vercel/postgres')
const { tours, categories, users } = require('../app/lib/placeholder-data.js')

async function seedTours(client) {
    await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`

    try {
        const toursTable = await client.sql`
		CREATE TABLE IF NOT EXISTS tours (
		id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
		title VARCHAR(255) NOT NULL,
		alias VARCHAR(255) NOT NULL UNIQUE,
		category_alias TEXT NOT NULL,
		description TEXT NOT NULL,
		date DATE NOT NULL,
		program TEXT NOT NULL,
		images_urls TEXT[] NOT NULL,
		included TEXT[] NOT NULL,
		excluded TEXT[] NOT NULL,
		hotels_ids UUID[] NOT NULL,
		duration INTEGER NOT NULL
		);`
        console.log('table created!')

        const insertedTours = await Promise.all(
            tours.map(async (tour) => {
                return client.sql`
					INSERT INTO tours VALUES ( ${tour.id}, ${tour.title}, ${tour.alias}, ${tour.category_alias},
						${tour.description}, ${tour.date}, ${tour.program},
						${tour.images_urls}, ${tour.included}, ${tour.excluded},
						${tour.hotels_ids}, ${tour.duration})
					ON CONFLICT (id) DO NOTHING;
				`
            })
        )
        console.log('tours inserted')
        return { toursTable, tours: insertedTours }
    } catch (error) {
        console.log(error)
        throw error
    }
}

async function seedCategories(client) {
    await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`

    try {
        const categoryTable = await client.sql`
		CREATE TABLE IF NOT EXISTS categories (
		id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
		title VARCHAR(255) NOT NULL,
		alias VARCHAR(255) NOT NULL UNIQUE,
		description TEXT NOT NULL,
		image_url TEXT NOT NULL
		);`
        console.log('category table created!')

        const insertedCategory = await Promise.all(
            categories.map(async (category) => {
                return client.sql`
					INSERT INTO categories VALUES (
						${category.id}, ${category.title}, ${category.alias}, ${category.description}, ${category.image_url}
					) ON CONFLICT (id) DO NOTHING;
				`
            })
        )
        console.log('categories inserted!')
        return { categoryTable, insertedCategory }
    } catch (error) {
        console.log(error)
        throw error
    }
}

async function seedUsers(client) {
    await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`

    try {
        const usersTable = await client.sql`
		CREATE TABLE IF NOT EXISTS users (
		id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
		passport TEXT NOT NULL,
		name TEXT NOT NULL,
		email TEXT NOT NULL UNIQUE,
		password TEXT NOT NULL,
		role TEXT DEFAULT 'user'
		);`
        console.log('users table created!')

        const insertedUsers = await Promise.all(
            users.map(async (user) => {
                return client.sql`
					INSERT INTO users VALUES (
						${user.id}, ${user.passport}, ${user.name}, ${user.email}, ${user.password}, ${user.role}
					) ON CONFLICT (id) DO NOTHING;
				`
            })
        )
        console.log('users inserted!')
        return { usersTable, insertedUsers }
    } catch (error) {
        console.log(error)
        throw error
    }
}

async function main() {
    const client = await db.connect()

    await seedTours(client)
    await seedCategories(client)
    await seedUsers(client)

    await client.end()
}

main().catch((error) => console.log(error))
