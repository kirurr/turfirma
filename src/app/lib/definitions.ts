export type Tour = {
    id: string
    title: string
    alias: string
    category_alias: string
    description: string
    date: string
    program: string
    images_urls: string[]
    included: string[]
    excluded: string[]
    hotels_ids?: string[]
    duration: number
    price: number
}

export type TourWithHotel = {
    tour_id: string
    tour_title: string
    tour_alias: string
    tour_category_alias: string
    tour_description: string
    tour_date: string
    tour_program: string
    tour_images: string[]
    tour_included: string[]
    tour_excluded: string[]
    tour_hotels_ids?: string[]
    tour_duration: number
    tour_price: number
    hotels_info?: {
        hotel_id: string
        hotel_title: string
        hotel_description: string
        hotel_image: string
        hotel_map: string
    }[]
}

export type Hotel = {
    id: string
    title: string
    description: string
    image_url: string
    map_url: string
}

export type Category = {
    id: string
    title: string
    alias: string
    description: string
    image_url: string
}

export type User = {
    id: string
    passport: string
    name: string
    email: string
    password: string
    role: 'user' | 'admin'
}

export type Order = {
	id: string
	user_id: string
	tour_alias: string
	hotel_id: string
	status: 'canceled' | 'paid' | 'pending'
}
