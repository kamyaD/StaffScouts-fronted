import { env } from "@/env/server.mjs";
import axios from "axios";
import type { NextAuthOptions } from "next-auth";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

interface AuthResponse {
	token: string;
	id: string;
	username: string;
}

export const authOptions: NextAuthOptions = {
	providers: [
		CredentialsProvider({
			id: "credentials",
			name: "email",
			credentials: {
				username: { label: "Username", type: "text" },
				password: { label: "Password", type: "password" },
			},
			async authorize(credentials, req) {
				const payload = {
					username: credentials?.username,
					password: credentials?.password,
				};
				// const res = await fetch(`http://127.0.0.1:8000/api-user-login/`, {
				// 	method: "POST",
				// 	body: JSON.stringify(payload),
				// 	headers: { "Content-Type": "application/json" },
				// });

				const res = await axios.post<AuthResponse>(
					`http://127.0.0.1:8000/api-user-login/`,
					payload,
				);
				const user = await res.data;

				// If no error and we have user data, return it
				if (res.status === 200 && user) {
					return user;
				}
				// Return null if user data could not be retrieved
				return null;
			},
		}),
	],
	secret: env.NEXTAUTH_SECRET,
	// Include user.id on session
	callbacks: {
		async jwt({ token, user, account }) {
			if (account && user) {
				return {
					...token,
					// @ts-expect-error
					accessToken: user.token,
					id: user.id || "",
					// @ts-expect-error
					username: user.username || "",
				};
			}

			return token;
		},
		// @ts-expect-error
		async session({ session, token }) {
			return {
				...session,
				user: {
					...session.user,
					id: token.id || "",
					username: token.username || "",
					token: token.accessToken || "",
				},
			};
		},
	},
	pages: {
		signIn: "/login",
		newUser: "/account", // If set, new users will be directed here on first sign in
	},
	debug: process.env.NODE_ENV === "development",
};

declare module "next-auth" {
	interface Session {
		// @ts-expect-error
		user: {
			username: string | null;
			id: string | null;
			token: string | null;
			image: string | null;
		};
	}
}

export default NextAuth(authOptions);