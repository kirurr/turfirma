import NextAuth, { type DefaultSession } from 'next-auth'
import { JWT } from 'next-auth/jwt'
import { authConfig } from './auth.config'
import Credentials from 'next-auth/providers/credentials'
import { z } from 'zod'
import { fetchUserByEmail } from '@/app/data/users-data'
import bcrypt from 'bcryptjs'

declare module 'next-auth' {
    interface Session {
        user: {
            role?: string
        } & DefaultSession['user']
    }
    interface User {
        role?: string
    }
}

declare module 'next-auth/jwt' {
    interface JWT {
        role?: string
    }
}

export const { auth, signIn, signOut } = NextAuth({
    ...authConfig,
    session: {
        strategy: 'jwt'
    },
    providers: [
        Credentials({
            async authorize(credentials) {
                const parsedCredentials = z
                    .object({
                        email: z.string().email(),
                        password: z.string().min(6)
                    })
                    .safeParse(credentials)

                if (parsedCredentials.success) {
                    const { email, password } = parsedCredentials.data
                    const user = await fetchUserByEmail(email)
                    if (!user) return null
                    const passwordsMatch = await bcrypt.compare(
                        password,
                        user.password
                    )

                    if (passwordsMatch) {
                        return user
                    }
                }

                console.log('invalid credentials')
                return null
            }
        })
    ],
    callbacks: {
        jwt({ token, user }) {
            if (user) {
                token.role = user.role
            }
            return (token)
        },
        session: ({ session, token }) => {
            session.user.role = token.role
            return (session)
        }
    }
})
