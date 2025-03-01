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
            // Redirect to a specific page after signout
            if (url === '/api/auth/signout') {
                return `${baseUrl}/hero`;  // Replace with your desired redirect URL
            }
            return url;  // Default behavior
        },
    }
}

export const handler = NextAuth(authOptions);

export {handler as GET, handler as POST};