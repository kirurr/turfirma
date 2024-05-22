import type { NextAuthConfig } from 'next-auth'

export const authConfig = {
    // pages: {
    //     signIn: '/'
    // },
    callbacks: {
        authorized({ auth, request: { nextUrl } }) {
            // const isLoggedIn = !!auth?.user
            // const isOnAdminPage = nextUrl.pathname.startsWith('/admin')
            // if (isOnAdminPage) {
            //     if (isLoggedIn) return true
            //     return false
            // } else if (isLoggedIn) {
            //     // return Response.redirect(new URL('/', nextUrl))
            // }
            return true
        }
    },
    providers: []
} satisfies NextAuthConfig
