import { Role } from "@prisma/client";
import { DefaultSession } from "next-auth";


declare module 'next-auth' {
    interface User {
        profileCompleteFlag:boolean;
        role:Role
    }

    interface Session{
        user:{
            role:Role,
            profileCompleteFlag:boolean;
        }& DefaultSession['user']
    }
}

declare module 'nexxt-auth/jwt'{
    interface JWT {
        role:Role,
        profileCompleteFlag:boolean
    }
}