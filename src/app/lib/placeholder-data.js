const bcrypt = require('bcryptjs')

function hashPassword(password) {
    return bcrypt.hashSync(password, 10)
}

const tours = [
    {
        id: '410544b2-4001-4271-9855-fec4b6a6442a',
        title: 'пример тура',
        alias: 'primer_tura',
        category_id: '3958dc9e-712f-4377-85e9-fec4b6a6442a',
        description: 'example description',
        date: '2022-06-05',
        program: 'example program',
        images: ['tour-1', 'tour-1'],
        included: ['stuff', 'stuff2'],
        excluded: ['ex', 'ex'],
        hotels_ids: [
            '3958dc9e-742f-4377-85e9-fec4b6a6442a',
            '3958dc9e-742f-4377-85e9-fec4b6a6442b'
        ],
        duration: '1',
        price: '100'
    },
    {
        id: '710544b2-4001-4271-9855-fec4b6a6442a',
        title: 'пример тура без отеля',
        alias: 'primer_tura_bez_otelya',
        category_id: '3958dc9e-712f-4377-85e9-fec4b6a6443a',
        description: 'example description',
        date: '2023-06-05',
        program: 'example program',
        images: ['tour-2', 'tour-2'],
        included: ['stuff', 'stuff2'],
        excluded: ['ex', 'ex'],
        hotels_ids: [],
        duration: '1',
        price: '300'
    }
]

const categories = [
    {
        id: '3958dc9e-712f-4377-85e9-fec4b6a6442a',
        title: 'категория',
        alias: 'kategoria',
        description: 'sample',
        image: 'example-1'
    },
    {
        id: '3958dc9e-712f-4377-85e9-fec4b6a6443a',
        title: 'категория два',
        alias: 'kategoria_dva',
        description: 'sample',
        image: 'example-2'
    }
]

const users = [
    {
        id: '3958dc9e-712f-4377-85e9-fec4b6a6443a',
        passport: '0000000',
        name: 'admin',
        email: 'turfirma@gmail.com',
        password: hashPassword('123456'),
        role: 'admin'
    }
]

const hotels = [
    {
        id: '3958dc9e-742f-4377-85e9-fec4b6a6442a',
        title: 'example title',
        description: 'example',
        image: 'hotel-1',
        map_url:
            'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d21038.59953864472!2d44.516577999999996!3d48.76613925!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x411aca66b659c6c7%3A0x41c1658a919438f2!2z0JPQo9CXICLQk9C-0YDQvtC00YHQutCw0Y8g0LrQu9C40L3QuNGH0LXRgdC60LDRjyDQsdC-0LvRjNC90LjRhtCwINGB0LrQvtGA0L7QuSDQvNC10LTQuNGG0LjQvdGB0LrQvtC5INC_0L7QvNC-0YnQuCDihJYgMjUi!5e0!3m2!1sru!2sru!4v1717153213483!5m2!1sru!2sru'
    },
    {
        id: '3958dc9e-742f-4377-85e9-fec4b6a6442b',
        title: 'example title 2',
        description: 'example 2',
        image: 'hotel-2',
        map_url:
            'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d64909.52767632605!2d44.487585042307764!3d48.75250535935282!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x411acbbf9ecd05b1%3A0x61d7e3fa4d57d8f6!2z0KHQvtGB0L3QvtCy0YvQuSDQsdC-0YA!5e0!3m2!1sru!2sru!4v1717153711682!5m2!1sru!2sru'
    }
]

const reviews = [
    {
        id: '8958dc9e-742f-4377-85e9-fec4b6a6442c',
        user_id: '3958dc9e-712f-4377-85e9-fec4b6a6443a',
        title: 'tour',
        content: 'cool tour',
        is_positive: true,
        is_accepted: true
    }
]

module.exports = {
    tours,
    categories,
    users,
    hotels,
    reviews
}
