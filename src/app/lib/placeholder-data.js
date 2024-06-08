const bcrypt = require('bcryptjs')

function hashPassword(password) {
    return bcrypt.hashSync(password, 10)
}

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

module.exports = { users }
