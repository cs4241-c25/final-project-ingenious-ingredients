import NextAuth from "next-auth";
import GitHubProvider from "next-auth/providers/github";
import * as dotenv from "dotenv";

dotenv.config();

export const authOptions = {
    providers: [
        GitHubProvider({
           clientId: process.env.GITHUB_ID ?? "",
            clientSecret: process.env.GITHUB_SECRET ?? "",
        }),
    ],
    pages: {
        signOut: '/',
    },
    callbacks: {
        async redirect({url, baseUrl}) {
            return `${baseUrl}/`;  // Default behavior
        },
    }
}

export const handler = NextAuth(authOptions);

export {handler as GET, handler as POST};