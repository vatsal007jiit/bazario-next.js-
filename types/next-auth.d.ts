import NextAuth from "next-auth";

declare module "next-auth"{
    interface Session {
        user: {
            id: string
            name?: string | null
            email?: string | null
            image?: string | null
            role: string
            address: {
                street: string
                city: string
                state: string
                country: string
                pincode:  number
                contact: number
            }
        }
    }

    interface User {
        id: string
        role: string
        address: {
                street: string
                city: string
                state: string
                country: string
                pincode:  number
                conatct: number
            }
    }
}