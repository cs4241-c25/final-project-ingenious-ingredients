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
        signOut: '/hero',
    },
    callbacks: {
        async redirect({url, baseUrl}) {
            return `${baseUrl}/hero`;  // Default behavior
        },
    }
}

export default NextAuth(authOptions);