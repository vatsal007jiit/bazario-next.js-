import NextAuth, { NextAuthOptions, Session, User } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import axios from "axios";


export const authOptions: NextAuthOptions = {
    providers: [
        CredentialsProvider({
            name: 'Credentials',
            credentials: {
                email: {label: "Email", name: "email"},
                password: {label: "Password", name: "password"}
            },
            async authorize(credentials) {
                try {
                    const payload = {
                        email: credentials?.email,
                        password: credentials?.password
                    }
                    const {data} = await axios.post(`${process.env.SERVER}/api/user/login`, payload)
                    return data
                }
                catch(err)
                {
                    return null
                }
            }
        }),
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!
        })
    ],
    pages: {
        signIn: '/login',
        error: '/auth-failed'
    },
    session: {
        strategy: 'jwt'
    },
    callbacks: {
        async signIn({user, account}) {
         
            if(account?.provider === "google")
            {
                try {
                    const payload = {
                        email: user.email,
                        provider: 'google'
                    }
                    const {data} = await axios.post(`${process.env.SERVER}/api/user/login`, payload)
                    user.id = data.id
                    user.email = data.email
                    user.name = data.name
                    user.role = data.role
                    user.address = data.address
                    return true
                }
                catch(err)
                {
                    return false
                }
            }
            return true
        },
        // async jwt({token, user}) {

        //     if(user)
        //     {
        //         token.id = user.id
        //         token.role = user.role
        //         token.address = user.address
        //     }
        //     return token
        // },
            async jwt({token, user, trigger, session}) {
        // Handle initial sign in
        if(user) {
            token.id = user.id
            token.role = user.role
            token.address = user.address
            token.name = user.name 
        }
        
        // Handle session update trigger // This we have added to update token after user profile is updated from Profile page so fetch new data from token
        if(trigger === "update" && session) {
            token.name = session.user.name
            token.address = session.user.address
        }
        
        return token
        },
        async session({session, token}) {
            
            if(token)
            {
                session.user.id = token.id as string
                session.user.role = token.role as string
                session.user.address = token.address as any
                session.user.name = token.name as string
            }

            return session
        }
    },
    secret: process.env.NEXTAUTH_SECRET
}

const handler = NextAuth(authOptions)

export {handler as GET, handler as POST}