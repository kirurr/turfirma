const bcrypt = require('bcryptjs')

function hashPassword(password) {
    return bcrypt.hashSync(password, 10)
}

const tours = [
    {
        id: '410544b2-4001-4271-9855-fec4b6a6442a',
        title: 'пример тура',
        alias: 'primer_tura',
        category_alias: 'kategoria',
        description: 'example description',
        date: '2022-06-05',
        program: 'example program',
        images_urls: ['1', '2'],
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
        id: '410544b2-4001-4271-9855-fec4b6a6444a',
        title: 'пример тура без отеля',
        alias: 'primer_tura_bez_otelya',
        category_alias: 'kategoria',
        description: 'example description',
        date: '2022-06-05',
        program: 'example program',
        images_urls: ['1', '2'],
        included: ['stuff', 'stuff2'],
        excluded: ['ex', 'ex'],
        hotels_ids: [],
        duration: '1',
        price: '100'
    },
    {
        id: '410544b2-4001-4271-9855-fec4b6a6443a',
        title: 'пример тура два',
        alias: 'primer_tura_dva',
        category_alias: 'kategoria_dva',
        description: 'example description',
        date: '2022-06-05',
        program: 'example program',
        images_urls: ['1', '2'],
        included: ['stuff', 'stuff2'],
        excluded: ['ex', 'ex'],
        hotels_ids: ['3958dc9e-742f-4377-85e9-fec4b6a6442a'],
        duration: '1',
        price: '3000'
    }
]

const categories = [
    {
        id: '3958dc9e-712f-4377-85e9-fec4b6a6442a',
        title: 'категория', alias: 'kategoria',
        description: 'sample',
        image_url: '1'
    },
    {
        id: '3958dc9e-712f-4377-85e9-fec4b6a6443a',
        title: 'категория два',
        alias: 'kategoria_dva',
        description: 'sample',
        image_url: '1'
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
    },
    {
        id: '3958dc9e-712f-4377-85e9-fec4b6a6447a',
        passport: '01111111111',
        name: 'Паровозов Аркадий Михайлович',
        email: 'arcadii@gmail.com',
        password: hashPassword('arcadii'),
        role: 'user'
    }
]

const hotels = [
    {
        id: '3958dc9e-742f-4377-85e9-fec4b6a6442a',
        title: 'example title',
        description: 'example',
        image_url: '1',
        map_url: '1'
    },
    {
        id: '3958dc9e-742f-4377-85e9-fec4b6a6442b',
        title: 'example title 2',
        description: 'example 2',
        image_url: '2',
        map_url: '2'
    }
]

module.exports = {
    tours,
    categories,
    users,
    hotels
}
