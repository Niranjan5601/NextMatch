import { DefaultSession } from "next-auth";


declare module 'next-auth' {
    interface User {
        profileCompleteFlag:boolean;
    }

    interface Session{
        user:{
            profileCompleteFlag:boolean;
        }& DefaultSession['user']
    }
}

declare module 'nexxt-auth/jwt'{
    interface JWT {
        profileCompleteFlag:boolean
    }
}